# Blog — Humberto Sardenberg

Blog pessoal (Astro + MD/MDX) sobre produto de IA, HITL e interaction design.

- **Site:** https://blog.mvpsardenberg.cloud
- **Repo:** https://github.com/HumbertoSar/blog
- **Idioma:** pt-BR

## Desenvolvimento

```bash
cd ~/Projetos/blog
npm install
npm run dev
```

## Build (estático → `dist/`)

```bash
cd ~/Projetos/blog
npm run build
```

A saída fica em `dist/`, pronta para rsync/deploy estático (Caddy no VPS).

Pré-visualizar o build:

```bash
npm run preview
```

## Conteúdo

- Posts em `src/content/blog/` (Markdown ou MDX)
- Constantes do site em `src/consts.ts`
- URL canônica / sitemap / RSS em `astro.config.mjs` (`site`)

Sem segredos no repositório.
