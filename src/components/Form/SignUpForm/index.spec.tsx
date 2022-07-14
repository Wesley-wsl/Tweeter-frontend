import { rest } from "msw";

import SignUpForm from ".";
import { ThemeContext } from "../../../contexts/Theme";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../../tests/mocks/setupProviders";
import { baseURL, server } from "../../../tests/mocks/setupServer";

const signUpMocked = jest.fn();

describe("#SignUpForm component", () => {
    test("Should be able to toggle between view password and hide password.", async () => {
        render(
            <ThemeContext.Provider
                value={{
                    lightMode: true,
                    setLightMode: jest.fn(),
                    toggleTheme: jest.fn(),
                }}
            >
                <SignUpForm />
            </ThemeContext.Provider>,
        );

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

    test("Should be able to sign up an account.", async () => {
        server.use(
            rest.post(`${baseURL}/user/`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(<SignUpForm />);

        const email = screen.getByPlaceholderText("Email");
        const name = screen.getByPlaceholderText("Name");
        const password = screen.getByPlaceholderText("Password");
        const SignUp = screen.getByText("Sign Up");

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(SignUp).toBeInTheDocument();

        fireEvent.change(name, { target: { value: "Jorkis" } });
        fireEvent.change(email, { target: { value: "jorkis@gmail.com" } });
        fireEvent.change(password, { target: { value: "12345678" } });

        expect(name).toHaveValue("Jorkis");
        expect(email).toHaveValue("jorkis@gmail.com");
        expect(password).toHaveValue("12345678");

        fireEvent.click(SignUp);

        waitFor(() => expect(signUpMocked).toHaveBeenCalledTimes(1));
        waitFor(() =>
            expect(
                screen.getByText("User created with success."),
            ).toBeInTheDocument(),
        );
    });

    test("Should be able to handle with error about sign up with a message default.", () => {
        server.use(
            rest.post(`${baseURL}/user/`, (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );

        render(<SignUpForm />);

        const email = screen.getByPlaceholderText("Email");
        const name = screen.getByPlaceholderText("Name");
        const password = screen.getByPlaceholderText("Password");
        const SignUp = screen.getByText("Sign Up");

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(SignUp).toBeInTheDocument();

        fireEvent.change(name, { target: { value: "Jorkis" } });
        fireEvent.change(email, { target: { value: "jorkis@gmail.com" } });
        fireEvent.change(password, { target: { value: "12345678" } });

        expect(name).toHaveValue("Jorkis");
        expect(email).toHaveValue("jorkis@gmail.com");
        expect(password).toHaveValue("12345678");

        fireEvent.click(SignUp);

        waitFor(() => expect(signUpMocked).toHaveBeenCalledTimes(1));
        waitFor(() =>
            expect(
                screen.getByText(
                    "Something went wrong, please try again later.",
                ),
            ).toBeInTheDocument(),
        );
    });
});
