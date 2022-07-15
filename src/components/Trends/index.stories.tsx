import { Meta } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { ThemeProvider } from "styled-components";

import Trends from ".";
import { ITrends } from "../../@types";
import { dark, light } from "../../styles/themes";
import { BaseUrlStorybook } from "../../utils/constants";

export default {
    title: "Global/Trends",
    component: Trends,
    argTypes: {
        handleReset: { action: "reset" },
        search: {
            type: "string",
            control: "text",
            defaultValue: "Backend",
        },
    },
    parameters: {
        mockData: [
            {
                url: `${BaseUrlStorybook}/tweet/me/trends`,
                method: "GET",
                status: 200,
                response: {
                    data: [
                        {
                            trend: "#Backend",
                            tweetsQuantity: 10,
                        },
                        {
                            trend: "#DevOps",
                            tweetsQuantity: 10,
                        },
                    ],
                },
            },
        ],
    },
    decorators: [withMock],
} as Meta<ITrends>;

export const Light = (args: ITrends) => (
    <ThemeProvider theme={light}>
        <Trends {...args} />
    </ThemeProvider>
);

export const Dark = (args: ITrends) => (
    <ThemeProvider theme={dark}>
        <Trends {...args} />
    </ThemeProvider>
);
