# Changelog

Dated log of redesign work on the Local Vartanian WordPress copy. Theme/file changes are tracked in Git; database-only changes are summarized here (and in related docs) because MySQL is not in the repo.

## 2026-11-16 — Home contact strip + hero padding

**Type:** Database (Local MySQL) — SiteOrigin Home `panels_data`

**Change:** Increased vertical padding ~25% twice on the contact strip and hook/hero rows. Current values: contact strip `46.875px`; hero `78.125px 0 46.875px` (from original `30px` / `50px 0 30px`).

## 2026-11-16 — Home estimate CTA background

**Type:** Database (Local MySQL) — SiteOrigin Home `panels_data`

**Change:** Set the “Ready to start your project?” / Get a Free Estimate row background to white (`#ffffff`) instead of gray (`#f2f2f2`).

## 2026-11-16 — Even footer columns + contact tweak

**Type:** Database (Local MySQL) — Customizer + widgets; theme CSS for contact lines

**Change:**
- Set Customizer `footer_widgets_layout` to `[6]` (two equal `col-md-6` parents).
- Kept only `text-3` (logo/blurb) and `text-4` (CONTACT US) in `footer-widgets`; moved `nav_menu-3` / `nav_menu-4` to inactive widgets.
- Updated CONTACT US text: removed `www.vartanianconstruction.com`; YouTube is icon + “YouTube” text link (existing channel URL unchanged).
- Each CONTACT US item wrapped in `.footer-contact-line` (`display: block; white-space: nowrap`) so location / phone / email / YouTube stay on their own lines when the column narrows (`style.css`).
- Extra horizontal padding on footer column parents (`.footer-top .row > [class*="col-"]`) so the two columns sit farther apart evenly.
- Copyright (`footer_right_txt`) moved into the **left** footer column bottom (flex + `margin-top: auto` on `.footer-top__copyright`).

**Deploy:** Theme `style.css` via SFTP/Git; widget/Customizer settings via DB migrate or reapply on GoDaddy.

## 2026-11-16 — Simplify site footer

**Type:** Theme (StructurePress PT)

**Files:**
- `wp-content/themes/structurepress-pt/footer.php`
- `wp-content/themes/structurepress-pt/style.css`

**Change:**
- Removed `footer-middle` (Visa/Mastercard and other card Font Awesome icons from Customizer `footer_center_txt`).
- Removed `footer-bottom` (gray bar with angled white “ears” and the white gap above it).
- Introduced `.footer-top__copyright` driven by Customizer `footer_right_txt` (live: `© 2016 Vartanian Construction. All rights reserved.`). Initially after the widget row; later moved into the **left** column (see “Even footer columns” above).
- Tightened `.footer-top` spacing (`margin-bottom: 0`, no bottom border gap for the old strips).

**Deploy:** Copy the updated theme files to GoDaddy (SFTP or migration). Customizer left/center footer text controls remain in the UI but are unused after this change.

## 2026-11-16 — Homepage outline (SiteOrigin)

**Type:** Database (Local MySQL) + docs

**Summary:** Restructured Home (page 11) to match the old template section order using existing widgets; cleared ACF slides; renamed nav **Project Details → Projects**. Details: [Homepage](homepage.md).
