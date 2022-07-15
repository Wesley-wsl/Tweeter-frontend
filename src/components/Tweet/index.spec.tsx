import { rest } from "msw";
import Router from "next/router";

import Tweet from ".";
import { tweetMocked } from "../../tests/mocks/constants";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../tests/mocks/setupProviders";
import { baseURL, server } from "../../tests/mocks/setupServer";

jest.mock("next/router");

const routerMocked = jest.mocked(Router);
const mutateTweetsMocked = jest.fn();

describe("#Tweet component.", () => {
    test("Should be able to render informations correctly.", () => {
        render(<Tweet data={tweetMocked} mutateTweets={mutateTweetsMocked} />);

        const profileAvatar = screen.getAllByAltText("Profile Avatar");
        const name = screen.getByText(tweetMocked.author.name);
        const content = screen.getByText(tweetMocked.content);
        const image = screen.getByAltText("Image tweet");
        const comments = screen.getByText(
            `${tweetMocked.comments.length} Comments`,
        );
        const saved = screen.getByText(
            `${tweetMocked.users_saved_id.length} Saved`,
        );
        const likes = screen.getByText(`${tweetMocked.likes} Likes`);
        const heart = screen.getByLabelText(
            "Heart icon to give like on click.",
        );
        const bookmark = screen.getByLabelText(
            "Bookmark icon to add this tweet in bookmarks on click.",
        );
        const loadMore = screen.queryByText("Load more.");

        expect(profileAvatar[0]).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(content).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(comments).toBeInTheDocument();
        expect(saved).toBeInTheDocument();
        expect(likes).toBeInTheDocument();
        expect(heart).toBeInTheDocument();
        expect(bookmark).toBeInTheDocument();
        expect(loadMore).not.toBeInTheDocument();
    });

    test("Should be able to go to profile page when user click on user name.", () => {
        render(
            <Tweet
                data={{
                    ...tweetMocked,
                    author: {
                        ...tweetMocked.author,
                        avatar: "/avatar.jpg",
                    },
                }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const name = screen.getByText(tweetMocked.author.name);

        fireEvent.click(name);

        expect(routerMocked.push).toHaveBeenCalledTimes(1);
        expect(routerMocked.push).toBeCalledWith("/profile/1");
    });

    test("Should be able to render comments correctly.", () => {
        render(<Tweet data={tweetMocked} mutateTweets={mutateTweetsMocked} />);

        expect(
            screen.getByText(tweetMocked.comments[0].comment),
        ).toBeInTheDocument();
    });

    test("Should be able to render more comments if user click on load more.", () => {
        render(
            <Tweet
                data={{
                    ...tweetMocked,
                    comments: [
                        ...tweetMocked.comments,
                        ...tweetMocked.comments,
                        ...tweetMocked.comments,
                        {
                            ...tweetMocked.comments[0],
                            comment: "Last comment.",
                        },
                    ],
                }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const comments = screen.getAllByText("Comment test.");
        expect(comments).toHaveLength(3);
        expect(screen.queryByText("Last comment.")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Load more."));

        expect(screen.getByText("Last comment.")).toBeInTheDocument();
    });

    test("Should be able to like a tweet.", async () => {
        server.use(
            rest.put(`${baseURL}/tweet/*/like`, (_, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(<Tweet data={tweetMocked} mutateTweets={mutateTweetsMocked} />);

        const heart = screen.getByLabelText(
            "Heart icon to give like on click.",
        );

        expect(heart).toBeInTheDocument();

        fireEvent.click(heart);

        await waitFor(() => {
            expect(
                screen.getByLabelText(
                    "Heart fill icon to remove your like on click.",
                ),
            ).toBeInTheDocument();
            expect(screen.getByText("3 Likes")).toBeInTheDocument();
        });
    });

    test("Should be able to unlike a tweet.", async () => {
        server.use(
            rest.delete(`${baseURL}/tweet/*/like`, (_, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(
            <Tweet
                data={{ ...tweetMocked, liked_users_id: ["2", "3"] }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const heartFill = screen.getByLabelText(
            "Heart fill icon to remove your like on click.",
        );

        expect(heartFill).toBeInTheDocument();

        fireEvent.click(heartFill);

        await waitFor(() => {
            expect(
                screen.getByLabelText("Heart icon to give like on click."),
            ).toBeInTheDocument();
            expect(screen.getByText("1 Likes")).toBeInTheDocument();
        });
    });

    test("Should be able to save a tweet how bookmark.", async () => {
        server.use(
            rest.put(`${baseURL}/tweet/*/save`, (_, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(
            <Tweet
                data={{ ...tweetMocked, users_saved_id: [] }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const bookmarkIcon = screen.getByLabelText(
            "Bookmark icon to add this tweet in bookmarks on click.",
        );

        expect(bookmarkIcon).toBeInTheDocument();

        fireEvent.click(bookmarkIcon);

        await waitFor(() => {
            expect(
                screen.getByLabelText(
                    "Bookmark fill icon to remove this tweet from bookmarks on click.",
                ),
            ).toBeInTheDocument();
            expect(screen.getByText("1 Saved")).toBeInTheDocument();
        });
    });

    test("Should be able to unsave a tweet.", async () => {
        server.use(
            rest.delete(`${baseURL}/tweet/*/save`, (_, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(
            <Tweet
                data={{ ...tweetMocked, users_saved_id: ["2"] }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const bookmarkIcon = screen.getByLabelText(
            "Bookmark fill icon to remove this tweet from bookmarks on click.",
        );

        expect(bookmarkIcon).toBeInTheDocument();

        fireEvent.click(bookmarkIcon);

        await waitFor(() => {
            expect(
                screen.getByLabelText(
                    "Bookmark icon to add this tweet in bookmarks on click.",
                ),
            ).toBeInTheDocument();
            expect(screen.getByText("0 Saved")).toBeInTheDocument();
        });
    });

    test("Should be able to delete the tweet if user authenticated is owner.", async () => {
        server.use(
            rest.delete(`${baseURL}/tweet/*`, (_, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(
            <Tweet
                data={{ ...tweetMocked, author_id: "2" }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const closeIcon = screen.getByLabelText(
            "Icon close to delete this comment on click.",
        );

        expect(closeIcon).toBeInTheDocument();

        fireEvent.click(closeIcon);

        await waitFor(() => {
            expect(
                screen.getByLabelText(
                    "Icon close to delete this comment on click.",
                ),
            ).toBeInTheDocument();
        });
    });

    test("Should be able to handle error when delete a tweet with a default message.", async () => {
        server.use(
            rest.delete(`${baseURL}/tweet/*`, (_, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({
                        validation: {
                            body: {},
                        },
                    }),
                );
            }),
        );

        render(
            <Tweet
                data={{ ...tweetMocked, author_id: "2" }}
                mutateTweets={mutateTweetsMocked}
            />,
        );

        const closeIcon = screen.getByLabelText(
            "Icon close to delete this comment on click.",
        );

        expect(closeIcon).toBeInTheDocument();

        fireEvent.click(closeIcon);

        waitFor(() => {
            const errorMessage = screen.getByText(
                "Something went wrong, please try again later.",
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
