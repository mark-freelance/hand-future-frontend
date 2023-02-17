
## todo
- [ ] auto upload package.json
- [ ] sort out the best practice between global and page layout
- [x] use layout in app/layout.js
  - 参考：https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages
  - 由于第三方包（例如我的MUI）对 SSR 的兼容还不到位，因此需要用 `"use client"` 

## next.js relative

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited
in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated
as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## bugfix

### solved: `Extra attributes from the server: class`

这是由于插件引起的，例如我使用了 Liner，它会在 react 页面渲染完成之前尝试修改 dom，因此导致 hydration mismatch

参见：https://stackoverflow.com/a/74294741/9422455

同样，另一个插件「迅雷下载支持」触发了另一个 warning：`Uncaught (in promise) TypeError: Cannot read properties of null (reading '2')`

