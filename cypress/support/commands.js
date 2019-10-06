// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

function waitForResourceToLoad(fileName, type) {
  const resourceCheckInterval = 40

  return new Cypress.Promise(resolve => {
    const checkIfResourceHasBeenLoaded = () => {
      const resource = cy
        .state('window')
        .performance.getEntriesByType('resource')
        .filter(entry => !type || entry.initiatorType === type)
        .find(entry => entry.name.includes(fileName))

      if (resource) {
        resolve()

        return
      }

      setTimeout(checkIfResourceHasBeenLoaded, resourceCheckInterval)
    }

    checkIfResourceHasBeenLoaded()
  })
}

Cypress.Commands.add('waitForResourceToLoad', waitForResourceToLoad)
