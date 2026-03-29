import GaragePage from "../support/pages/GaragePage";
import ExpensePage from "../support/pages/ExpensePage";

describe("Garage + Expense", () => {
  it("should add car and fuel expense", () => {
    cy.login(Cypress.env("email"), Cypress.env("password"));

    //add car
    GaragePage.addCarButton().click();
    GaragePage.addCarBrand()
      .find("option:selected")
      .should("contain.text", "Audi");
    GaragePage.addCarModel()
      .find("option:selected")
      .should("contain.text", "TT");
    GaragePage.addCarMileage().type("101");
    GaragePage.addButton().should("be.enabled");
    cy.get("form").should("have.class", "ng-valid");
    cy.get(".invalid-feedback").should("not.exist");
    GaragePage.addButton().click();
    cy.get("ngb-modal-window").should("not.be.visible");

    cy.contains("Audi TT").should("be.visible");

    //add expense
    cy.contains(".car-item", "Audi TT").within(() => {
      cy.contains("button", "Add fuel expense").click();
    });

    ExpensePage.addExpenseMileage().type("101");
    ExpensePage.addExpenseLiters().type("20");
    ExpensePage.addExpenseTotalCost().type("1000");
    ExpensePage.addButton().click();

    cy.contains("20").should("be.visible");
  });
});
