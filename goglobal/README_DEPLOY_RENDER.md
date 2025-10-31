Deployment to Render.com — goglobal

This file explains how to deploy the `goglobal` Vite + React app to Render (dashboard.render.com) as a Static Site.

Quick summary (recommended):
- Connect this GitHub repository to Render
- Create a new Static Site service
- Set the build command and publish directory
- Add the VITE_* environment variables in the Render dashboard

1) Create the Static Site on Render
- Go to https://dashboard.render.com and sign in.
- Click New -> Static Site.
- Connect the GitHub repository `phuongforworking-maker/Goglobal` and pick the `main` branch.

2) Configure build settings
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Branch: `main`

3) Add environment variables (in Render Dashboard -> Environment)
- Add the environment variables used by the app (do NOT paste secrets into this repo):
  - `VITE_AZURE_TRANSLATOR_KEY` (Azure Translator subscription key)
  - `VITE_AZURE_REGION` (Azure region, e.g., `eastus`)
  - `VITE_PROMPT_API_KEY` (Google/Gemini prompt API key)
  - `VITE_SUMMARIZER_API_KEY` (Google/Gemini summarizer key)

Notes & security
- The app currently reads API keys from client-side Vite env vars (prefixed with `VITE_`). Putting provider keys in client-side envs exposes them to users.
  - Recommended: Move sensitive calls to a backend API (Render Web Service or Serverless) and store provider secrets as secure env vars there. The frontend would call that backend instead of calling providers directly.
- `.env` is in `.gitignore`. Keep secrets out of the repo.

Advanced: Using `render.yaml`
- A `render.yaml` is included in the repo for convenience. Render will honor it if you use Infrastructure-as-Code from the repo. It intentionally contains no secret values.

Verify locally before pushing
- Build locally and ensure `dist/` is created:

```bash
cd /workspaces/Goglobal/goglobal
npm install
npm run build
# confirm dist exists
ls -la dist
```

If you want, I can:
- Add a tiny backend (Express/Fastify) as a Render Web Service to proxy API calls and keep keys server-side.
- Or create a Render Service for the backend and update the frontend to call it. Tell me which option you prefer and I can implement it.
