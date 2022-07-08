import { rest } from "msw";

import WriteTweet from ".";
import { AuthContext } from "../../contexts/AuthContext";
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "../../tests/mocks/setupProviders";
import { baseURL, server } from "../../tests/mocks/setupServer";

const setTweetsMocked = jest.fn();

global.URL.createObjectURL = jest.fn().mockReturnValue("/image.png");

describe("#WriteTweet component.", () => {
    test("Should be able to render correctly.", () => {
        render(<WriteTweet setTweets={setTweetsMocked} />);

        const profileAvatar = screen.getByAltText("Profile Avatar");
        const textArea = screen.getByPlaceholderText("What's happening?");
        const uploadIcon = screen.getByLabelText(
            "Landscape icon to upload image.",
        );
        const publicIcon = screen.getByLabelText(
            "Earth icon that indicate that this tweet is public.",
        );

        expect(profileAvatar).toBeInTheDocument();
        expect(textArea).toBeInTheDocument();
        expect(uploadIcon).toBeInTheDocument();
        expect(publicIcon).toBeInTheDocument();
    });

    test("Should be able to write a tweet public.", async () => {
        const tweetText =
            "This is a tweet. This is a tweet. This is a tweet. This is a tweet.";

        render(<WriteTweet setTweets={setTweetsMocked} />);

        const textArea = screen.getByPlaceholderText(
            "What's happening?",
        ) as HTMLTextAreaElement;

        fireEvent.change(textArea, {
            target: {
                value: tweetText,
            },
        });

        expect(textArea.value).toEqual(tweetText);
        expect(
            screen.getByLabelText(
                "Earth icon that indicate that this tweet is public.",
            ),
        ).toBeInTheDocument();

        const sendTweet = screen.getByRole("button", {
            name: "Tweet",
        });

        expect(sendTweet).toBeInTheDocument();

        fireEvent.click(sendTweet);

        const errorMessageOne = screen.queryByText(
            "Must have at least 50 characters in a tweet.",
        );
        const errorMessageTwo = screen.queryByText(
            "Something went wrong, please try again later.",
        );
        expect(errorMessageOne).not.toBeInTheDocument();
        expect(errorMessageTwo).not.toBeInTheDocument();
        await waitFor(() => expect(setTweetsMocked).toHaveBeenCalled());
    });

    test("Should be able to change visilibity to private.", async () => {
        render(<WriteTweet setTweets={setTweetsMocked} />);

        const changeVisbility = screen.getByText("Everyone can see?");

        expect(
            screen.getByLabelText(
                "Earth icon that indicate that this tweet is public.",
            ),
        ).toBeInTheDocument();

        expect(changeVisbility).toBeInTheDocument();

        fireEvent.click(changeVisbility);

        const publicOption = screen.getByLabelText(
            "Earth icon to make this tweet public",
        );
        const privateOption = screen.getByLabelText(
            "People icon to make this tweet private",
        );

        expect(publicOption).toBeInTheDocument();
        expect(privateOption).toBeInTheDocument();

        fireEvent.click(privateOption);

        expect(
            screen.getByLabelText(
                "People icon that indicate that this tweet is private.",
            ),
        ).toBeInTheDocument();
    });

    test("Should be able to show a error message if the tweet is too short.", async () => {
        render(
            <AuthContext.Provider
                value={{
                    user: null,
                    loadingSignIn: false,
                    signIn: jest.fn(),
                    setUser: jest.fn(),
                }}
            >
                <WriteTweet setTweets={setTweetsMocked} />
            </AuthContext.Provider>,
        );

        const textArea = screen.getByPlaceholderText(
            "What's happening?",
        ) as HTMLTextAreaElement;

        fireEvent.change(textArea, {
            target: {
                value: "This is a tweet.",
            },
        });

        expect(textArea.value).toEqual("This is a tweet.");

        const sendTweet = screen.getByRole("button", {
            name: "Tweet",
        });

        expect(sendTweet).toBeInTheDocument();

        fireEvent.click(sendTweet);

        await waitFor(() => {
            const errorMessage = screen.getByText(
                "Must have at least 50 characters in a tweet.",
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test("Should be able to write a tweet with an image.", async () => {
        const file = new File(["/image.png"], "/image.png", {
            type: "image/png",
        });
        const tweetText =
            "This is a tweet. This is a tweet. This is a tweet. This is a tweet.";

        render(<WriteTweet setTweets={setTweetsMocked} />);

        const textArea = screen.getByPlaceholderText(
            "What's happening?",
        ) as HTMLTextAreaElement;

        fireEvent.change(textArea, {
            target: {
                value: tweetText,
            },
        });

        expect(textArea.value).toEqual(tweetText);

        const uploadImage = screen.getByTestId("tweet-file");

        await waitFor(() =>
            fireEvent.change(uploadImage, {
                target: {
                    files: [file],
                },
            }),
        );

        expect(screen.getByAltText("Image uploaded")).toBeInTheDocument();

        const sendTweet = screen.getByRole("button", {
            name: "Tweet",
        });

        expect(sendTweet).toBeInTheDocument();
        fireEvent.click(sendTweet);

        const errorMessageOne = screen.queryByText(
            "Must have at least 50 characters in a tweet.",
        );
        const errorMessageTwo = screen.queryByText(
            "Something went wrong, please try again later.",
        );
        expect(errorMessageOne).not.toBeInTheDocument();
        expect(errorMessageTwo).not.toBeInTheDocument();
    });

    test("Should be able to handle with error about write tweet with a default mensage.", async () => {
        server.use(
            rest.post(`${baseURL}/tweet`, (_, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        validation: {
                            body: {},
                        },
                    }),
                );
            }),
        );

        const tweetText =
            "This is a tweet. This is a tweet. This is a tweet. This is a tweet.";

        render(<WriteTweet setTweets={setTweetsMocked} />);

        const textArea = screen.getByPlaceholderText(
            "What's happening?",
        ) as HTMLTextAreaElement;

        fireEvent.change(textArea, {
            target: {
                value: tweetText,
            },
        });

        expect(textArea.value).toEqual(tweetText);

        const sendTweet = screen.getByRole("button", {
            name: "Tweet",
        });

        expect(sendTweet).toBeInTheDocument();

        fireEvent.click(sendTweet);

        await waitFor(() => {
            const errorMessage = screen.getByText(
                "Something went wrong, please try again later.",
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
