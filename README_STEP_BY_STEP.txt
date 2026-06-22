DEL GROSSO RACING — NETLIFY + CMS SETUP

This package is built for real hosting, not Wix iframe embed.
It includes:
- Homepage: index.html
- News page: news.html
- Article page: post.html
- Editable CMS: /admin
- Editable news data: data/news.json
- Editable analytics IDs: data/site.json
- Contact/newsletter forms using Netlify Forms

FAST SETUP SUMMARY
1. Create GitHub account.
2. Create Netlify account.
3. Create a new GitHub repository called delgrossoracing-website.
4. Upload all files/folders from this package to that repository.
5. In Netlify, import the GitHub repository as a new site.
6. Build command: leave empty.
7. Publish directory: .
8. Deploy.
9. In Netlify, enable form detection.
10. In Netlify, enable Identity and Git Gateway for /admin editing.
11. Add delgrossoracing.com as a custom domain.
12. Add GA4 and Microsoft Clarity IDs through /admin > Site Settings.

NOTES
- After first deploy, contact form submissions should appear in Netlify > Forms.
- Add form email notifications in Netlify > Project configuration > Notifications > Form submission notifications.
- News posts can be edited in /admin after Identity + Git Gateway are configured.
- When you publish in /admin, Netlify rebuilds the site automatically.
