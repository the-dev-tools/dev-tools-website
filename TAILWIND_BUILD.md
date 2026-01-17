# Building Tailwind CSS

This project uses a custom Tailwind CSS build to optimize performance. Follow these steps when you need to rebuild the CSS after making changes to the HTML.

## When to Rebuild

Rebuild Tailwind CSS when:
- You add new Tailwind classes to `public/index.html`
- You update custom colors or theme settings
- You want to optimize the CSS bundle

## Prerequisites

None! The Tailwind CLI is downloaded automatically.

## Build Steps

### Option 1: Quick Build (Recommended)

```bash
# Download Tailwind CLI (if not already present)
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64

# Build production CSS
./tailwindcss-macos-arm64 -i tailwind-input.css -o public/assets/tailwind.css --minify

# Clean up
rm tailwindcss-macos-arm64
```

### Option 2: One-Liner

```bash
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64 && chmod +x tailwindcss-macos-arm64 && ./tailwindcss-macos-arm64 -i tailwind-input.css -o public/assets/tailwind.css --minify && rm tailwindcss-macos-arm64
```

## Configuration Files

### `tailwind-input.css`

This is your source file that defines the custom theme:

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui;
  --font-mono: 'JetBrains Mono', ui-monospace;

  --color-ink-900: #090510;
  --color-ink-700: #1f1633;
  --color-ink-500: #5c4d91;
  --color-ink-400: #8f7dfa;
  --color-neon: #4de1ff;
}

@layer base {
  body {
    font-family: var(--font-sans);
  }
  html, body {
    overflow-x: hidden;
  }
}
```

### `tailwind.config.js`

This config file defines which files to scan for Tailwind classes:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace']
      },
      colors: {
        ink: {
          900: '#090510',
          700: '#1f1633',
          500: '#5c4d91',
          400: '#8f7dfa'
        },
        neon: '#4de1ff'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
```

## Adding New Colors or Fonts

To add new custom colors or fonts:

1. Edit `tailwind-input.css` and add your theme variables:

```css
@theme {
  --color-your-color: #hexcode;
}
```

2. Rebuild the CSS using the command above

3. Use in HTML:

```html
<div class="bg-your-color text-your-color"></div>
```

## Output

The build creates `public/assets/tailwind.css` (~100KB minified) which includes:
- All Tailwind utility classes used in your HTML
- Custom theme colors (ink-*, neon)
- Custom fonts (Inter, JetBrains Mono)
- Base styles for body and html

## Troubleshooting

### "Command not found" error

Make sure you're using the correct binary for your platform:
- macOS ARM: `tailwindcss-macos-arm64`
- macOS Intel: `tailwindcss-macos-x64`
- Linux: `tailwindcss-linux-x64`
- Windows: `tailwindcss-windows-x64.exe`

### Styles not updating

1. Make sure you're editing `public/index.html` (not a cached version)
2. Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)
3. Check that `public/assets/tailwind.css` was actually updated:
   ```bash
   ls -lh public/assets/tailwind.css
   ```

### Missing custom colors

If your custom colors (like `neon` or `ink-*`) aren't working:
1. Check that `tailwind-input.css` has the correct `@theme` block
2. Rebuild the CSS
3. Verify the colors are in the output:
   ```bash
   grep "4de1ff" public/assets/tailwind.css
   ```

## Performance Note

The built CSS file is:
- **100KB** minified
- Non-blocking (loaded as CSS, not JavaScript)
- Cached for 1 year (immutable)
- Much faster than CDN + runtime generation

This is why we use a build step instead of the Tailwind CDN.
