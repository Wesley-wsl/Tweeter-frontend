import CustomBackground from ".";
import { render, screen } from "../../tests/mocks/setupProviders";

describe("#CustomBackground component.", () => {
    test("Should be able to render any children content and background image.", () => {
        render(
            <CustomBackground image="/background.png">
                <h1>Hello</h1>
            </CustomBackground>,
        );

        const children = screen.getByRole("heading", {
            level: 1,
        });

        expect(children).toBeInTheDocument();
    });
});
