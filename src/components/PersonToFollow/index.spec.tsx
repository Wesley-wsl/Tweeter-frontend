import Router from "next/router";

import PersonToFollow from ".";
import { userJest } from "../../tests/mocks/constants";
import { fireEvent, render, screen } from "../../tests/mocks/setupProviders";

jest.mock("next/router");

const routerMocked = jest.mocked(Router);

describe("#PersonToFollow component", () => {
    test("Should be able to render correctly.", () => {
        render(<PersonToFollow data={userJest} setShowFollowing={jest.fn()} />);

        const name = screen.getByText(userJest.name);
        const aboutMe = screen.getByText(userJest.about_me);
        const profile = screen.getByAltText("Profile Avatar");

        expect(name).toBeInTheDocument();
        expect(aboutMe).toBeInTheDocument();
        expect(profile).toBeInTheDocument();
    });

    test("Should be able to push to another router on click in profile.", () => {
        render(
            <PersonToFollow
                data={{
                    ...userJest,
                    avatar: "/name.png",
                    background: "/name.png",
                }}
                setShowFollowing={jest.fn()}
            />,
        );

        const name = screen.getByText(userJest.name);
        const aboutMe = screen.getByText(userJest.about_me);
        const profile = screen.getByAltText("Profile Avatar");

        fireEvent.click(profile);

        expect(name).toBeInTheDocument();
        expect(aboutMe).toBeInTheDocument();
        expect(profile).toBeInTheDocument();
        expect(routerMocked.push).toHaveBeenCalled();
    });
});
