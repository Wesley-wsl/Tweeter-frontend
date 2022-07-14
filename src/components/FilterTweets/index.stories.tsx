import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import FilterTweets from ".";
import { IFilterTweets } from "../../@types";
import { dark, light } from "../../styles/themes";

export default {
    title: "Global/FilterTweets",
    component: FilterTweets,
    argTypes: {
        filter: {
            control: "text",
            defaultValue: "Top",
        },
        options: {
            control: "",
            defaultValue: ["Top", "Latest", "Media", "Likes"],
        },
    },
} as Meta<IFilterTweets>;

export const Light = (args: IFilterTweets) => {
    return (
        <ThemeProvider theme={light}>
            <FilterTweets {...args} />
        </ThemeProvider>
    );
};

export const Dark = (args: IFilterTweets) => {
    return (
        <ThemeProvider theme={dark}>
            <FilterTweets {...args} />
        </ThemeProvider>
    );
};
