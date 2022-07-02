import ButtonForm from ".";
import { render, screen } from "../../../tests/mocks/setupProviders";

describe("#ButtonForm component", () => {
    test("Should be able to render title if is not loading", () => {
        render(<ButtonForm title="Button" loading={false} />);

        const title = screen.getByRole("button", {
            name: "Button",
        });
        const button = screen.getByRole("button");

        expect(title).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });

    test("Should be able to render a little loading if is loading", () => {
        render(<ButtonForm title="Button" loading={true} />);

        const title = screen.queryByRole("button", {
            name: "Button",
        });
        const button = screen.getByRole("button");

        expect(title).not.toBeInTheDocument();
        expect(button).toBeDisabled();
        expect(screen.getByTestId("little-loading")).toBeInTheDocument();
    });
});
