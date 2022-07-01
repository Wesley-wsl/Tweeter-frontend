import Router from "next/router";

import { ProfileWidget } from ".";
import { IAuthContext } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/Theme";
import {
    screen,
    render,
    fireEvent,
    waitFor,
} from "../../tests/mocks/setupProviders";

jest.mock("next/router");

const routerMocked = jest.mocked(Router);

describe("#ProfileWidget component.", () => {
    test("Should be able to open options about profile.", () => {
        render(
            <AuthContext.Provider
                value={
                    {
                        user: {
                            id: "2",
                            name: "None",
                            avatar: "null",
                        },
                    } as IAuthContext
                }
            >
                <ProfileWidget />
            </AuthContext.Provider>,
        );

        const avatarImage = screen.getByAltText("Avatar image");
        const name = screen.getByText("None");
        const caretDown = screen.getByLabelText(
            "Icon arrow down that open profile menu",
        );

        expect(avatarImage).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(caretDown).toBeInTheDocument();

        fireEvent.click(caretDown);

        const myProfile = screen.getByLabelText(
            "Account circle icon to go to my profile",
        );
        const darkMode = screen.getByLabelText("Moon icon to change theme");
        const logout = screen.getByLabelText(
            "Logout icon to exit your account.",
        );

        expect(myProfile).toBeInTheDocument();
        expect(darkMode).toBeInTheDocument();
        expect(logout).toBeInTheDocument();
    });

    test("Should be able to exit options about profile on click in overlay.", () => {
        render(<ProfileWidget />);

        const avatarImage = screen.getByAltText("Avatar image");
        const name = screen.getByText("None");
        const caretDown = screen.getByLabelText(
            "Icon arrow down that open profile menu",
        );

        expect(avatarImage).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(caretDown).toBeInTheDocument();

        fireEvent.click(caretDown);

        const overlay = screen.getByTestId("overlay");

        expect(overlay).toBeInTheDocument();

        waitFor(() => {
            fireEvent.click(overlay);
            const myProfile = screen.queryByText("My profile");
            const darkMode = screen.queryByText("Dark Mode");
            const logout = screen.queryByText("Logout");

            expect(myProfile).not.toBeInTheDocument();
            expect(darkMode).not.toBeInTheDocument();
            expect(logout).not.toBeInTheDocument();
            expect(overlay).not.toBeInTheDocument();
        });
    });

    test("Should be able to go to my profile on click in My profile option.", () => {
        render(<ProfileWidget />);

        const caretDown = screen.getByLabelText(
            "Icon arrow down that open profile menu",
        );

        expect(caretDown).toBeInTheDocument();

        fireEvent.click(caretDown);

        const myProfile = screen.getByLabelText(
            "Account circle icon to go to my profile",
        );

        expect(myProfile).toBeInTheDocument();

        fireEvent.click(myProfile);

        expect(routerMocked.push).toBeCalledWith("/profile/2");
    });

    test("Should be able to change theme on click in Dark Mode option.", () => {
        const toggleThemeMocked = jest.fn();

        render(
            <ThemeContext.Provider
                value={{
                    toggleTheme: toggleThemeMocked,
                    lightMode: true,
                    setLightMode: jest.fn(),
                }}
            >
                <ProfileWidget />
            </ThemeContext.Provider>,
        );

        const caretDown = screen.getByLabelText(
            "Icon arrow down that open profile menu",
        );
        expect(caretDown).toBeInTheDocument();

        fireEvent.click(caretDown);

        const darkMode = screen.getByLabelText("Moon icon to change theme");
        expect(darkMode).toBeInTheDocument();

        fireEvent.click(darkMode);

        expect(toggleThemeMocked).toHaveBeenCalled();
    });

    test("Should be able to logout on click in Logout option.", () => {
        render(<ProfileWidget />);

        const caretDown = screen.getByLabelText(
            "Icon arrow down that open profile menu",
        );

        expect(caretDown).toBeInTheDocument();

        fireEvent.click(caretDown);

        const logout = screen.getByLabelText(
            "Logout icon to exit your account.",
        );

        expect(logout).toBeInTheDocument();

        fireEvent.click(logout);

        expect(routerMocked.push).toBeCalledWith("/");
    });
});
