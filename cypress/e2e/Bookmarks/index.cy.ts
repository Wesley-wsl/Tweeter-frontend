/// <reference types="cypress" />

export {};

describe("Bookmarks Page.", () => {
    before(() => {
        cy.clearCookies();
        cy.login();
        cy.contains("Bookmarks").click();
        cy.wait(1000);
        cy.url().should("contain", "/bookmarks");
        cy.intercept(
            "http://localhost:3333/api/v1/user/*/bookmarks?page=0&filter=tweets&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("bookmarks");
        cy.intercept(
            "http://localhost:3333/api/v1/user/*/bookmarks?page=0&filter=media&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("bookmarksMedia");
        cy.intercept(
            "http://localhost:3333/api/v1/user/*/bookmarks?page=0&filter=likes&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("bookmarksLikes");
    });

    it("Should be able to activate filters.", () => {
        const tweetText = "This is my first tweet here and I'm like all this.";
        cy.contains("Tweets").should("have.class", "active").click();
        cy.wait("@bookmarks").its("response.statusCode").should("eq", 200);
        cy.contains(tweetText).should("exist");
        cy.contains("Media").click().should("have.class", "active");
        cy.wait("@bookmarksMedia").its("response.statusCode").should("eq", 200);
        cy.contains(tweetText).should("exist");
        cy.contains("Likes").click().should("have.class", "active");
        cy.wait("@bookmarksLikes").its("response.statusCode").should("eq", 200);
        cy.contains(tweetText).should("exist");
    });
});
