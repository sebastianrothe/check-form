context('Anmeldung Leipzig', () => {
  beforeEach(() => {
    cy.visit('https://gruseltour-leipzig.de/anmeldung/')
    cy.waitForResourceToLoad('jquery-3.4.1.min.js')
  })

  it('has a datepicker, which is readonly', () => {
    const datepickerSelector =
      '#contact-form-18 form div input[type=text].hasDatepicker'

    cy.get(datepickerSelector).should('have.attr', 'readonly')
  })

  it('has a datepicker, which is opens, when clicked', () => {
    const datepickerSelector =
      '#contact-form-18 form div input[type=text].hasDatepicker'

    cy.get(datepickerSelector)
      .should('have.class', 'hasDatepicker')
      .should('have.class', 'ui-datepicker-readonly')
      .click({ force: true })
      .scrollIntoView()
      .screenshot()
  })

  it('has a form, with values', () => {
    return cy
      .get('#contact-form-18 form div input')
      .spread((name, datepicker, people, coupon, mail, phone) => {
        // fill form
        cy.wrap(name)
          .type('Testuser')
          .should('have.value', 'Testuser')
        cy.wrap(datepicker)
          .type('31.12.2022', { force: true })
          .should('have.value', '31.12.2022')
        cy.wrap(datepicker).type('{esc}', { force: true })
        // cy.wrap(datepicker).click({ force: true })
        // cy.wait(1000)
        cy.wrap(people)
          .type('1')
          .should('have.value', '1')
        cy.wrap(mail)
          .type('kontakt@gruseltour-leipzig.de')
          .should('have.value', 'kontakt@gruseltour-leipzig.de')
        cy.wrap(phone)
          .type('+49016096776494')
          .should('have.value', '+49016096776494')

        // cy.screenshot()

        // submit form
        cy.get(
          '#contact-form-18 form .contact-submit button[type=submit]'
        ).click()
      })
  })
})
