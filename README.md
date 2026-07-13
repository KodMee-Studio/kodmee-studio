# KodMee Studio — website

Static site. No build step, no dependencies, no external requests.

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page |
| `impressum.html` | Impressum (§ 5 DDG) |
| `datenschutz.html` | Datenschutzerklärung (Art. 13 DSGVO) |
| `style.css` | Brand colours + layout |
| `logo.png` | Full lockup — used in the hero |
| `mark.png` | KM monogram — used in the header |
| `favicon.png` | Browser tab icon |

## Brand

```
Teal   rgb(50,150,150)   #329696
Gray   rgb(70,80,90)     #46505A
```

Both are set as CSS variables at the top of `style.css` (`--teal`, `--gray`).
Change them there and they propagate everywhere.

## Before you publish

Every yellow-highlighted `<span class="fill">` is a placeholder.
Search for `class="fill"` — **none may remain when you go live.**

| Placeholder | What goes there |
|---|---|
| STRASSE / PLZ / ORT | **The ladungsfähige Anschrift.** Not a Postfach. Decide this first. |
| +49 XXX XXXXXXX | Business phone number |
| kontakt@kodmee-studio.com | Your Zoho address |
| DE XXXXXXXXX | Your USt-IdNr |
| Apps section (Datenschutz) | Rewrite when the first app ships |

Then delete the `.fill` rule from `style.css`.

## No external fonts — deliberate

The site uses only system fonts. **Do not add Google Fonts via CDN.**
Embedding fonts from Google's servers passes visitor IP addresses to the US and
has been ruled a GDPR violation by German courts — it triggered a wave of
Abmahnungen. If you want a custom typeface, self-host the font files.

Same reason there is no analytics and no cookie banner: nothing to consent to.

## Deploy — GitHub Pages

1. New **public** repo, e.g. `kodmee-web`.
2. Push all files to the repo root.
3. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.

## Custom domain — kodmee-studio.com

1. Settings → Pages → Custom domain → `kodmee-studio.com` → Save.
2. DNS at your registrar:

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    <your-github-user>.github.io
```

3. Wait for DNS, then tick **Enforce HTTPS**.

Your Zoho **MX records are unaffected** — email keeps working.

## URLs you will need

- Impressum → `https://kodmee-studio.com/impressum.html`
- Website privacy policy → `https://kodmee-studio.com/datenschutz.html`
- Per-app privacy policies → `https://kodmee-studio.com/privacy/<app>.html`
  (Play Console + App Store Connect each want the app's own URL)
