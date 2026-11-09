# Vartanian Construction — WordPress

Local redesign workspace for **Vartanian Construction** (`vartanianconstruction.com`).

GoDaddy holds the original hosted install. **Local** runs an editable copy on this Mac. **GitHub** stores theme and plugin code. **WP Admin** is where page content, menus, and theme options are managed in the browser.

## Docs

| Doc | What it covers |
|---|---|
| [Overview](docs/overview.md) | Goals, layout, safe workflow |
| [GoDaddy](docs/godaddy.md) | Hosted original / production host |
| [GitHub](docs/github.md) | Code backup and version history |
| [Local](docs/local.md) | Desktop WordPress runtime |
| [WP Admin](docs/wp-admin.md) | Browser editor (hosted + local) |

## Quick map

| Layer | Role | Touches the live host? |
|---|---|---|
| GoDaddy | Original WordPress install + domain | Yes — leave alone while redesigning |
| Local (`vartanian-localhost`) | Running copy for layout/theme work | No |
| Cursor (`~/projects/vartanian`) | Edit theme/plugin files | No |
| GitHub (`Jstelzl/wp-vartanian`) | Track `wp-content` themes/plugins | No |
| WP Admin | Pages, menus, Customizer, plugins UI | Only if you open the **hosted** admin |

## Local preview

1. Open **Local** and start **vartanian-localhost**.
2. Site: `https://vartanian-localhost.local` (or **Open site** in Local).
3. Admin: use Local’s **WP Admin** button.

## What this repo tracks

Tracked: `wp-content/themes/`, `wp-content/plugins/`, and project docs.

Not tracked (by design): WordPress core, `wp-config.php`, uploads/media, caches, backups (`.wpress` / SQL), and Local must-use plugins. See `.gitignore`.
