# Siddhartha Chaturvedi - Portfolio Webapp

Modern React-based portfolio website converted from plain HTML while preserving the exact design and content.

## Quick Start

### Development
```bash
npm install
npm run dev
```
Visit http://localhost:3000

### Production Build
```bash
npm run build
```
Output in `dist/` folder

### Preview Build
```bash
npm run preview
```

## Features

### Preserved from Original
- Exact same design and styling
- All content unchanged
- Theme toggle (light/dark mode)
- Mobile-responsive navigation
- Smooth scroll navigation
- Venture screenshot previews
- All accessibility features

### New Benefits
- Component-based architecture
- Fast Hot Module Replacement (HMR)
- Optimized production builds
- Modern development workflow
- Easy to maintain and update
- Better code organization

## Project Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # React entry point
├── styles.css           # Original CSS (unchanged)
├── components/          # React components
│   ├── Navigation.jsx   # Top navigation with theme toggle
│   ├── Hero.jsx         # Hero section with profile
│   ├── About.jsx        # About section
│   ├── Recognition.jsx  # Recognition cards
│   ├── Ventures.jsx     # Venture showcase
│   ├── Current.jsx      # Current work section
│   └── Connect.jsx      # Contact section
└── hooks/
    └── useScrollSpy.js  # Custom scroll spy hook
```

## Technology Stack

- React 19.2.0
- Vite 7.2.4
- Plain CSS (no preprocessors)
- Modern JavaScript (ES6+)

## Backup

Complete backup of original HTML version available at:
`/tmp/cc-agent/60724403/backup/`

To restore original:
```bash
cp -r /tmp/cc-agent/60724403/backup/* ./
```

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions for:
- GitHub Pages
- Netlify
- Vercel
- Static hosting services

## Migration Details

See `MIGRATION.md` for complete migration documentation.

## Performance

Build output:
- CSS: 28.54 KB (gzipped: 5.32 KB)
- JavaScript: 207.33 KB (gzipped: 64.66 KB)
- Build time: ~2.3s

## License

ISC

