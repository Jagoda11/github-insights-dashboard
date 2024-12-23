import { defineConfig } from '@playwright/test'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  testDir: './e2e-tests', // Adjusted to point to the root's e2e-tests folder
  timeout: 30000, // Timeout for each test
  retries: 2, // Retry failed tests
  use: {
    headless: true, // Run tests in headless mode
    baseURL: `file://${resolve(__dirname, './dist/github-insights-dashboard/index.html')}`, // Path to your built app
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
})
