import { rest } from "msw";

import FollowButton from ".";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../tests/mocks/setupProviders";
import { baseURL, server } from "../../tests/mocks/setupServer";

describe("#FollowButton component.", () => {
    test("Should be able to render a button disabled if user authenticated is the user to follow.", () => {
        render(<FollowButton followersId={["2", "3"]} userToFollowId="2" />);

        const buttonDisabled = screen.getByRole("button", {
            name: "Button for follow user.",
        });

        expect(buttonDisabled).toBeInTheDocument();
        expect(buttonDisabled).toBeDisabled();
    });

    test("Should be able to render a button enabled if user authenticated don't follow the user to follow.", () => {
        render(<FollowButton followersId={["3"]} userToFollowId="100" />);

        const button = screen.getByRole("button", {
            name: "Button for follow user.",
        });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    test("Should be able to follow a user.", async () => {
        render(<FollowButton followersId={["3"]} userToFollowId="100" />);

        const button = screen.getByRole("button", {
            name: "Button for follow user.",
        });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        await waitFor(() => {
            const unfollowButton = screen.getByRole("button", {
                name: "Button for unfollow user.",
            });

            expect(unfollowButton).toBeInTheDocument();
        });
    });

    test("Should be able handle with a server error on follow a user.", async () => {
        server.use(
            rest.put(`${baseURL}/user/follower/*`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        );

        render(<FollowButton followersId={["3"]} userToFollowId="100" />);

        const button = screen.getByRole("button", {
            name: "Button for follow user.",
        });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        await waitFor(() => {
            const error = screen.getByText(
                "Something went wrong, please try again later.",
            );

            expect(error).toBeInTheDocument();
        });
    });

    test("Should be able handle with a custom error on follow a user.", () => {
        server.use(
            rest.put(`${baseURL}/user/follower/*`, (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        error: {
                            response: { data: { error: "Access denied." } },
                        },
                    }),
                );
            }),
        );

        render(<FollowButton followersId={["3"]} userToFollowId="100" />);

        const button = screen.getByRole("button", {
            name: "Button for follow user.",
        });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        waitFor(() => {
            const error = screen.getByText("Access denied.");
            expect(error).toBeInTheDocument();
        });
    });

    test("Should be able to render a button to unfollow if user authenticated already follow the user to follow.", async () => {
        render(<FollowButton followersId={["2", "3"]} userToFollowId="100" />);

        const button = screen.getByRole("button", {
            name: "Button for unfollow user.",
        });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();

        fireEvent.click(button);

        await waitFor(() => {
            const followButton = screen.getByRole("button", {
                name: "Button for follow user.",
            });
            expect(followButton).toBeInTheDocument();
        });
    });

    test("Should be able handle with a server error on unfollow a user.", async () => {
        server.use(
            rest.delete(`${baseURL}/user/unfollow/*`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        );

        render(<FollowButton followersId={["2", "3"]} userToFollowId="100" />);

        const button = screen.getByRole("button", {
            name: "Button for unfollow user.",
        });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        await waitFor(() => {
            const error = screen.getByText(
                "Something went wrong, please try again later.",
            );
            expect(error).toBeInTheDocument();
        });
    });

    test("Should be able handle with a server error on unfollow a user.", () => {
        server.use(
            rest.delete(`/user/unfollow/*`, (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        error: {
                            response: { data: { error: "Access denied." } },
                        },
                    }),
                );
            }),
        );

        render(<FollowButton followersId={["2", "3"]} userToFollowId="100" />);

        const button = screen.getByRole("button", {
            name: "Button for unfollow user.",
        });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        waitFor(() => {
            const error = screen.getByText("Access denied.");
            expect(error).toBeInTheDocument();
        });
    });
});
