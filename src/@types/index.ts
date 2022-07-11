import {
    Dispatch,
    InputHTMLAttributes,
    ReactNode,
    SetStateAction,
} from "react";
import { FieldError } from "react-hook-form";

import { dark } from "../styles/themes";

export interface INextSEO {
    title: string;
    description: string;
    children: JSX.Element;
    opacityTransition?: boolean;
}

export interface IButtonForm {
    title: string;
    loading?: boolean;
}

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError;
    IconRight: React.ReactNode;
}

export interface ICustomBackground {
    children: JSX.Element;
    image: string;
}

export interface IButton extends InputHTMLAttributes<HTMLButtonElement> {
    title: string;
    iconLeft?: ReactNode;
    color: string;
    disabled?: boolean;
}

export interface IImage {
    image: string | null;
}

export interface IHandleSignUp {
    name: string;
    email: string;
    password: string;
}

export interface IHandleSignIn {
    email: string;
    password: string;
}

export interface ISignInData {
    email: string;
    password: string;
}

export interface IAuthContext {
    signIn: (data: ISignInData) => Promise<void>;
    loadingSignIn: boolean;
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
}

export interface IChildren {
    children: JSX.Element;
}

export interface IUser {
    name: string;
    avatar: string;
    id: string;
}
export interface ITweet {
    id: string;
    author_id: string;
    likes: number;
    liked_users_id: string[];
    retweets_id: string[];
    tweet_id: string | null;
    image: string | null;
    content: string;
    comments_id: string[];
    isPublic: string;
    users_saved_id: string[];
    author: IAuthor;
    comments: IComment[];
    created_at: Date;
    updated_at: Date;
}

export interface IAuthor {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    background: string | null;
    followingCount: number;
    followersCount: number;
    followers_id: string[];
    following_id: string[];
    about_me: string;
    liked_tweets_id: string[];
    liked_comments_id: string[];
    retweets_id: string[];
    bookmarks_id: string[];
    created_at: Date;
    updated_at: Date;
}

export interface IUserData {
    data: {
        data: IAuthor;
    };
    error: string;
}

export interface ITweetComponent {
    data: ITweet;
    setTweets: Dispatch<SetStateAction<ITweet[]>>;
}

export interface IComment {
    id: string;
    author_id: string;
    author: IAuthor;
    tweet_id: string;
    tweet: ITweet;
    comment: string;
    likes: number;
    liked_users_id: string[];
    image?: string;
    created_at: Date;
}

export interface ICommentData {
    data: IComment;
    setTweetComments: Dispatch<SetStateAction<IComment[]>>;
}

export interface ILittleLoading {
    color: string;
}

export interface IAvatarProfile {
    avatar: string | null;
    userId: string;
}

export interface IModal {
    children: JSX.Element;
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
}

export interface IDropzoneStyle {
    isDragActive: boolean;
    isDragReject: boolean;
}

export interface IBackgroundProfile {
    background: string | null;
    userId: string;
}

export interface IDropzone {
    imageName: string;
    setIsActive?: Dispatch<SetStateAction<boolean>>;
}

export interface IFollowButton {
    followersId: string[];
    userToFollowId: string;
}

export interface IAboutProfile {
    userInformations: IAuthor;
}

export interface IFollowList {
    showFollowing: boolean;
    setShowFollowing: Dispatch<SetStateAction<boolean>>;
    userId: string;
    path: string;
    owner: string;
}

export interface IFollowCard {
    data: IAuthor;
    setShowFollowing?: Dispatch<SetStateAction<boolean>>;
}

export enum IFilterOptions {
    TWEETS = "tweets",
    LIKES = "likes",
    MEDIA = "media",
    PEOPLE = "people",
    TOP = "top",
    LATEST = "latest",
}

export interface IFilterTweets {
    filter: string;
    handleReset: (search: string, filter: string) => void;
    options: IFilterOptions[];
}

export interface IWriteTweet {
    handleReset: (search: string, filter: string) => void;
}

export interface IWhoCanSee {
    setTweetIsPublic: Dispatch<SetStateAction<string>>;
}

export interface IWriteComment {
    setTweetComments: Dispatch<SetStateAction<IComment[]>>;
    tweetId: string;
}

export interface ITrends {
    handleReset: (search: string, filter: string) => void;
    search: string;
}

export interface IShowTrend {
    trend: string;
    tweetsQuantity: number;
}

export interface IThemeContext {
    setLightMode: Dispatch<SetStateAction<boolean>>;
    lightMode: boolean;
    toggleTheme: () => void;
}

export interface IChildren {
    children: JSX.Element;
}

export type ITheme = typeof dark;
