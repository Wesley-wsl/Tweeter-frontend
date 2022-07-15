import { Meta } from "@storybook/react";
import withMock from "storybook-addon-mock";
import { ThemeProvider } from "styled-components";

import WhoFollow from ".";
import { dark, light } from "../../styles/themes";
import { userJest } from "../../tests/mocks/constants";
import { BaseUrlStorybook } from "../../utils/constants";

const USER_JEST = userJest;

export default {
    title: "Global/WhoFollow",
    component: WhoFollow,
    parameters: {
        mockData: [
            {
                url: `${BaseUrlStorybook}/user/me/whofollow`,
                method: "GET",
                status: 200,
                response: {
                    data: [USER_JEST],
                },
            },
        ],
    },
    decorators: [withMock],
} as Meta;

export const Light = () => (
    <ThemeProvider theme={light}>
        <WhoFollow />
    </ThemeProvider>
);

export const Dark = () => (
    <ThemeProvider theme={dark}>
        <WhoFollow />
    </ThemeProvider>
);
