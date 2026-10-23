# GH-253 — local privacy draft for owner review

Tracking issue: https://github.com/KodMee-Studio/leave-api/issues/253

Status: PR #1 was merged and the owner approved the page structure and shortened
wording. The owner subsequently confirmed that the origin is their own server
on their private local network, within their tailnet, and confirmed use of
developers@kodmee-studio.com. Public DNS MX records point to Zoho's EU mail
endpoints. Both policy languages now describe those facts and the configured
size-based rotation of technical logs. No private IP, tailnet hostname or
physical street location of the server is disclosed in the policy.

These confirmations do not settle analytics/browser-storage legal bases,
account-level edge/analytics retention, provider contracts or transfer safeguards.
Keep those questions tracked; linking provider policies does not replace our
own disclosures. No arbitrary retention period or EU-only processing guarantee
has been added.

## Changes prepared

- Per the owner's updated instruction, Public Holidays follows HandyTools:
  separate EN/DE `praznici/support.html` and `praznici/privacy.html` pages.
  The app policies contain delivery/logs, browser storage, analytics, cookies,
  e-mail protection, contact and rights. Corporate policies describe only the
  corporate site and link to both apps' policies.
- Every content page links to the app support page through the existing Apps
  menu, including its mobile layout. Each support page ends with a button
  opening the public app in a new tab (`noopener noreferrer`). No embedding,
  prefetch, preconnect, additional script or dependency is introduced.
- EN/DE legal notices explicitly cover both hosts, retaining existing identity
  and contact details pending confirmation. Removed the old TMG-style liability
  wording incorrectly attributed to DDG sections 7–10; retained a plain statement
  about responsibility for our own content.

## Evidence checked on 23 October 2026

| Fact | Evidence and limits |
| --- | --- |
| Corporate hosting | This repository's README and CNAME: GitHub Pages. Confirm the actual provider/account arrangements before approving the notice. |
| Public app hosting | leave-api `docs/runbooks/public-site.md` and D4/D42: origin server `ubuntu-dev`, staging stack, Cloudflare Tunnel. Neither physical location nor a contracted hosting provider is proven by a hostname. |
| Cloudflare Web Analytics | Staging variable is configured. One live GET of `/en/hr/2026` returned 200 with the beacon and analytics CSP. Later automated requests met 403; this is not a full edge-settings audit. |
| E-mail protection | That live HTML included `email-decode.min.js` served from `/cdn-cgi/` on the holiday host. |
| Report recipient | GitHub staging REPORT_EMAIL is `developers@kodmee-studio.com`, updated 2026-10-23T20:11:41Z. This proves configuration, not delivery to or control of the mailbox. No test e-mail was sent. |
| Browser storage | leave-api `website/static/remember.js`: automatically writes calendar/year/language to `kodmee.holidays.selection`, reads on homepage, no time-based expiry; Forget removes the key. The script has no network call. Ordinary page requests and analytics can still reveal the selected URL. |
| Origin request logs | `core/logging.py`: request time, method, route, status, duration and request id. It does not routinely add the visitor IP, referrer or user agent to that request-finished event. Edge and error logs are separate. |
| Log rotation | `deploy/compose.yaml`: Docker json-file, 10 MB × 5 per container. This is a size cap, not a time-based retention policy; host settings and copies/backups must be checked. |
| Analytics retention | D42 describes six months of report history. Cloudflare's current FAQ separately describes seven days of unsampled data and sampled longer-term storage. Do not treat either as proof of this account's deletion schedule. |

## Remaining verification and decisions

1. **Controller and legal notice.** Confirm that the existing Emir Mesic / KodMee
   Studio identity, postal address and other legal-notice particulars also apply
   to the public holiday service. Nothing in this branch changes those details.
2. **Hosting and recipients.** Self-hosting on the owner's local network and
   administrative tailnet access are confirmed. Mail is routed to Zoho EU MX
   endpoints; this does not prove that all processing is EU-only. Confirm
   the physical country if needed, Cloudflare/Zoho contracting entities, applicable data processing
   agreements, subprocessors and international-transfer mechanisms. The draft
   links the public provider terms without claiming that a particular mechanism
   has been agreed for this account.
