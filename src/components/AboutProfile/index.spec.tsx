import { rest } from "msw";

import { userJest } from "../../tests/mocks/constants";
import {
    render,
    screen,
    fireEvent,
    authContextValue,
    waitFor,
} from "../../tests/mocks/setupProviders";
import { baseURL, server } from "../../tests/mocks/setupServer";
import AboutProfile from "./index";

describe("#AboutProfile", () => {
    test("Should render informations about user.", () => {
        render(<AboutProfile userInformations={userJest} />);

        const name = screen.getByText(userJest.name);
        const about_me = screen.getByRole("textbox");
        const followingCount = screen.getByText(userJest.followingCount);
        const followersCount = screen.getByText(userJest.followersCount);

        expect(name).toBeInTheDocument();
        expect(about_me).toBeInTheDocument();
        expect(followingCount).toBeInTheDocument();
        expect(followersCount).toBeInTheDocument();
    });

    test("Should be able to edit your about_me.", () => {
        render(<AboutProfile userInformations={{ ...userJest, id: "2" }} />);

        const about_me = screen.getByRole("textbox") as HTMLInputElement;

        fireEvent.change(about_me, {
            target: {
                value: "This description changed.",
            },
        });
        fireEvent.blur(about_me);

        expect(about_me.value).toBe("This description changed.");
    });

    test("Shouldn't be able to edit about_me if user authenticated is not own this profile.", () => {
        render(<AboutProfile userInformations={userJest} />);

        const about_me = screen.getByRole("textbox") as HTMLInputElement;
        expect(about_me).toBeDisabled();
    });

    test("Should render button to follow if user authenticated don't follow this profile.", () => {
        render(<AboutProfile userInformations={userJest} />);

        const button = screen.getByRole("button", {
            name: "Button for follow user.",
        });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    test("Should render button to unfollow if user authenticated already follow this profile.", () => {
        render(
            <AboutProfile
                userInformations={{
                    ...userJest,
                    followers_id: [authContextValue.user?.id as string],
                }}
            />,
        );

        const button = screen.getByRole("button", {
            name: "Button for unfollow user.",
        });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    test("Should be able to open modal that list followers on click in followers.", () => {
        render(<AboutProfile userInformations={userJest} />);

        const followers = screen.getByText(/followers/i);
        expect(followers).toBeInTheDocument();

        fireEvent.click(followers);

        const followersModal = screen.getByText(
            `${userJest.name} is followers.`,
        );
        expect(followersModal).toBeInTheDocument();
        expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    test("Should be able to open modal that list following on click in following.", () => {
        render(<AboutProfile userInformations={userJest} />);

        const following = screen.getByText(/following/i);
        expect(following).toBeInTheDocument();

        fireEvent.click(following);

        const followingModal = screen.getByText(
            `${userJest.name} is following.`,
        );
        expect(followingModal).toBeInTheDocument();
        expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    test("Should be able to handle with errors about update about_me.", () => {
        render(<AboutProfile userInformations={{ ...userJest, id: "2" }} />);

        const about_me = screen.getByRole("textbox") as HTMLInputElement;

        fireEvent.change(about_me, {
            target: {
                value: "This description changed.",
            },
        });
        fireEvent.blur(about_me);

        waitFor(() => {
            const errorMessage = screen.getByText("Access denied.");
            expect(errorMessage).toBeInTheDocument();
        });

        expect(about_me.value).toBe("This description changed.");
    });

    test("Should be able to handle error showing a default message.", () => {
        server.use(
            rest.put(`${baseURL}/user/*`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        );

        render(<AboutProfile userInformations={{ ...userJest, id: "2" }} />);

        const about_me = screen.getByRole("textbox") as HTMLInputElement;

        fireEvent.change(about_me, {
            target: {
                value: "This description changed.",
            },
        });
        fireEvent.blur(about_me);

        waitFor(() => {
            const errorMessage = screen.getByText(
                "Something went wrong, please try again later.",
            );
            expect(errorMessage).toBeInTheDocument();
        });

        expect(about_me.value).toBe("This description changed.");
    });

    test("Shouldn't be able to update about_me if user authenticated is not own this profile.", () => {
        server.use(
            rest.put(`${baseURL}/user/*`, (req, res, ctx) => {
                return res(ctx.status(500));
            }),
        );

        render(<AboutProfile userInformations={{ ...userJest, id: "200" }} />);

        const about_me = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.blur(about_me);

        waitFor(() => {
            const accessDenied = screen.getByText("Access denied.");
            const errorMessage = screen.getByText(
                "Something went wrong, please try again later.",
            );
            expect(accessDenied).not.toBeInTheDocument();
            expect(errorMessage).not.toBeInTheDocument();
        });
        expect(about_me).toBeInTheDocument();
    });
});
