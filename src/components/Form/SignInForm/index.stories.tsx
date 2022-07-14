import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import SignInForm from ".";
import { dark, light } from "../../../styles/themes";

export default {
    title: "Form/SignInForm",
    component: SignInForm,
} as Meta;

export const Light = () => (
    <ThemeProvider theme={light}>
        <SignInForm />
    </ThemeProvider>
);

export const Dark = () => (
    <ThemeProvider theme={dark}>
        <SignInForm />
    </ThemeProvider>
);
