import GaragePage from "../support/pages/GaragePage";
 
describe("Garage + API + Expenses", () => {
  let carId;
 
  const createCarViaUi = () => {
    cy.intercept("POST", "/api/cars").as("createCar");
 
    GaragePage.addCarButton().click();
 
    GaragePage.addCarBrand().select("Audi");
    GaragePage.addCarModel().select("TT");
    GaragePage.addCarMileage().type("101");
 
    GaragePage.addButton().click();
 
    return cy.wait("@createCar").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
 
      carId = interception.response.body.data.id;
      return carId;
    });
  };
 
  beforeEach(() => {
    cy.login(Cypress.env("email"), Cypress.env("password"));
  });
 

  // 1. CREATE CAR (UI + INTERCEPT)

  it("Create car (UI + intercept)", () => {
    createCarViaUi();
 
    cy.contains("Audi TT").should("be.visible");
  });
 

  // 2. VERIFY CAR (API)

  it("Verify car via API", () => {
    createCarViaUi().then((createdCarId) => {
      cy.request({
        method: "GET",
        url: "/api/cars",
      }).then((resp) => {
        expect(resp.status).to.eq(200);
 
        const car = resp.body.data.find((c) => c.id === createdCarId);
 
        expect(car).to.exist;
        expect(car.brand).to.eq("Audi");
        expect(car.model).to.eq("TT");
      });
    });
  });
 
 
  // 3. CREATE EXPENSE (API + UI CHECK)

 it("Create expense via API + check UI", () => {
    createCarViaUi().then((createdCarId) => {
      const mileage = 200;
      const liters = 20;
      const totalCost = 1000;
      const reportedAt = "2026-04-01T00:00:00.000Z";
 
      cy.createExpense(createdCarId, mileage, liters, totalCost, reportedAt).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.data.carId).to.eq(createdCarId);
        expect(resp.body.data.mileage).to.eq(mileage);
        expect(resp.body.data.liters).to.eq(liters);
        expect(resp.body.data.totalCost).to.eq(totalCost);
 
        const createdExpenseId = resp.body.data.id;
 
        cy.request({
          method: "GET",
          url: "/api/expenses",
        }).then((expensesResp) => {
          expect(expensesResp.status).to.eq(200);
 
          const createdExpense = expensesResp.body.data.find(
            (expense) => expense.id === createdExpenseId
          );
 
          expect(createdExpense).to.exist;
          expect(createdExpense.carId).to.eq(createdCarId);
          expect(createdExpense.liters).to.eq(liters);
          expect(createdExpense.totalCost).to.eq(totalCost);
        });
      });
 
      cy.contains(".car-item", "Audi TT", { timeout: 10000 }).should("be.visible");
 
      cy.contains(".car-item", "Audi TT").within(() => {
        cy.contains("button", "Add fuel expense").should("be.visible").click();
      });
    });
  });
});