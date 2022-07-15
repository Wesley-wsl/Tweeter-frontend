import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import WhoCanSee from ".";
import { IWhoCanSee } from "../../../@types";
import { dark, light } from "../../../styles/themes";

export default {
    title: "Tweet/WriteTweet/WhoCanSee",
    component: WhoCanSee,
} as Meta<IWhoCanSee>;

export const Light = (args: IWhoCanSee) => (
    <ThemeProvider theme={light}>
        <WhoCanSee {...args} />
    </ThemeProvider>
);

export const Dark = (args: IWhoCanSee) => (
    <ThemeProvider theme={dark}>
        <WhoCanSee {...args} />
    </ThemeProvider>
);