3. **Retention.** Set or confirm origin/error/edge log periods or operational
   deletion criteria, backups/copies and analytics availability/retention.
   Update the notice to the actual, implemented policy. A Docker size cap alone
   does not establish a number of days.
4. **Remembering the calendar.** Current storage happens automatically, without
   an explicit Remember action. Decide the device-access basis under §25 TDDDG
   separately from any GDPR basis. Do not label it consent-exempt just because
   it is functional or uses no cookies. My suggested product direction is to
   make remembering an explicit user choice; that change needs a leave-api
   task and approval before this policy describes it as implemented.
5. **Analytics.** Confirm purpose, applicable GDPR basis and whether the actual
   device access requires consent under §25 TDDDG. Cloudflare's cookie-free
   description does not decide that question. If consent is required, implement
   prior blocking and withdrawal before publishing a claim that consent is
   obtained. An alternative is to disable the optional beacon while this is
   assessed; this branch does not change staging settings.
6. **Error-report mail.** The owner confirmed use of developers@kodmee-studio.com;
   its domain's MX records identify Zoho. Confirm any forwarding/other recipients,
   transfers and retention/deletion practice. The
   existing contact section uses purpose-based deletion; confirm it is followed
   and add any necessary service-specific disclosures.
7. **Final factual/legal approval.** Review both language versions, settle the
   Art. 6(1)(f) basis stated for necessary delivery/security processing, add the
   missing service-specific legal bases and retention information, and remove
   the draft status only when the notice matches the deployed service.

No server setting, tracking/storage behavior, business console or employee data
was changed. A website-policy edit alone cannot resolve a product-consent gap.

The holiday application's deployed Privacy Policy footer still points at the
corporate policy URL. That corporate page now links to the separate app policy,
but a direct app-footer link should be coordinated in leave-api after the new
policy URL is published. Do not deploy an app link to an unpublished policy URL.

At the owner's request, both app policies use a shorter visitor-facing text:
hosting/security, remembered selection, analytics/cookies, error-report/contact
and rights, alongside the controller address and scope. Internal storage keys,
script hostnames, request identifiers and e-mail decoding details were removed
from the public wording; evidence remains here. This edit does not settle the
outstanding legal bases, retention or owner confirmations listed above.

## Primary references

- [§25 TDDDG](https://www.gesetze-im-internet.de/ttdsg/__25.html)
- [Regulator FAQ on the narrow device-access exceptions](https://www.lfd.niedersachsen.de/faq/faq-telekommunikation-digitale-dienste-datenschutzgesetz-tdddg-206449.html)
- [GDPR, including Art. 13](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [Cloudflare Web Analytics collection](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/)
- [Cloudflare analytics dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/)
- [Cloudflare analytics FAQ](https://developers.cloudflare.com/web-analytics/faq/)
- [Cloudflare Web Analytics storage description](https://www.cloudflare.com/web-analytics/)
- [Cloudflare cookies](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/)
- [Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/)
- [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/)
- [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [§7 DDG, current text](https://www.gesetze-im-internet.de/ddg/__7.html)

## Local review

Serve this worktree only on loopback, for example:

```sh
python3 -m http.server 8770 --bind 127.0.0.1
```

Review `/praznici/support.html`, `/praznici/privacy.html`, their DE versions,
both corporate policies and legal notices, and the Apps menu at desktop and
phone widths. Apps must open the local support page in the same tab; only the
Open button on the support page opens the public app in a new tab.

Browser screenshots are local review artifacts under `/tmp/gh253-*`.

After separating the pages, Playwright Chrome checks passed for all fourteen
content pages at 1280 px and 390 px (28 combinations), including menu targets,
policy separation, app-policy language links and the new-tab button attributes.
No page-level horizontal overflow, JavaScript exceptions or external requests
were observed while loading the corporate pages. The full mobile click path
Apps → Public Holidays support → Open launched `https://praznici.kodmee-studio.com/en/`
in a separate tab, kept the support page open and left `window.opener` null.
All 226 relative file/asset references resolve, the sitemap XML parses and
`git diff --check` passes. These checks do not approve the draft's legal content.
