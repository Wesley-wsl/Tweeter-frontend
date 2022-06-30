import AvatarProfile from ".";
import { fireEvent, render, screen } from "../../tests/mocks/setupProviders";

describe("#AvatarProfile component.", () => {
    test("Should render user's avatar profile.", () => {
        render(<AvatarProfile avatar={null} userId="1" />);

        const avatarProfile = screen.getByAltText("Profile Avatar");
        expect(avatarProfile).toBeInTheDocument();
    });

    test("Should be able to open modal to edit avatar if user authenticated is own this profile.", () => {
        render(<AvatarProfile avatar={"random.png"} userId="2" />);

        const changeImage = screen.getByLabelText(
            "A landscape icon to add an image.",
        );
        expect(changeImage).toBeInTheDocument();

        fireEvent.click(changeImage);

        const modal = screen.getByTestId("modal");
        expect(modal).toBeInTheDocument();
    });

    test("Shouldn't be able to open modal to edit avatar if user authenticated don't is own this profile.", async () => {
        render(<AvatarProfile avatar={null} userId="100" />);

        const changeImage = screen.queryByLabelText(
            "A landscape icon to add an image.",
        );
        expect(changeImage).toEqual(null);
    });
});
