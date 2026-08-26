import Link from "next/link";
import { AlertTriangle, Download, ExternalLink, FileCheck2, FileText, ReceiptText, WalletCards } from "lucide-react";

export default function Funding(){return <>
  <section className="page-hero compact"><div className="shell"><span className="kicker">FUNDING POLICY</span><h1>智能工程学院本科生竞赛经费资助</h1><p>集中查看学院试行方案、资助标准、申请提醒与原始文件。具体执行以学院最新正式通知和审核结果为准。</p><div className="hero-actions"><a className="button" href="/documents/ise-competition-funding-policy.pdf" target="_blank" rel="noopener noreferrer">查看学院原文件 <ExternalLink/></a><a className="button secondary" href="/documents/ise-competition-funding-policy.pdf" download>下载 PDF <Download/></a></div></div></section>
  <section className="section funding-content"><div className="shell funding-layout"><article>
    <span className="kicker">QUICK REFERENCE</span><h2>资助标准速览</h2><p className="source-line">以下内容根据本次提供的《智能工程学院本科生竞赛经费资助方案（试行）》整理，申请前请再次核对原始 PDF。</p>
    <div className="funding-levels"><div><span>国家级二等及以上</span><b>最高资助 1 万元</b></div><div><span>国家级其他等级</span><b>最高资助 0.5 万元</b></div><div><span>省部级二等及以上</span><b>最高资助 0.3 万元</b></div></div>
    <div className="funding-steps"><section><FileCheck2/><div><h3>先确认申请条件</h3><p>核对赛事是否在学院支持范围、获奖等级及团队资格。资助并非自动发放，应按学院流程申请并接受审核。</p></div></section><section><WalletCards/><div><h3>按实际支出申请</h3><p>“最高资助”是上限，不等于固定金额；最终金额与可报销范围以正式文件和学院审批为准。</p></div></section><section><ReceiptText/><div><h3>保留完整材料</h3><p>妥善保存获奖证明、参赛证明、发票和支付凭证，并在规定期限内提交。</p></div></section><section><AlertTriangle/><div><h3>保护个人隐私</h3><p>填写后的申请表可能包含姓名、学号、身份证号、电话和邮箱，请勿上传至公开作品区。</p></div></section></div>
    <div className="policy-actions"><a className="button" href="/documents/ise-competition-funding-policy.pdf" target="_blank" rel="noopener noreferrer"><FileText/>打开完整政策 PDF</a><Link className="button secondary" href="/contribute?type=information">反馈政策信息变化</Link></div>
  </article><aside className="pdf-panel"><div className="pdf-title"><FileText/><div><b>学院竞赛经费资助方案（试行）</b><span>PDF · 学院正式文件</span></div></div><iframe title="智能工程学院本科生竞赛经费资助方案" src="/documents/ise-competition-funding-policy.pdf#view=FitH"/><p>如果浏览器无法显示 PDF，请使用上方下载按钮。</p></aside></div></section>
  </>}
