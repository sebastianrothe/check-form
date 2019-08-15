describe('Anmeldung', () => {
  beforeAll(async () => {
    await page.goto('https://gruseltour-leipzig.de/anmeldung/')
  })

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch(
      'Anmeldung zur Gruseltour Stadtführung in Leipzig! Buche hier die Tour!'
    )
  })
})
