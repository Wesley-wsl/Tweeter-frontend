import { rest } from "msw";

import WriteComment from ".";
import { IAuthContext } from "../../../@types";
import { AuthContext } from "../../../contexts/AuthContext";
import {
    screen,
    fireEvent,
    render,
    waitFor,
} from "../../../tests/mocks/setupProviders";
import { baseURL, server } from "../../../tests/mocks/setupServer";

const setTweetCommentsMocked = jest.fn();

describe("#WriteComment component.", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Should be able to render correctly.", () => {
        render(<WriteComment setTweetComments={jest.fn()} tweetId="1" />);

        const sendIcon = screen.getByLabelText("Icon send to send comment.");
        const commentArea = screen.getByPlaceholderText("Make a comment.");

        expect(sendIcon).toBeInTheDocument();
        expect(commentArea).toBeInTheDocument();
    });

    test("Should be able to make a comment.", () => {
        server.use(
            rest.post(`${baseURL}/comment/*`, (_, res, ctx) => {
                return res(ctx.status(200));
            }),
        );

        render(
            <AuthContext.Provider
                value={
                    {
                        user: {
                            avatar: "null",
                        },
                    } as IAuthContext
                }
            >
                <WriteComment
                    setTweetComments={setTweetCommentsMocked}
                    tweetId="1"
                />
            </AuthContext.Provider>,
        );

        const commentArea = screen.getByPlaceholderText(
            "Make a comment.",
        ) as HTMLTextAreaElement;

        fireEvent.change(commentArea, {
            target: {
                value: "This is a comment.",
            },
        });

        const sendIcon = screen.getByLabelText("Icon send to send comment.");

        expect(commentArea.value).toEqual("This is a comment.");
        expect(sendIcon).toBeInTheDocument();

        fireEvent.click(sendIcon);

        waitFor(() => expect(setTweetCommentsMocked).toHaveBeenCalledTimes(1));
    });

    test("Should be able to handle with error about write comment with a default message.", async () => {
        server.use(
            rest.post(`${baseURL}/comment/*`, (_, res, ctx) => {
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

        render(
            <WriteComment
                setTweetComments={setTweetCommentsMocked}
                tweetId="1"
            />,
        );

        const commentArea = screen.getByPlaceholderText(
            "Make a comment.",
        ) as HTMLTextAreaElement;

        fireEvent.change(commentArea, {
            target: {
                value: "This is a comment.",
            },
        });

        const sendIcon = screen.getByLabelText("Icon send to send comment.");

        expect(commentArea.value).toEqual("This is a comment.");
        expect(sendIcon).toBeInTheDocument();

        fireEvent.click(sendIcon);

        await waitFor(() =>
            expect(
                screen.getByText(
                    "Something went wrong, please try again later.",
                ),
            ).toBeInTheDocument(),
        );
    });

    test("Should be able to throw a error if comment is more that 250 characteres.", () => {
        const areaText =
            "This is a comment that have more that 250 characteres. This is a comment that have more that 250 characteres. This is a comment that have more that 250 characteres. This is a comment that have more that 250 characteres. This is a comment that have more that 250 characteres. This is a comment that have more that 250 characteres.";

        render(
            <WriteComment
                setTweetComments={setTweetCommentsMocked}
                tweetId="1"
            />,
        );

        const commentArea = screen.getByPlaceholderText(
            "Make a comment.",
        ) as HTMLTextAreaElement;

        fireEvent.change(commentArea, {
            target: {
                value: areaText,
            },
        });

        const sendIcon = screen.getByLabelText("Icon send to send comment.");

        expect(commentArea.value).toEqual(areaText);
        expect(sendIcon).toBeInTheDocument();

        fireEvent.click(sendIcon);

        waitFor(() =>
            expect(
                screen.getByText("Maximum 250 characters."),
            ).toBeInTheDocument(),
        );
    });

    test("Should be able to make nothing if comment is empty.", () => {
        render(
            <WriteComment
                setTweetComments={setTweetCommentsMocked}
                tweetId="1"
            />,
        );

        const commentArea = screen.getByPlaceholderText(
            "Make a comment.",
        ) as HTMLTextAreaElement;

        fireEvent.change(commentArea, {
            target: {
                value: "",
            },
        });

        const sendIcon = screen.getByLabelText("Icon send to send comment.");

        expect(commentArea.value).toEqual("");
        expect(sendIcon).toBeInTheDocument();

        fireEvent.click(sendIcon);

        expect(setTweetCommentsMocked).not.toHaveBeenCalled();
    });
});
