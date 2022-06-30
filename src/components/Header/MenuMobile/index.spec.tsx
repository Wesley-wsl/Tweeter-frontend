import MenuMobile from ".";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../../tests/mocks/setupProviders";

jest.mock("next/router", () => {
    return {
        useRouter: () => {
            return { asPath: "/home" };
        },
    };
});

jest.mock("next/link");

describe("#MenuMobile component.", () => {
    test("Should be able to active menu.", () => {
        render(<MenuMobile />);

        const menuIcon = screen.getByLabelText(
            "Hamburguer icon to open menu mobile.",
        );
        const closeIcon = screen.queryByLabelText(
            "Close icon to close menu mobile.",
        );

        expect(menuIcon).toBeInTheDocument();
        expect(closeIcon).not.toBeInTheDocument();

        fireEvent.click(menuIcon);

        waitFor(() => {
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("Explorer")).toBeInTheDocument();
            expect(screen.getByText("Bookmarks")).toBeInTheDocument();
        });
    });

    test("Should be able to disable menu on click in close icon.", () => {
        render(<MenuMobile />);

        const menuIcon = screen.getByLabelText(
            "Hamburguer icon to open menu mobile.",
        );

        expect(menuIcon).toBeInTheDocument();

        fireEvent.click(menuIcon);

        expect(
            screen.getByLabelText("Close icon to close menu mobile."),
        ).toBeInTheDocument();

        waitFor(() => {
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("Explorer")).toBeInTheDocument();
            expect(screen.getByText("Bookmarks")).toBeInTheDocument();
        });

        fireEvent.click(
            screen.getByLabelText("Close icon to close menu mobile."),
        );

        waitFor(() => {
            expect(screen.getByText("Home")).not.toBeInTheDocument();
            expect(screen.getByText("Explorer")).not.toBeInTheDocument();
            expect(screen.getByText("Bookmarks")).not.toBeInTheDocument();
        });
    });

    test("Should be able to disable menu on click in overlay", () => {
        render(<MenuMobile />);

        const menuIcon = screen.getByLabelText(
            "Hamburguer icon to open menu mobile.",
        );

        expect(menuIcon).toBeInTheDocument();

        fireEvent.click(menuIcon);
        const overlay = screen.getByTestId("overlay");

        waitFor(() => {
            expect(overlay).toBeInTheDocument();
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByText("Explorer")).toBeInTheDocument();
            expect(screen.getByText("Bookmarks")).toBeInTheDocument();
        });

        fireEvent.click(overlay);

        waitFor(() => {
            expect(screen.getByText("Home")).not.toBeInTheDocument();
            expect(screen.getByText("Explorer")).not.toBeInTheDocument();
            expect(screen.getByText("Bookmarks")).not.toBeInTheDocument();
        });
    });

    test("Should be able to disable menu on click in a navigate option.", async () => {
        render(<MenuMobile />);

        const menuIcon = screen.getByLabelText(
            "Hamburguer icon to open menu mobile.",
        );

        expect(menuIcon).toBeInTheDocument();

        fireEvent.click(menuIcon);
        const motionLi = screen.getAllByTestId("motion_li");

        expect(motionLi[0]).toBeInTheDocument();

        fireEvent.click(motionLi[0]);
        waitFor(() => {
            expect(
                screen.queryAllByTestId("motion_li")[0],
            ).not.toBeInTheDocument();
        });
    });
});
