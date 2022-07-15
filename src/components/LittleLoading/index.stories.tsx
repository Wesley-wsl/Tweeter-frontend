import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import LittleLoading from ".";
import { dark, light } from "../../styles/themes";

export default {
    title: "Global/LittleLoading",
    component: LittleLoading,
} as Meta;

export const Light = () => (
    <ThemeProvider theme={light}>
        <LittleLoading />
    </ThemeProvider>
);

export const Dark = () => (
    <ThemeProvider theme={dark}>
        <LittleLoading />
    </ThemeProvider>
);
