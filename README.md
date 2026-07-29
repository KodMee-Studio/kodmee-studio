# KodMee Studio — website

Static site. No build step, no dependencies, no external requests.
Open any `.html` file directly in a browser to preview.

## Files

| File | Purpose |
|---|---|
| `index.html` / `de/index.html` | Landing page (EN / DE) |
| `legal-notice.html` / `de/legal-notice.html` | Legal notice / Impressum (§ 5 DDG) |
| `privacy.html` / `de/privacy.html` | The site's own (non-app) privacy policy (Art. 13 GDPR) |
| `handytools/support.html`, `handytools/privacy.html` (+ `de/handytools/...`) | Support and privacy policy for the HandyTools app |
| `neue-app/support.html`, `neue-app/privacy.html` (+ `de/neue-app/...`) | Template folder for a new app — copy this to start one |
| `style.css` | Brand colours + layout |
| `site.js` | Nav dropdown toggle + footer year |
| `logo.png` | Full lockup — used in the hero |
| `mark.png` | KM monogram — used in the header |
| `favicon.png` | Browser tab icon |
| `CNAME` | GitHub Pages custom domain |

All pages share the same header/footer shell — copy an existing page's structure when adding a new one. The header's "Apps" nav item is a dropdown (see `.nav-dropdown` in `style.css`, wired up in `site.js`) listing each app, linking to that app's support page (which in turn links to its own privacy policy). The footer links to the site's own `privacy.html`, not the per-app ones.

## Languages

English is the default and lives at the site root (`index.html`, `<app>/support.html`, `<app>/privacy.html`, ...). German is a full duplicate of every page under `de/`, mirroring the exact same structure one level deeper (`de/index.html`, `de/handytools/privacy.html`, etc.) — extensions are kept as `.html` (not extensionless folder URLs), so every page is still a plain file openable directly, both locally via `file://` and once deployed.

The header has a flag-based language switcher: a `.nav-dropdown.lang-dropdown` (same component as "Privacy Policies", reusing its CSS/JS) showing only the current language's flag with a dropdown arrow; opening it reveals the other language. Each language's internal nav/footer links stay entirely within that language's tree (a page under `de/` only links to other pages under `de/`) — only the lang-dropdown link crosses between the two trees, and it always points at the *same* page's other-language version, not the homepage.

When adding a new page, create it at both `<name>.html` and `de/<name>.html` (same relative position under `de/`), translate the content, fix up the relative asset paths for the added depth (one extra `../` under `de/`), and in each file's `<head>` add the three `rel="alternate" hreflang="..."` tags (`en`, `de`, `x-default`) pointing at both versions — copy the pattern from an existing page.

## Brand

```
Teal   rgb(50,150,150)   #329696
Gray   rgb(70,80,90)     #46505A
```

Both are set as CSS variables at the top of `style.css` (`--teal`, `--gray`).
Change them there and they propagate everywhere.

## Adding a new app

1. Copy the `neue-app/` folder to `<app>/`, and `de/neue-app/` to `de/<app>/`.
2. Fill in every yellow-highlighted `<span class="fill">` placeholder across all four files (`support.html` and `privacy.html`, both languages), then delete the `.fill` spans (leave the `.fill` CSS rule in `style.css` — other in-progress pages may still use it).
3. Add a `<li><a href="<app>/support.html">...</a></li>` entry to the "Apps" dropdown on every English page, and the equivalent `de/<app>/support.html` entry on every German page (see `.dropdown-menu` in each HTML file).
4. Submit each language's support and privacy URLs to Play Console / App Store Connect — each store wants its own URLs.

## No external fonts — deliberate

The site uses only system fonts. **Do not add Google Fonts via CDN.**
Embedding fonts from Google's servers passes visitor IP addresses to the US and
has been ruled a GDPR violation by German courts — it triggered a wave of
Abmahnungen. If you want a custom typeface, self-host the font files.

Same reason there is no analytics and no cookie banner: nothing to consent to.

## Deploy — GitHub Pages

1. Push all files to the repo root.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.

## Custom domain

The `CNAME` file points this site at the apex domain `kodmee-studio.com`. DNS (managed on Cloudflare) needs:

- Four `A` records on `kodmee-studio.com` (the apex) pointing at GitHub Pages' IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- A `CNAME` record on `www` pointing at `<your-github-org>.github.io`.

Both must be set to **DNS only** (grey cloud) in Cloudflare, not proxied — GitHub can't issue its Let's Encrypt certificate for the custom domain through Cloudflare's proxy. After DNS propagates, set the custom domain in Settings → Pages and tick **Enforce HTTPS**.

## URLs

- Legal notice → `https://kodmee-studio.com/legal-notice.html` (German: `/de/legal-notice.html`)
- Website privacy policy → `https://kodmee-studio.com/privacy.html` (German: `/de/privacy.html`)
- Per-app privacy policies → `https://kodmee-studio.com/<app>/privacy.html` (German: `/de/<app>/privacy.html`)
- Per-app support pages → `https://kodmee-studio.com/<app>/support.html` (German: `/de/<app>/support.html`)
  (Play Console + App Store Connect each want the app's own support/privacy URL)
