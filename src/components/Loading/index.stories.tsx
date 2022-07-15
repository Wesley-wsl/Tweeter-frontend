import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import { Loading } from ".";
import { IThemeContext } from "../../@types";
import { ThemeContext } from "../../contexts/Theme";
import { dark, light } from "../../styles/themes";

export default {
    title: "Global/Loading",
    component: Loading,
} as Meta;

export const Light = () => (
    <ThemeContext.Provider
        value={
            {
                lightMode: true,
            } as IThemeContext
        }
    >
        <ThemeProvider theme={light}>
            <Loading />
        </ThemeProvider>
    </ThemeContext.Provider>
);

export const Dark = () => (
    <ThemeContext.Provider
        value={
            {
                lightMode: false,
            } as IThemeContext
        }
    >
        <ThemeProvider theme={dark}>
            <Loading />
        </ThemeProvider>
    </ThemeContext.Provider>
);
