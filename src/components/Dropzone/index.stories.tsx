import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import Dropzone from ".";
import { IDropzone } from "../../@types";
import { dark, light } from "../../styles/themes";

export default {
    title: "Global/Dropzone",
    component: Dropzone,
} as Meta<IDropzone>;

export const Light = (args: IDropzone) => (
    <ThemeProvider theme={light}>
        <Dropzone {...args} />
    </ThemeProvider>
);

export const Dark = (args: IDropzone) => (
    <ThemeProvider theme={dark}>
        <Dropzone {...args} />
    </ThemeProvider>
);
