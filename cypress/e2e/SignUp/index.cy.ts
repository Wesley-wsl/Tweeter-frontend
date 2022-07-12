/// <reference types="cypress" />

export {};

describe("SignUp Page.", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.contains("Don' t have an account? register here").click();
        cy.url().should("contain", "/signup");
    });

    it("Should be able to render page correctly.", () => {
        cy.get("input[type=email]").should("exist");
        cy.get("input[type=password]").should("exist");
        cy.get("input[name=name]").should("exist");
        cy.contains("Sign Up").should("exist");
        cy.contains("Already have an account? sign in here").should("exist");
    });

    it("Should be able to go to sign in page.", () => {
        cy.contains("Already have an account? sign in here").click();
        cy.url().should("contain", "/");
    });

    it("Shouldn't be able to register without name.", () => {
        cy.contains("Sign Up").should("exist");
        cy.get("input[type=email]").clear().type("jorkis@gmail.com");
        cy.get("input[type=password]").clear().type("1234567");
        cy.get("input[name=name]").clear();
        cy.contains("Sign Up").click();
        cy.contains("Name is required").should("exist");
        cy.contains("Email is required!").should("not.exist");
        cy.contains("Password is required!").should("not.exist");
    });

    it("Shouldn't be able to register without email.", () => {
        cy.contains("Sign Up").should("exist");
        cy.get("input[name=name]").clear().type("Jorkis");
        cy.get("input[type=email]").clear();
        cy.get("input[type=password]").clear().type("1234567");
        cy.contains("Sign Up").click();
        cy.contains("Name is required").should("not.exist");
        cy.contains("Email is required!").should("exist");
        cy.contains("Password is required!").should("not.exist");
    });

    it("Shouldn't be able to register without password.", () => {
        cy.contains("Sign Up").should("exist");
        cy.get("input[type=email]").clear().type("jorkis@gmail.com");
        cy.get("input[type=password]").clear();
        cy.get("input[name=name]").clear().type("Jorkis");
        cy.contains("Sign Up").click();
        cy.contains("Password is required!").should("exist");
        cy.contains("Email is required!").should("not.exist");
        cy.contains("Name is required").should("not.exist");
    });

    it("Should be able to create a new user if all fields are filled correctly.", () => {
        cy.intercept("http://localhost:3333/api/v1/user/", {
            method: "POST",
            statusCode: 201,
        }).as("signup");
        cy.contains("Sign Up").should("exist");
        cy.get("input[type=email]").clear().type("jorkis@gmail.com");
        cy.get("input[type=password]").clear().type("123456");
        cy.get("input[name=name]").clear().type("Jorkis");
        cy.contains("Sign Up").click();
        cy.wait("@signup").its("response.statusCode").should("eq", 201);
    });
});
