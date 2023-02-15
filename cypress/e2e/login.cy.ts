describe('Login', () => {
  it('Login if the form is valid for the first user', () => {
    cy.login('angular1', 'project1')
    cy.url().should('includes', 'neue')
  })

  it('No login if the username is invalid for the first user', () => {
    cy.login('mike', 'project1')
    cy.url().should('not.include', 'list')
    cy.url().should('includes', 'login')
  })

  it('No login if the password is invalid for the first user', () => {
    cy.login('angular1', 'project')
    cy.url().should('not.include', 'list')
    cy.url().should('includes', 'login')
  })

  it('No login if the username and the password are invalid for the first user', () => {
    cy.login('mike', 'project')
    cy.url().should('not.include', 'list')
    cy.url().should('includes', 'login')
  })

  it('Login if the form is valid for the second user', () => {
    cy.login('angular2', 'project2')
    cy.url().should('includes', 'neue')
  })

  it('No login if the username is invalid for the second user', () => {
    cy.login('mike', 'project2')
    cy.url().should('not.include', 'list')
    cy.url().should('includes', 'login')
  })

  it('No login if the password is invalid for the second user', () => {
    cy.login('angular2', 'project10')
    cy.url().should('not.include', 'list')
    cy.url().should('includes', 'login')
  })

  it('No login if the username and the password are invalid for the second user', () => {
    cy.login('mike', 'project')
    cy.url().should('not.include', 'list')
    cy.url().should('includes', 'login')
  })
})
