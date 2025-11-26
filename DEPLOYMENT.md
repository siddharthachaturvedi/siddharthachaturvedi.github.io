# Deployment Guide

## Production Build
The project has been successfully built for production. The optimized files are in the `dist/` directory.

## Build Output
```
dist/
├── index.html          # Main HTML file
├── sidc.jpeg          # Profile image
├── resume.pdf         # Resume PDF
└── assets/
    ├── index-DmJgaacG.js      # Bundled JavaScript (207 KB)
    └── index-IcCThued.css     # Bundled CSS (28.5 KB)
```

## Deployment Options

### 1. GitHub Pages (Recommended)
The existing GitHub Actions workflow will continue to work. Update `.github/workflows/static.yml` to deploy the `dist` folder:

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: 'dist'
```

### 2. Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### 3. Vercel
1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### 4. Static Hosting
Simply upload the contents of the `dist/` folder to any static hosting service:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Cloudflare Pages

## Environment Variables
No environment variables are required for the basic deployment.

## Custom Domain
Configure your custom domain through your hosting provider's DNS settings.

## Testing Locally
```bash
npm run preview
```
This will serve the production build locally for testing.

## Performance
- Lighthouse score should remain high (90+)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- All assets are optimized and minified

