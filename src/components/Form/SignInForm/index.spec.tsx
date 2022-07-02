import SignInForm from ".";
import { AuthContext } from "../../../contexts/AuthContext";
import { ThemeContext } from "../../../contexts/Theme";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../../tests/mocks/setupProviders";

const signInMocked = jest.fn();

describe("#SignInForm component", () => {
    test("Should be able to toggle between view password and hide password.", async () => {
        render(<SignInForm />);

        const viewPassword = screen.getByLabelText(
            "View Show Icon that indicate password hide",
        );

        expect(viewPassword).toBeInTheDocument();

        waitFor(async () => {
            fireEvent.click(viewPassword);
            const hidePassword = await screen.findByLabelText(
                "Hide Show Icon that indicate password hide",
            );
            expect(hidePassword).toBeInTheDocument();
        });
    });

    test("Should be able to handle with sign in form.", () => {
        render(
            <AuthContext.Provider
                value={{
                    signIn: signInMocked,
                    loadingSignIn: false,
                    setUser: jest.fn(),
                    user: {
                        avatar: "/png.png",
                        id: "2",
                        name: "Jorkis",
                    },
                }}
            >
                <ThemeContext.Provider
                    value={{
                        lightMode: true,
                        setLightMode: jest.fn(),
                        toggleTheme: jest.fn(),
                    }}
                >
                    <SignInForm />
                </ThemeContext.Provider>
                ,
            </AuthContext.Provider>,
        );

        const email = screen.getByPlaceholderText("Email");
        const password = screen.getByPlaceholderText("Password");
        const signIn = screen.getByText("Sign In");

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(signIn).toBeInTheDocument();

        fireEvent.change(email, { target: { value: "jorkis@gmail.com" } });
        fireEvent.change(password, { target: { value: "12345678" } });

        expect(email).toHaveValue("jorkis@gmail.com");
        expect(password).toHaveValue("12345678");

        fireEvent.click(signIn);

        waitFor(() => expect(signInMocked).toHaveBeenCalledTimes(1));
    });
});
