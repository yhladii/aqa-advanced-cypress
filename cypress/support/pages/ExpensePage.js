class ExpensePage {
  addExpenseButton() {
    return cy.contains("button", "Add fuel expense");
  }
  addExpeseCar() {
    return cy.get("#addExpenseCar");
  }
  addExpenseDate() {
    return cy.get("#addExpenseDate");
  }
  addExpenseMileage() {
    return cy.get("#addExpenseMileage");
  }
  addExpenseLiters() {
    return cy.get("#addExpenseLiters");
  }
  addExpenseTotalCost() {
    return cy.get("#addExpenseTotalCost");
  }
addButton() {
  return cy.get('.modal')   
    .within(() => {
      cy.contains('button', 'Add').click();
    });
}}
export default new ExpensePage();
