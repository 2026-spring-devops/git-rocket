# Git Rocket 🚀

An animated ASCII rocket with customizable goodbye messages and a generated static site.

## Usage

```bash
npm start                    # Launch the rocket
npm start -- -who Alice      # Launch with "Bye Alice" trailing behind
npm run build:docs           # Generate docs/index.html locally
npm test                     # Run all tests
```

## Static site

The project can generate a static HTML page from the same rocket definition used by the CLI in `git-rocket.js`.

```bash
npm run build:docs
```

That command writes `docs/index.html` locally. The file is treated as generated output and is not committed.

GitHub Pages is published by `.github/workflows/pages.yml` on pushes to `main`. The workflow runs the generator, uploads the generated `docs/` directory, and deploys that artifact to Pages.

## Test Groups

Tests are tagged with group names so individual groups can be run in isolation.
This is designed for students to each create a GitHub Actions workflow for their assigned group.

| Group Tag            | Description                              |
|----------------------|------------------------------------------|
| `[nose-cone]`        | Rocket nose cone (lines 0-2)             |
| `[upper-body]`       | Upper body and mid body (lines 3-7)      |
| `[body-panels]`      | 6 identical body panels (lines 8-13)     |
| `[fins]`             | Fin section (lines 14-17)                |
| `[nozzle]`           | Nozzle and engine (lines 18-27)          |
| `[full-rocket]`      | Line count, width, and exact match       |
| `[flames]`           | Flame animation frames                   |
| `[sanitize-valid]`   | Sanitize: valid input acceptance          |
| `[sanitize-invalid]` | Sanitize: invalid input rejection         |
| `[sanitize-profanity]` | Sanitize: profanity filter              |
| `[docs]`             | Static docs generation                    |

### Run a single group

```bash
npm run test:nose-cone
npm run test:fins
npm run test:docs
npm run test:sanitize-profanity
# etc.
```

### Setting up your GitHub Actions workflow (tests)

1. Copy `.github/workflows/_template-student.yml.example`
2. Rename it to `<your-name>-<group>.yml` (e.g., `alice-nose-cone.yml`)
3. Replace `YOUR_NAME` and `test:YOUR_GROUP` in the file (e.g., `test:nose-cone`)
4. Commit and push — your tests will run on every push to `main`

### Publishing your rocket page

Each student can publish a personalized static HTML version of their rocket to the class GitHub Pages site from their own branch.

1. Create your branch from `main` and make your rocket edits
2. Copy `.github/workflows/_template-publish.yml.example` into `.github/workflows/`
3. Rename it to `<your-name>-publish.yml` (e.g., `tsteele-publish.yml`)
4. Open the file and set three values:
   - `STUDENT_BRANCH` — your branch name (e.g., `tsteele/rocket-page`)
   - `OUTPUT_FILENAME` — your HTML filename (e.g., `tsteele.html`) — use your name to avoid conflicts
   - `on.push.branches` — also update this to match your branch name
5. Commit the workflow to your branch and push

On every push to your branch the workflow will open (or update) a pull request that adds `docs/<your-name>.html` to `main`. Once the PR is merged, GitHub Pages will serve your rocket automatically.
