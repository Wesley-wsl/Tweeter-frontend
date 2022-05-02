import { InputHTMLAttributes, ReactNode } from "react";
import { FieldError } from "react-hook-form";

export interface INextSEO {
    title: string;
    description: string;
    children: JSX.Element;
}

export interface IButtonForm {
    title: string;
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
