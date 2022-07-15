import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import ScrollToTop from ".";
import { dark, light } from "../../styles/themes";

export default {
    title: "Global/ScrollToTop",
    component: ScrollToTop,
    decorators: [story => <div style={{ marginTop: "200vh" }}>{story()}</div>],
} as Meta;

export const Light = () => (
    <ThemeProvider theme={light}>
        <ScrollToTop />
    </ThemeProvider>
);

export const Dark = () => (
    <ThemeProvider theme={dark}>
        <ScrollToTop />
    </ThemeProvider>
);
