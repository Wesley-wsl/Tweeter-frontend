import { IAuthor, IComment, ITweet } from "../../@types";

export const userJest = {
    id: "1",
    name: "Jorkis",
    email: "jorkis@gmail.com",
    avatar: null,
    background: null,
    followingCount: 1,
    followersCount: 2,
    followers_id: ["3"],
    following_id: ["4"],
    about_me: "About me",
    liked_tweets_id: ["1"],
    liked_comments_id: ["1"],
    retweets_id: ["1"],
    bookmarks_id: ["1"],
    created_at: new Date(),
    updated_at: new Date(),
};

export const commentJest: IComment = {
    id: "1",
    author_id: "1",
    author: { name: "None" } as IAuthor,
    tweet_id: "123456",
    tweet: {} as ITweet,
    comment: "Comment test.",
    likes: 0,
    liked_users_id: ["2"],
    image: "/kkk",
    created_at: new Date(),
};
