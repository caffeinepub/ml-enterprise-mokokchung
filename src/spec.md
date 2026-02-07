# Specification

## Summary
**Goal:** Update the site’s Contact section and footer to show ML Enterprise’s correct address, phone number, and email.

**Planned changes:**
- Replace placeholder contact details in `frontend/src/components/site/sections/ContactSection.tsx` with:
  - Address: "Tongdentsuyong Ward, A.M Road, Mokokchung, Nagaland 798601"
  - Phone: "9366012115"
  - Email: "mlenterprisemkg@gmail.com"
- Update `frontend/src/components/site/SiteFooter.tsx` contact details to match the same address, phone, and email.
- Ensure footer layout remains responsive (no overflow on mobile widths) and keep Business Hours unchanged.

**User-visible outcome:** Visitors see the correct ML Enterprise address, phone number, and email consistently in both the Contact section and the site footer.
