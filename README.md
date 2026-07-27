# KodMee Studio — website

Static site. No build step, no dependencies, no external requests.
Open any `.html` file directly in a browser to preview.

## Files

| File | Purpose |
|---|---|
| `index.html` / `de/index.html` | Landing page (EN / DE) |
| `legal-notice.html` / `de/legal-notice.html` | Legal notice / Impressum (§ 5 DDG) |
| `privacy-policy/website.html` / `de/privacy-policy/website.html` | Website privacy policy (Art. 13 GDPR) |
| `privacy-policy/handytools.html` / `de/privacy-policy/handytools.html` | Privacy policy for the HandyTools app |
| `privacy-policy/neue-app.html` / `de/privacy-policy/neue-app.html` | Placeholder privacy policy template for the next app |
| `style.css` | Brand colours + layout |
| `site.js` | Nav dropdown toggle + footer year |
| `logo.png` | Full lockup — used in the hero |
| `mark.png` | KM monogram — used in the header |
| `favicon.png` | Browser tab icon |
| `CNAME` | GitHub Pages custom domain |

All pages share the same header/footer shell — copy an existing page's structure when adding a new one. The header's "Privacy Policies" nav item is a dropdown (see `.nav-dropdown` in `style.css`, wired up in `site.js`) listing each privacy policy page.

## Languages

English is the default and lives at the site root (`index.html`, `privacy-policy/...`). German is a full duplicate of every page under `de/`, mirroring the exact same structure one level deeper (`de/index.html`, `de/privacy-policy/website.html`, etc.) — extensions are kept as `.html` (not extensionless folder URLs), so every page is still a plain file openable directly, both locally via `file://` and once deployed.

The header has a flag-based language switcher: a `.nav-dropdown.lang-dropdown` (same component as "Privacy Policies", reusing its CSS/JS) showing only the current language's flag with a dropdown arrow; opening it reveals the other language. Each language's internal nav/footer links stay entirely within that language's tree (a page under `de/` only links to other pages under `de/`) — only the lang-dropdown link crosses between the two trees, and it always points at the *same* page's other-language version, not the homepage.

When adding a new page, create it at both `<name>.html` and `de/<name>.html` (same relative position under `de/`), translate the content, fix up the relative asset paths for the added depth (one extra `../` under `de/`), and in each file's `<head>` add the three `rel="alternate" hreflang="..."` tags (`en`, `de`, `x-default`) pointing at both versions — copy the pattern from an existing page.

## Brand

```
Teal   rgb(50,150,150)   #329696
Gray   rgb(70,80,90)     #46505A
```

Both are set as CSS variables at the top of `style.css` (`--teal`, `--gray`).
Change them there and they propagate everywhere.

## Adding a new app's privacy policy

1. Copy `privacy-policy/neue-app.html` to `privacy-policy/<app>.html`, and `de/privacy-policy/neue-app.html` to `de/privacy-policy/<app>.html`.
2. Fill in every yellow-highlighted `<span class="fill">` placeholder in both files, then delete the `.fill` spans (leave the `.fill` CSS rule in `style.css` — other in-progress pages may still use it).
3. Add a `<li><a href="privacy-policy/<app>.html">...</a></li>` entry to the "Privacy Policies" dropdown on every English page, and the equivalent `de/privacy-policy/<app>.html` entry on every German page (see `.dropdown-menu` in each HTML file).
4. Submit each language's URL to Play Console / App Store Connect — each store wants its own URL.

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

The current `CNAME` points this site at `docs.kodmee-studio.com`. DNS at the registrar should have a `CNAME` record for that subdomain pointing to `<your-github-user>.github.io`. After DNS propagates, tick **Enforce HTTPS** in Settings → Pages.

## URLs

- Legal notice → `https://docs.kodmee-studio.com/legal-notice.html` (German: `/de/legal-notice.html`)
- Website privacy policy → `https://docs.kodmee-studio.com/privacy-policy/website.html` (German: `/de/privacy-policy/website.html`)
- Per-app privacy policies → `https://docs.kodmee-studio.com/privacy-policy/<app>.html` (German: `/de/privacy-policy/<app>.html`)
  (Play Console + App Store Connect each want the app's own URL)
