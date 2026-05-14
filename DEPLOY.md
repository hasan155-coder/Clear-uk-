# 🇬🇧 ClearPath UK — Deployment Guide

## What you need (all free)
- GitHub account → github.com
- Vercel account → vercel.com
- Anthropic API key → console.anthropic.com

---

## STEP 1 — Upload to GitHub

1. Go to **github.com** and sign in
2. Click the **+** button → **New repository**
3. Name it: `clearpath-uk`
4. Click **Create repository**
5. Click **uploading an existing file**
6. Upload ALL the files from this folder (keep the folder structure)
7. Click **Commit changes**

---

## STEP 2 — Deploy to Vercel

1. Go to **vercel.com** and sign in with GitHub
2. Click **Add New Project**
3. Find `clearpath-uk` → click **Import**
4. Click **Deploy** (don't change any settings)
5. Wait ~60 seconds...

---

## STEP 3 — Add your API Key (IMPORTANT)

1. In Vercel, go to your project → **Settings**
2. Click **Environment Variables**
3. Add this:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from console.anthropic.com (starts with sk-ant-)
4. Click **Save**
5. Go to **Deployments** → click **Redeploy**

---

## STEP 4 — Your app is live! 🎉

Vercel gives you a free URL like:
`https://clearpath-uk.vercel.app`

Share it with anyone — it works on phone and desktop.

---

## Costs
- Hosting: FREE (Vercel free tier)
- AI: ~£0.01-0.02 per conversation (Anthropic pay-as-you-go)
- Domain (optional): ~£10/year for clearpath-uk.co.uk

---

## Need help?
The folder structure should look like this:
```
clearpath-uk/
├── package.json
├── next.config.js
└── src/
    └── app/
        ├── layout.js
        ├── page.js
        └── api/
            └── chat/
                └── route.js
```
