# Deploy to Cloudflare Pages

## One-time setup
1. Open `deploy.cloudflare.env`.
2. Set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
3. Optionally change `CF_PAGES_PROJECT`.

## Deploy
Run from this folder:

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy.ps1
```

The script will:
- install dependencies
- build the site
- create the Pages project if needed
- deploy `dist` to Cloudflare Pages

## Next updates
Run the same command again after content changes.
