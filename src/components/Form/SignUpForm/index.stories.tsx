import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import SignUpForm from ".";
import { dark, light } from "../../../styles/themes";

export default {
    title: "Form/SignUpForm",
    component: SignUpForm,
} as Meta;

export const Light = () => (
    <ThemeProvider theme={light}>
        <SignUpForm />
    </ThemeProvider>
);

export const Dark = () => (
    <ThemeProvider theme={dark}>
        <SignUpForm />
    </ThemeProvider>
);
