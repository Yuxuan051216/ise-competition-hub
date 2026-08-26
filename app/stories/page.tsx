import Link from "next/link";
import { ArrowRight, Award, BookOpenText, Download, FolderGit2, MessageCircle } from "lucide-react";
import { allProjects } from "@/lib/local-community";
import { competitions } from "@/lib/competitions";

export const dynamic = "force-dynamic";

export default async function Stories() {
  const stories = await allProjects();
  const names = new Map(competitions.map(item => [item.slug, item.name]));
  return <>
    <section className="page-hero compact"><div className="shell">
      <span className="kicker">EXPERIENCE & WORKS</span><h1>经验与作品</h1>
      <p>这里集中展示同学们已经分享的参赛复盘、获奖信息和项目文件。投稿成功后，无需审核即可立即出现在本页和对应竞赛页面中。</p>
      <div className="hero-actions"><Link className="button" href="/contribute?type=experience">分享参赛经验 <ArrowRight/></Link><Link className="button secondary" href="/contribute?type=project">分享优秀作品</Link></div>
    </div></section>
    <section className="section"><div className="shell">
      <div className="story-categories"><div><BookOpenText/><b>参赛复盘</b><span>备赛节奏、分工、技术路线与答辩经验</span></div><div><FolderGit2/><b>项目文件</b><span>同学分享的代码、报告、PPT 与演示材料</span></div><div><MessageCircle/><b>共同积累</b><span>每一次真实分享都会成为后来者的起点</span></div></div>
      {stories.length ? <div className="story-feed">{stories.map(story => <article key={story.id}>
        <div className="story-meta"><Link href={`/competitions/${story.slug}`}>{names.get(story.slug) || story.slug}</Link><span><Award/> {story.award}</span></div>
        <h2>{story.title}</h2><p>{story.content}</p>
        {story.files.length ? <div className="story-files">{story.files.map(file => <a href={file.url} key={file.url} target="_blank" rel="noopener noreferrer"><Download/>{file.name}</a>)}</div> : null}
        <small>{story.contributorName ? `${story.contributorName} · ` : ""}{new Date(story.createdAt).toLocaleDateString("zh-CN")}</small>
      </article>)}</div> : <div className="empty contribution-empty"><MessageCircle/><h2>还没有公开分享</h2><p>提交参赛经验和项目文件后，内容会立即显示在这里。</p><Link className="button" href="/contribute">成为第一位贡献者</Link></div>}
    </div></section>
  </>;
}
