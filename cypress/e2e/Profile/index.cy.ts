/// <reference types="cypress" />

export {};

describe("Profile Page.", () => {
    before(() => {
        cy.intercept("http://localhost:3333/api/v1/user/*/following", {
            method: "GET",
            statusCode: 200,
            fixture: "users.json",
        }).as("followings");
        cy.intercept("http://localhost:3333/api/v1/user/*/followers", {
            method: "GET",
            statusCode: 200,
            fixture: "users.json",
        }).as("followers");
        cy.intercept("http://localhost:3333/api/v1/tweet/*", {
            method: "GET",
            statusCode: 200,
            fixture: "tweets.json",
        }).as("tweets");
        cy.login();
    });

    it("Should be able to render page correctly.", () => {
        cy.url().should("contain", "/profile");
        cy.get("[alt='Logo']").should("exist");
        cy.contains("Home").should("exist");
        cy.contains("Explorer").should("exist");
        cy.contains("Bookmarks").should("exist");
        cy.contains("Tweets").should("exist");
        cy.contains("Media").should("exist");
        cy.contains("Likes").should("exist");
        cy.get("[aria-label='Icon arrow down that open profile menu']").should(
            "exist",
        );
    });

    it("Should be able to see followings.", () => {
        cy.contains("Following").click();
        cy.get("[aria-label='Close icon to close modal.']").should("exist");
        cy.wait(2000);
        cy.contains("Shino Aki").should("exist");
        cy.contains("Houtarou Oreki").should("exist");
        cy.get("[aria-label='Close icon to close modal.']").click();
    });

    it("Should be able to see followers.", () => {
        cy.contains("Followers").click();
        cy.get("[aria-label='Close icon to close modal.']").should("exist");
        cy.wait(2000);
        cy.contains("Shino Aki").should("exist");
        cy.contains("Houtarou Oreki").should("exist");
        cy.get("[aria-label='Close icon to close modal.']").click();
    });

    it("Should be able to edit about_me.", () => {
        cy.intercept("http://localhost:3333/api/v1/user/*", {
            method: "PUT",
            statusCode: 200,
        }).as("about_me");
        cy.get("[data-cy='about-me']")
            .click()
            .clear()
            .type("Hello World")
            .blur();
        cy.wait("@about_me").its("response.statusCode").should("eq", 200);
    });

    it("Should be able to open modal to change avatar/background.", () => {
        cy.get(".styles__Container-sc-deco9q-0 > .changeImage")
            .should("exist")
            .click();
        cy.contains(
            "Drag and drop one file here, or click here to select file",
        );
        cy.get('[data-testid="modal-overlay"]')
            .should("exist")
            .click({ force: true });
    });

    it("Should be able to activate filters.", () => {
        cy.contains("Tweets").should("have.class", "active").click();
        cy.contains("Media").click().should("have.class", "active");
        cy.contains("Likes").click().should("have.class", "active");
    });

    it("Should be able to make a comment for a tweet in profile page.", () => {
        cy.intercept("http://localhost:3333/api/v1/comment/*", {
            method: "POST",
            statusCode: 200,
            body: {
                data: {
                    author_id: "f4b9a92d-6f3d-4bcc-a20c-50ba1d7e7192",
                    comment: "Hello world!",
                    created_at: "2022-07-09T01:01:12.850Z",
                    id: "c62a591a-ba72-4e0a-bbb1-45d8df5ad213",
                    image: null,
                    liked_users_id: [],
                    likes: 0,
                    tweet_id: "004715c1-b98c-4645-95fa-d70ff6dc7b26",
                    updated_at: "2022-07-09T01:01:12.850Z",
                    success: true,
                },
            },
        }).as("makeComment");
        cy.get("#comment-52b63ef1-fb5c-4b80-b4b6-5e3bdfa7c031").type(
            "This is a comment",
        );
        cy.get("[aria-label='Icon send to send comment.']").click();
        cy.wait("@makeComment").its("response.statusCode").should("eq", 200);
    });

    it("Should be able to add/remove likes from comment", () => {
        cy.intercept("http://localhost:3333/api/v1/comment/*/like", {
            method: "PUT",
            statusCode: 200,
        }).as("likeComment");
        cy.get("[aria-label='Heart icon.']").should("exist").click();
        cy.wait("@likeComment").its("response.statusCode").should("eq", 200);

        cy.intercept("http://localhost:3333/api/v1/comment/*/like", {
            method: "DELETE",
            statusCode: 200,
        }).as("unlikeComment");
        cy.get("[aria-label='Heart fill icon.'").should("exist").click();
        cy.wait("@unlikeComment").its("response.statusCode").should("eq", 200);
    });

    it("Should be able to add/remove likes in profile page.", () => {
        cy.intercept("http://localhost:3333/api/v1/tweet/*/like", {
            method: "PUT",
            statusCode: 204,
        }).as("like");
        cy.get("[aria-label='Heart icon to give like on click.']")
            .should("exist")
            .click();
        cy.wait("@like").its("response.statusCode").should("eq", 204);
        cy.contains("1 Likes").should("exist");
        cy.intercept("http://localhost:3333/api/v1/tweet/*/like", {
            method: "DELETE",
            statusCode: 204,
        }).as("unlike");
        cy.get("[aria-label='Heart fill icon to remove your like on click.']")
            .should("exist")
            .click();
        cy.wait("@unlike").its("response.statusCode").should("eq", 204);
        cy.contains("0 Likes").should("exist");
    });

    it("Should be able to save/unsave a tweet how bookmark in profile page.", () => {
        cy.intercept("http://localhost:3333/api/v1/tweet/*/save", {
            method: "PUT",
            statusCode: 204,
        }).as("save");
        cy.get(
            "[aria-label='Bookmark icon to add this tweet in bookmarks on click.']",
        )
            .should("exist")
            .click();
        cy.wait("@save").its("response.statusCode").should("eq", 204);
        cy.contains("1 Saved").should("exist");
        cy.intercept("http://localhost:3333/api/v1/tweet/*/save", {
            method: "DELETE",
            statusCode: 204,
        }).as("unsave");
        cy.get(
            "[aria-label='Bookmark fill icon to remove this tweet from bookmarks on click.']",
        )
            .should("exist")
            .click();
        cy.wait("@unsave").its("response.statusCode").should("eq", 204);
        cy.contains("0 Saved").should("exist");
    });

    it("Should be able to delete a tweet in your profile page.", () => {
        cy.intercept("http://localhost:3333/api/v1/tweet/*", {
            method: "DELETE",
            statusCode: 204,
        }).as("delete-tweet");
        cy.get("[aria-label='Icon close to delete this comment on click.']")
            .should("exist")
            .click();
        cy.wait("@delete-tweet").its("response.statusCode").should("eq", 204);
        cy.contains("This is a section for write about me.").should(
            "not.exist",
        );
    });
});
