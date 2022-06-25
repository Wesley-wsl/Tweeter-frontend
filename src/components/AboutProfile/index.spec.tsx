import { userJest } from "../../tests/mocks/constants";
import {
    render,
    screen,
    fireEvent,
    authContextValue,
} from "../../tests/mocks/setupProviders";
import AboutProfile from "./index";

describe("#AboutProfile", () => {
    test("Should render informations about user.", () => {
        render(<AboutProfile userInformations={userJest} />);

        const name = screen.getByText(userJest.name);
        const about_me = screen.getByText(userJest.about_me);
        const followingCount = screen.getByText(userJest.followingCount);
        const followersCount = screen.getByText(userJest.followersCount);

        expect(name).toBeInTheDocument();
        expect(about_me).toBeInTheDocument();
        expect(followingCount).toBeInTheDocument();
        expect(followersCount).toBeInTheDocument();
    });

    test("Should be able to edit your about_me.", () => {
        render(<AboutProfile userInformations={userJest} />);

        const about_me = screen.getByTestId("about_me") as HTMLInputElement;

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

        const about_me = screen.getByTestId("about_me") as HTMLInputElement;
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
        screen.logTestingPlaygroundURL();

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
});
