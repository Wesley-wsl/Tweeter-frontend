/// <reference types="cypress" />

export {};

describe("Home Page.", () => {
    before(() => {
        cy.clearCookies();
        cy.login();
        cy.intercept(
            "http://localhost:3333/api/v1/tweet?page=0&filter=latest&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("latest");
        cy.intercept("http://localhost:3333/api/v1/tweet/me/trends", {
            method: "GET",
            statusCode: 200,
            body: {
                data: [
                    {
                        trend: "#backend",
                        tweetsQuantity: 1,
                    },
                ],
            },
        }).as("trends");
        cy.intercept("http://localhost:3333/api/v1/user/me/whofollow", {
            method: "GET",
            statusCode: 200,
            fixture: "users.json",
        }).as("whoFollow");
        cy.contains("Home").click();
        cy.wait(2000);
        cy.url().should("contain", "/home");
    });

    it("Should be able to render correctly.", () => {
        cy.url().should("contain", "/home");
        cy.contains("Tweet something").should("exist");
        cy.contains("Trends for you").should("exist");
        cy.contains("Who to follow").should("exist");
        cy.contains(
            "This is my first tweet here and I'm like all this.",
        ).should("exist");
        cy.wait("@trends").its("response.statusCode").should("eq", 200);
        cy.wait("@whoFollow").its("response.statusCode").should("eq", 200);
    });

    it("Should be able to write a tweet.", () => {
        const tweet =
            "#backend Hello world! This tweet is just a test for e2e. Don't worry about it just enjoy it.";
        cy.intercept("http://localhost:3333/api/v1/tweet", {
            method: "POST",
            statusCode: 200,
            body: {
                data: {
                    author: {
                        name: "Jorkis",
                        id: "0",
                        avatar: "null",
                        background: null,
                        created_at: "2022-05-15T18:20:47.213Z",
                    },
                    author_id: "10",
                    comments: [],
                    comments_id: [],
                    content: tweet,
                    id: "0",
                    image: null,
                    isPublic: "false",
                    liked_users_id: [],
                    likes: 0,
                    tweet_id: null,
                    created_at: "2022-05-15T18:21:03.778Z",
                    users_saved_id: [],
                },
            },
        }).as("write-tweet");
        cy.get("[data-cy='write-tweet-textarea']")
            .clear({
                force: true,
            })
            .type(tweet);
        cy.get("[data-cy='write-tweet-button']").click({
            force: true,
        });
        cy.wait("@write-tweet").its("response.statusCode").should("eq", 200);
        cy.contains(tweet).should("exist");
    });

    it("Should be able to filter tweets by trend", () => {
        cy.intercept(
            "http://localhost:3333/api/v1/tweet?page=0&filter=latest&search=",
            {
                method: "GET",
                statusCode: 200,
                fixture: "tweets.json",
            },
        ).as("latest");
        cy.intercept("tweet?page=0&filter=latest&search=backend", {
            method: "GET",
            statusCode: 200,
            fixture: "tweet-trends.json",
        }).as("tweet-trends");
        cy.get('[data-testid="trend"] > :nth-child(1)').click({
            force: true,
        });
        cy.wait("@tweet-trends").its("response.statusCode").should("eq", 200);
        cy.get('[data-testid="trend"] > :nth-child(1)').click({
            force: true,
        });
        cy.wait("@latest").its("response.statusCode").should("eq", 200);
    });

    it("Should be able to follow/unfollow users that was recomeded to follow", () => {
        cy.intercept("http://localhost:3333/api/v1/user/follower/*", {
            method: "PUT",
            statusCode: 204,
        }).as("follow");
        cy.intercept("http://localhost:3333/api/v1/user/unfollow/*", {
            method: "DELETE",
            statusCode: 204,
        }).as("unfollow");
        cy.get(
            ":nth-child(2) > :nth-child(1) > :nth-child(2) > .styles__Container-sc-143d01-0",
        ).click({ force: true });
        cy.wait("@follow").its("response.statusCode").should("eq", 204);
        cy.contains("Unfollow").should("exist").click();
        cy.wait("@unfollow").its("response.statusCode").should("eq", 204);
    });

    context("navigate between pages in home.", () => {
        before(() => {
            cy.login();
            cy.intercept("http://localhost:3333/api/v1/user/me/whofollow", {
                method: "GET",
                statusCode: 200,
                fixture: "users.json",
            }).as("whoFollow");
        });

        it("Should be able to go to profile page of the person to follow when click on the name.", () => {
            cy.contains("Home").click();
            cy.wait(2000);
            cy.url().should("contain", "/home");
            cy.wait("@whoFollow").its("response.statusCode").should("eq", 200);
            cy.contains("Shino Aki").click({ force: true });
            cy.url().should("contain", "/profile");
        });
    });
});
