import { rest } from "msw";

import Dropzone from ".";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../tests/mocks/setupProviders";
import { baseURL, server } from "../../tests/mocks/setupServer";

describe("#Dropzone component", () => {
    test("Should be able to render Dropzone correctly.", () => {
        render(<Dropzone setIsActive={jest.fn()} imageName="avatar" />);

        const dropzoneSubtitle = screen.getByText(
            "Drag and drop one file here, or click here to select file",
        );

        expect(dropzoneSubtitle).toBeInTheDocument();
    });

    test("Should be able to send file to server.", async () => {
        server.use(
            rest.put(`${baseURL}/user/*`, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        user: {
                            avatar: "https://avatar.com",
                            id: "1",
                            name: "John Doe",
                        },
                    }),
                );
            }),
        );

        const mockSetIsActive = jest.fn();

        render(<Dropzone setIsActive={mockSetIsActive} imageName="avatar" />);

        const inputEl = screen.getByTestId("input-file");
        const file = new File(["file"], "ping.json", {
            type: "image/png",
        });
        Object.defineProperty(inputEl, "files", {
            value: [file],
        });

        await waitFor(() => {
            fireEvent.drop(inputEl);
        });

        await waitFor(() => {
            expect(mockSetIsActive).toHaveBeenCalled();
        });
    });
});
