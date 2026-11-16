# Homepage layout (Local)

Records the Home page redesign applied on **Local** (`vartanian-localhost`). The live outline lives in the **database** (SiteOrigin `panels_data`, ACF slides, menus, widgets)—not in theme PHP—so this doc is the Git-visible summary of that work.

## Target outline

Inspired by the old Vercel template section order (layout only; logo, colors, and button motion unchanged):

1. **Header** — existing StructurePress header / logo / menu  
2. **Contact strip** — Phone, Location, Email (`PW_Icon_Box` × 3)  
3. **Text hero** — SiteOrigin Editor + `[button]` CTAs (Consultation → Contact, View Our Work → Projects)  
4. **Recent Projects** — `PW_Portfolio_Grid` with `posts_per_page=3`, grid layout, CTA card → `/project-details/`  
5. **Contracting Services** — six `PW_Featured_Page` cards (2×3) for existing Services pages  
6. **Estimate CTA** — `PW_Call_To_Action` → Contact  
7. **Footer** — existing footer widgets (no redesign)

Removed from Home: ACF image slider/jumbotron, Latest News, Commitment & Standards, Testimonials.

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

## How to edit

1. Start **vartanian-localhost** in Local.  
2. WP Admin → **Pages → Home** → SiteOrigin Page Builder.  
3. Menus: **Appearance → Menus** (Projects label).  
4. Slides: edit Home → ACF **slides** (keep empty to hide the carousel).

## Limits (StructurePress / SiteOrigin)

- Portfolio Grid uses a 4-up column grid; three items leave an empty slot (or use slider layout).  
- “View all” is the Portfolio Grid CTA card (`add_cta=yes`), not a dedicated archive field.  
- No theme PHP was added for a contact strip; it is a SiteOrigin row.

## Deploy note

Pushing this Git branch does **not** update GoDaddy. Homepage layout must be redeployed via database/content migration (or rebuilt in hosted WP Admin) when you choose to go live.
