# Bajaj Health OS — HR Dashboard Prototype

A working, organization-wide HR wellness dashboard. Live charts for department health, participation, burnout, risk distribution, chronic condition prevalence, and a wellness ROI statement. All data is aggregated and anonymized.

## What this is
A React (Vite) project, ready to host. You do not need to write any code.

## How to get a shareable link (Netlify, free, no credits)

### Step 1 — put the code on GitHub
1. Go to github.com, click the "+" at top right, then "New repository"
2. Name it "bajaj-hr-dashboard", keep it Public, click "Create repository"
3. On the next page click "uploading an existing file"
4. Open this project folder. Select ALL 7 loose files (index.html, package.json,
   package-lock.json, vite.config.js, netlify.toml, .gitignore, README.md) and drag
   them onto the upload box
5. IMPORTANT: also upload the "src" folder. If it does not appear after the first
   drag, click "Add file" then "Upload files" again and drag ONLY the src folder in.
   The src folder must contain App.jsx and main.jsx
6. Click "Commit changes"

Your repo should show the 7 files plus a clickable "src" folder.

### Step 2 — deploy on Netlify
1. Go to netlify.com, click "Sign up", choose "Sign up with GitHub", approve
2. Click "Add new site" then "Import an existing project"
3. Click "Deploy with GitHub". Approve access (click "Configure Netlify on GitHub"
   if asked, and give access to the bajaj-hr-dashboard repo)
4. Pick "bajaj-hr-dashboard" from the list
5. Build command "npm run build" and publish directory "dist" auto-fill from
   netlify.toml. Leave them as they are
6. Click "Deploy". Wait about a minute. You get a live link like
   bajaj-hr-dashboard.netlify.app

That link works for anyone.

### To rename the link (optional)
Site configuration then "Change site name" gives you a cleaner address.

## To make changes later
Everything lives in src/App.jsx. Edit it directly on GitHub (open the file, click
the pencil, edit, commit) and Netlify rebuilds automatically in about a minute.

## To run on your own computer (optional)
1. Install Node.js from nodejs.org
2. Open a terminal in this folder
3. Run: npm install
4. Run: npm run dev
5. Open the local link it prints
