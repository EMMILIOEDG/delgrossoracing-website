FIXES INCLUDED:
1. Adds Netlify Identity widget to the public pages so invite/confirmation/recovery tokens are processed correctly.
2. Fixes the contact form success route from /thank-you.html to /thank-you.
3. Adds /thank-you redirect in _redirects.

UPLOAD TO GITHUB:
- Open this folder.
- Drag these replacement files into the TOP LEVEL of your GitHub repository:
  _redirects
  index.html
  news.html
  post.html
  thank-you.html
- Commit changes.
- Netlify will redeploy automatically.

AFTER DEPLOY:
1. In Netlify > Forms, enable Form detection if it is not enabled.
2. Trigger deploy > Clear cache and deploy site.
3. In Netlify > Identity > Users, delete the current stuck user account.
4. Invite your email again.
5. Open the NEW invite email and create password.
6. Go to /admin and log in.
