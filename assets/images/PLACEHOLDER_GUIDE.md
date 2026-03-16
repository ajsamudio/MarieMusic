# Image Placeholders Guide

Replace each placeholder with a real image file and update the `src` attribute in `index.html` to match.

## Folder Structure

```
assets/
├── images/
│   ├── hero/
│   │   └── hero-bg.jpg        — Optional hero background (1920 × 600 px recommended)
│   ├── gallery/
│   │   ├── photo-1.jpg        — About section gallery image 1  (600 × 400 px)
│   │   ├── photo-2.jpg        — About section gallery image 2  (600 × 400 px)
│   │   └── photo-3.jpg        — About section gallery image 3  (600 × 400 px)
│   └── faculty/
│       ├── faculty-1.jpg      — Faculty member 1 headshot  (150 × 150 px, square)
│       ├── faculty-2.jpg      — Faculty member 2 headshot  (150 × 150 px, square)
│       └── faculty-3.jpg      — Faculty member 3 headshot  (150 × 150 px, square)
└── icons/
    ├── instagram.svg
    ├── threads.svg
    ├── youtube.svg
    ├── facebook.svg
    └── twitter.svg
```

## How to Use Gallery Photos (index.html)

Find the `.photo-placeholder` div and replace it with:

```html
<img src="assets/images/gallery/photo-1.jpg" alt="Description of photo" />
```

## How to Use Faculty Photos

Find the `.faculty-photo-placeholder` div and replace it with:

```html
<img src="assets/images/faculty/faculty-1.jpg" alt="Faculty Member Name" />
```

## Social Icons

Drop any SVG icon files into `assets/icons/`. Free icon sets:
- https://simpleicons.org (brand icons)
- https://heroicons.com (UI icons)
