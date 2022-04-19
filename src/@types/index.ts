export interface INextSEO {
    title: string;
    description: string;
    children: JSX.Element;
}

export interface IButtonForm {
    title: string;
}

export interface IInput {
    type: string;
    placeholder: string;
    IconRight: React.ReactNode;
}

export interface ICustomBackground {
    children: JSX.Element;
    image: string;
}

export interface IBackgroundCustomStyle {
    image: string;
}
