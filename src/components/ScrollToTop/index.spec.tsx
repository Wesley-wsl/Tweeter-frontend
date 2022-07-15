import ScrollToTop from ".";
import { screen, render } from "../../tests/mocks/setupProviders";

const map: any = {};
window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
});
const spy = jest.spyOn(window, "addEventListener");

describe("#ScrollToTop component.", () => {
    test("Shouldn't be able to render component if scroll be in the top.", () => {
        render(<ScrollToTop />);

        expect(spy).toHaveBeenCalled();
        expect(
            screen.queryByLabelText("Arrow up icon to scroll up page."),
        ).not.toBeInTheDocument();
    });
});
