# Local (LocalWP)

## Role

[Local](https://localwp.com/) is the desktop app that runs WordPress on your Mac. It provides PHP, MySQL, and nginx. Cursor only edits files; Local makes the site viewable in a browser.

Local is **not** a Cursor extension.

## This site

| Setting | Value |
|---|---|
| Site name | `vartanian-localhost` |
| Domain | `vartanian-localhost.local` |
| Disk path | `~/Local Sites/vartanian-localhost` |
| Web root | `…/app/public` (symlinked as `~/projects/vartanian/wordpress`) |
| PHP | 8.2.x |
| Web server | nginx 1.26.x |
| Database | MySQL 8.4.x |
| Local app | 10.x |

## Daily use

1. Open **Local**.
2. Select **vartanian-localhost** → ensure status is **Running**.
3. **Open site** — front end preview.
4. **WP Admin** — local dashboard (content, Appearance, plugins).
5. **Go to site folder** / Finder — confirms you are in `Local Sites/vartanian-localhost`.

Edit code in Cursor via `~/projects/vartanian` (the `wordpress` symlink). Refresh the browser to see changes. Restart the site in Local if PHP/config changes need a reload.

## How the Local copy was built

1. Created a Local site.
2. Restored/imported a GoDaddy **All-in-One WP Migration** `.wpress` archive (large backups may need the Unlimited Extension or an alternate extract path).
3. Merged GoDaddy `uploads` into `wp-content/uploads` when images were missing.
4. Linked that `app/public` tree into the Cursor project for editing and Git.

## What Local owns vs Git

| In Local only (typical) | Also in Git |
|---|---|
| Database (pages, options, menus) | Theme PHP/CSS/JS |
| `wp-config.php` | Plugin code under `wp-content/plugins` |
| Uploads / media | These docs / README |
| WordPress core files | |

Stopping Local does not delete files, but the site URL only works while the site is **Running**.

## Tips

- Prefer local WP Admin for content; prefer Cursor for theme files under `structurepress-pt`.
- Keep large `.wpress` backups out of Git (already ignored).
- If the domain fails to resolve, confirm Local is running and try **Open site** from the app rather than guessing ports.
