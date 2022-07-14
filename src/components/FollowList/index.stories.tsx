import { Meta } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { ThemeProvider } from "styled-components";

import FollowList from ".";
import { IFollowList } from "../../@types";
import { dark, light } from "../../styles/themes";
import { userJest } from "../../tests/mocks/constants";
import { BaseUrlStorybook } from "../../utils/constants";

const USER_JEST = userJest;

export default {
    title: "Global/FollowList",
    component: FollowList,
    argTypes: {
        showFollowing: { control: "boolean", defaultValue: true },
        owner: {
            type: "string",
            control: "text",
            defaultValue: "Jorkis",
        },
        path: {
            type: "string",
            control: "text",
            defaultValue: "following",
        },
        userId: {
            type: "string",
            control: "text",
            defaultValue: USER_JEST.id,
        },
    },
    decorators: [withMock],
    parameters: {
        mockData: [
            {
                url: `${BaseUrlStorybook}/user/${USER_JEST.id}/following`,
                method: "GET",
                status: 200,
                response: {
                    data: [USER_JEST],
                },
            },
        ],
    },
} as Meta<IFollowList>;

export const Light = (args: IFollowList) => (
    <ThemeProvider theme={light}>
        <FollowList {...args} />
    </ThemeProvider>
);

export const Dark = (args: IFollowList) => (
    <ThemeProvider theme={dark}>
        <FollowList {...args} />
    </ThemeProvider>
);
