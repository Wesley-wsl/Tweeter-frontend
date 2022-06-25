import BackgroundProfile from ".";
import { fireEvent, render, screen } from "../../tests/mocks/setupProviders";

describe("#BackgroundProfile component.", () => {
    test("Should render user's background profile.", () => {
        render(<BackgroundProfile background={null} userId="1" />);

        const backgroundProfile = screen.getByTestId("background profile");
        expect(backgroundProfile).toBeInTheDocument();
        expect(backgroundProfile).toHaveStyle(
            `background-image: url(/background/background.webp)`,
        );
    });

    test("Should be able to open modal to edit background if user authenticated is own this profile.", () => {
        render(<BackgroundProfile background={null} userId="2" />);

        const modal = screen.queryByTestId("modal");
        const changeImage = screen.getByLabelText(
            "A landscape icon to add an image.",
        );
        expect(changeImage).toBeInTheDocument();
        expect(modal).not.toBeInTheDocument();

        fireEvent.click(changeImage);
        expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    test("Shouldn't be able to open modal to edit background if user authenticated don't is own this profile.", () => {
        render(<BackgroundProfile background={null} userId="100" />);

        const changeImage = screen.queryByLabelText(
            "A landscape icon to add an image.",
        );
        expect(changeImage).not.toBeInTheDocument();
    });
});
