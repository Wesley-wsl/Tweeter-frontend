import { Loading } from ".";
import { render, screen } from "../../tests/mocks/setupProviders";

describe("#Loading component", () => {
    test("Should be able to render correctly.", () => {
        render(<Loading />);

        const loading = screen.getByTestId("loading");
        expect(loading).toBeInTheDocument();
    });
});
