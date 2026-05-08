# Nexus Games Deployment Guide

It looks like you are seeing a 404 error for `src/main.jsx` on GitHub Pages. This happens because GitHub Pages is trying to serve your source code directly, but browsers cannot run `.jsx` files. You must serve the **built** version of your app.

## How to Fix the 404 Error

### 1. Run the Deploy Script
I have added a deployment script to your `package.json`. Open your terminal and run:
```bash
npm run deploy
```
This command will:
1. Build your project into the `dist/` folder.
2. Push the contents of `dist/` to a new branch called `gh-pages`.

### 2. Configure GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages**.
3. Under **Build and deployment**, set the Source to **Deploy from a branch**.
4. Select the **gh-pages** branch and the **/ (root)** folder.
5. Save the settings.

Wait a minute, and your site should be live at `https://jakksson.github.io/`!

## Why was it failing?
- **MIME Type Error:** Browsers only understand `.js` files. Vite converts your `.jsx` and Tailwind code into optimized `.js` and `.css` during the `npm run build` step.
- **404 Error:** The `dist/` folder contains the files GitHub Pages actually needs. When you serve from `main`, it tries to load `src/main.jsx`, which is not what you want in production.
