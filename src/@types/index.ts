import {
    Dispatch,
    InputHTMLAttributes,
    ReactNode,
    SetStateAction,
} from "react";
import { FieldError } from "react-hook-form";

export interface INextSEO {
    title: string;
    description: string;
    children: JSX.Element;
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

export interface IButton {
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

export interface IHeaderStyle {
    opacity: number;
    boxShadow: boolean;
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
