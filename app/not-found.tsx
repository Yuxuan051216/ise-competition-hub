import Link from "next/link";
import { SearchX } from "lucide-react";
export default function NotFound(){return <section className="section"><div className="shell empty"><SearchX/><h1>没找到这个比赛</h1><p>页面可能已调整，或者这个竞赛尚未收录。</p><Link className="button" href="/competitions">返回竞赛库</Link></div></section>}
