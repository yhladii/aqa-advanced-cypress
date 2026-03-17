describe("Header and Footer elements visibility", () => {

  beforeEach(() => {
    cy.visit("/")
  })

  it("Check Sign In button in header", () => {

    const headerButtons = ["Sign In"]

    headerButtons.forEach((button) => {
      cy.contains("button", button)
        .should("be.visible")
    })

  })

  it("Check footer icons and contacts", () => {

    cy.get('a[href*="facebook"]').should("be.visible")
    cy.get('a[href*="t.me"]').should("be.visible")
    cy.get('a[href*="youtube"]').should("be.visible")
    cy.get('a[href*="instagram"]').should("be.visible")
    cy.get('a[href*="linkedin"]').should("be.visible")

    cy.get('a[href*="ithillel"]').should("be.visible")

    cy.contains("a", "support@ithillel.ua")
      .should("be.visible")

  })

})