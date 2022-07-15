import { rest } from "msw";
import { GetServerSidePropsContext } from "next";

import Profile, { getServerSideProps } from "../../pages/profile/[id]";
import { render, screen } from "../mocks/setupProviders";
import { baseURL, server } from "../mocks/setupServer";

jest.mock("next/router", () => {
    return {
        useRouter: () => {
            return {
                pathname: "/home",
                query: {
                    id: "2",
                },
            };
        },
    };
});

const intersectionObserverMock = () => ({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
});

window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

const mockScrollLoading = jest
    .fn()
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true);

jest.mock("../../hooks/useInfiniteScroll", () => {
    return {
        useInfiniteScroll() {
            return {
                isEndPage: false,
                ref: null,
                scrollLoading: mockScrollLoading(),
                tweets: [
                    [
                        {
                            id: "1",
                            author_id: "3",
                            likes: 2,
                            liked_users_id: ["1", "4"],
                            retweets_id: [],
                            tweet_id: null,
                            image: "/files/image.jpg",
                            content: "This is a content.",
                            isPublic: "true",
                            users_saved_id: [],
                            comments_id: [],
                            comments: [],
                            author: {
                                id: "1",
                                name: "Jorkis",
                                email: "jorkis@gmail.com",
                                avatar: null,
                                background: null,
                                about_me: "About me",
                                created_at: new Date(),
                            },
                            created_at: new Date(),
                        },
                    ],
                ],
                handleFilter: jest.fn(),
                handleReset: jest.fn(),
                setTweets: jest.fn(),
                search: "",
                handleSearch: jest.fn(),
            };
        },
    };
});

describe("#Profile Page", () => {
    test("Should be able to render the page correctly.", async () => {
        render(<Profile />);

        const backgroundProfile = await screen.findByTestId(
            "background profile",
        );
        const aboutProfile = await screen.findByText("About me");
        const tweetsOption = await screen.findByText("Tweets");
        const mediaOption = await screen.findByText("Media");
        const tweet = await screen.findByText("This is a content.");

        expect(tweet).toBeInTheDocument();
        expect(tweetsOption).toBeInTheDocument();
        expect(mediaOption).toBeInTheDocument();
        expect(backgroundProfile).toBeInTheDocument();
        expect(aboutProfile).toBeInTheDocument();
    });

    test("getServerSideProps should be able to return a redirect if user isn't authenticated.", async () => {
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
            redirect: {
                destination: `/`,
                permanent: false,
            },
        });
    });

    test("getServerSideProps should be able to return a default value if user is authenticated.", async () => {
        const ctx = {};

        const response = await getServerSideProps(
            ctx as GetServerSidePropsContext,
        );

        expect(response).toBeTruthy();
        expect(response).toEqual({
            props: {},
        });
    });
});
