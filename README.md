# Kunal Tiwari: portfolio

Live: https://kunalt96.github.io/kunals_portfolio/

A dark, animated portfolio built with React 19, Vite, Tailwind CSS 3 and Framer Motion.

## Highlights

- **Generative hero.** A canvas flow field that bends around the pointer. It pauses off-screen and renders a still frame for visitors who prefer reduced motion.
- **Kinetic name.** The headline is set in a variable font (Bricolage Grotesque); letters swell in weight and width near the cursor, with an idle wave for touch screens.
- **Scroll-drawn experience timeline** and seeded, generative project artwork.
- Accessible by default: skip link, visible focus, keyboard-friendly carousel and menu, `prefers-reduced-motion` respected.

## Edit the content

Everything lives in `src/data/portfolioData.json`: bio, toolbox, experience, testimonials and projects. Add your resume by setting `personal.resumeLink`; the hero button appears automatically.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run deploy   # publish to GitHub Pages
```
