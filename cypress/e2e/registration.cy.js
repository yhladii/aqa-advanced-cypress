describe("Registration", () => {
  const RED_BORDER_RGB = "rgb(220, 53, 69)";

  const sel = {
    signupName: "#signupName",

    signupLastName: "#signupLastName",

    signupEmail: "#signupEmail",

    signupPassword: "#signupPassword",

    signupRepeatPassword: "#signupRepeatPassword",
  };

  const uniqueEmail = (prefix = "qa") =>
    `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;

  const openRegistration = () => {
    cy.visit("/");

    cy.contains("button", "Sign In").click();

    cy.contains("button", "Registration").click();

    cy.contains(/Registration/i).should("be.visible");
  };

  const expectFieldError = (inputSelector, message) => {
    cy.get(`${inputSelector} + .invalid-feedback`)
      .should("be.visible")
      .and("have.text", message);
  };

  beforeEach(() => {
    openRegistration();
  });

  it('Name: empty -> "Name is required"', () => {
    cy.get(sel.signupName).type("A").clear().blur();
    expectFieldError(sel.signupName, "Name required");
    cy.contains("button", "Register").should("be.disabled");
    cy.get(sel.signupName).should("have.css", "border-color", RED_BORDER_RGB);
  });

  it('Name: wrong data -> "Name is invalid"', () => {
    cy.get(sel.signupName).type("Іван").blur();

    expectFieldError(sel.signupName, "Name is invalid");

    cy.contains("button", "Register").should("be.disabled");
  });

  it('Name: wrong length -> "Name has to be from 2 to 20 characters long"', () => {
    cy.get(sel.signupName).type("A").blur();

    cy.get(sel.signupName).clear().type("Aaaaaaaaaaaaaaaaaaaaa").blur();

    expectFieldError(
      sel.signupName,
      "Name has to be from 2 to 20 characters long",
    );

    cy.contains("button", "Register").should("be.disabled");
  });

  it('Last name: empty -> "Last name is required"', () => {
    cy.get(sel.signupLastName).type("A").clear().blur();
    expectFieldError(sel.signupLastName, "Last name required");
    cy.contains("button", "Register").should("be.disabled");
  });

  it('Last name: wrong data -> "Last name is invalid"', () => {
    cy.get(sel.signupLastName).type("Петренко").blur();

    expectFieldError(sel.signupLastName, "Last name is invalid");

    cy.contains("button", "Register").should("be.disabled");
  });

  it('Last name: wrong length -> "Last name has to be from 2 to 20 characters long"', () => {
    cy.get(sel.signupLastName).type("B").blur();

    cy.get(sel.signupLastName).clear().type("Bbbbbbbbbbbbbbbbbbbbb").blur();

    expectFieldError(
      sel.signupLastName,
      "Last name has to be from 2 to 20 characters long",
    );

    cy.contains("button", "Register").should("be.disabled");
  });

  it('Email: empty -> "Email required"', () => {
    cy.get(sel.signupEmail).focus().blur();

    expectFieldError(sel.signupEmail, "Email required");

    cy.contains("button", "Register").should("be.disabled");
  });

  it('Email: wrong data -> "Email is incorrect"', () => {
    cy.get(sel.signupEmail).type("not-an-email").blur();

    expectFieldError(sel.signupEmail, "Email is incorrect");

    cy.contains("button", "Register").should("be.disabled");
  });

  it('Password: empty -> "Password required"', () => {
    cy.get(sel.signupPassword).focus().blur();

    expectFieldError(sel.signupPassword, "Password required");

    cy.contains("button", "Register").should("be.disabled");
  });

  it("Password: wrong data -> complexity error", () => {
    cy.get(sel.signupPassword).type("Qwe4567", { sensitive: true }).blur();
    cy.get(sel.signupPassword)
      .clear()
      .type("Qwerty7891234569", { sensitive: true })
      .blur();
    cy.get(sel.signupPassword)
      .clear()
      .type("qwerty789123456", { sensitive: true })
      .blur();
    cy.get(sel.signupPassword)
      .clear()
      .type("QWERTY789123456", { sensitive: true })
      .blur();
    cy.get(sel.signupPassword)
      .clear()
      .type("Qwertyuio", { sensitive: true })
      .blur();

    expectFieldError(
      sel.signupPassword,

      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    );

    cy.contains("button", "Register").should("be.disabled");
  });

  it('Re-enter password: empty -> "Re-enter password required"', () => {
    cy.get(sel.signupRepeatPassword).focus().blur();

    expectFieldError(sel.signupRepeatPassword, "Re-enter password required");

    cy.contains("button", "Register").should("be.disabled");
  });

  it('Re-enter password: mismatch -> "Passwords do not match"', () => {
    cy.get(sel.signupPassword).type("Qauto1234", { sensitive: true }).blur();

    cy.get(sel.signupRepeatPassword)
      .type("Qauto12345", { sensitive: true })
      .blur();

    expectFieldError(sel.signupRepeatPassword, "Passwords do not match");

    cy.contains("button", "Register").should("be.disabled");
  });

  it("Successful registration (trim spaces) + login() via UI", () => {
    const email = uniqueEmail("reg");

    const password = "Qauto1234";
    const name = " John ".trim();
    const lastName = " Doe ".trim();

    cy.get(sel.signupName).type(name).blur();
    cy.get(sel.signupLastName).type(lastName).blur();

    cy.get(sel.signupEmail).type(email).blur();

    cy.get(sel.signupPassword).type(password, { sensitive: true }).blur();

    cy.get(sel.signupRepeatPassword).type(password, { sensitive: true }).blur();

    cy.contains("button", "Register").should("be.enabled").click();

    cy.url().should("include", "/panel/garage");

    cy.clearCookies();

    cy.clearLocalStorage();

    cy.login(email, password);
  });
});
