import { defineConfig } from '@playwright/test'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  testDir: './e2e-tests', // Ensure this matches your test folder
  timeout: 30000,
  retries: 2,
  use: {
    headless: true,
    baseURL: `file://${resolve(__dirname, './dist/github-insights-dashboard/index.html')}`, // Path to your built app
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
})
