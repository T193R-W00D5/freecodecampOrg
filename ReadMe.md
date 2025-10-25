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

## Volta (recommended) — pin and use a project Node version

Volta is a lightweight, fast tool for pinning Node, npm, and yarn per-project so every contributor uses the same runtime without global installs.

Quick guide

- Install Volta:
  - macOS / Linux (recommended):
```bash
curl https://get.volta.sh | bash
```
  - Windows (Scoop):
```powershell
# install scoop first: https://scoop.sh/
# then:
scoop install volta
```
  - Windows (Chocolatey):
```powershell
choco install volta
```

- Pin the project Node version (example uses the version pinned in this project):
```bash
volta pin node@22.21.0
```
This writes a `volta` entry into `package.json` so Volta users automatically use that Node version when they cd into the project.

- Alternative: add a `volta` section manually to `package.json`:
```json
"volta": {
  "node": "22.21.0"
}
```

- Verify:
```bash
node -v        # should match the pinned version for Volta users
volta list     # shows the pinned tools/versions
```

Notes & tips
- Volta is non-destructive and sits in your PATH, so it coexists well with `nvm` (or `nvm-windows`) as long as you understand which manager is first in your PATH. On Windows, Volta is usually friendlier for non-admin installs.
- If some contributors prefer `nvm`, consider also adding a small `.nvmrc` file containing the major/minor version (for example `22.21.0`) so `nvm` users can run `nvm use`:
```text
22.21.0
```
- To help CI and other tools, consider adding an `engines` field to `package.json`:
```json
"engines": {
  "node": ">=18 <=22.21.0"
}
```

Other small suggestions
- Use `npm ci` in CI for reproducible installs.
- Add a small `CONTRIBUTING.md` describing how to run the server locally and how to run tests.
- Consider adding `.editorconfig` and a formatter/linter (Prettier / ESLint) if you want consistent style across contributors.
- Keep `.vscode` workspace settings checked in only if they are helpful for all contributors (you already have a workspace node check which is useful).

If you want, I can add a `.nvmrc`, `CONTRIBUTING.md`, or an `engines` entry for you — tell me which and I’ll add it.
```text
22.21.0
```
- To help CI and other tools, consider adding an `engines` field to `package.json`:
```json
"engines": {
  "node": ">=18 <=22.21.0"
}
```

Other small suggestions
- Use `npm ci` in CI for reproducible installs.
- Add a small `CONTRIBUTING.md` describing how to run the server locally and how to run tests.
- Consider adding `.editorconfig` and a formatter/linter (Prettier / ESLint) if you want consistent style across contributors.
- Keep `.vscode` workspace settings checked in only if they are helpful for all contributors (you already have a workspace node check which is useful).

If you want, I can add a `.nvmrc`, `CONTRIBUTING.md`, or an `engines` entry for you — tell me which and I’ll add it.
