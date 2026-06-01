# BRATS Marketing & Consulting — Website

A two-page site built in React (Vite). Page one (`/`) is the main one-pager.
Page two (`/start`) holds the intake form.

You do **not** need to understand the code to launch this. Follow the steps below.

---

## 1. Put these files on GitHub

1. Go to github.com and click the green **Create repository** button.
2. Name it `brats-site`. Leave it set to **Private** (or Public — your call). Do
   NOT add a README or .gitignore on that screen (this project already has them).
   Click **Create repository**.
3. On the new empty repo page, click **uploading an existing file** (the link in
   the middle), or **Add file → Upload files**.
4. Drag in **everything inside the `brats-site` folder** — that means:
   `index.html`, `package.json`, `vite.config.js`, `vercel.json`, `.gitignore`,
   and the whole `src` folder. (Drag the contents, not the outer `brats-site`
   folder itself.)
5. Scroll down, click **Commit changes**.

That's it — your code now lives on GitHub.

---

## 2. Deploy on Vercel (free)

1. Go to vercel.com → **Add New… → Project**.
2. Under "Import Git Repository," click **Continue with GitHub**, authorize it,
   and pick `brats-site`.
3. Vercel auto-detects it's a Vite project. Don't change any settings.
4. Click **Deploy**. About 60 seconds later you get a live URL like
   `brats-site.vercel.app`. Open it on your phone to test.

The `vercel.json` file in this project makes the `/start` page work correctly
when someone opens or refreshes it directly — don't delete it.

---

## 3. Connect your domain (GoDaddy → Vercel)

1. In your Vercel project: **Settings → Domains → add `bratsmarketing.com`**.
2. Vercel shows you the exact DNS records to add (an A record for the root and a
   CNAME for `www`).
3. Log in to GoDaddy → your domain → **DNS / Manage DNS** → add/edit those two
   records with the exact values Vercel gave you.
4. Wait a few minutes to a few hours. Vercel's domain screen turns green when it's
   live. HTTPS/SSL is automatic and free.

---

## 4. Connect the intake form (Tally)

The `/start` page currently shows a styled **placeholder** listing the form
fields. To make it a real working form:

1. Create a free form at tally.so with the fields listed on the page.
2. Set it to email you on each submission (Tally → Integrations/Notifications).
3. Publish it and copy the embed URL (Tally → Share → Embed).
4. In `src/App.jsx`, find `TALLY_EMBED` (in the `StartIntake` function). Paste your
   URL into `TALLY_URL`, and change `HAS_TALLY = false` to `HAS_TALLY = true`.
5. Commit the change on GitHub — Vercel redeploys automatically in ~1 minute.

---

## Things you'll likely want to edit later (all in `src/App.jsx`)

- **Email address** — search `hello@bratsmarketing.com` and replace.
- **Tally form** — search `TALLY_EMBED` (see step 4 above).
- **Logo** — already embedded as a sharp vector; nothing to do.
- **Proof / case studies** — search `FUTURE_CASE_STUDIES` for the marked spot to
  add real client proof when you have it.

## Running it on your own computer (optional, for developers)

```
npm install
npm run dev
```

Then open the local URL it prints. `npm run build` produces the production files.
