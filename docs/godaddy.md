# GoDaddy

## Role

GoDaddy hosts the original WordPress site for **vartanianconstruction.com**.

It is the **source snapshot** this Local copy came from. During redesign, treat it as read-only unless you are deliberately backing up, exporting, or deploying.

## URLs

| Surface | URL |
|---|---|
| Public site | https://vartanianconstruction.com |
| WordPress admin | https://vartanianconstruction.com/wp-admin |

The public domain may show a host “coming soon” or incomplete front end while the WP install still exists behind `/wp-admin`. That does **not** mean Local is connected to GoDaddy — they are separate.

## What lives here

- Full WordPress install (core, themes, plugins, database)
- Media library (downloads/uploads via File Manager, SFTP/Cyberduck, or migration tools)
- Domain DNS and hosting controls (GoDaddy account)

## How this project used GoDaddy

1. Signed into hosted **WP Admin**.
2. Exported a site archive with **All-in-One WP Migration** (`.wpress`).
3. Imported/restored that archive into **Local**.
4. Copied `wp-content/uploads` from GoDaddy (e.g. via SFTP) into Local when media was missing after import.

After that, day-to-day editing moved to Local + Cursor. GoDaddy stayed the original host.

## GoDaddy tools you may still use

| Task | Where |
|---|---|
| Export another backup | Hosted WP Admin → All-in-One WP Migration (or GoDaddy backups) |
| File Manager / SFTP | GoDaddy site hosting tools (or Cyberduck with FTP/SFTP credentials) |
| Domain / SSL / DNS | GoDaddy account for the domain |
| Hosted WP Admin content edits | Only if you intentionally change production |

## Rules of thumb

- Prefer another **export/backup** before any deploy back to GoDaddy.
- Do not point Cursor or SFTP at GoDaddy for routine theme edits.
- Uploading Local changes to GoDaddy is a **manual** step (migration plugin, selective SFTP of theme files, etc.) — document the chosen deploy path when you pick one.
