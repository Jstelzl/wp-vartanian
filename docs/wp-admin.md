# WP Admin

## Role

**WP Admin** is WordPress’s browser dashboard. You use it to manage content and settings that live in the database — not (usually) to edit theme PHP/CSS files.

There are **two** admins in this project. They look similar but point at different databases.

| Admin | URL / entry | Database |
|---|---|---|
| Hosted (GoDaddy) | https://vartanianconstruction.com/wp-admin | Production / original host |
| Local | Local app → **WP Admin**, or `https://vartanian-localhost.local/wp-admin` | Local MySQL only |

During redesign, prefer the **Local** admin so GoDaddy stays untouched.

## What to do in WP Admin

| Goal | Where in admin |
|---|---|
| Edit / create pages | **Pages** |
| Posts / news | **Posts** |
| Menus | **Appearance → Menus** |
| Widgets / sidebars | **Appearance → Widgets** (Classic Widgets is installed) |
| Theme options / Customizer | **Appearance → Customize** (StructurePress is a classic-style theme) |
| Page layouts (rows/widgets) | Edit page → SiteOrigin Page Builder UI |
| Plugins on/off | **Plugins** |
| Media library | **Media** (files live under `wp-content/uploads`) |
| SEO | Yoast (**SEO** menu) |
| Export / import site archive | **All-in-One WP Migration** |

## What *not* to rely on WP Admin for

Hard-coded theme markup, SCSS/CSS in the theme, custom PHP templates — edit those in **Cursor** under:

`wordpress/wp-content/themes/structurepress-pt/`

Customizer “Additional CSS” is fine for small experiments; lasting style work belongs in the theme files and Git.

## Local vs hosted — decide before you click

| If you need… | Use |
|---|---|
| Safe layout experiments | Local WP Admin |
| Another backup of the original | Hosted WP Admin / GoDaddy tools |
| Change visitors will see on the domain | Hosted WP Admin **or** a deliberate deploy from Local |

Edits in Local WP Admin never appear on `vartanianconstruction.com` until you deploy database/content (or re-export/import) to GoDaddy.

## Related plugins already in this install

- **SiteOrigin Page Builder** + **Widgets Bundle** — layout building
- **Advanced Custom Fields** (+ Repeater) — structured fields
- **Classic Editor / Classic Widgets** — classic editing UX
- **All-in-One WP Migration** — move the site between host and Local
- **AI Engine** — AI tools (optional; not required for Local + Cursor file editing)
- **Yoast SEO**, **Smush**, redirects, login limiting, portfolio/shortcodes — site features carried over from the GoDaddy snapshot
