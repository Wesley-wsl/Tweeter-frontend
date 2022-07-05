import { rest } from "msw";
import { GetServerSidePropsContext } from "next";

import SignUp, { getServerSideProps } from "../../pages/signup";
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

describe("#SignUp Page", () => {
    test("Should render correctly", () => {
        render(<SignUp />);

        const signIn = screen.getByRole("button", {
            name: /Sign Up/i,
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
