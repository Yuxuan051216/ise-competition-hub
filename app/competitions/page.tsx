import type { Metadata } from "next";
import { CompetitionExplorer } from "@/components/CompetitionExplorer";
export const metadata: Metadata = { title: "竞赛库", description: "浏览与筛选智能工程相关大学生竞赛" };
export default function CompetitionsPage() { return <><section className="page-hero compact"><div className="shell"><span className="kicker">COMPETITION LIBRARY</span><h1>竞赛库</h1><p>29 项学院支持竞赛，按技术方向查找你的下一次挑战。所有年度日期与规则请以官方最新信息为准。</p></div></section><section className="section library"><div className="shell"><CompetitionExplorer/></div></section></> }
