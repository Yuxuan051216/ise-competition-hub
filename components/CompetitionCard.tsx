import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { Competition } from "@/lib/competitions";
export function CompetitionCard({ item }: { item: Competition }) { return <Link className="competition-card" href={`/competitions/${item.slug}`}><div className="card-top"><span className="index">{String(item.id).padStart(2, "0")}</span><ArrowUpRight size={19}/></div><h3>{item.name}</h3><p>{item.summary}</p><div className="tags">{item.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><div className="card-meta"><span><Clock3 size={15}/>{item.cycle}</span><b>{item.difficulty}</b></div></Link> }
