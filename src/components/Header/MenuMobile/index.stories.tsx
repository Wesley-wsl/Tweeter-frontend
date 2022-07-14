import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import MenuMobile from ".";
import { dark, light } from "../../../styles/themes";

export default {
    title: "Header/MenuMobile",
    component: MenuMobile,
} as Meta;

export const Light = () => (
    <ThemeProvider theme={light}>
        <MenuMobile />;
    </ThemeProvider>
);

export const Dark = () => (
    <ThemeProvider theme={dark}>
        <MenuMobile />;
    </ThemeProvider>
);
