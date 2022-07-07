import { rest } from "msw";
import { GetServerSidePropsContext } from "next";

import Explorer, { getServerSideProps } from "../../pages/explorer";
import { fireEvent, render, screen } from "../mocks/setupProviders";
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

const intersectionObserverMock = () => ({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
});

window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

const mockHandleSearch = jest.fn();
const mockFilter = jest
    .fn()
    .mockReturnValue("")
    .mockReturnValueOnce("")
    .mockReturnValueOnce("people");

jest.mock("../../hooks/useInfiniteScroll", () => {
    return {
        useInfiniteScroll() {
            return {
                isEndPage: false,
                ref: null,
                scrollLoading: true,
                tweets: [
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
                users: [
                    {
                        id: "1",
                        name: "Jorkis",
                        email: "jorkis@gmail.com",
                        avatar: null,
                        background: null,
                        about_me: "About me",
                        followers_id: ["2", "3"],
                        created_at: new Date(),
                    },
                ],
                handleFilter: jest.fn(),
                handleReset: jest.fn(),
                setTweets: jest.fn(),
                search: "",
                filter: mockFilter(),
                handleSearch: mockHandleSearch,
            };
        },
    };
});

describe("#Explorer Page", () => {
    test("Should be able to render the page correctly.", async () => {
        render(<Explorer />);

        const searchIcon = screen.getByLabelText(
            "A search icon to search for a tweet.",
        );
        const topOption = await screen.findByText("Top");
        const latestOption = await screen.findByText("Latest");
        const mediaOption = await screen.findByText("Media");
        const peopleOption = await screen.findByText("People");
        const tweet = await screen.findByText("This is a content.");

        expect(searchIcon).toBeInTheDocument();
        expect(tweet).toBeInTheDocument();
        expect(topOption).toBeInTheDocument();
        expect(latestOption).toBeInTheDocument();
        expect(mediaOption).toBeInTheDocument();
        expect(peopleOption).toBeInTheDocument();
    });

    test("Should be able to render cards with list of users if tweet is filtered by user.", async () => {
        render(<Explorer />);

        const userFollowers = await screen.findByText("2 followers");
        expect(userFollowers).toBeInTheDocument();
    });

    test("Should be able to search by tweets.", () => {
        render(<Explorer />);

        const search = screen.getByPlaceholderText(
            "Search",
        ) as HTMLInputElement;

        fireEvent.change(search, { target: { value: "Search something." } });

        expect(search.value).toEqual("Search something.");

        fireEvent.submit(screen.getByText("Search"));

        expect(mockHandleSearch).toHaveBeenCalled();
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
