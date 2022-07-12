/// <reference types="cypress" />

export {};

describe("Explorer Page.", () => {
    before(() => {
        cy.clearCookies();
        cy.login();
        cy.intercept(
            "http://localhost:3333/api/v1/tweet?page=0&filter=top&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("top");
        cy.contains("Explorer").click();
        cy.wait(2000);
        cy.url().should("contain", "/explorer");
    });

    it("Should be able to search something.", () => {
        cy.intercept(
            "http://localhost:3333/api/v1/tweet?page=0&filter=top&search=first",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("search");
        const tweetText = "This is my first tweet here and I'm like all this.";
        cy.contains("Top").click().should("have.class", "active");
        cy.get("input").type("first");
        cy.get("[data-cy='search-button']").click();
        cy.wait("@search").its("response.statusCode").should("eq", 200);
        cy.contains(tweetText).should("exist");
    });

    it("Should be able to filter by latest.", () => {
        cy.intercept(
            "http://localhost:3333/api/v1/tweet?page=0&filter=latest&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("latest");
        const tweetText = "This is my first tweet here and I'm like all this.";
        cy.contains("Latest").click().should("have.class", "active");
        cy.wait(2000);
        cy.wait("@latest").its("response.statusCode").should("eq", 200);
        cy.contains(tweetText).should("exist");
    });

    it("Should be able to filter by media.", () => {
        cy.intercept(
            "http://localhost:3333/api/v1/tweet?page=0&filter=media&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("media");
        const tweetText = "This is my first tweet here and I'm like all this.";
        cy.contains("Media").click().should("have.class", "active");
        cy.wait(2000);
        cy.wait("@media").its("response.statusCode").should("eq", 200);
        cy.contains(tweetText).should("exist");
    });

    it("Should be able to filter by people.", () => {
        cy.intercept("http://localhost:3333/api/v1/user?page=0&name=", {
            method: "GET",
            statusCode: 200,
            fixture: "users.json",
        }).as("people");
        cy.contains("People").click().should("have.class", "active");
        cy.wait(2000);
        cy.wait("@people").its("response.statusCode").should("eq", 200);
        cy.contains("Shino Aki").should("exist");
    });

    it("Should be able to filter by top.", () => {
        cy.intercept(
            "http://localhost:3333/api/v1/tweet?page=0&filter=top&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("top");
        const tweetText = "This is my first tweet here and I'm like all this.";
        cy.contains("Top").click().should("have.class", "active");
        cy.wait(2000);
        cy.wait("@top").its("response.statusCode").should("eq", 200);
        cy.contains(tweetText).should("exist");
    });
});
