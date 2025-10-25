# CI (GitHub Actions) for this project

This repo uses two CI jobs in a single workflow (`.github/workflows/node.js.yml`):

1. Compatibility matrix
  - Runs a matrix across Node versions: 18.x, 20.x, 22.x.
  - Purpose: broad compatibility testing across supported Node major versions.

2. Pinned job (smoke test)
   - Reads the pinned Node version from `package.json` (the `volta.node` field) and runs tests against that exact version.
   - Purpose: ensure CI mirrors the exact developer environment (Volta pin).

Before those jobs run, a small assertion job ensures the compatibility matrix actually covers the pinned Node version. The assertion accepts either:
- an exact match (e.g. `22.21.0` in the matrix), or
- a major.x entry that matches the pinned major (e.g. `22.x` covers `22.21.0`).

Why this setup?
- Developers use Volta to pin an exact Node version in `package.json` for reproducibility.
- CI verifies both breadth (matrix) and exact-match (pinned) so you get good coverage and a guarantee that the developer-pin is tested.

Notes for contributors
- To change the pinned Node version locally:
  - Use Volta: `volta install node@<version>` and `volta pin node@<version>`.
  - Commit the updated `package.json` so CI picks up the new pin.
 - To change the pinned Node version locally:
   - Use Volta: `volta install node@<version>` and `volta pin node@<version>`.
   - Commit the updated `package.json` so CI picks up the new pin.
- If you update the pinned Node major and expect the compatibility matrix to cover it, the assertion will pass if the matrix contains the matching major (e.g. `22.x`). If you change the pinned major but the matrix does not include it, CI will fail and you should update the workflow matrix accordingly.
- If you want CI to test additional Node versions, edit the `compatibility` matrix in `.github/workflows/node.js.yml`.
 - If you want CI to test additional Node versions, edit the `compatibility` matrix in `.github/workflows/node.js.yml`.

Engines and matrix choices (short note)
-------------------------------------

We also include a lightweight `engines` field in `package.json` to help editors, linters, and some deployment platforms understand the supported Node range for this project. The `engines` entry is not enforced by Volta or GitHub Actions, but it provides a helpful signal to contributors and some tools (for example, VS Code, Heroku, or `npm` warnings).

Matrix choices: the compatibility matrix intentionally tests recent LTS and modern Node majors (here: 18.x, 20.x, 22.x) to balance test coverage and CI cost. The pinned job still tests the exact Volta-pinned version from `package.json` (for exact reproducibility).

Quick `engines` example (what contributors will see)
-------------------------------------------------

If `package.json` contains an `engines` entry like:

```json
"engines": {
  "node": ">=18 <=22.21.0"
}
```

And a contributor runs `npm install` or `npm ci` using an older Node (for example Node 16), `npm` will typically print a warning similar to:

```
npm WARN EBADENGINE Unsupported engine for freecodecamporg-website-copies@1.0.0: wanted: {"node": ">=18 <=22.21.0"} (current: {"node":"16.20.0", "npm":"..."})
```

Notes:
- `npm` only warns by default and does not automatically switch or block installs. Use Volta, `nvm`, or `nvm-windows` to actually select a compatible runtime.
- This warning helps contributors notice mismatched runtimes early so they can switch to the pinned version before running tests or starting the dev server.

Troubleshooting
- If CI fails with `pinned node ... is NOT covered by compatibility matrix`, either:
  - Update the compatibility matrix in the workflow to include the matching major (e.g. add `22.x`), or
  - Change the pinned version in `package.json` to one covered by the matrix.

Questions or changes
- If you'd prefer a different policy (for example, matrix-only CI, or using Volta in the runner), open an issue or a PR describing the desired behavior and we'll adjust the workflow.
