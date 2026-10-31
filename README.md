# A celebration of love

A mobile-first wedding invitation built with Next.js App Router, TypeScript, Tailwind CSS, GSAP and Lucide. It exports to GitHub Pages. The content is configured in `lib/config.ts`; the couple photograph remains an editable placeholder.

## Personalize

1. Edit `lib/config.ts`: couple and parents' names, quotes, story, quiz prompts, events, venue names and exact Google Maps links. Leave unknown values empty; they are shown as “to be announced.” Do not put credentials in this file.
2. Put photographs in `public/photos/` and set their paths in the configuration, e.g. `/photos/couple.jpg`. Use your own optimized images; the interface shows labeled placeholders while paths are empty.
3. Enter each date as `YYYY-MM-DD` and each start and end time as `HH:mm` in 24-hour local time. End time is optional; if supplied, it must be later than start on the same day. With no end time, Apple entries omit the end and Google entries begin with a zero duration that guests can adjust. Overnight events should be adjusted before use. The default timezone is Asia/Kolkata. Calendar downloads use that configured timezone. Countdown currently assumes Asia/Kolkata.
4. The quiz uses the couple-provided answers in `lib/config.ts`. Set an answer to `null` to return to unscored demo mode. The comic panels are generated illustrations and can be replaced in the same configuration.
5. Sephora & Hayden and Tropical Avenue are loaded from a third-party font host and are described by their creators as free for personal use; review their terms before any commercial use.

## Run locally

Install Node.js 22 or later, then:

```sh
npm install
cp .env.example .env.local
npm run dev
```

Visit http://localhost:3000. Run `npm test` and `npm run build` to verify. The exported site is in `out/`. Next Image is configured as unoptimized because GitHub Pages has no image optimization server; resize and compress photographs before adding them.

## Publish on GitHub Pages

1. Create a GitHub repository and push the contents of this folder to its `main` branch. In repository Settings → Pages, select **GitHub Actions** as the source.
2. In Settings → Secrets and variables → Actions → Variables, the workflow defaults `NEXT_PUBLIC_BASE_PATH` to `/reception`. Set the variable to `/REPOSITORY-NAME` if you rename the repository. For a user site or custom domain, remove the `/reception` fallback from `.github/workflows/deploy.yml` so the value is empty. Add `NEXT_PUBLIC_RSVP_ENDPOINT` after deploying the RSVP service below.
3. Push to `main` or run the “Deploy to GitHub Pages” workflow. The workflow tests, builds, and publishes the static export. Configuration and environment changes require a new build. If using a custom domain, configure it in GitHub Pages settings.

## Private RSVP storage

GitHub Pages only serves static files, so it cannot receive or store responses. This project includes a separate Vercel serverless endpoint under `server/` and uses a PostgreSQL database reachable over HTTP via Neon. The RSVP form is currently removed from the invitation; the optional endpoint remains in the source if you choose to restore it later.

1. Create a Neon PostgreSQL database and run `server/schema.sql` using its SQL editor. Keep database credentials private. Review database access and backups with your provider.
2. Import the same GitHub repository into Vercel as a **separate project**, set its Root Directory to `server`, and deploy. Set environment variables `DATABASE_URL`, `ALLOWED_ORIGIN` (exact origin, e.g. `https://username.github.io`, without a trailing slash or repository path), and `RATE_LIMIT_SECRET` (a long random secret). Redeploy after changing them. The endpoint will be `https://YOUR-PROJECT.vercel.app/api/rsvp`.
3. Set the GitHub Actions repository variable `NEXT_PUBLIC_RSVP_ENDPOINT` to that full endpoint and rerun the Pages workflow. For local testing, use a separate Vercel API deployment whose allowed origin matches the local browser origin.
4. Read submissions privately in the database provider's SQL console, for example `SELECT * FROM rsvps ORDER BY created_at DESC;`. No public listing endpoint is provided. Restrict database credentials to the couple or trusted administrators.

The endpoint checks the origin, validates input, uses a hidden honeypot, and limits each hashed IP to five submissions per hour in the database. This is abuse reduction, not a guarantee against distributed spam. The database user needs INSERT/UPDATE/SELECT privileges on the two tables and the identity sequence. Rate-limit records may be periodically removed after their window expires. Vercel and Neon service configuration and costs are managed by their providers.

For a Next.js deployment on Vercel, deploy the static root project as one Vercel project and the `server/` directory as a second project, as above. Set the front-end variables at build time and use an empty base path unless hosting beneath a subpath.

## Calendar and accessibility

An .ics file contains selected events and VALARM reminders; guests must open and save it in a compatible calendar application. Google Calendar opens one prefilled event at a time; guests set reminders and save in Google. No reminder is claimed as created before that confirmation. Missing or invalid start times disable calendar selection. The opening has a skip control, motion respects the operating-system preference, and modal sheets support Escape and keyboard focus containment.
