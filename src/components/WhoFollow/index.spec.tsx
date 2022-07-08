import { rest } from "msw";

import WhoFollow from ".";
import { render, screen, waitFor } from "../../tests/mocks/setupProviders";
import { server } from "../../tests/mocks/setupServer";

describe("#WhoFollow component.", () => {
    test("Should be able to render correctly all informations.", () => {
        render(<WhoFollow />);

        waitFor(() => {
            const firstUser = screen.getByText("Jorkis");
            const secondUser = screen.getByText("Second User");
            expect(firstUser).toBeInTheDocument();
            expect(secondUser).toBeInTheDocument();
        });
    });

    test("Should be able to render a default message if whoFollow data don't have nothing.", () => {
        server.use(
            rest.get("/user/me/whofollow", (req, res, ctx) => {
                ctx.status(200),
                    ctx.json({
                        data: [],
                    });
            }),
        );
        render(<WhoFollow />);

        waitFor(() => {
            const defaultMessage = screen.getByText("Nobody to indicate");
            expect(defaultMessage).toBeInTheDocument();
        });
    });
});
