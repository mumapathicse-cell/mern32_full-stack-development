---
name: program-header-footer-navigation
description: "Build or improve a polished program website shell with a responsive header, navigation bar, and footer. Use for HTML, JSX, React, or Tailwind pages that need semantic navigation, active links, mobile behavior, accessibility, and consistent page structure."
argument-hint: "Describe the program, brand, pages, and visual direction for the header and footer"
user-invocable: true
---

# Program Header, Navigation, And Footer

## Purpose

Create a reusable page shell for a program website. The result should make the program identity clear, help visitors reach the main destinations quickly, and close the page with useful secondary links and contact information.

## Before Editing

1. Inspect the existing page, entry point, styling system, and routing approach.
2. Preserve the project stack and visual language. Reuse existing components, utility classes, fonts, icons, and design tokens when available.
3. Identify the program name, primary destinations, primary call to action, contact details, social links, legal links, and any required language or theme controls.
4. Decide whether navigation is static HTML, framework links, or client-side routing. Do not invent routes that the application cannot serve.

## Structure To Produce

Use a semantic site shell:

- `header` contains the brand link and the primary navigation.
- `nav` has an accessible label and contains links to real destinations.
- The main content remains outside the shell and is not rewritten unnecessarily.
- `footer` contains a compact summary, useful grouped links, contact details, social links where relevant, and a copyright/legal row.
- Use one consistent content width and alignment system across header, main content, and footer.

## Header And Navigation

1. Make the brand or program name the most stable link and point it to the home route.
2. Keep the primary navigation short and ordered by user importance. Prefer four to six top-level destinations.
3. Add one visually distinct primary action only when the program has a clear conversion or participation goal.
4. Use real buttons for actions and links for navigation. Never use a clickable `div` for either.
5. Mark the current destination with `aria-current="page"` and a visible active style. Do not rely on color alone.
6. Give icon-only controls an accessible name and a tooltip when the icon is not universally familiar.
7. On small screens, use a real menu button with `aria-expanded` and `aria-controls`. Keep the mobile menu keyboard reachable and close it predictably after navigation.
8. Preserve a stable header height so content does not jump when links, focus rings, or the mobile menu appear.
9. Use a sticky header only when it improves repeated navigation; keep it visually distinct from the page content and avoid covering anchored sections.

## Footer

1. Repeat the program identity in a smaller, quieter form so the page still has context at its end.
2. Group secondary links by purpose, such as Program, Resources, Support, and Legal. Keep labels concise and destinations valid.
3. Include contact or support details only when they are available and current. Use `mailto:` and `tel:` links where appropriate.
4. Use descriptive accessible names for social links and external links. Indicate a new tab only when the implementation actually opens one.
5. Keep legal and copyright information readable, current, and visually secondary.
6. Make columns collapse cleanly on narrow screens. Never let long labels overflow or overlap.

## Visual And Interaction Quality

- Establish CSS variables or reuse the existing design tokens for color, spacing, borders, and focus states.
- Use a clear visual hierarchy: brand, primary destinations, primary action, then secondary information.
- Keep card and button shapes consistent with the existing application; do not add decorative nested cards.
- Provide visible `:focus-visible` styles with sufficient contrast.
- Ensure text remains readable against the background and links are distinguishable without hover.
- Use icons from the project’s existing icon library when one exists instead of drawing replacement SVG icons.
- Add only purposeful motion, such as a restrained mobile-menu transition, and respect `prefers-reduced-motion`.
- Verify the shell at mobile and desktop widths. Long program names, translated labels, and zoomed text must not break the layout.

## Implementation Notes

For React or JSX:

- Use `className`, not `classname`.
- Keep navigation data centralized when several links share the same rendering logic.
- Derive the active state from the router or current location rather than hard-coding it for every page.
- Use stable keys for mapped navigation and footer links.
- Keep menu state local to the shell unless another component genuinely owns it.

For plain HTML:

- Use semantic elements and valid attributes.
- Use progressive enhancement: the page should remain understandable if the menu script is unavailable.
- Avoid placeholder `href="#"` values in finished navigation.

## Validation Checklist

Before finishing, check:

- The page has exactly one primary `nav` landmark with an accessible label.
- Every navigation link points to a valid route or a real section anchor.
- The current page is visibly and programmatically identified.
- The mobile menu opens, closes, and remains keyboard accessible.
- Keyboard focus is visible for every interactive element.
- Header, content, and footer align to the same responsive container.
- No text, links, icons, or focus rings overlap at narrow widths or increased text size.
- External, email, phone, and social links behave as intended.
- The implementation passes the project’s available typecheck, lint, build, or browser smoke check.

## Completion Criteria

The task is complete when the page has a coherent responsive shell, the navigation supports the main user journeys, the footer provides useful secondary destinations, accessibility states are implemented, and validation finds no new errors in the touched files.
