import Router from "next/router";
import React, { Dispatch, SetStateAction } from "react";

import FollowCard from ".";
import { userJest } from "../../tests/mocks/constants";
import {
    render,
    screen,
    fireEvent,
    act,
} from "../../tests/mocks/setupProviders";

jest.mock("next/router");

const setShowFollowingMocked = jest.fn() as Dispatch<SetStateAction<boolean>>;
const routerMocked = jest.mocked(Router);

describe("#FollowCard component.", () => {
    test("Should be able to show all informations from data in FollowCard", () => {
        render(<FollowCard data={userJest} />);

        const name = screen.getByText(userJest.name);
        const aboutMe = screen.getByText(userJest.about_me);
        const avatar = screen.getByAltText("Profile Avatar");
        const followButton = screen.getByRole("button", {
            name: "Button for follow user.",
        });

        fireEvent.click(avatar);

        expect(name).toBeInTheDocument();
        expect(aboutMe).toBeInTheDocument();
        expect(avatar).toBeInTheDocument();
        expect(followButton).toBeInTheDocument();
    });

    test("Should be able to active function onClickCard when click.", async () => {
        render(
            <FollowCard
                data={{ ...userJest, avatar: "image.png" }}
                setShowFollowing={setShowFollowingMocked}
            />,
        );

        const avatar = screen.getByAltText("Profile Avatar");

        await act(async () => {
            await fireEvent.click(avatar);
        });

        expect(setShowFollowingMocked).toHaveBeenCalled();
        expect(routerMocked.push).toHaveBeenCalled();
    });
});
