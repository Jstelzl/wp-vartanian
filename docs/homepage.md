# Homepage layout (Local)

Records the Home page redesign applied on **Local** (`vartanian-localhost`). Most of the live outline lives in the **database** (SiteOrigin `panels_data`, ACF slides, menus, widgets). Theme PHP/CSS under StructurePress also changed for the site-wide footer—see [Changelog](changelog.md).

## Target outline

Inspired by the old Vercel template section order (layout only; logo, colors, and button motion unchanged):

1. **Header** — existing StructurePress header / logo / menu  
2. **Contact strip** — Phone, Location, Email (`PW_Icon_Box` × 3); SiteOrigin row padding `46.875px`; gray full-width background  
3. **Text hero (“hook”)** — SiteOrigin Editor + `[button]` CTAs (Consultation → Contact, View Our Work → Projects); row padding `78.125px 0 46.875px`  
4. **Recent Projects** — `PW_Portfolio_Grid` with `posts_per_page=3`, grid layout, CTA card → `/project-details/`  
5. **Contracting Services** — six `PW_Featured_Page` cards (2×3) for existing Services pages  
6. **Estimate CTA** — `PW_Call_To_Action` → Contact; row background **white** (`#ffffff`, not gray)  
7. **Footer** (site-wide theme) — see Footer section below  

Removed from Home: ACF image slider/jumbotron, Latest News, Commitment & Standards, Testimonials.

## Footer (theme + widgets)

**Theme files (in Git):**

- [`footer.php`](../wp-content/themes/structurepress-pt/footer.php) — only `footer-top` (no card strip / gray angled bottom bar); copyright injected into the **first** footer column via `dynamic_sidebar_params`  
- [`style.css`](../wp-content/themes/structurepress-pt/style.css) — equal column padding, `.footer-contact-line`, left-column flex so copyright sits at the bottom of the logo column  

**Local DB / Customizer / widgets:**

| Setting | Value |
|---|---|
| `footer_widgets_layout` | `[6]` → two equal `col-md-6` parents |
| `footer-widgets` sidebar | `text-3` (logo/blurb), `text-4` (CONTACT US) only; `nav_menu-3` / `nav_menu-4` inactive |
| CONTACT US (`text-4`) | Monroe / phone / email; no website URL; YouTube icon + “YouTube” text link; each item in `.footer-contact-line` |
| Copyright | Customizer `footer_right_txt` — rendered at bottom of **left** column |

## Services strip (page IDs)

| Page | ID |
|---|---|
| Kitchen and Bath Renovations | 482 |
| Additions | 479 |
| The List | 477 |
| Home Updates | 475 |
| General Contractor | 473 |
| Outdoor Living | 484 |

## Other Local DB changes

| Change | Where |
|---|---|
| ACF `slides` cleared (`0`) so jumbotron does not render | Home page ID **11** |
| Page template kept | `template-front-page-slider.php` |
| Nav label **Project Details → Projects** | Main Menu item **271** → still `/project-details/` (page 269) |
| Removed duplicate Phone/Email Icon Boxes from `slider-widgets` | Appearance → Widgets (YouTube social left) |
| Contact strip + hero vertical padding (×1.25 twice from original) | Home `panels_data` grids 0–1 |
| Estimate CTA row background white | Home `panels_data` grid for `PW_Call_To_Action` |

## How to edit

1. Start **vartanian-localhost** in Local.  
2. WP Admin → **Pages → Home** → SiteOrigin Page Builder (rows, padding, CTA background).  
3. Menus: **Appearance → Menus** (Projects label).  
4. Slides: edit Home → ACF **slides** (keep empty to hide the carousel).  
5. Footer widgets / layout: **Appearance → Widgets** and **Customize → Theme Options → Footer**.  
6. Footer markup/CSS: edit theme files in Cursor, then commit.

## Limits (StructurePress / SiteOrigin)

- Portfolio Grid uses a 4-up column grid; three items leave an empty slot (or use slider layout).  
- “View all” is the Portfolio Grid CTA card (`add_cta=yes`), not a dedicated archive field.  
- Home contact strip is a SiteOrigin row (not `slider-widgets`).

## Deploy note

Pushing this Git branch updates **theme/docs on GitHub only**. It does **not** update GoDaddy.

| Kind | How to get to production |
|---|---|
| Theme (`footer.php`, `style.css`) | SFTP / copy `structurepress-pt` (or migration that includes theme files) |
| Home layout, menus, widgets, Customizer | Database/content migrate, or rebuild in hosted WP Admin |
