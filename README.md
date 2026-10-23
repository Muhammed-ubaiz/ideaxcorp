# Ideaxcorp website

The Ideaxcorp marketing site plus an admin dashboard for managing its content, built with React, Vite, Tailwind CSS and Firebase.

```text
ideaxcorp/
├── frontend/                 React + Vite app
│   ├── public/images/        Brand, portfolio, service and blog imagery (optimized WebP)
│   └── src/
│       ├── admin/            Admin dashboard (/admin): login, CRUD, messages, settings
│       ├── components/       Navbar, footer, buttons, cards, form, reveal animations…
│       ├── data/             Built-in website content (site.js, blogs.json)
│       ├── firebase/         Firebase initialization
│       ├── hooks/            useCollection / useSettings / useAuth
│       ├── layouts/          Public site layout
│       ├── pages/            Public pages
│       ├── services/         Firestore + Storage access
│       └── utils/            Formatting and HTML sanitizing
├── firebase/                 Firestore rules, indexes and Storage rules
├── firebase.json             Hosting, rules and redirects config
└── .firebaserc               Default project: ideaxcorp-3089b
```

## How content works

Every public page reads its content from Firestore. When a collection is empty, or Firestore can't be reached, the site falls back to the content in `frontend/src/data/` — taken from the original ideaxcorp.com site — so the website never renders blank.

| Collection | Holds | Public can read |
| --- | --- | --- |
| `services` | Services and their detail pages | Published items |
| `portfolio` | Projects | Published items |
| `blogs` | Blog posts (HTML body) | Published items |
| `testimonials` | Client quotes | Published items |
| `faqs` | Questions and answers | Published items |
| `team` | Team members | Published items |
| `settings/site` | Contact details, hero text, founder’s note, privacy policy | Yes |
| `messages` | Contact form submissions | No — create only |
| `admins` | One document per admin user (ID = user UID) | No |

## Local development

Requires Node.js 20+.

```bash
cd frontend
npm install
cp .env.example .env.local   # then fill in the values, see below
npm run dev                  # http://localhost:5173
```

`npm run build` writes the production site to `frontend/dist`.

## Connecting Firebase

A web app called **Ideaxcorp Website** is registered in the `ideaxcorp-3089b` project, and its config is already in `frontend/.env.local` (not committed). To set it up on another machine, copy the values from Firebase console → Project settings → Your apps → Ideaxcorp Website into `frontend/.env.local`, using the names in `.env.example`.

Then, once per project:

1. **Firestore rules.** Deploy the rules in this repo (they replace the project’s current rules):
   ```bash
   firebase deploy --only firestore
   ```
2. **Authentication.** In the console, open Authentication → Sign-in method and enable **Email/Password**. Then go to Authentication → Users → Add user and create the admin account.
3. **Make that user an admin.** Copy the user’s UID from the Users list. In Firestore, create a collection named `admins` and add a document whose **Document ID is that UID** (any field, e.g. `email: "you@example.com"`). Admins can only be added this way — never from the website.
4. **Import the content.** Sign in at `/admin/login`. The dashboard offers **Import website content**, which copies the built-in services, portfolio, blog posts, testimonials, FAQs, team and settings into Firestore. It only fills empty collections, so it’s safe to run again.
5. **Storage (optional, for image uploads).** Open Storage in the console and click **Get started**. New projects need the Blaze (pay-as-you-go) plan for Storage. Then deploy the Storage rules:
   ```bash
   firebase deploy --only storage
   ```
   Until Storage is set up, admins can still paste image URLs instead of uploading.

## Deploying the website

```bash
cd frontend && npm run build && cd ..
firebase deploy --only hosting
```

`firebase.json` serves the app as a single-page app and adds 301 redirects from the old WordPress URLs (`/about-us/`, `/services-2/`, `/creative-branding/`, every blog post slug, and so on) to their new addresses, so existing links and search rankings carry over. Point the `ideaxcorp.com` domain at Firebase Hosting from Hosting → Add custom domain when you’re ready to switch.

## Admin dashboard

`/admin` — sign in with an account listed in `admins`.

- **Dashboard** — counts, latest messages, and the one-time content import.
- **Messages** — contact form submissions; mark read, reply by email or WhatsApp, delete.
- **Services, Portfolio, Blog posts, Testimonials, FAQs, Team** — create, edit, publish/unpublish, delete. Unpublished items are drafts and never reach the public site.
- **Site settings** — hero text, contact details, offices, social links, about copy, founder’s note, showreel link and the privacy policy.

Blog posts and the privacy policy are HTML. The editor has a toolbar for common tags and a Preview tab; everything is sanitized before it is shown on the site.

## Security notes

- `.env.local` is git-ignored. Firebase web config values are not secrets, but keep them out of the repo anyway.
- Firestore rules allow public reads only of published content, validate every contact message (fields, lengths, server timestamp), and limit all writes to admins.
- Storage rules allow public reads of `uploads/`, and uploads only by admins (images/videos under 8 MB).
