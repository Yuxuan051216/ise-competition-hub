import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
const steps=[
  ["01","怎么选择比赛？","从兴趣、现有基础、可投入时间和希望获得的能力出发。先在竞赛库按方向筛选，再阅读两到三个详情页，不必只看赛事名气。"],
  ["02","怎么了解比赛规则？","先确认参赛资格、组队人数、赛道、提交物、评分方式和关键时间。只使用当届官网文件，往届规则仅用于理解大致形式。"],
  ["03","怎么寻找队友？","说明目标赛道、已有技能、每周可投入时间与期望成绩。优先寻找投入预期一致、技能互补且沟通稳定的同学。"],
  ["04","怎么寻找指导老师？","先完成基础调查和一页项目设想，再联系研究方向相关的教师。邮件或面谈时明确比赛、问题、团队和希望获得的指导。"],
  ["05","怎么制定备赛周期？","从最终提交物倒排：留出规则理解、技术验证、系统集成、压力测试、文档和答辩演练时间，并给硬件与协作风险预留缓冲。"],
  ["06","怎么使用 GitHub 项目？","先看 README、更新时间、Issues 和许可证；运行后理解模块边界，再基于规则独立设计。记录引用，不要把能运行等同于真正理解。"],
  ["07","什么属于合理学习？","学习公开思想、工具与通用实现，并在许可范围内复用；把他人作品改名提交、隐瞒来源或绕过赛事原创要求不属于合理学习。"],
  ["08","如何遵守学术诚信？","保存资料来源和贡献记录，明确每位成员的工作。使用生成式 AI 前阅读当届规则，在报告中按要求披露，不能伪造实验或参赛经历。"],
  ["09","怎么准备比赛答辩？","用“问题—方案—关键创新—验证—局限—价值”组织内容。准备现场演示备份，并让每位队员都能解释核心设计取舍。"],
  ["10","比赛结束后做什么？","复盘技术路线、时间管理和踩坑经历；清除敏感数据并确认版权后，可把报告、代码或经验贡献到本站，帮助下一届继续出发。"]
];
export default function Guide(){return <><section className="page-hero compact"><div className="shell"><span className="kicker">FIRST COMPETITION</span><h1>第一次参加竞赛？</h1><p>一份从选择比赛到赛后复盘的实际行动路线。每一步都给出可以立即执行的检查点。</p></div></section><section className="section"><div className="shell guide-layout"><aside><BookOpen/><h2>从零开始的<br/>参赛路线</h2><p>不必一次弄懂所有事情。先完成当前阶段最重要的一步。</p><Link className="button" href="/competitions">去竞赛库选择方向 <ArrowRight/></Link></aside><div className="guide-steps">{steps.map(([no,title,text])=><article key={no}><span>{no}</span><div><h3>{title}</h3><p>{text}</p><small><CheckCircle2/> 完成后再进入下一步</small></div></article>)}</div></div></section></>}
