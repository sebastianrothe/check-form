describe('Anmeldung', () => {
  beforeAll(async () => {
    await page.goto('https://gruseltour-leipzig.de/anmeldung/', {
      waitUntil: 'networkidle2'
    })

    const [, datepicker] = await page.$$('#contact-form-18 form div input')
    expect(datepicker).toBeDefined()
    await datepicker.click({ delay: 500 })
  })

  it('should be titled "Stadtführung"', async () => {
    await expect(page.title()).resolves.toMatch(
      'Anmeldung zur Gruseltour Stadtführung in Leipzig! Buche hier die Tour!'
    )
  })

  it('should get form fields', async () => {
    const [name, datepicker, people, , mail, phone] = await page.$$(
      '#contact-form-18 form div input'
    )

    expect(name).toBeDefined()
    expect(datepicker).toBeDefined()
    expect(people).toBeDefined()
    expect(mail).toBeDefined()
    expect(phone).toBeDefined()

    await datepicker.click({ delay: 500 })
  })

  it('should find a datepicker with jquery-ui', async () => {
    const [name, datepicker, people, , mail, phone] = await page.$$(
      '#contact-form-18 form div input'
    )

    // click, to scroll into view and load all JS
    await datepicker.click({ delay: 500 })
    await page.screenshot({ path: 'screenshots/datepickerOpen.png' })

    const datepickerSelector =
      '#contact-form-18 form div input[type=text].hasDatepicker'
    await page.waitFor(datepickerSelector)

    // await expect(page.$(datepickerSelector)).resolves.not.toBeNull()

    const attributes = await page.$eval(
      datepickerSelector,
      elem => elem.attributes
    )
    expect(attributes).toBeDefined()
    expect(attributes).not.toBeNull()
    // expect(readonly).toBeTruthy()
    console.log(attributes)
  })

  it.skip('should find an input for the datepicker to be readonly', async () => {
    const datepickerSelector = 'input.readonly'
    // hasDatepicker

    /* await expect(
      page.waitForSelector(datepickerSelector, {
        timeout: 3000
      })
    ).resolves.toBeDefined() */

    const element = await page.$eval(datepickerSelector)
    console.table(element) // .getAttribute('readonly'))
    // node.setAttribute('readonly', false)
  })
})
