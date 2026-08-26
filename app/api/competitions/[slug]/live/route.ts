import { NextResponse } from "next/server";
import { getCompetition } from "@/lib/competitions";
import { competitionSources } from "@/lib/competition-sources";

export const dynamic = "force-dynamic";

function stripHtml(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
}

function scheduleSnippets(text: string, year: number) {
  const datePattern = new RegExp(`.{0,55}${year}年.{0,110}`, "g");
  return Array.from(new Set(text.match(datePattern) ?? [])).map(line => line.trim()).filter(line => /报名|竞赛|比赛|初赛|决赛|通知|时间/.test(line)).slice(0, 4);
}

function registrationLinks(html: string, baseUrl: string) {
  const results: Array<{ title: string; url: string }> = [];
  const pattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(pattern)) {
    const title = stripHtml(match[2]).trim(); const href = match[1];
    if (!/报名|申请|参赛|通知|指南|手册|材料|附件|规则/i.test(`${title} ${href}`)) continue;
    try { const url = new URL(href, baseUrl).toString(); if (!results.some(item => item.url === url)) results.push({ title: title || "报名相关文件", url }); } catch { /* 忽略无效链接 */ }
  }
  return results.slice(0, 8);
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competition = getCompetition(slug);
  const source = competitionSources[slug];
  if (!competition || !source) return NextResponse.json({ error: "Competition not found" }, { status: 404 });

  const year = new Date().getFullYear();
  let schedule: string[] = [];
  let registrationDocuments: Array<{ title: string; url: string }> = [];
  let scheduleError: string | null = null;
  try {
    const response = await fetch(source.scheduleUrl ?? source.officialUrl, { next: { revalidate: 21600 }, headers: { "User-Agent": "ISE-Competition-Hub/1.0 (student information index)" }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`官网返回 ${response.status}`);
    const html = await response.text();
    schedule = scheduleSnippets(stripHtml(html), year);
    registrationDocuments = registrationLinks(html, source.scheduleUrl ?? source.officialUrl);
    if (!schedule.length) scheduleError = `官网页面暂未检索到 ${year} 年明确日程`;
  } catch (error) { scheduleError = error instanceof Error ? error.message : "官网暂时无法访问"; }

  let repositories: Array<{name:string;url:string;description:string|null;stars:number;updatedAt:string;license:string|null}> = [];
  let githubError: string | null = null;
  try {
    const headers: Record<string,string> = { Accept: "application/vnd.github+json", "User-Agent": "ISE-Competition-Hub" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const query = encodeURIComponent(`${source.githubQuery} in:name,description,readme`);
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=updated&order=desc&per_page=6`, { next: { revalidate: 43200 }, headers, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(response.status === 403 ? "GitHub 查询额度暂时用完" : `GitHub 返回 ${response.status}`);
    const data = await response.json();
    repositories = (data.items ?? []).filter((repo: {fork:boolean;archived:boolean;description:string|null}) => !repo.fork && !repo.archived && repo.description).slice(0, 3).map((repo: {full_name:string;html_url:string;description:string|null;stargazers_count:number;updated_at:string;license:{spdx_id:string}|null}) => ({ name: repo.full_name, url: repo.html_url, description: repo.description, stars: repo.stargazers_count, updatedAt: repo.updated_at, license: repo.license?.spdx_id ?? null }));
    if (!repositories.length) githubError = "暂未筛选到具有说明且非 Fork 的相关仓库";
  } catch (error) { githubError = error instanceof Error ? error.message : "GitHub 暂时无法访问"; }

  return NextResponse.json({ year, checkedAt: new Date().toISOString(), officialUrl: source.officialUrl, scheduleSource: source.scheduleUrl ?? source.officialUrl, schedule, scheduleError, registrationDocuments, repositories, githubError }, { headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" } });
}
