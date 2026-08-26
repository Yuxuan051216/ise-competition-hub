import type { Metadata } from "next";
import "./globals.css";
import "./forms.css";
import "./enhancements.css";
import "./calendar.css";
import "./guide.css";
import "./stories.css";
import "./community.css";
import "./campus.css";
import "./uploader.css";
import "./contact.css";
import "./contributors.css";
import "./avatar.css";
import "./credits.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: { default: "ISE Competition Hub", template: "%s · ISE Competition Hub" }, description: "中山大学智能工程学院竞赛信息与经验共享平台（学生自发维护，非官方）", keywords: ["中山大学", "智能工程学院", "大学生竞赛", "竞赛信息"] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body><Header/><main>{children}</main><Footer/></body></html> }
