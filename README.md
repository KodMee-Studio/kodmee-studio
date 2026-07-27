# KodMee Studio — website

Static site. No build step, no dependencies, no external requests.
Open any `.html` file directly in a browser to preview.

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page |
| `legal-notice.html` | Legal notice / Impressum (§ 5 DDG) |
| `privacy-policy/website.html` | Website privacy policy (Art. 13 GDPR) |
| `privacy-policy/handytools.html` | Privacy policy for the HandyTools app |
| `privacy-policy/neue-app.html` | Placeholder privacy policy template for the next app |
| `style.css` | Brand colours + layout |
| `site.js` | Nav dropdown toggle + footer year |
| `logo.png` | Full lockup — used in the hero |
| `mark.png` | KM monogram — used in the header |
| `favicon.png` | Browser tab icon |
| `CNAME` | GitHub Pages custom domain |

All pages share the same header/footer shell — copy an existing page's structure when adding a new one. The header's "Privacy Policies" nav item is a dropdown (see `.nav-dropdown` in `style.css`, wired up in `site.js`) listing each privacy policy page.

## Brand

```
Teal   rgb(50,150,150)   #329696
Gray   rgb(70,80,90)     #46505A
```

Both are set as CSS variables at the top of `style.css` (`--teal`, `--gray`).
Change them there and they propagate everywhere.

## Adding a new app's privacy policy

1. Copy `privacy-policy/neue-app.html` to `privacy-policy/<app>.html`.
2. Fill in every yellow-highlighted `<span class="fill">` placeholder, then delete the `.fill` spans (leave the `.fill` CSS rule in `style.css` — other in-progress pages may still use it).
3. Add a `<li><a href="privacy-policy/<app>.html">...</a></li>` entry to the "Privacy Policies" dropdown on every page (see `.dropdown-menu` in each HTML file).
4. Submit that page's URL to Play Console / App Store Connect — each store wants its own URL.

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

- Legal notice → `https://docs.kodmee-studio.com/legal-notice.html`
- Website privacy policy → `https://docs.kodmee-studio.com/privacy-policy/website.html`
- Per-app privacy policies → `https://docs.kodmee-studio.com/privacy-policy/<app>.html`
  (Play Console + App Store Connect each want the app's own URL)
