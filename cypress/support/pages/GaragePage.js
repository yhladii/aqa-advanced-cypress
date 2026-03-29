class GaragePage {
  addCarButton() {
    return cy.contains("button", "Add car");
  }
  addCarBrand() {
    return cy.get("#addCarBrand");
  }
  addCarModel() {
    return cy.get("#addCarModel");
  }
  addCarMileage() {
    return cy.get("#addCarMileage");
  }
addButton() {
  return cy.get('ngb-modal-window')
    .should('be.visible')
    .contains('button', 'Add');
}
  }

export default new GaragePage();
