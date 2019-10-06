describe('Anmeldung Berlin', () => {
  const datepickerSelector = '#wpforms-1839-field_19.hasDatepicker'

  before(() => {
    cy.visit('https://gruseltour-berlin.de/')
    cy.waitForResourceToLoad('jquery-3.4.1.min.js')
  })

  it('has a datepicker, which is readonly', () => {
    cy.get(datepickerSelector).should('have.attr', 'readonly')
  })

  it('has a datepicker, which is opens, when clicked', () => {
    cy.get(datepickerSelector)
      .should('have.class', 'hasDatepicker')
      .and('have.class', 'readonly')
      .click({ force: true })
      .scrollIntoView()
      .screenshot()
  })

  it('has a form, with values', () => {
    return cy
      .get('#wpforms-form-1839 div input')
      .spread((datepicker, name, people, mail, phone, coupon) => {
        // fill form
        cy.wrap(datepicker)
          .invoke('val', '31.12.2022')
          .should('have.value', '31.12.2022')
        cy.wrap(name)
          .type('Test User')
          .should('have.value', 'Test User')
        cy.wrap(people)
          .type('1')
          .should('have.value', '1')
        cy.wrap(mail)
          .type('kontakt@gruseltour-leipzig.de')
          .should('have.value', 'kontakt@gruseltour-leipzig.de')
        cy.wrap(phone)
          .type('+49016096776494')
          .should('have.value', '+49016096776494')

        // submit form
        cy.get('button[type=submit]#wpforms-submit-1839 ').click()
      })
  })
})
