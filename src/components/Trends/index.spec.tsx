import { rest } from "msw";
import { FormEvent } from "react";

import Trends from ".";
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from "../../tests/mocks/setupProviders";
import { baseURL, server } from "../../tests/mocks/setupServer";

const handleSearchMocked = jest.fn();

describe("#Trends component.", () => {
    test("Should be able to render a loading if no trends are found.", () => {
        server.use(
            rest.get(`${baseURL}/tweet/me/trends`, (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );
        render(<Trends handleSearch={handleSearchMocked} search="frontend" />);

        expect(screen.getByTestId("little-loading")).toBeInTheDocument();
    });

    test("Should be able to render trends.", async () => {
        render(<Trends handleSearch={handleSearchMocked} search="frontend" />);

        const trend = await screen.findAllByTestId("trend");
        expect(trend[0]).toBeInTheDocument();
        expect(trend[0]).not.toHaveClass("trendActive");
        expect(
            screen.queryByLabelText("Close icon to deselect trend."),
        ).not.toBeInTheDocument();
    });

    test("Should be able to select a trend.", async () => {
        let search = "frontend";

        function handleSearch(e: FormEvent, searchName: string) {
            search = searchName;
        }

        render(<Trends handleSearch={handleSearch} search={search} />);

        const trend = await screen.findAllByTestId("trend");
        expect(trend[0]).toBeInTheDocument();
        expect(trend[0]).not.toHaveClass("trendActive");
        expect(
            screen.queryByLabelText("Close icon to deselect trend."),
        ).not.toBeInTheDocument();

        waitFor(async () => {
            fireEvent.click(screen.getByText("#backend"));
            const trendActivated = await screen.findAllByTestId("trend");

            expect(trendActivated[0]).toHaveClass("trendActive");
            expect(
                screen.getByLabelText("Close icon to deselect trend."),
            ).toBeInTheDocument();
        });
    });

    test("Should be able to render close icon to deselect trend if selected.", async () => {
        render(<Trends handleSearch={handleSearchMocked} search="backend" />);

        expect(
            await screen.findByLabelText("Close icon to deselect trend."),
        ).toBeInTheDocument();
    });
});
