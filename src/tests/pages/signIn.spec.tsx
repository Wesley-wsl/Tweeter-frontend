import { rest } from "msw";
import { GetServerSidePropsContext } from "next";

import SignIn, { getServerSideProps } from "../../pages";
import { render, screen } from "../mocks/setupProviders";
import { baseURL, server } from "../mocks/setupServer";

jest.mock("next/router", () => {
    return {
        useRouter: () => {
            return {
                pathname: "/home",
            };
        },
    };
});

describe("#SignIn Page", () => {
    test("Should be able to render correctly", () => {
        render(<SignIn />);

        const signIn = screen.getByRole("button", {
            name: /Sign In/i,
        });

        expect(signIn).toBeInTheDocument();
    });

    test("getServerSideProps should be able to return a default value.", async () => {
        server.use(
            rest.get(`${baseURL}/user/me/verify`, (req, res, ctx) => {
                return res(ctx.status(400));
            }),
        );

        const ctx = {};

        const response = await getServerSideProps(
            ctx as GetServerSidePropsContext,
        );

        expect(response).toBeTruthy();
        expect(response).toEqual({
            props: {},
        });
    });

    test("getServerSideProps should be able to return a redirect if user is authenticated.", async () => {
        const ctx = {};

        const response = await getServerSideProps(
            ctx as GetServerSidePropsContext,
        );

        expect(response).toBeTruthy();
        expect(response).toEqual({
            redirect: {
                destination: `/profile/2`,
                permanent: false,
            },
        });
    });
});
