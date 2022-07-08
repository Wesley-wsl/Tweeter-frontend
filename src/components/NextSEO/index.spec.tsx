import NextSEO from ".";
import { render, screen } from "../../tests/mocks/setupProviders";

jest.mock("next/router", () => {
    return {
        useRouter: () => {
            return {
                pathname: "/home",
            };
        },
    };
});

describe("#Loading component", () => {
    test("Should be able to render correctly.", () => {
        render(
            <NextSEO title="Title" description="Description">
                <h1>Hello</h1>
            </NextSEO>,
        );

        const children = screen.getByRole("heading", {
            level: 1,
        });
        expect(children).toBeInTheDocument();
    });

    test("Should be able to render correctly with opacityTransition.", () => {
        render(
            <NextSEO title="Title" description="Description" opacityTransition>
                <h1>Hello</h1>
            </NextSEO>,
        );

        const children = screen.getByRole("heading", {
            level: 1,
        });
        expect(children).toBeInTheDocument();
    });
});
