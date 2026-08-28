# ISE Competition Hub

中山大学智能工程学院竞赛信息与经验共享平台。前端及 API 使用 Next.js，Vercel 负责部署，Supabase Database 保存社区数据，Supabase Storage 保存投稿附件。

欢迎通过投稿页面补充竞赛信息、参赛经验与相关作品。

## 本地开发

需要 Node.js 20.9 或更高版本。

```bash
npm install
copy .env.example .env.local
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
npm run dev
```

打开 `http://localhost:3000`。代码检查：

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## 环境变量

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GITHUB_TOKEN=
```

- Project URL、Publishable Key、Secret Key 从 Supabase Dashboard 的项目 API Keys 页面取得。
- `SUPABASE_SECRET_KEY` 只能配置在服务端和 Vercel 环境变量中，不得添加 `NEXT_PUBLIC_`、发送给浏览器或提交到 Git。
- `GITHUB_TOKEN` 可选，仅供服务器提高 GitHub Search API 配额。

## Supabase

`supabase/migrations/` 包含完整、可重复执行的首次部署结构：

- Database 保存竞赛、留言、投稿、贡献者姓名、审核状态和附件 metadata。
- `submission_contacts` 单独保存投稿邮箱，公开查询无权访问。
- `submission-files` 是 Private Storage bucket，单文件上限 10 MB并配置 MIME 白名单。
- `0003_seed_competitions.sql` 从网站现有 29 项竞赛数据生成关联记录，slug 唯一。
- 所有公开表启用 RLS；访客只读取 `approved` 内容。匿名写入由 Next.js API 使用服务器 Secret Key 完成，浏览器不能指定审核状态。
- `public_profiles` 只在 `show_real_name=true` 时公开真实姓名；`profiles` 本表不向匿名访客开放。
- 普通用户只有指定个人资料列的 UPDATE 权限，不能修改 `role`、`id`、`created_at`。

迁移会通过 SQL 创建 Private bucket。如目标项目限制 SQL 管理 Storage，请在 Dashboard → Storage 确认存在 `submission-files`，并确认它是 Private、10 MB 限制且 MIME 白名单与 migration 一致。

## 社区与审核流程

留言和投稿均无需注册，但服务器固定写入 `pending`：

1. 访客向 Next.js Route Handler 提交内容。
2. 服务器校验 slug、字段长度、邮箱及文件扩展名/MIME/大小。
3. 留言写入 `discussion_messages`；投稿写入 `submissions`，邮箱写入私有的 `submission_contacts`，文件写入 Private Storage，metadata 写入 `submission_files`。
4. 网站公开查询只返回 `approved` 内容。
5. 审核通过的附件由 `/api/submission-files/[id]` 验证投稿状态后生成 60 秒 Signed URL，不会提供永久公开 URL。

### 第一版管理审核

可先在 Supabase Dashboard → Table Editor 中审核：

- 留言：打开 `discussion_messages`，筛选 `status = pending`，核对后改成 `approved` 或 `rejected`。
- 投稿：打开 `submissions`，筛选 `status = pending`；同时查看关联的 `submission_files`，如需联系投稿人，由管理员查看 `submission_contacts`。核对后改成 `approved` 或 `rejected`。

项目也提供 `/api/admin/review` 的服务器审核 API 基础结构。调用者必须携带 Supabase 登录 JWT，服务器会再次确认其 `profiles.role` 为 `moderator` 或 `admin`。第一版不包含大型管理后台。

管理员角色只能由 Dashboard/SQL Editor 中的可信操作设置：

```sql
update public.profiles set role = 'admin' where id = 'USER_UUID';
```

## Vercel 部署

1. 将代码推送到 GitHub，在 Vercel 导入仓库；Root Directory 选择本项目目录。
2. 在 Vercel 的 Production、Preview、Development 环境配置：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY`
   - `NEXT_PUBLIC_SITE_URL`（生产环境填写正式 HTTPS 地址）
   - `GITHUB_TOKEN`（可选）
3. 先执行 Supabase migration，再部署网站。
4. 部署后检查留言提交、投稿上传、Dashboard 审核以及审核后下载。

## 历史本地数据

旧的 `data/community.json` 与 `public/uploads/` 仅作为待迁移历史数据保留，已被 `.gitignore` 排除，生产代码不再读取或写入它们。不要删除或手工改写原始数据；其中若存在乱码，应在正式迁移前先确认正确编码。迁移不会在 build 或启动时自动执行。

## 安全说明

- React 以文本节点显示访客内容，未使用 `dangerouslySetInnerHTML`。
- 投稿状态由服务器强制为 `pending`。
- 文件同时验证扩展名、MIME 和大小，并以服务器 UUID 生成 Storage path。
- 上传或 metadata 写入失败时会删除已上传对象及不完整投稿，避免孤儿数据。
- Storage 保持 Private；Secret Key 永不进入客户端 bundle。
- 当前内存级限流只能降低单实例滥用。正式开放匿名入口前建议再接入 Vercel Firewall、Turnstile 或共享速率限制服务。

## 其他

网站保留 29 项竞赛、竞赛详情、日历、经验作品、资助说明、指南、关于、贡献者、投稿页面以及 sitemap、robots 和 metadata。`public/documents/ise-competition-funding-policy.pdf` 与现有静态图片不受本次改造影响。
