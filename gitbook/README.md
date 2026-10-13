# f3mote Documentation

Deploy to Cloudflare Pages: https://docs.relay.example.com

## Local Development

```bash
npm run dev
```

Visit: http://localhost:3001

## Build

```bash
npm run build
```

Output: `out/` folder (static files)

## Deploy to Cloudflare Pages

### First Time Setup

1. Login to Cloudflare:
```bash
npx wrangler login
```

2. Create Pages project:
```bash
npx wrangler pages project create f3mote-docs
```

3. Deploy:
```bash
npm run build
npx wrangler pages deploy out --project-name=f3mote-docs
```

### Subsequent Deploys

From root directory:
```bash
npm run deploy:docs
```

Or from gitbook directory:
```bash
npm run build
npx wrangler pages deploy out --project-name=f3mote-docs
```

## Custom Domain

1. Go to Cloudflare Dashboard
2. Pages → f3mote-docs → Custom domains
3. Add: `docs.relay.example.com`
4. DNS will be configured automatically

## Environment

- **Production**: https://docs.relay.example.com
- **Preview**: https://f3mote-docs.pages.dev

## Structure

```
gitbook/
├── app/           # Next.js pages
├── components/    # React components
├── content/       # Markdown docs
├── constants/     # Config
├── utils/         # Utilities
└── out/           # Build output (gitignored)
```
