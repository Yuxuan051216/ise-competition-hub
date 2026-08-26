import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock3, ExternalLink, Flag } from "lucide-react";
import { competitions, getCompetition } from "@/lib/competitions";
import { competitionSources } from "@/lib/competition-sources";
import { LiveCompetitionData } from "@/components/LiveCompetitionData";
import { CompetitionCommunity } from "@/components/CompetitionCommunity";

export function generateStaticParams() { return competitions.map(c => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }) { const c = getCompetition((await params).slug); return { title: c?.name ?? "竞赛详情", description: c?.summary }; }
export default async function Detail({ params }: { params: Promise<{slug: string}> }) {
  const c = getCompetition((await params).slug); if (!c) notFound(); const source = competitionSources[c.slug];
  return <>
    <section className="detail-hero"><div className="shell"><Link className="back" href="/competitions"><ArrowLeft/>返回竞赛库</Link><div className="detail-head"><div><div className="tags">{c.tags.map(t => <span key={t}>{t}</span>)}</div><h1>{c.name}</h1><p>{c.summary}</p><a className="official-link" href={source.officialUrl} target="_blank" rel="noopener noreferrer">访问竞赛官网 <ExternalLink/></a></div><div className="verified"><CheckCircle2/><span>官网来源已配置<small>日程与资源自动更新</small></span></div></div></div></section>
    <section className="section detail-body"><div className="shell detail-layout"><article className="content">
      <section><span className="kicker">OFFICIAL OVERVIEW</span><h2>比赛简介</h2><p className="overview-text">{source.overview}</p><p className="source-line">介绍根据赛事官网公开内容整理；具体组别、参赛资格与评价规则以当届通知为准。</p></section>
      <LiveCompetitionData slug={c.slug}/>
      <section><h2><Clock3/>建议备赛时间</h2><div className="recommend"><b>{c.cycle}</b><p>这是用于规划的经验性建议，并非赛事官方要求。实际周期取决于赛道、团队基础与作品复杂度。</p></div></section>
      <CompetitionCommunity slug={c.slug}/>
    </article><aside><div className="side-card"><h3>竞赛速览</h3><dl><div><dt>难度参考</dt><dd>{c.difficulty}</dd></div><div><dt>备赛建议</dt><dd>{c.cycle}</dd></div><div><dt>数据方式</dt><dd>官网动态核验</dd></div></dl><a className="button secondary full-button" href={source.officialUrl} target="_blank" rel="noopener noreferrer">竞赛官网 <ExternalLink/></a></div><div className="side-card action-card"><Flag/><h3>你参加过这项比赛？</h3><p>你的经验，可能正是下一届同学需要的答案。</p><Link className="button" href={`/contribute?type=experience&competition=${c.slug}`}>分享经验</Link><Link className="text-link" href={`/contribute?type=information&competition=${c.slug}`}>纠错或补充信息</Link></div></aside></div></section>
  </>;
}
