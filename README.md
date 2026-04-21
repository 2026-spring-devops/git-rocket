# Git Rocket 🚀

An animated ASCII rocket with customizable goodbye messages and a tiny web view.

## Usage

```bash
npm start                    # Launch the rocket
npm start -- -who Alice      # Launch with "Bye Alice" trailing behind
npm run web                  # Start the web endpoint on port 3000
npm test                     # Run all tests
```

## Web endpoint

Start the server:

```bash
npm run web
```

Then open:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/?who=Alice
```

The web response uses the same shared ASCII rocket definition as the CLI. If `who` is invalid, the endpoint ignores it and renders the default rocket.

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
| `[web]`              | Web endpoint rendering and routing        |

### Run a single group

```bash
npm run test:nose-cone
npm run test:fins
npm run test:web
npm run test:sanitize-profanity
# etc.
```

### Setting up your GitHub Actions workflow

1. Copy `.github/workflows/_template-student.yml.example`
2. Rename it to `<your-name>-<group>.yml` (e.g., `alice-nose-cone.yml`)
3. Replace `YOUR_NAME` and `test:YOUR_GROUP` in the file (e.g., `test:nose-cone`)
4. Commit and push — your tests will run on every push to `main`
