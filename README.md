# 🎭 PlaywrightTest

Automated testing project using **[Playwright](https://playwright.dev/)** with **TypeScript**.  
Covers both **UI tests** (SauceDemo site) and **API tests** (ReqRes demo API).

---

## 📂 Project Structure

```
playwrighttest/
├─ tests/
│  ├─ login.spec.ts         # UI tests for SauceDemo login
│  ├─ api.reqres.spec.ts    # API tests against ReqRes demo API
├─ playwright.config.ts     # Playwright configuration
├─ package.json
└─ README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js 18+](https://nodejs.org/en/)
- npm (comes with Node)

### Install dependencies
```bash
npm install
```

### Install Playwright browsers
```bash
npx playwright install --with-deps
```

---

## 🧪 Running Tests

Run all tests (headless by default):
```bash
npx playwright test
```

Run in headed mode:
```bash
npx playwright test --headed
```

Run a single file:
```bash
npx playwright test tests/login.spec.ts
```

Show the HTML report:
```bash
npx playwright show-report
```

---

## 🐳 Docker

Build the Docker image:

```bash
docker build -t playwright-tests .
```

Run tests with the HTML report saved to the host:

```bash
docker run --rm -v $(pwd)/playwright-report:/app/playwright-report playwright-tests
```

The report will be available in the `playwright-report` folder.

---

## 🌐 Tests Included

- **UI Tests (SauceDemo)**  
  - ✅ Valid login with `standard_user`  
  - ❌ Invalid login (wrong password)  
  - 🔒 Locked-out user check  

- **API Tests (ReqRes)**  
  - GET users list (`/users?page=2`)  
  - POST login (success + failure)  
  - POST create user (`/users`)  

---

## 🛠 CI/CD with GitHub Actions

This repo includes a workflow in `.github/workflows/playwright.yml`.  
On every push or pull request to `main`:
- Uses the official Playwright Docker image
- Installs dependencies
- Runs all tests (UI + API)
- Uploads the **HTML test report** as an artifact  

You can view the status under the **Actions** tab on GitHub.

---

## 📖 Resources
- [Playwright Docs](https://playwright.dev/docs/intro)
- [ReqRes API](https://reqres.in/)
- [SauceDemo Site](https://www.saucedemo.com/)
