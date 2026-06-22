FIX4 - READ THIS

This package fixes the two remaining problems:

1) Netlify invite links now redirect from /#invite_token=... to /admin/#invite_token=... so the Identity widget can accept the invite.
2) Article links no longer rewrite to the old dynamic Loading Article page. The three live articles are static pages.

Upload EVERYTHING inside this folder to the TOP LEVEL of GitHub.
Then commit, wait for Netlify deploy, then in Netlify click Deploys > Trigger deploy > Clear cache and deploy site.

Important admin notes:
- Leave the Roles field empty. That is normal.
- Delete the stuck user, invite the email again, and accept the NEW invite link after this FIX4 deploy is live.
