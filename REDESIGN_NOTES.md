# Website Redesign - Computational Minimalism

## Design Philosophy: John Maeda

Following John Maeda's computational minimalism principles:
- Simplicity as the ultimate sophistication
- Data visualization as art
- Purposeful use of negative space
- Clean, monochromatic foundation
- Single accent color (#00FF94)
- Typography as hierarchy

## Key Changes

### 1. Removed Light Mode
- Pure dark mode only (black background)
- Monochromatic grayscale palette
- Single accent color for focus

### 2. Redesigned Hero Section
- Removed profile photo (content over aesthetics)
- Simplified identity presentation
- Name as gradient (white to gray)
- Centered, minimal layout

### 3. Value Function as Centerpiece
- Three-column triad layout (Resonance, Relevance, Response)
- Each node contains:
  - Label + Sublabel
  - Question prompt
  - Anchor description
  - Transformation arrow (from → to)
- Interactive hover states with glow
- Executive Directive callout box
- Key Insights numbered grid

### 4. Simplified Color System
```
Black:   #000000 (background)
White:   #FFFFFF (primary text)
Gray 1:  #1A1A1A (elevated surfaces)
Gray 2:  #333333 (borders)
Gray 3:  #666666 (secondary text)
Gray 4:  #999999 (tertiary text)
Accent:  #00FF94 (primary interactions)
```

### 5. Typography
- Display: Space Grotesk (600-700 weight)
- Body: Inter (400-700 weight)
- Mono: JetBrains Mono (code/labels)

### 6. Interaction Design
- 600ms easing transitions (cubic-bezier)
- Hover states on triad nodes
- Click to lock active state
- Scroll-triggered fade-in animations
- Mobile-optimized touch targets

### 7. Removed Elements
- Theme toggle
- Profile photo
- Old SVG triangle visualization
- Cyberpunk effects
- Multiple accent colors
- Light theme code

## Content Structure

### Hero
- Name + Tagline
- **Value Function** (main focus)
  - Triad of Alignment
  - Executive Directive
  - Key Insights (4 numbered points)
- CTAs (Writing + LinkedIn)

### About
- Background text
- Fast Company recognition
- INSEAD quote

### Current Focus
- 3 focus areas (left column)
- Advisory sidebar (sticky, right column)

### Connect
- LinkedIn + Writing links
- Location

## Technical Stack

- Pure HTML/CSS/JS (no frameworks)
- CSS Custom Properties
- IntersectionObserver API
- Semantic HTML5
- ARIA accessibility attributes
- Mobile-first responsive

## Performance

- No external dependencies
- < 700 lines CSS (from 1400+)
- < 160 lines JS (from 260+)
- Single accent color = smaller file
- Optimized transitions

## Responsive Breakpoints

- Mobile: < 768px (single column, stacked triad)
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

**Result:** A minimalist, data-centric design that puts the Value Function concept front and center, embodying John Maeda's philosophy of simplicity and computational elegance.
