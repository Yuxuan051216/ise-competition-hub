"use client";
import { useEffect, useState } from "react";
import { AlertCircle, ExternalLink, Github, LoaderCircle, RefreshCw, Star } from "lucide-react";

type LiveData = { year:number; checkedAt:string; officialUrl:string; scheduleSource:string; schedule:string[]; scheduleError:string|null; registrationDocuments:Array<{title:string;url:string}>; repositories:Array<{name:string;url:string;description:string|null;stars:number;updatedAt:string;license:string|null}>; githubError:string|null };
export function LiveCompetitionData({ slug }: { slug: string }) {
  const [data,setData]=useState<LiveData|null>(null); const [error,setError]=useState(false);
  useEffect(()=>{fetch(`/api/competitions/${slug}/live`).then(r=>{if(!r.ok)throw new Error();return r.json()}).then(setData).catch(()=>setError(true))},[slug]);
  if(error) return <div className="live-error"><AlertCircle/>实时信息服务暂时不可用，请直接访问竞赛官网核对。</div>;
  if(!data) return <div className="live-loading"><LoaderCircle className="spin"/>正在从竞赛官网和 GitHub 获取最新信息…</div>;
  return <>
    <section><div className="live-title"><h2><RefreshCw/> {data.year} 年比赛时间</h2><span>自动核验于 {new Date(data.checkedAt).toLocaleString("zh-CN")}</span></div>{data.schedule.length?<div className="schedule-list">{data.schedule.map((line,i)=><p key={i}>{line}</p>)}</div>:<div className="empty-inline"><AlertCircle/><div><b>未取得可可靠展示的当年日程</b><p>{data.scheduleError}。请通过下方官网按钮查看最新通知。</p></div></div>}<a className="button secondary external-button" target="_blank" rel="noopener noreferrer" href={data.scheduleSource}>在竞赛官网核对时间 <ExternalLink/></a></section>
    <section><div className="live-title"><h2><Github/>近期 GitHub 开源项目</h2><span>按最近更新时间检索 · 非官方资源</span></div>{data.repositories.length?<div className="repo-list">{data.repositories.map(repo=><a href={repo.url} target="_blank" rel="noopener noreferrer" key={repo.url}><div><b>{repo.name}</b><ExternalLink/></div><p>{repo.description || "仓库作者未提供简介"}</p><span><Star/> {repo.stars} Stars　·　更新于 {new Date(repo.updatedAt).toLocaleDateString("zh-CN")}　·　{repo.license || "未声明许可证"}</span></a>)}</div>:<div className="empty-inline"><Github/><div><b>暂未筛选到合适的近期仓库</b><p>{data.githubError}。检索结果仅用于学习，请自行核对许可证与竞赛规则。</p></div></div>}<p className="resource-note">说明：这些链接由 GitHub 实时检索并排除 Fork、归档和无简介仓库，不代表赛事官方推荐。使用代码前请阅读 README、许可证和当届学术诚信规则。</p></section>
    <section><div className="live-title"><h2><ExternalLink/>报名材料与文件</h2><span>从赛事官网动态提取</span></div>{data.registrationDocuments.length?<div className="document-list">{data.registrationDocuments.map(doc=><a key={doc.url} href={doc.url} target="_blank" rel="noopener noreferrer"><span>{doc.title}</span><ExternalLink/></a>)}</div>:<div className="empty-inline"><AlertCircle/><div><b>官网当前页面未识别到报名文件</b><p>部分赛事将报名表放在登录后的报名系统或通知附件中，请打开竞赛官网核对报名表、推荐信、承诺书和作品模板。</p></div></div>}<p className="resource-note">报名材料可能随年度和赛道变化。下载后请检查文件年份，只填写当届主办方发布的模板。</p></section>
  </>;
}
