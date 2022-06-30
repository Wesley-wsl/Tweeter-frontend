import Header from ".";
import { ThemeContext } from "../../contexts/Theme";
import { render, screen } from "../../tests/mocks/setupProviders";

jest.mock("next/router", () => {
    return {
        useRouter: () => {
            return { asPath: "/home" };
        },
    };
});

describe("#Header component.", () => {
    test("Should be able to render component correctly.", () => {
        render(<Header />);

        const logo = screen.getByAltText("Logo");
        const profileWidget = screen.getByAltText("Avatar image");
        const home = screen.getByText("Home");
        const explorer = screen.getByText("Explorer");
        const bookmarks = screen.getByText("Bookmarks");
        const menuMobile = screen.getByRole("button");

        expect(logo).toBeInTheDocument();
        expect(profileWidget).toBeInTheDocument();
        expect(home).toBeInTheDocument();
        expect(explorer).toBeInTheDocument();
        expect(bookmarks).toBeInTheDocument();
        expect(menuMobile).toBeInTheDocument();
    });

    test("Should be able to render a image to dark mode if is dark mode..", () => {
        render(
            <ThemeContext.Provider
                value={{
                    setLightMode: jest.fn(),
                    lightMode: true,
                    toggleTheme: jest.fn(),
                }}
            >
                <Header />
            </ThemeContext.Provider>,
        );

        const logo = screen.getByAltText("Logo");

        expect(logo).toBeInTheDocument();
    });
});
