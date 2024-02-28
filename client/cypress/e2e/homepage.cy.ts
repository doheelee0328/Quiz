import { homepageSelectors } from '../selectors/homepageSelectors'
describe('homepage component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should have heading', () => {
    cy.get(homepageSelectors.homepageHeading).should(
      'contain.text',
      'Welcome To SmartDuck'
    )
  })
  it('should have the learning paragraph', () => {
    cy.get(homepageSelectors.homepageParagraph).should(
      'contain.text',
      'Click the duck to begin your learning'
    )
  })
  it('should have the images', () => {
    cy.get(homepageSelectors.homepageArrowImage).should(
      'have.attr',
      'alt',
      'arrow'
    )
    cy.get(homepageSelectors.homepageDuckImage).should(
      'have.attr',
      'alt',
      'duck'
    )
  })
  it('should navigate to the character page when the duck image is clicked', () => {
    cy.get(homepageSelectors.homepageDuckImage).click()
    cy.url().should('match', /\/character/)
  })
})
