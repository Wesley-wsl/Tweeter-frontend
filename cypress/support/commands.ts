/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-namespace */

import "./commands";

declare global {
    namespace Cypress {
        interface Chainable {
            login(): Chainable;
        }
    }
}

Cypress.Commands.add("login", () => {
    cy.visit("/");
    cy.intercept("http://localhost:3333/api/v1/user/login").as("signIn");
    cy.get("input[type=email]").clear().type(Cypress.env("email"));
    cy.get("input[type=password]").clear().type(Cypress.env("password"));
    cy.contains("Sign In").click();
    cy.wait("@signIn").its("response.statusCode").should("eq", 200);
    cy.contains("Email/password incorrect").should("not.exist");
    cy.contains("Email is required!").should("not.exist");
    cy.contains("Password is required!").should("not.exist");
    cy.wait(2000);
    cy.url().should("contain", "/profile");
});
