"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarSearch, ExternalLink, LoaderCircle } from "lucide-react";
import { competitions } from "@/lib/competitions";
import { competitionSources } from "@/lib/competition-sources";

type Result={year:number;schedule:string[];scheduleError:string|null};
export function CalendarBoard(){const [results,setResults]=useState<Record<string,Result>>({});const [loading,setLoading]=useState<string|null>(null);async function check(slug:string){setLoading(slug);try{const r=await fetch(`/api/competitions/${slug}/live`);const data=await r.json();if(r.ok)setResults(v=>({...v,[slug]:data}))}finally{setLoading(null)}}return <div className="calendar-board">{competitions.map(c=>{const data=results[c.slug];const source=competitionSources[c.slug];return <article key={c.slug}><div className="calendar-main"><span>{String(c.id).padStart(2,"0")}</span><div><Link href={`/competitions/${c.slug}`}>{c.name}</Link><small>{c.tags.join(" · ")}</small></div><button onClick={()=>check(c.slug)} disabled={loading===c.slug}>{loading===c.slug?<LoaderCircle className="spin"/>:<CalendarSearch/>}{data?"重新核验":"检查当前年度时间"}</button><a href={source.officialUrl} target="_blank" rel="noopener noreferrer" title="打开竞赛官网"><ExternalLink/></a></div>{data&&<div className="calendar-result">{data.schedule.length?data.schedule.map((x,i)=><p key={i}>{x}</p>):<p>{data.scheduleError || "暂未获取到明确时间"}，请访问官网核对。</p>}</div>}</article>})}</div>}
