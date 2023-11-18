# check-form

Runs browser tests to check on various things:

-   the registration form
-   the purchase of vouchers, calenders

## Requirements

`npx playwright install`

## Generate tests

`npx playwright codegen gruseltour-leipzig.de`

## Run the tests

`npx playwright test register --project=firefox`

### With UI for debugging

`npx playwright test register --project=firefox --ui`
