import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { AuthContext } from "../../contexts/AuthContext";
import { dark } from "../../styles/themes";
import AboutProfile from "./index";

const userInformationsBase = {
    id: "1",
    name: "Jorkis",
    email: "jorkis@gmail.com",
    avatar: null,
    background: null,
    followingCount: 1,
    followersCount: 2,
    followers_id: ["3"],
    following_id: ["4"],
    about_me: "About me",
    liked_tweets_id: ["1"],
    liked_comments_id: ["1"],
    retweets_id: ["1"],
    bookmarks_id: ["1"],
    created_at: new Date(),
    updated_at: new Date(),
};

describe("#AboutProfile", () => {
    test("Should render informations about user.", () => {
        render(
            <ThemeProvider theme={dark}>
                <AboutProfile userInformations={userInformationsBase} />
            </ThemeProvider>,
        );

        const name = screen.getByText(userInformationsBase.name);
        const about_me = screen.getByText(userInformationsBase.about_me);
        const followingCount = screen.getByText(
            userInformationsBase.followingCount,
        );
        const followersCount = screen.getByText(
            userInformationsBase.followersCount,
        );

        expect(name).toBeInTheDocument();
        expect(about_me).toBeInTheDocument();
        expect(followingCount).toBeInTheDocument();
        expect(followersCount).toBeInTheDocument();
    });

    test("Should be able to edit your about_me.", () => {
        render(
            <ThemeProvider theme={dark}>
                <AboutProfile userInformations={userInformationsBase} />
            </ThemeProvider>,
        );

        const about_me = screen.getByTestId("about_me") as HTMLInputElement;

        fireEvent.change(about_me, {
            target: {
                value: "This description changed.",
            },
        });

        expect(about_me.value).toBe("This description changed.");
    });

    test("Shouldn't be able to edit abot_me if user authenticated is not own this profile.", () => {
        render(
            <ThemeProvider theme={dark}>
                <AuthContext.Provider
                    value={{
                        user: { name: "None", avatar: "something", id: "2" },
                        setUser: jest.fn(),
                        loadingSignIn: false,
                        signIn: jest.fn(),
                    }}
                >
                    <AboutProfile userInformations={userInformationsBase} />
                </AuthContext.Provider>
            </ThemeProvider>,
        );

        const about_me = screen.getByTestId("about_me") as HTMLInputElement;
        expect(about_me).toBeDisabled();
    });

    test("Should render button to follow if user authenticated don't follow this profile.", () => {
        render(
            <ThemeProvider theme={dark}>
                <AuthContext.Provider
                    value={{
                        user: { name: "None", avatar: "something", id: "2" },
                        setUser: jest.fn(),
                        loadingSignIn: false,
                        signIn: jest.fn(),
                    }}
                >
                    <AboutProfile userInformations={userInformationsBase} />
                </AuthContext.Provider>
            </ThemeProvider>,
        );

        const button = screen.getByRole("button", {
            name: "Button for follow user.",
        });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    test("Should render button to unfollow if user authenticated already follow this profile.", () => {
        render(
            <ThemeProvider theme={dark}>
                <AuthContext.Provider
                    value={{
                        user: { name: "None", avatar: "something", id: "3" },
                        setUser: jest.fn(),
                        loadingSignIn: false,
                        signIn: jest.fn(),
                    }}
                >
                    <AboutProfile userInformations={userInformationsBase} />
                </AuthContext.Provider>
            </ThemeProvider>,
        );

        const button = screen.getByRole("button", {
            name: "Button for unfollow user.",
        });

        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });
});
