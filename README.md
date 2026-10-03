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
