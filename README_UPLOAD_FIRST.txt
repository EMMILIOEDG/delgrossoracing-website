DEL GROSSO RACING — PERFECT V4

UPLOAD IN GITHUB:
1. Unzip this folder.
2. Open the folder.
3. Select everything INSIDE it, not the folder itself.
4. Drag into GitHub at the repository top level.
5. Commit: Perfect v4 final site.

IMPORTANT NETLIFY BLOCKER:
If Netlify shows “team has run out of credits / production deploys disabled”, this upload will NOT go live until you fix that in Netlify or deploy under another Netlify account/team.

AFTER DEPLOY:
- Forms > Form detection: Enabled.
- Deploys > Trigger deploy > Clear cache and deploy site.
- Identity: Enabled.
- Registration: Invite only.
- Git Gateway: Enabled.
- User roles: leave blank.

TEST:
/ 
/news/
/post/venezuelan-podium-at-silverstone-strong-gb4-debut/
/thank-you/
/admin/
/forms

CONTACT FORM:
This version uses native Netlify Forms. No JavaScript submit interception. If Netlify detects the form, the submission will appear under Forms and redirect to /thank-you/.

ARTICLES:
The main article pages are now real static HTML pages, not loading screens. JavaScript is only used as fallback/dynamic enhancement.
