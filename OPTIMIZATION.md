# Website Optimization Guide

This document contains information about performance optimizations, accessibility features, and setup instructions for the personal website.

## Table of Contents

- [Performance Optimizations](#performance-optimizations)
- [SEO Setup](#seo-setup)
- [Accessibility Features](#accessibility-features)
- [Favicon Setup](#favicon-setup)
- [Image Optimization](#image-optimization)
- [Production Deployment](#production-deployment)

---

## Performance Optimizations

### CSS Optimizations

The current CSS is well-structured and uses modern best practices:

- **CSS Variables**: All colors, spacing, and design tokens are centralized
- **Mobile-first approach**: Base styles for mobile, progressive enhancement for larger screens
- **Efficient selectors**: BEM naming convention for flat specificity
- **GPU-accelerated animations**: Using `transform` and `opacity` for 60fps animations

### For Production Build

When deploying to production, implement these optimizations:

#### 1. Minify CSS

Use a build tool to minify CSS:

```bash
# Using cssnano with postcss
npm install --save-dev postcss cssnano
npx postcss styles.css -o styles.min.css --use cssnano
```

#### 2. Critical CSS

Extract above-the-fold CSS for faster initial render:

```bash
# Using critical
npm install --save-dev critical
critical index.html --base . --inline --minify
```

#### 3. JavaScript Optimization

The current JavaScript is already optimized:
- Uses Intersection Observer API (native browser API)
- requestAnimationFrame for scroll events
- Event delegation where appropriate
- No external dependencies

For production:
```bash
# Minify JavaScript
npm install --save-dev terser
npx terser main.js -o main.min.js -c -m
```

#### 4. Asset Compression

Enable gzip/brotli compression on your server:

**Nginx example:**
```nginx
gzip on;
gzip_types text/css application/javascript image/svg+xml;
gzip_min_length 1000;

# Or use Brotli for better compression
brotli on;
brotli_types text/css application/javascript image/svg+xml;
```

**Apache example (.htaccess):**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/css application/javascript
</IfModule>
```

---

## SEO Setup

### Update Meta Tags

Replace placeholder values in `index.html`:

1. **Update title and descriptions** (lines 8-12):
   - Replace "Your Name" with your actual name
   - Update description with your specific skills and focus

2. **Update Open Graph tags** (lines 14-21):
   - Replace `https://yourdomain.com/` with your actual URL
   - Create and upload `og-image.jpg` (1200x630px recommended)

3. **Update Twitter Card** (lines 23-29):
   - Replace `@yourusername` with your Twitter handle
   - Create and upload `twitter-image.jpg` (1200x600px recommended)

4. **Update Canonical URL** (line 42):
   - Replace with your actual domain

### Create Sitemap

Create `sitemap.xml` in the root directory:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Create robots.txt

Create `robots.txt` in the root directory:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Accessibility Features

The website includes comprehensive accessibility features:

### Implemented Features

✓ **Semantic HTML5**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
✓ **ARIA Labels**: All sections have `aria-labelledby` attributes
✓ **ARIA Roles**: `role="banner"`, `role="main"`, `role="navigation"`, `role="contentinfo"`
✓ **Skip to Content Link**: Keyboard users can skip navigation (Tab key on page load)
✓ **Focus Indicators**: Clear focus styles for keyboard navigation
✓ **Reduced Motion**: Respects `prefers-reduced-motion` system setting
✓ **Color Contrast**: All text meets WCAG AA standards (4.5:1 ratio minimum)
✓ **Alt Text Structure**: Image placeholders include guidance for descriptive alt text
✓ **External Link Indicators**: ARIA labels explain when links open in new tabs

### Testing Accessibility

Use these tools to verify accessibility:

1. **Lighthouse** (Chrome DevTools):
   - Open DevTools → Lighthouse → Run Accessibility Audit

2. **axe DevTools** (Browser Extension):
   - Install from Chrome/Firefox store
   - Run automated accessibility tests

3. **Keyboard Navigation Test**:
   - Tab through all interactive elements
   - Verify skip link appears on first Tab press
   - Ensure all elements have visible focus indicators

4. **Screen Reader Test**:
   - macOS: VoiceOver (Cmd+F5)
   - Windows: NVDA (free) or JAWS
   - Verify all content is announced properly

---

## Favicon Setup

### Generate Favicons

Use a favicon generator to create all required sizes:

**Recommended Tool**: [RealFaviconGenerator.net](https://realfavicongenerator.net/)

1. Create a source image (512x512px minimum, square)
2. Upload to RealFaviconGenerator
3. Download the generated package
4. Place files in the root directory:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180px)
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

### Manual Creation

If creating manually:

```bash
# Using ImageMagick
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 180x180 apple-touch-icon.png
convert logo.png -resize 192x192 android-chrome-192x192.png
convert logo.png -resize 512x512 android-chrome-512x512.png

# Create .ico file
convert favicon-32x32.png favicon-16x16.png favicon.ico
```

---

## Image Optimization

### Project Images

When adding project images, follow these guidelines:

#### 1. Optimize Image Sizes

```bash
# Using ImageMagick
convert original.jpg -resize 1200x675 -quality 85 project-1.jpg

# Or use modern formats
convert original.jpg -quality 85 project-1.webp
```

#### 2. Use Responsive Images

```html
<picture>
  <source srcset="project-1.webp" type="image/webp">
  <source srcset="project-1.jpg" type="image/jpeg">
  <img src="project-1.jpg" alt="Detailed description" loading="lazy">
</picture>
```

#### 3. Lazy Loading

Already implemented in the HTML image placeholders with `loading="lazy"`.

#### 4. Alt Text Best Practices

Good alt text examples:
- ✓ "Dashboard showing real-time analytics with bar charts and user metrics"
- ✓ "E-commerce checkout page with payment form and order summary"
- ✗ "Screenshot" (too vague)
- ✗ "project1.jpg" (filename, not descriptive)

### Image Size Recommendations

- **Project Screenshots**: 1200x675px (16:9 ratio)
- **Open Graph Image**: 1200x630px
- **Twitter Card Image**: 1200x600px
- **Favicon Source**: 512x512px (square)

---

## Production Deployment

### Pre-deployment Checklist

- [ ] Update all "Your Name" placeholders with real name
- [ ] Update all email/social media links
- [ ] Replace placeholder URLs with actual domain
- [ ] Generate and add favicon files
- [ ] Create and optimize project images with proper alt text
- [ ] Add newsletter embed code (Substack/Beehiiv)
- [ ] Minify CSS and JavaScript
- [ ] Create sitemap.xml and robots.txt
- [ ] Test with Lighthouse (aim for 90+ in all categories)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify responsive design on multiple devices
- [ ] Enable gzip/brotli compression on server
- [ ] Set up caching headers

### Caching Headers

Configure your server to cache static assets:

**Nginx:**
```nginx
location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|webp)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

### Performance Targets

Aim for these Lighthouse scores:
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 100

### Security Headers

Add security headers to your server:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self';" always;
```

---

## Additional Resources

- [Web.dev Performance Guide](https://web.dev/performance/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
