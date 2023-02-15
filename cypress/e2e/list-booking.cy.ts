describe('List of bookings', () => {

  it('Open the list page if the user click on the button List of bookings', () => {
    cy.login('angular1', 'project1')
    cy.url().should('includes', 'buchung')
    cy.get('app-navbar [data-cy = "list-button"]').click();
    cy.url().should('includes', 'list')
  })

  it('Open the New-booking page if the user click on the button New-booking', () => {
    cy.login('angular1', 'project1')
    cy.url().should('includes', 'buchung')
    cy.get('app-navbar [data-cy = "list-button"]').click();
    cy.url().should('includes', 'list')
    cy.get('app-navbar [data-cy = "new-booking-button"]').click();
    cy.url().should('includes', 'buchung')
  })

  it('Open the entertainment page if the user click on the button entertainment', () => {
    cy.login('angular1', 'project1')
    cy.url().should('includes', 'buchung')
    cy.get('app-navbar [data-cy = "list-button"]').click();
    cy.url().should('includes', 'list')
    cy.get('app-navbar [data-cy = "entertainment-button"]').click();
    cy.url().should('includes', 'chatbot')
  })

  it('Logout if the user click on the logout button from the booking page', () => {
    cy.login('angular1', 'project1')
    cy.url().should('includes', 'buchung')
    cy.get('app-navbar [data-cy = "list-button"]').click();
    cy.url().should('includes', 'list')
    cy.get('app-navbar [data-cy = "logout-button"]').click();
    cy.url().should('includes', 'login')
  })

})
