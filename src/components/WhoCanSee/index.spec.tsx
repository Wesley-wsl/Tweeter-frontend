import WhoCanSee from ".";
import {
    screen,
    render,
    fireEvent,
    waitFor,
} from "../../tests/mocks/setupProviders";

const setTweetIsPublicMocked = jest.fn();

describe("#WhoCanSee component.", () => {
    test("Should be able to open tweet options.", () => {
        render(<WhoCanSee setTweetIsPublic={setTweetIsPublicMocked} />);

        const text = screen.getByText("Everyone can see?");
        expect(text).toBeInTheDocument();

        fireEvent.click(text);

        const publicOption = screen.getByLabelText(
            "Earth icon to make this tweet public",
        );
        const privateOption = screen.getByLabelText(
            "People icon to make this tweet private",
        );

        expect(publicOption).toBeInTheDocument();
        expect(privateOption).toBeInTheDocument();
    });

    test("Should be able to set tweet how public on click in public option.", () => {
        render(<WhoCanSee setTweetIsPublic={setTweetIsPublicMocked} />);

        const text = screen.getByText("Everyone can see?");
        expect(text).toBeInTheDocument();

        fireEvent.click(text);

        const publicOption = screen.getByLabelText(
            "Earth icon to make this tweet public",
        );
        const privateOption = screen.getByLabelText(
            "People icon to make this tweet private",
        );

        expect(publicOption).toBeInTheDocument();
        expect(privateOption).toBeInTheDocument();

        fireEvent.click(publicOption);
        expect(setTweetIsPublicMocked).toHaveBeenCalledWith("true");
    });

    test("Should be able to set tweet how private on click in private option.", () => {
        render(<WhoCanSee setTweetIsPublic={setTweetIsPublicMocked} />);

        const text = screen.getByText("Everyone can see?");
        expect(text).toBeInTheDocument();

        fireEvent.click(text);

        const publicOption = screen.getByLabelText(
            "Earth icon to make this tweet public",
        );
        const privateOption = screen.getByLabelText(
            "People icon to make this tweet private",
        );

        expect(publicOption).toBeInTheDocument();
        expect(privateOption).toBeInTheDocument();

        fireEvent.click(privateOption);
        expect(setTweetIsPublicMocked).toHaveBeenCalledWith("false");
    });

    test("Should be able to close tweet options on click in overlay.", () => {
        render(<WhoCanSee setTweetIsPublic={setTweetIsPublicMocked} />);

        const text = screen.getByText("Everyone can see?");
        expect(text).toBeInTheDocument();

        fireEvent.click(text);

        const overlay = screen.getByTestId("overlay");
        fireEvent.click(overlay);

        waitFor(() => {
            const modalText = screen.queryByText("Who can see?");
            expect(modalText).not.toBeInTheDocument();
        });
    });
});
