# Wool Buyer CRM — Setup Guide
### From zero to live URL in about 20 minutes

---

## WHAT YOU'LL NEED
- A computer with a browser
- The wool-crm folder (you already have it)
- Node.js installed (free — instructions below if needed)

---

## STEP 1 — Create your free Supabase database (5 min)

1. Go to **supabase.com** and click **Start your project**
2. Sign up with Google or GitHub (free)
3. Click **New Project**
   - Name it: `wool-crm`
   - Set a database password (save this somewhere)
   - Choose region: **Southeast Asia (Singapore)** — closest to Australia
   - Click **Create new project** and wait ~2 minutes
4. Once ready, click **SQL Editor** in the left sidebar
5. Click **New Query**
6. Open the file **schema.sql** from this folder, copy everything, paste it in, click **Run**
   - You should see "Success. No rows returned"
7. Go to **Settings → API** in the left sidebar
8. Copy two things:
   - **Project URL** (looks like: https://xxxx.supabase.co)
   - **anon public** key (long string starting with "eyJ...")

---

## STEP 2 — Paste your credentials (2 min)

1. Open the file: `src/supabaseClient.js`
2. Replace `YOUR_SUPABASE_URL` with your Project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your anon public key
4. Save the file

Example of what it should look like:
```js
const SUPABASE_URL = 'https://abcdefgh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

---

## STEP 3 — Install Node.js (skip if already installed)

1. Go to **nodejs.org**
2. Download the **LTS** version (big green button)
3. Run the installer, click Next through everything
4. Restart your computer

---

## STEP 4 — Deploy to Vercel (10 min)

### Option A — Easiest: Drag and Drop (no terminal needed)

1. Go to **vercel.com** and sign up (free, use GitHub)
2. From your dashboard, click **Add New → Project**
3. Click **"Or deploy from local folder"** at the bottom
4. Drag the entire **wool-crm** folder onto the Vercel page
5. Vercel will auto-detect it's a Vite/React app
6. Click **Deploy**
7. Wait ~2 minutes — you'll get a live URL like: `wool-crm.vercel.app`

### Option B — Via terminal (if you're comfortable)

```bash
cd wool-crm
npm install
npx vercel
```
Follow the prompts — it'll give you a URL at the end.

---

## STEP 5 — Share with your team

Once deployed, you'll have a URL like:
`https://wool-crm-yourname.vercel.app`

Share this with:
- Your Managing Director
- Other brokers / staff
- Anyone who needs access

**Everyone sees the same data in real time** — any record added by one person immediately appears for everyone else.

---

## OPTIONAL — Custom domain

If you want a branded URL like `crm.woolcompany.com.au`:
1. Buy the domain (GoDaddy, Crazy Domains, etc.)
2. In Vercel → your project → Settings → Domains
3. Add your domain and follow the DNS instructions (~10 min)

---

## NEED HELP?

Ask your Claude session — just paste any error message and it'll fix it.
