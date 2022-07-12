/// <reference types="cypress" />

export {};

describe("Sign In Page.", () => {
    before(() => {
        cy.visit("/");
    });

    it("Should be able to render page correctly.", () => {
        cy.get("input[type=email]").should("exist");
        cy.get("input[type=password]").should("exist");
        cy.contains("Sign In").should("exist");
        cy.contains("Don' t have an account? register here").should("exist");
    });

    it("Should be able to go to sign up page.", () => {
        cy.get("a").should("exist");
        cy.get("a").click();
        cy.url().should("contain", "/signup");
    });

    it("Shouldn't be able to login without email/password.", () => {
        cy.visit("/");
        cy.get("input[type=email]").clear();
        cy.get("input[type=password]").clear();
        cy.contains("Sign In").click();
        cy.contains("Email is required!").should("exist");
        cy.contains("Password is required!").should("exist");
    });

    it("Shouldn't be able to login without email.", () => {
        cy.get("input[type=email]").clear();
        cy.get("input[type=password]").clear().type("123456");
        cy.contains("Sign In").click();
        cy.contains("Email is required!").should("exist");
        cy.contains("Password is required!").should("not.exist");
    });

    it("Shouldn't be able to login without password.", () => {
        cy.get("input[type=email]").clear().type("jorkis@gmail.com");
        cy.get("input[type=password]").clear();
        cy.contains("Sign In").click();
        cy.contains("Password is required!").should("exist");
        cy.contains("Email is required!").should("not.exist");
    });

    it("Shouldn't be able to login with email/password incorrect.", () => {
        cy.intercept("http://localhost:3333/api/v1/user/login", {
            method: "POST",
            statusCode: 400,
            body: {
                error: "Email/password incorrect",
            },
        }).as("signIn");
        cy.get("input[type=email]").clear().type("jorkis@gmail.com");
        cy.get("input[type=password]").clear().type("1234567");
        cy.contains("Sign In").click();
        cy.wait("@signIn").its("response.statusCode").should("eq", 400);
        cy.contains("Email/password incorrect").should("exist");
    });

    it("Should be able to login with correct data.", () => {
        cy.login();
    });
});
