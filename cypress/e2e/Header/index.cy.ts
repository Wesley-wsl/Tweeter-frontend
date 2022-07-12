/// <reference types="cypress" />

export {};

describe("Actions about header.", () => {
    before(() => {
        cy.clearCookies();
        cy.login();
    });

    it("Should be able to navigate between all pages..", () => {
        cy.contains("Home").click();
        cy.wait(2000);
        cy.url().should("contain", "/home");
        cy.contains("Explorer").click();
        cy.wait(2000);
        cy.url().should("contain", "/explorer");
        cy.contains("Bookmarks").click();
        cy.wait(2000);
        cy.url().should("contain", "/bookmarks");
        cy.get("[aria-label='Icon arrow down that open profile menu']")
            .should("exist")
            .click();
        cy.contains("My profile").click();
        cy.wait(2000);
        cy.url().should("contain", "/profile");
    });

    it("Should be able to render correctly.", () => {
        cy.contains("Home").should("exist");
        cy.contains("Explorer").should("exist");
        cy.contains("Bookmarks").should("exist");
        cy.get("[alt='Logo']").should("exist");
        cy.get("[aria-label='Icon arrow down that open profile menu']").should(
            "exist",
        );
    });

    it("Should be able to toggle between dark/light mode.", () => {
        cy.get("[aria-label='Icon arrow down that open profile menu']")
            .should("exist")
            .click();
        cy.contains("Dark Mode").click();
        cy.get("body").should(
            "have.css",
            "background-color",
            "rgb(230, 230, 230)",
        );
        cy.get("[aria-label='Icon arrow down that open profile menu']").click();
        cy.contains("Dark Mode").click();
        cy.get("body").should("have.css", "background-color", "rgb(4, 4, 4)");
    });

    it("Should be able to logout.", () => {
        cy.get("[aria-label='Icon arrow down that open profile menu']")
            .should("exist")
            .click();
        cy.contains("Logout").should("exist").click();
        cy.url().should("contain", "/");
    });
});
