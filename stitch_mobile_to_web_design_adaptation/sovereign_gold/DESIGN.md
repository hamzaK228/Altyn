---
name: Sovereign Gold
colors:
  surface: '#fff8f1'
  surface-dim: '#e4d9c5'
  surface-bright: '#fff8f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fef2de'
  surface-container: '#f8ecd8'
  surface-container-high: '#f3e7d3'
  surface-container-highest: '#ede1cd'
  on-surface: '#201b0f'
  on-surface-variant: '#524438'
  inverse-surface: '#363022'
  inverse-on-surface: '#fbefdb'
  outline: '#847467'
  outline-variant: '#d6c3b3'
  surface-tint: '#88520e'
  primary: '#663a00'
  on-primary: '#ffffff'
  primary-container: '#854f0b'
  on-primary-container: '#ffca99'
  inverse-primary: '#ffb870'
  secondary: '#855400'
  on-secondary: '#ffffff'
  secondary-container: '#fcaa33'
  on-secondary-container: '#6b4200'
  tertiary: '#3f4552'
  on-tertiary: '#ffffff'
  tertiary-container: '#565c6a'
  on-tertiary-container: '#cfd5e5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcbe'
  primary-fixed-dim: '#ffb870'
  on-primary-fixed: '#2d1600'
  on-primary-fixed-variant: '#693c00'
  secondary-fixed: '#ffddb7'
  secondary-fixed-dim: '#ffb95d'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#dde2f3'
  tertiary-fixed-dim: '#c1c6d7'
  on-tertiary-fixed: '#161c27'
  on-tertiary-fixed-variant: '#414754'
  background: '#fff8f1'
  on-background: '#201b0f'
  surface-variant: '#ede1cd'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style

The design system is built upon the "Sovereign Wealth" narrative, blending the immovable stability of a state treasury with the fluid precision of modern fintech. It aims to evoke a sense of security, heritage, and elite access.

The aesthetic leans into **Corporate Modern with Tactile accents**. It utilizes a "light and airy" foundation to ensure financial data remains legible and non-intimidating, while using rich metallic tones and deep contrasts to signify the physical value of gold. The interface should feel like a digital vault: secure, high-end, and meticulously organized.

## Colors

This design system uses a curated palette that balances warmth and institutional authority:

*   **Primary (Rich Gold):** Used for primary branding, high-level accents, and states signifying value. 
*   **Secondary (Bright Amber):** Reserved for interactive highlights, call-to-action buttons, and data visualization points that require attention.
*   **Tertiary (Deep Navy/Charcoal):** The anchor for typography and structural elements, providing a professional "ink" contrast against light backgrounds.
*   **Surface (Cream & White):** Backgrounds utilize a layered approach where the primary page is White, and "Surface Containers" (cards, sidebars) use the Cream (#FAEEDA) to provide a soft, premium texture.

## Typography

The choice of **Hanken Grotesk** provides a sharp, contemporary edge that suggests technical competence. 

*   **Financial Figures:** Large numerical data should use `headline-lg` or `display-lg` with a slightly tighter letter-spacing to emphasize solidity.
*   **Hierarchy:** Use the Tertiary Navy for all headlines to maintain a strong visual anchor. Primary Gold should be used sparingly for specific labels or "Member-only" indicators.
*   **Legibility:** Line heights are intentionally generous to support the "airy" feel and improve readability of complex financial disclosures.

## Layout & Spacing

This design system utilizes a **Fixed 12-Column Grid** for desktop to project an image of stability and architectural order. 

*   **Rhythm:** An 8px linear scale governs all spacing.
*   **Whitespace:** Generous top/bottom padding (Section Gaps) separates key information blocks, preventing the dense "spreadsheet" look common in lower-end financial tools.
*   **Responsive Behavior:** On mobile, the grid collapses to a single column with 20px side margins, while desktop maintains a centered 1280px container to ensure readability on ultrawide monitors.

## Elevation & Depth

To convey security and value, depth is handled through **Ambient Shadows and Tonal Layers**:

*   **The Foundation:** The lowest level is the White canvas. 
*   **The Container:** Secondary information sits on Cream-colored surfaces with no shadows but a fine 1px border (#E5E5E5).
*   **Interactive Cards:** Elements that can be clicked (like gold bar listings or market cards) feature a soft, multi-layered shadow with a subtle Primary Gold tint in the shadow color (e.g., `rgba(133, 79, 11, 0.08)`).
*   **Tactile Elements:** Buttons and active inputs should have a subtle inner-shadow when pressed to simulate a physical, mechanical response.

## Shapes

The shape language is **Conservative and Refined**. 

*   **Corner Radius:** A base radius of 4px (Soft) is applied to buttons, input fields, and small UI components. This is enough to feel modern without losing the "official" institutional feel of sharp corners.
*   **Containers:** Larger cards or modal windows may use up to 8px (`rounded-lg`) to soften the visual impact of large blocks of data.
*   **Icons:** Use "sharp" or "minimal-round" icon sets to match the precision of the typography.

## Components

### Buttons
*   **Primary:** Solid Rich Gold background with White text. Use a subtle gradient (top to bottom) from Bright Amber to Rich Gold for a "metallic" sheen.
*   **Secondary:** Deep Navy border (1px) with Navy text on a transparent or White background.

### Input Fields
*   Borders should be Charcoal at 20% opacity. When focused, the border transitions to Rich Gold with a 2px outer "glow" of the same color at low opacity.

### Financial Cards
*   Cards should use the Cream background to distinguish them from the main page. They should include a "Security Badge" or subtle watermark pattern in the background to reinforce the State Gold theme.

### Charts & Data
*   Use a palette of Amber and Navy for data series. Avoid high-vibrancy "neon" colors. Grid lines within charts should be extremely faint to maintain the "airy" aesthetic.

### Chips & Tags
*   Status tags (e.g., "Verified," "In Vault") should use a semi-transparent version of the Primary Gold with bold Navy text.