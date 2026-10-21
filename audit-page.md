# Profile page audit

Reviewed `index.html`, `style.css`, and `script.js` in a local browser at `http://127.0.0.1:8765/`.

## Requirements

| Requirement | Result |
| --- | --- |
| HTML in `index.html` | Pass |
| All styling in `style.css` (no inline `style` attributes) | Pass |
| JavaScript in `script.js` | Pass |
| Page title | Pass — `PLACEHOLDER: Your Name — Profile` |
| One main heading (`h1`) | Pass |
| About section | Pass |
| Skills as a list | Pass — five `li` items |
| Projects with links | Pass — three linked projects plus descriptions |
| Unknown details marked `PLACEHOLDER` | Pass — search the HTML for `PLACEHOLDER` |

## What works in the browser

- The title, heading, About, Skills, and Projects sections all render.
- In-page nav updates the hash (`#skills`, `#projects`) and scrolls to the matching section.
- Project links point at `https://example.com/PLACEHOLDER-project-*` (replace these with real URLs).
- The contact mailto uses `PLACEHOLDER@example.com`.
- Theme toggle switches light and dark, updates the button label, and sets `aria-pressed`.
- The footer year is filled by JavaScript (2026 at review time).
- Layout stays readable on a ~390px-wide mobile viewport; cards wrap without horizontal overflow.

## Structure and accessibility

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Sections are labelled (`aria-labelledby` on About, Skills, and Projects).
- One `h1`; section titles are `h2`.
- Theme button is a real `button` with `aria-pressed`.

## Gaps to fix when you replace placeholders

- Content is still generic. Replace every `PLACEHOLDER` string (name, tagline, about copy, skills, project titles, project URLs, email).
- Project links currently go to example.com, not your work.
- Dark theme preference is stored in `localStorage` under `profile-theme`; that is expected, not a bug.
- There is no skip link, portrait, or social links. Add those only if you want them.

## How to find placeholders

In the repo, search for `PLACEHOLDER`. All unknown personal details live in `index.html`.
