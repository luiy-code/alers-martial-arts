# Alers Martial Arts — Website Project Notes
Created: June 29, 2026

---

## Live URLs

| Environment | URL |
|---|---|
| **Vercel (public)** | https://alers-martial-arts.vercel.app |
| **GitHub Pages** | https://luiy-code.github.io/alers-martial-arts/ |
| **Local preview** | http://localhost:3000 |
| **GitHub repo** | https://github.com/luiy-code/alers-martial-arts |
| **Vercel dashboard** | https://vercel.com/aldanaluis295-3812/alers-martial-arts |

---

## Project Files

All files live at: `C:\Users\Luis\Downloads\alers-martial-arts\`

| File | Description |
|---|---|
| `index.html` | Full site — all 6 sections in one page |
| `style.css` | Dark theme styles (black / red #c0392b / gold #f0a500) |
| `script.js` | Nav, mobile menu, scroll animations, form validation |
| `logo.png` | AMA mascot logo (white background removed, transparent PNG) |

---

## Gym Info

- **Name:** Alers Martial Arts (AMA)
- **Address:** 911 NW 209th Ave, Suite 108, Pembroke Pines, FL 33029
- **Phone:** 954-303-0527
- **Email:** MMAPines@gmail.com
- **Award:** Best of Pembroke Pines 2023
- **Specialties:** Brazilian Jiu-Jitsu, MMA, Kickboxing — Kids, Teens, Adults

## Coaches

| Name | Role |
|---|---|
| Jim "The Beast" Alers | Head Coach — BJJ Black Belt, 20 pro MMA fights, 4-1 Bare Knuckle, UCF grad |
| Melisa Alers | Co-Coach |
| Victor Arevalo | Coach |

---

## Color Palette

| Role | Hex |
|---|---|
| Background | `#0a0a0a` |
| Accent Red | `#c0392b` |
| Highlight Gold | `#f0a500` |
| Text | `#ffffff` |
| Fonts | Bebas Neue (headings), Inter (body) |

---

## Weekly Class Schedule (Pembroke Pines)

### Monday
- 10:00 AM — Adult MMA Drills
- 4:00 PM — Youth Jiu-Jitsu Age 4–6
- 4:00 PM — Youth Jiu-Jitsu Age 7–12
- 5:00 PM — Youth Jiu-Jitsu Age 7–12
- 6:00 PM — Adult No-Gi Jiu-Jitsu Fundamentals
- 6:00 PM — Wrestling
- 7:00 PM — Adult Gi Jiu-Jitsu
- 7:00 PM — Adult Kickboxing
- 8:00 PM — Boxing

### Tuesday
- 6:00 AM — Adult All Levels No-Gi Jiu-Jitsu
- 10:00 AM — Adult All Levels No-Gi Jiu-Jitsu
- 11:00 AM — Adult Kickboxing
- 4:00 PM — Youth Kickboxing Age 4–6
- 5:00 PM — Youth Kickboxing Age 7–12
- 6:00 PM — Adult Kickboxing
- 6:00 PM — Teens Self Defense
- 7:00 PM — Adult All Levels No-Gi Jiu-Jitsu

### Wednesday
- 6:00 AM — Adult All Levels No-Gi Jiu-Jitsu
- 10:00 AM — Wrestling
- 4:00 PM — Youth Jiu-Jitsu Age 4–6
- 4:00 PM — Youth Jiu-Jitsu Age 7–12
- 5:00 PM — Youth Jiu-Jitsu Age 7–12
- 6:00 PM — Adult Gi Jiu-Jitsu
- 6:00 PM — Adult Kickboxing
- 7:00 PM — Adult No-Gi Jiu-Jitsu Fundamentals
- 7:00 PM — Boxing
- 8:00 PM — Adult MMA Drills

### Thursday
- 6:00 AM — Adult All Levels No-Gi Jiu-Jitsu
- 10:00 AM — Adult All Levels No-Gi Jiu-Jitsu
- 11:00 AM — Adult Kickboxing
- 4:00 PM — Youth Kickboxing Age 4–6
- 5:00 PM — Youth Kickboxing Age 7–12
- 6:00 PM — Adult Kickboxing
- 6:00 PM — Teens Self Defense
- 7:00 PM — Adult All Levels No-Gi Jiu-Jitsu

### Friday
- 5:30 PM — Youth MMA
- 6:30 PM — Adult MMA Drills

### Saturday
- 10:00 AM — Adult No-Gi Jiu-Jitsu Fundamentals
- 11:00 AM — Open Mat

---

## Deployment

### GitHub
- **Repo:** `luiy-code/alers-martial-arts`
- **Branch:** `main`
- **GitHub Pages:** enabled (root of main branch)
- To push an update: commit changes and `git push origin main`

### Vercel
- **Project:** `alers-martial-arts`
- **Account:** `aldanaluis295-3812`
- **Auto-deploy:** connect GitHub repo in Vercel dashboard under Settings > Git
- To manually redeploy: ask Claude Code to redeploy using the Vercel API

---

## How to Update the Site

1. Edit `index.html`, `style.css`, or `script.js` in the project folder
2. Open terminal in `C:\Users\Luis\Downloads\alers-martial-arts\`
3. Run:
   ```
   git add -A
   git commit -m "describe your change"
   git push origin main
   ```
4. Vercel redeploys automatically (once GitHub sync is connected) or ask Claude Code to push a new deployment

---

## Sections in index.html

| Section | ID | Description |
|---|---|---|
| Navigation | `#home` | Sticky nav, logo, mobile menu, Free Trial CTA |
| Hero | `#home` | Full-width headline, stats bar, award badge |
| Disciplines | `#programs` | BJJ, MMA, Kickboxing, Youth cards |
| About | `#about` | Gym philosophy, credentials, award badge |
| Testimonials | — | 3 reviews + Google 4.9 rating block |
| Coaches | `#coaches` | Jim Alers featured + Melisa + Victor |
| Programs | `#programs` | 5 program cards with sign-up CTAs |
| Schedule | `#schedule` | Pembroke Pines + Miramar tab panels |
| Pricing | `#pricing` | 3 tiers: Drop-In / Monthly / Family |
| Gallery | `#gallery` | Photo/video grid with play modal |
| Contact | `#contact` | Form, Google Map embed, social links |
| Footer | — | Logo, links, address, copyright |

---

## To-Do / Next Steps

- [ ] Add real coach photos (replace placeholder divs with `<img>` tags)
- [ ] Add real gym/action photos to gallery
- [ ] Connect Vercel to GitHub repo for auto-deploy (Settings > Git in dashboard)
- [ ] Add a custom domain (e.g. alersmartialarts.com) in Vercel dashboard
- [ ] Connect contact form to a backend (Formspree, EmailJS, etc.)
- [ ] Embed real Instagram feed
