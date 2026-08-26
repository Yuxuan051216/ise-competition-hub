"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { allTags, competitions } from "@/lib/competitions";
import { CompetitionCard } from "./CompetitionCard";
export function CompetitionExplorer() {
  const [query, setQuery] = useState(""); const [tag, setTag] = useState("全部");
  const shown = useMemo(() => competitions.filter(c => (tag === "全部" || c.tags.includes(tag)) && `${c.name}${c.tags.join("")}${c.summary}`.toLowerCase().includes(query.toLowerCase())), [query, tag]);
  return <><div className="explorer"><label className="search-box"><Search/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索竞赛名称、技术方向或关键词…"/></label><div className="filter-title"><SlidersHorizontal size={17}/> 按方向筛选</div><div className="filter-row">{["全部", ...allTags].map(t => <button className={tag === t ? "active" : ""} onClick={() => setTag(t)} key={t}>{t}</button>)}</div></div><div className="result-count">找到 <b>{shown.length}</b> 项竞赛</div>{shown.length ? <div className="card-grid">{shown.map(item => <CompetitionCard key={item.slug} item={item}/>)}</div> : <div className="empty"><Search/><h3>没有找到匹配的竞赛</h3><p>试试更短的关键词，或清除当前筛选条件。</p><button className="button secondary" onClick={() => {setQuery("");setTag("全部")}}>清除筛选</button></div>}</>;
}
