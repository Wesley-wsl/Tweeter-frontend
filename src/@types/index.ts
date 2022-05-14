import { InputHTMLAttributes, ReactNode } from "react";
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
}

export interface IImage {
    image: string;
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
}

export interface IChildren {
    children: JSX.Element;
}

export interface IUser {
    name: string;
    avatar: string;
    id: string;
}
