import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import WriteTweet from ".";
import { IWriteTweet } from "../../@types";
import { dark, light } from "../../styles/themes";

export default {
    title: "Tweet/WriteTweet/WriteTweet",
    component: WriteTweet,
} as Meta<IWriteTweet>;

export const Light = (args: IWriteTweet) => (
    <ThemeProvider theme={light}>
        <WriteTweet {...args} />
    </ThemeProvider>
);

export const Dark = (args: IWriteTweet) => (
    <ThemeProvider theme={dark}>
        <WriteTweet {...args} />
    </ThemeProvider>
);
