import FilterTweets from ".";
import { IFilterOptions } from "../../@types";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../tests/mocks/setupProviders";

const handleResetMocked = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe("#FilterTweets component.", () => {
    test("Should be able to render options for filter with a class active if is actived.", () => {
        render(
            <FilterTweets
                options={[IFilterOptions.TWEETS, IFilterOptions.LATEST]}
                filter="tweets"
                handleReset={jest.fn()}
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
                handleReset={handleResetMocked}
            />,
        );

        const tweetsOption = screen.getByText("Tweets");
        const latestOption = screen.getByText("Latest");

        expect(tweetsOption).toBeInTheDocument();
        expect(latestOption).toBeInTheDocument();
        expect(tweetsOption).toHaveClass("active");

        fireEvent.click(latestOption);

        expect(handleResetMocked).toHaveBeenCalled();
        waitFor(() => {
            expect(screen.getByText("Latest")).toHaveClass("active");
            expect(screen.getByText("Tweets")).not.toHaveClass("active");
        });
    });

    test("Shouldn't be able to active a filter if this filter already activated.", () => {
        render(
            <FilterTweets
                options={[IFilterOptions.TWEETS, IFilterOptions.LATEST]}
                filter="tweets"
                handleReset={handleResetMocked}
            />,
        );

        const tweetsOption = screen.getByText("Tweets");
        const latestOption = screen.getByText("Latest");

        expect(tweetsOption).toBeInTheDocument();
        expect(latestOption).toBeInTheDocument();
        expect(tweetsOption).toHaveClass("active");

        fireEvent.click(tweetsOption);

        expect(handleResetMocked).not.toHaveBeenCalled();
        waitFor(() => {
            expect(screen.getByText("Latest")).not.toHaveClass("active");
            expect(screen.getByText("Tweets")).toHaveClass("active");
        });
    });
});
