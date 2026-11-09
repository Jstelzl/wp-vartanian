# Overview

## Purpose

Rebuild and redesign the Vartanian Construction WordPress site safely on a Mac, without editing the GoDaddy install day-to-day.

Typical work:

- Theme layout, CSS, header/footer, templates (`structurepress-pt`)
- Plugin configuration that affects presentation
- Page structure previewed on localhost before anything is pushed back to the host

## How the pieces fit

```text
GoDaddy (vartanianconstruction.com)
        │  one-time export / media copy
        ▼
Local ──► Cursor (edit files) ──► GitHub (commit / push)
  │
  └── WP Admin (local) for pages, menus, Customizer
```

| Piece | Job |
|---|---|
| **GoDaddy** | Hosted WordPress + domain. Treat as the frozen original until you deliberately deploy. |
| **Local** | Runs PHP, MySQL, and nginx so the full site works offline. |
| **Cursor project** | `/Users/josiah/projects/vartanian` — `wordpress/` symlink into Local’s `app/public`. |
| **GitHub** | Remote git history for themes/plugins (and these docs). |
| **WP Admin** | Browser UI for content and settings — exists on **both** GoDaddy and Local. |

## Project layout (Cursor)

```text
~/projects/vartanian/
  .git                 → pointer into Local’s real .git
  .gitignore           → wrapper ignores only
  wordpress/           → symlink → Local Sites/.../app/public
    .gitignore         → WordPress-aware ignores (authoritative for the repo)
    README.md
    docs/
    wp-content/
      themes/structurepress-pt/   ← primary theme
      plugins/                    ← site plugins
```

Real WordPress files live under:

`~/Local Sites/vartanian-localhost/app/public`

## Stack snapshot

| Item | Detail |
|---|---|
| Active theme | **StructurePress PT** (ProteusThemes) — contractor / construction theme |
| Page builder | SiteOrigin Page Builder + SiteOrigin Widgets Bundle |
| Notable plugins | Advanced Custom Fields (+ Repeater), All-in-One WP Migration, Yoast SEO, AI Engine, Smush, Classic Editor/Widgets, portfolio/shortcodes, redirects, login limiting |
| Local stack | PHP 8.2, nginx 1.26, MySQL 8.4 (Local 10.x) |
| Git remote | `https://github.com/Jstelzl/wp-vartanian.git` (`main`) |

## Safe workflow (default)

1. **Do not** edit theme files directly on GoDaddy while redesigning.
2. Work in **Local** + **Cursor** only.
3. Use **local WP Admin** for pages, menus, widgets, Customizer.
4. **Commit and push** theme/plugin file changes to GitHub.
5. Deploy back to GoDaddy only when you choose to (migration export, SFTP of changed files, or host tools) — never assume Local syncs itself.

## What is *not* in Git

Media (`wp-content/uploads`), database content (pages/posts), secrets (`wp-config.php`), and WordPress core. Those live in Local (and on GoDaddy). Git is for code you change in the editor.
