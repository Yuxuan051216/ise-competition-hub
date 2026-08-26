"use client";
import Link from "next/link";
import { Menu, Moon, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [["/competitions", "竞赛库"], ["/calendar", "竞赛日历"], ["/stories", "经验与作品"], ["/funding", "学院资助"], ["/guide", "新手指南"], ["/about", "关于本站"]];
export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  return <header className="site-header"><div className="nav shell">
    <Link href="/" className="brand"><span className="brand-mark">ISE</span><span>Competition Hub<small>智能工程学院竞赛信息平台</small></span></Link>
    <nav className={open ? "nav-links open" : "nav-links"}>{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
    <div className="nav-actions"><Link href="/competitions" className="icon-button" aria-label="搜索"><Search size={18}/></Link><button className="icon-button" onClick={() => setDark(!dark)} aria-label="切换主题"><Moon size={18}/></button><Link className="login" href="/contribute">参与共建</Link><button className="menu" onClick={() => setOpen(!open)} aria-label="菜单">{open ? <X/> : <Menu/>}</button></div>
  </div></header>;
}
