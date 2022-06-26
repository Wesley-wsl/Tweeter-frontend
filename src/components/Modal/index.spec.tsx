import Modal from ".";
import { render, screen, fireEvent } from "../../tests/mocks/setupProviders";

const setIsActiveMocked = jest.fn();

describe("#Modal", () => {
    test("Should be able to render children and disable modal.", () => {
        render(
            <Modal isActive={true} setIsActive={setIsActiveMocked}>
                <h1>Test</h1>
            </Modal>,
        );

        const children = screen.getByRole("heading", {
            level: 1,
            name: "Test",
        });
        const overlay = screen.getByTestId("modal-overlay");

        expect(children).toBeInTheDocument();
        expect(overlay).toBeInTheDocument();

        fireEvent.click(overlay);

        expect(setIsActiveMocked).toHaveBeenCalled();
    });
});
