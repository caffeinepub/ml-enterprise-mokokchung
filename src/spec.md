# Specification

## Summary
**Goal:** Make the header’s left-side brand/logo block (“ML Enterprise” / “Mokokchung”) render at a more appropriate, clearly visible size on both mobile and desktop without breaking the header layout.

**Planned changes:**
- Update the sizing (typography scale) and spacing of the header brand block in `frontend/src/components/site/SiteHeader.tsx`.
- Ensure the header height, nav alignment, and mobile menu button remain vertically centered and do not overlap the resized brand block.
- Preserve existing brand block behavior: clicking/tapping scrolls smoothly to `#home` and closes the mobile menu sheet if open.

**User-visible outcome:** The header brand (“ML Enterprise” / “Mokokchung”) appears at a more readable size on mobile and desktop, while the header layout and interactions remain unchanged.
