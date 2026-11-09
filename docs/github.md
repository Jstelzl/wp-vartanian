# GitHub

## Role

GitHub stores version history for the **customizable WordPress code** used in Local — mainly themes and plugins — so Cursor can show diffs and you can recover or share changes.

Remote: [https://github.com/Jstelzl/wp-vartanian](https://github.com/Jstelzl/wp-vartanian)

Default branch: `main`

## What is in the repo

| Included | Excluded (see `.gitignore`) |
|---|---|
| `wp-content/themes/` | WordPress core (`wp-admin`, `wp-includes`, root `wp-*.php`) |
| `wp-content/plugins/` | `wp-config.php`, `.htaccess`, secrets |
| `README.md`, `docs/` | `wp-content/uploads/` and other media |
| Root `.gitignore` | Caches, logs, `.wpress` / SQL dumps |
| | Local/host `mu-plugins/` |

Uploads and the database are **not** on GitHub. Clone alone is not enough to run the site; you still need Local (or another WP runtime) plus media/DB.

## How Git is wired on this Mac

| Path | Meaning |
|---|---|
| `~/Local Sites/vartanian-localhost/app/public/.git` | Real repository |
| `~/projects/vartanian/.git` | Pointer file → that `.git` directory |
| `~/projects/vartanian/wordpress/` | Symlink to the same `app/public` tree |

Edits under `wordpress/wp-content/...` in Cursor are the same files Local serves.

## Common commands

From the Cursor project or the Local public folder:

```bash
git status
git add wp-content/themes/structurepress-pt   # or whatever you changed
git commit -m "Describe why the change exists."
git push origin main
```

## Relationship to other layers

- **Local** — runtime; Git does not start or stop the site.
- **GoDaddy** — not automatically updated by `git push`. Pushing to GitHub does not deploy to the host.
- **WP Admin** — page/post content lives in MySQL, not in this GitHub repo.

## Good commit hygiene

- Commit theme/CSS/PHP changes you care about keeping.
- Do not force-add uploads, backups, or `wp-config.php`.
- Prefer small commits after a coherent layout/CSS change so history stays useful.
