# Instructions

## Standard Local Server Startup: node

1. Open a new terminal inside VS Code pointed to your project root folder location.

1. Run from terminal:

```bash
node server.js
```

1. Open <http://localhost:3010> in your browser. You should see your webpage!

## Alternative Local Server Startup: nodemon

From CoPilot in MS Edge: Setting up nodemon is quick, and once it’s running, it’ll feel like your server suddenly learned how to breathe. 😄 Every time you save changes, nodemon restarts your Node server automatically—so no more manual Ctrl+C and re-run. Here's how to get rolling:

⚙️ Step-by-Step: Install and Use `nodemon`

🛒 1. Install nodemon (globally or locally)

Globally (available from anywhere):

```bash
npm install -g nodemon
```
Locally (specific to your project):

```bash
npm install --save-dev nodemon
```

🧨 2. Run Your Server with nodemon

Once installed, instead of:

```bash
node server.js
```

…you’ll use:

```bash
nodemon server.js
```

Watch it launch—and then automatically restart if you tweak server.js or other watched files.

🗂️ Optional: Add a Script to package.json

If you want to simplify your workflow even further, add a custom script:

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

Then run:

```bash
npm run dev
```

Your server’s now on autopilot ✈️
