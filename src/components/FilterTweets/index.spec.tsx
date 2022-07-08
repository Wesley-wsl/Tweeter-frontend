import FilterTweets from ".";
import { IFilterOptions } from "../../@types";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../tests/mocks/setupProviders";

const handleFilterMocked = jest.fn();

describe("#FilterTweets component.", () => {
    test("Should be able to render options for filter with a class active if is actived.", () => {
        render(
            <FilterTweets
                options={[IFilterOptions.TWEETS, IFilterOptions.LATEST]}
                filter="tweets"
                handleFilter={jest.fn()}
            />,
        );

        const tweetsOption = screen.getByText("Tweets");
        const latestOption = screen.getByText("Latest");

        expect(tweetsOption).toBeInTheDocument();
        expect(latestOption).toBeInTheDocument();
        expect(tweetsOption).toHaveClass("active");
    });

    test("Should be able to active a filter.", () => {
        render(
            <FilterTweets
                options={[IFilterOptions.TWEETS, IFilterOptions.LATEST]}
                filter="tweets"
                handleFilter={handleFilterMocked}
            />,
        );

        const tweetsOption = screen.getByText("Tweets");
        const latestOption = screen.getByText("Latest");

        expect(tweetsOption).toBeInTheDocument();
        expect(latestOption).toBeInTheDocument();
        expect(tweetsOption).toHaveClass("active");

        fireEvent.click(latestOption);

        expect(handleFilterMocked).toHaveBeenCalled();
        waitFor(() => {
            expect(screen.getByText("Latest")).toHaveClass("active");
            expect(screen.getByText("Tweets")).not.toHaveClass("active");
        });
    });
});
