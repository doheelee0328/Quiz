import { character } from './../selectors/character'
import { loginSelectors } from './../selectors/login'

const { nicknameTitle, input, selectedCharacter, backButton } = loginSelectors
const { characterImage, characterNextButton } = character

describe('Login Page', () => {
  it('should have a focus on the input when the page loads', () => {
    cy.visit('http://localhost:3000/#/login')
    cy.get(input).should('have.focus')
  })

  it('should have nickname title', () => {
    cy.visit('http://localhost:3000/#/login')
    cy.get(nicknameTitle).should('contain.text', 'Nickname')
  })

  it('should have the selected character when the user clicks on the specific character', () => {
    cy.visit('http://localhost:3000/#/character')
    cy.get(characterImage)
      .click()
      .then(() => {
        cy.get(characterNextButton)
          .click()
          .then(() => {
            cy.url().should('match', /\/login/)
            cy.get(selectedCharacter).should(
              'have.attr',
              'alt',
              'selected-character'
            )
          })
      })
  })

  it('should have back button that navigates to the character page', () => {
    cy.visit('http://localhost:3000/#/login')
    cy.get(backButton).click()
    cy.url().should('match', /\/character/)
  })
})
