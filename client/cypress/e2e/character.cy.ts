import { character } from '../selectors/character'

const {
  characterHeading,
  characterImage,
  characterChosenMessage,
  characterBackButton,
  characterNextButton,
} = character

describe('Character page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/character')
  })
  it('should have the heading', () => {
    cy.get(characterHeading).should('contain.text', 'Choose Your Duck')
  })

  it('should have at least one duck image', () => {
    cy.get(characterImage).should('have.attr', 'alt', 'duck1')
  })

  it('should have the message when the duck image is clicked', () => {
    cy.get(characterImage).click()
    cy.get(characterChosenMessage).should(
      'contain.text',
      'Your character has been chosen'
    )
  })
  it('should navigate to the homepage when back button is clicked', () => {
    cy.get(characterBackButton).click()
    cy.location('pathname').should('eq', '/')
  })
  it('should navigate to the login page when image is selected', () => {
    cy.get(characterImage)
      .click()
      .then(() => {
        cy.get(characterNextButton).click()
        cy.url().should('match', /\/login/)
      })
  })
  it('should have an error message when the image is not clicked', () => {
    cy.get(characterNextButton).click()

    cy.get(characterChosenMessage).should(
      'contain.text',
      'Please select your character'
    )
  })

  it('should not navigate to the next page if the character is not chosen', () => {
    cy.get(characterNextButton).click()

    cy.url().should('not.match', /\/login/)
  })
})
