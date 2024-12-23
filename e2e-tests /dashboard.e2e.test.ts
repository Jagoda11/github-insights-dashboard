import { test, expect } from '@playwright/test'

test.describe('GitHub Insights Dashboard', () => {
  test('should display the dashboard title', async ({ page }) => {
    await page.goto('/')
    const title = await page.title()
    expect(title).toBe('GitHub Insights Dashboard')
  })

  test('should navigate to the Commit List page', async ({ page }) => {
    await page.goto('/')
    const commitListLink = page.getByRole('link', { name: 'Commit List' })
    await commitListLink.click()
    await expect(page).toHaveURL('/commits') // Adjust based on your routing
    const heading = await page.getByRole('heading', { name: 'Commit List' }) // Replace with actual heading
    await expect(heading).toBeVisible()
  })
})
