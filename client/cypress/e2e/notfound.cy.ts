import { notFound } from '../selectors/notFound'

describe('notfound page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/d')
  })
  it('it should have not found messages', () => {
    cy.get(notFound.notFoundHeading).should('have.text', '404')
    cy.get(notFound.notFoundParagraph).should('have.text', 'Page Not Found')
  })
})
