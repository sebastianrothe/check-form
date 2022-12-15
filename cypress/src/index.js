const puppeteer = require('puppeteer')

try {
  ;(async () => {
    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      // await page.setCacheEnabled(true);
      await page.goto('https://gruseltour-leipzig.de/anmeldung/')

      // get form inputs
      const [name, datepicker, people, , mail, phone] = await page.$$(
        '#contact-form-18 form div input'
      )

      // wait for jquery to load
      const datepickerSelector =
        '#contact-form-18 form div input[type=text].hasDatepicker'
      try {
        await page.waitForSelector(datepickerSelector, {
          timeout: 7000
        })

        // remove readonly from datepicker
        const node = await page.$eval(datepickerSelector, node => {
          console.log('Readonly', node.getAttribute('readonly'))
          node.setAttribute('readonly', false)
          return node
        })

        console.log('Readonly', node.getAttribute('readonly'))
      } catch (error) {
        console.warn('Could not find datepicker with jquery-ui')
        return
      }

      // check for datepicker visible
      await datepicker.click({ delay: 1500 })
      await page.screenshot({ path: 'screenshots/datepickerOpen.png' })

      // fill form
      await name.type('Testuser')
      await datepicker.type('31.12.2019')
      await people.type('1')
      await mail.type('kontakt@gruseltour-leipzig.de')
      await phone.type('+49016096776494')

      // submit form
      /*
            const submitButton = await page.$(
                "#contact-form-18 form .contact-submit button[type=submit]"
            );
            if (!submitButton) {
                return;
            }

            await submitButton.click();
            await page.waitForNavigation();
            */
      await page.screenshot({
        path: 'screenshots/afterFormSubmit.png'
      })

      await browser.close()
    } catch (error) {
      console.error('ProgramException', error)
    }
  })()
} catch (error) {
  console.error('SystemException', error)
}
