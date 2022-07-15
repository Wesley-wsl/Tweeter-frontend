import { rest } from "msw";
import Router from "next/router";
import React from "react";

import { Comment } from ".";
import { IAuthor } from "../../../@types";
import { commentJest } from "../../../tests/mocks/constants";
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from "../../../tests/mocks/setupProviders";
import { baseURL, server } from "../../../tests/mocks/setupServer";

jest.mock("next/router");

const routerMocked = jest.mocked(Router);
const mutateTweetsMocked = jest.fn();

describe("#Comment component.", () => {
    test("Should be able to handle error about like comment with a default message.", async () => {
        server.use(
            rest.put(`${baseURL}/comment/*/like`, (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        validation: {
                            body: {},
                        },
                    }),
                );
            }),
        );

        render(
            <Comment
                data={{
                    ...commentJest,
                    liked_users_id: ["1"],
                    likes: 1,
                }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartIcon = screen.getByLabelText("Heart icon.");

        fireEvent.click(heartIcon);

        await waitFor(async () => {
            const errorMessage = await screen.findByText(
                "Something went wrong, please try again later.",
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("Should be able to render all informations about comment.", () => {
        render(
            <Comment data={commentJest} mutateTweets={mutateTweetsMocked} />,
        );
        const authorName = screen.getByText(commentJest.author.name);
        const profileAvatar = screen.getByAltText("Profile Avatar");
        const comment = screen.getByText(commentJest.comment);
        const likedCount = screen.getByText(`${commentJest.likes} Likes`);

        expect(authorName).toBeInTheDocument();
        expect(profileAvatar).toBeInTheDocument();
        expect(comment).toBeInTheDocument();
        expect(likedCount).toBeInTheDocument();
    });

    test("Should be able to redirect user to another page.", () => {
        render(
            <Comment data={commentJest} mutateTweets={mutateTweetsMocked} />,
        );

        const authorName = screen.getByText(commentJest.author.name);
        expect(authorName).toBeInTheDocument();

        fireEvent.click(authorName);

        expect(routerMocked.push).toHaveBeenCalled();
    });

    test("Should be able to render a heart fill icon if user authenticated already liked this comment.", () => {
        render(
            <Comment
                data={{
                    ...commentJest,
                    liked_users_id: ["2"],
                    author: { avatar: "random.png" } as IAuthor,
                }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartFill = screen.getByLabelText("Heart fill icon.");
        const heartIcon = screen.queryByLabelText("Heart icon.");

        expect(heartFill).toBeInTheDocument();
        expect(heartIcon).not.toBeInTheDocument();
    });

    test("Should be able to render a heart icon if user authenticated don't liked this comment.", () => {
        render(
            <Comment
                data={{ ...commentJest, liked_users_id: ["5"] }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartFill = screen.queryByLabelText("Heart fill icon.");
        const heartIcon = screen.getByLabelText("Heart icon.");

        expect(heartIcon).toBeInTheDocument();
        expect(heartFill).not.toBeInTheDocument();
    });

    test("Should be able to delete this comment if user authenticated is own.", () => {
        server.use(
            rest.delete(`${baseURL}/comment/*`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(
            <Comment
                data={{ ...commentJest, author_id: "2" }}
                mutateTweets={mutateTweetsMocked}
            />,
        );
        const closeIcon = screen.getByLabelText("Close icon - delete comment.");
        fireEvent.click(closeIcon);
        expect(closeIcon).toBeInTheDocument();
    });

    test("Shouldn't be able to delete this comment if user authenticated isn't own.", () => {
        render(
            <Comment
                data={{ ...commentJest, author_id: "3" }}
                mutateTweets={mutateTweetsMocked}
            />,
        );
        const closeIcon = screen.queryByLabelText(
            "Close icon - delete comment.",
        );

        expect(closeIcon).not.toBeInTheDocument();
    });

    test("Should be able to handle error about delete comment with a default message.", async () => {
        server.use(
            rest.delete(`${baseURL}/comment/*`, (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        validation: {
                            body: {},
                        },
                    }),
                );
            }),
        );

        render(
            <Comment
                data={{ ...commentJest, author_id: "2" }}
                mutateTweets={mutateTweetsMocked}
            />,
        );
        const closeIcon = screen.getByLabelText("Close icon - delete comment.");

        fireEvent.click(closeIcon);

        await waitFor(async () => {
            const errorMessage = await screen.findByText(
                "Something went wrong, please try again later.",
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("Should be able to like this comment.", async () => {
        server.use(
            rest.put(`${baseURL}/comment/*/like`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        );
        render(
            <Comment
                data={{ ...commentJest, liked_users_id: ["4"] }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartFill = screen.queryByLabelText("Heart fill icon.");
        const heartIcon = screen.getByLabelText("Heart icon.");

        expect(heartFill).not.toBeInTheDocument();
        expect(heartIcon).toBeInTheDocument();

        fireEvent.click(heartIcon);

        waitFor(async () => {
            const count = await screen.findByText(commentJest.likes + 1);
            expect(heartIcon).not.toBeInTheDocument();
            expect(heartFill).toBeInTheDocument();
            expect(count).toBeInTheDocument();
        });
    });

    test("Should be able to handle error about like comment with a default message if don't have returned a message error.", async () => {
        render(
            <Comment
                data={{ ...commentJest, liked_users_id: ["4"] }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartFill = screen.queryByLabelText("Heart fill icon.");
        const heartIcon = screen.getByLabelText("Heart icon.");
        expect(heartFill).not.toBeInTheDocument();
        expect(heartIcon).toBeInTheDocument();

        fireEvent.click(heartIcon);

        waitFor(() => {
            const errorMessage = screen.getByText(
                "Something went wrong, please try again later.",
            );
            expect(errorMessage).toBeInTheDocument();
        });

        expect(heartFill).not.toBeInTheDocument();
        expect(heartIcon).toBeInTheDocument();
    });

    test("Should be able to handle error about like comment with a custom message.", async () => {
        server.use(
            rest.put(`${baseURL}/comment/*/like`, (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        validation: {
                            body: {
                                message: "Access denied.",
                            },
                        },
                    }),
                );
            }),
        );
        render(
            <Comment
                data={{ ...commentJest, liked_users_id: ["4"] }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartIcon = screen.getByLabelText("Heart icon.");
        expect(heartIcon).toBeInTheDocument();

        fireEvent.click(heartIcon);

        waitFor(() => {
            const errorMessage = screen.getByText("Access denied.");
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("Should be able to remove your like this comment.", async () => {
        server.use(
            rest.delete(`${baseURL}/comment/*/like`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(
            <Comment
                data={{
                    ...commentJest,
                    liked_users_id: ["2"],
                    likes: 1,
                }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartFill = screen.getByLabelText("Heart fill icon.");
        const heartIcon = screen.queryByLabelText("Heart icon.");

        expect(heartFill).toBeInTheDocument();
        expect(heartIcon).not.toBeInTheDocument();

        fireEvent.click(heartFill);

        waitFor(() => expect(heartFill).not.toBeInTheDocument());
        waitFor(() => expect(heartIcon).toBeInTheDocument());

        waitFor(async () => {
            const count = await screen.findByText(commentJest.likes - 1);
            expect(count).toBeInTheDocument();
        });
    });

    test("Should be able to handle error about unlike comment with a custom message.", async () => {
        server.use(
            rest.delete(`${baseURL}/comment/*/like`, (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        validation: {
                            body: {
                                message: "Access denied.",
                            },
                        },
                    }),
                );
            }),
        );
        render(
            <Comment
                data={{
                    ...commentJest,
                    liked_users_id: ["2"],
                    likes: 1,
                }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartFill = screen.getByLabelText("Heart fill icon.");

        expect(heartFill).toBeInTheDocument();
        fireEvent.click(heartFill);

        waitFor(() => {
            const errorMessage = screen.getByText("Access denied.");
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("Should be able to handle error about unlike comment with a default message.", async () => {
        server.use(
            rest.delete(`${baseURL}/comment/*/like`, (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        validation: {
                            body: {},
                        },
                    }),
                );
            }),
        );
        render(
            <Comment
                data={{
                    ...commentJest,
                    liked_users_id: ["2"],
                    likes: 1,
                }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartFill = screen.getByLabelText("Heart fill icon.");

        expect(heartFill).toBeInTheDocument();
        fireEvent.click(heartFill);

        waitFor(() => {
            const errorMessage = screen.getByText(
                "Something went wrong, please try again later.",
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
