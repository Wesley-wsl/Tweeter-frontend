import { rest } from "msw";

import FollowList from ".";
import { fireEvent, render, screen } from "../../tests/mocks/setupProviders";
import { baseURL, server } from "../../tests/mocks/setupServer";

describe("#FollowList component.", () => {
    test("Should be able to render all informations correctly.", async () => {
        render(
            <FollowList
                showFollowing={true}
                setShowFollowing={jest.fn()}
                userId="2"
                path="following"
                owner="2"
            />,
        );

        expect(screen.getByText("2 is following.")).toBeInTheDocument();

        const user = await screen.findByText("Second User");
        expect(user).toBeInTheDocument();
    });

    test("Should be able to render a text if user don't follow/follower nobody.", async () => {
        server.use(
            rest.get(`${baseURL}/user/*/*`, (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({ data: [] }));
            }),
        );

        render(
            <FollowList
                showFollowing={true}
                setShowFollowing={jest.fn()}
                userId="2"
                path="Followings"
                owner="2"
            />,
        );

        const text = await screen.findByText(
            "This user dont is Followings nobody. :/",
        );

        expect(text).toBeInTheDocument();
    });

    test("Should be able to close FollowList on click in close icon.", async () => {
        render(
            <FollowList
                showFollowing={true}
                setShowFollowing={jest.fn()}
                userId="2"
                path="following"
                owner="2"
            />,
        );

        const closeIcon = screen.getByLabelText("Close icon to close modal.");

        fireEvent.click(closeIcon);

        expect(
            screen.queryByText("Close icon to close modal."),
        ).not.toBeInTheDocument();
    });
});
