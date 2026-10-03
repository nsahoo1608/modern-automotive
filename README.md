# Rashmi Ranjan Fin Solution

Dynamic vehicle and equipment finance website built with Next.js and React.

## Pages

- `/`: cinematic rotating hero, global brand marquee, category cards and interactive EMI calculator.
- `/vehicles`: searchable model catalogue with variant details, published prices and finance handoff.
- `/brands`: global brand directory with parent company, group and joint venture references.
- `/apply`: vehicle finance application with optional address lookup, validation and email delivery.

All pages render dynamically. Images in `public/images/*.webp` are original generated illustrative artwork; they do not represent inventory, staff, or a specific manufacturer model. Model images supplied by catalogue adapters remain separate.

## Local development

Run `npm ci`, then `npm run dev`. Use `npm run build` and `npm run start` to check production behavior.

## Production configuration

The finance application uses `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM`, and `MAIL_TO`. Optional address lookup uses OpenStreetMap Nominatim and has a manual address-entry fallback; it does not require a Google Maps key. The local database URL is a placeholder and database persistence is not enabled. Store credentials only in local environment files or encrypted hosting environment variables. Never commit them.

## Brands and source coverage

The directory combines the existing manufacturer references with a global registry. Every registered brand has an adapter. Established model adapters supply their catalogue; directory adapters supply only official brand references and never invent models, images, or prices. Honda uses its official price synchronization flow. Source failures are exposed as partial coverage in the UI, and independent manufacturer ownership that has not been verified is labelled accordingly.

Group, parent-company and joint-venture evidence links are stored beside each relationship in `lib/vehicle-data/global-brands.ts`. Reviewed on 3 October 2026. This is a broad maintained directory, not a claim to enumerate every automotive company worldwide.

## Saving and publishing

The GitHub repository `nsahoo1608/modern-automotive` is linked to Vercel project `rashmiranjan-fin`. Commits pushed to the production branch trigger Vercel deployments through that integration. GitHub Actions also builds pushes and pull requests. Local file edits still need to be committed and pushed; the website does not automatically upload arbitrary local edits or credentials.

## Second-hand marketplace

- `/second-hand` shows administrator-approved listings; `/second-hand/sell` accepts seller details and 1–8 photographs.
- A private Vercel Blob store holds listings, processed photos, buyer enquiries and administrator sessions. Set `BLOB_READ_WRITE_TOKEN` through the linked project storage connection. Never expose this variable to the client.
- Public responses explicitly include vehicle details, city/district and photo routes. Seller contact details and exact address are stored separately and returned only by the authenticated administrator endpoint. Photos have metadata removed and require privacy review before publication.
- `/second-hand/admin` sends a ten-minute, one-time code to the existing `MAIL_TO` administrator mailbox. Sign-in creates an eight-hour HttpOnly session. There is no public administrator registration. SMTP variables must be configured.
- The administrator approves or hides listings, marks vehicles reserved/sold, sets an optional RRFIN offer price and edits the monthly promotion banner. Reduced-motion visitors see a static banner.
- Buyers can submit a price offer, request an inspection or discuss finance. Enquiries are private to the administrator. Payments and ownership transfer are currently coordinated outside checkout; no payment gateway or escrow is connected.
- Initial marketplace verification covered submission, moderation, private photographs, public field filtering, authenticated administration, buyer offers and sold-state rejection using disposable fictitious records. Production build and targeted lint passed.

## In-form manufacturer connection and contact enquiries

- `/api/vehicle-catalogue` loads manufacturer model lists on demand and enriches selected models with manufacturer images and specification/trim tables. Toyota and Hyundai have verified navigation adapters; other registered brands use supported vehicle/model navigation patterns. Blocked pages or unsupported layouts are reported in the form. Full global model/variant coverage is not yet available.
- The application no longer redirects customers to manufacturer websites. Selected manufacturer configuration details accompany the finance email. Interactive 3D and 360-degree controls require actual manufacturer GLB files or a published rotation-frame sequence; ordinary vehicle photos are not labelled as 3D.
- `/contact` accepts customer enquiries, generates `RRFIN-date-random` references and saves messages privately in the connected Blob store. Company inbox notifications use the configured SMTP mailbox. The authenticated administrator also sees saved enquiries and notification failures.
- `node --test tests/contact-route.test.cjs` verifies the actual contact handler's reference, private persistence, notification, validation and failure handling with isolated service doubles. It sends no external email.
- Every page shares the Made in India / AppleInfotech footer credit.
