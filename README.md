# ISE Competition Hub

中山大学智能工程学院竞赛信息与经验共享平台。项目由学生自发维护，定位为非官方、可持续更新的竞赛知识库，围绕“发现 → 参赛 → 分享”组织内容。

## 已实现

- 现代、响应式的首页，支持浅色/深色模式
- 完整预置文档指定的 29 项竞赛，不虚构年度日期、赛道和报名材料
- 竞赛库实时搜索、方向筛选、空状态
- 29 个竞赛详情静态路由与真实性提示
- 新手指南、竞赛日历、经验作品、资助说明、关于本站、贡献表单
- 动态 sitemap、robots 与页面 Metadata
- Supabase 完整基础 Schema 与 RLS 迁移

## 技术栈

Next.js App Router、React、TypeScript、Lucide Icons、Supabase、原生 CSS 设计系统。部署目标为 Vercel + Supabase。

## 页面与目录

```text
app/                    页面、SEO 与全局样式
  competitions/         竞赛库与动态详情页
components/             导航、页脚、卡片和筛选组件
lib/competitions.ts     29 项首版静态 fallback 数据
supabase/migrations/    数据库 Schema 与 RLS
```

## 本地开发

需要 Node.js 20.9 或更高版本。

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。提交前执行：

```bash
npm run lint
npm run build
```

## Environment Variables

复制 `.env.example` 为 `.env.local`，填写：

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GITHUB_TOKEN=
```

`SUPABASE_SERVICE_ROLE_KEY` 只允许在服务端使用，禁止使用 `NEXT_PUBLIC_` 前缀或提交到仓库。
`GITHUB_TOKEN` 为可选的服务端变量，用于提高 GitHub Search API 的查询额度；不要添加 `NEXT_PUBLIC_` 前缀。

## Supabase 与数据库初始化

1. 在 Supabase 创建项目，保存 Project URL 与 anon key。
2. 在 SQL Editor 执行 `supabase/migrations/0001_initial_schema.sql`，或使用 Supabase CLI 运行 `supabase db push`。
3. 在 Authentication 中启用 Email；若使用 GitHub OAuth，在 GitHub 创建 OAuth App，并将 Supabase callback URL 填入 Authorization callback URL。
4. 创建私有 Storage bucket：`submission-files`。上传路径建议为 `{user_id}/{submission_id}/{uuid}`，限制 MIME 类型与大小，并通过审核后生成短期 signed URL。
5. 29 项竞赛当前通过 `lib/competitions.ts` 提供首屏 fallback；接入后应将相同记录导入 `competitions` 表，并由服务端优先读取数据库。

### Admin

用户首次登录并生成 profile 后，在 Supabase SQL Editor 中用明确的用户 UUID 设置管理员：

```sql
update public.profiles set role = 'admin' where id = 'USER_UUID';
```

不要提供前端自助提权入口。所有审核和管理写操作同时受数据库 RLS 与服务端身份校验保护。

## Auth、投稿、文件与审核

Schema 已支持用户资料、竞赛年度、来源、报名要求、外部资源、投稿、文件、评论、点赞、收藏、举报与纠错。当前 Phase 1–2 提供完整展示层及投稿准备页；接入 Supabase credentials 后实现登录与实际提交。投稿默认 `pending`，管理员审核通过后才公开。Markdown 渲染需 sanitize；外链需校验协议；上传需检查扩展名、MIME、大小并重命名。

## Vercel Deployment 与 Domain

1. 将项目推送到 Git 仓库，在 Vercel 导入该仓库，若仓库包含其他工程，将 Root Directory 设为 `ise-competition-hub`。
2. 配置 `.env.example` 中四个环境变量，生产环境的 `NEXT_PUBLIC_SITE_URL` 使用正式 `https` 域名。
3. 部署后在 Supabase Auth URL Configuration 中加入正式域名与回调地址。
4. 在 Vercel 项目 Domains 中添加自定义域名，按提示配置 DNS；HTTPS 证书会在解析生效后自动配置。

## SEO、Sitemap 与搜索引擎收录

站点自动生成 `/sitemap.xml` 和 `/robots.txt`。部署后：

- Google Search Console：验证域名并提交 `https://domain.com/sitemap.xml`
- Bing Webmaster Tools：验证站点并提交 sitemap
- 百度搜索资源平台：验证站点并提交 sitemap 或普通收录链接

搜索引擎抓取、审核和建立索引需要时间，部署后不会立即出现在搜索结果中。持续发布可靠内容、修复失效链接并观察站长工具报告。

## 数据备份与维护

生产环境开启 Supabase 定期备份；重要政策 PDF 与来源记录保留版本和校验日期。竞赛动态信息必须记录来源，无法核验时显示“暂无可靠信息”。定期复核链接、年度日期、RLS 策略和管理员名单。

## Contribution Guide

欢迎补充可靠信息、真实参赛经验与有明确分享权的作品。不得公开学号、电话、身份证号、私人邮箱或已填写的经费申请表。代码与作品可选择 MIT、Apache-2.0、GPL-3.0、CC BY 4.0、CC BY-NC 4.0 或保留所有权利。

## License

网站代码许可证可由维护团队在发布前确定；用户投稿版权与许可遵循投稿者明确选择，不因提交而自动变更。

## Disclaimer

本网站为学生自发维护的非官方竞赛信息分享平台，与中山大学及中山大学智能工程学院官方机构无隶属关系。竞赛信息可能随赛事年度发生变化，请以赛事主办方及学院最新正式通知为准。
