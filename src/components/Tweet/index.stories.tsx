import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import Tweet from ".";
import { IAuthContext, ITweetComponent } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import { dark, light } from "../../styles/themes";
import { tweetMocked } from "../../tests/mocks/constants";

export default {
    title: "Tweet/Tweet",
    component: Tweet,
    argTypes: {
        data: {
            defaultValue: { ...tweetMocked, image: null },
        },
    },
    decorators: [
        story => (
            <AuthContext.Provider
                value={
                    {
                        user: {
                            id: "0",
                            avatar: null,
                            name: "Jorkis",
                        },
                    } as unknown as IAuthContext
                }
            >
                {story()}
            </AuthContext.Provider>
        ),
    ],
} as Meta<ITweetComponent>;

export const Light = (args: ITweetComponent) => (
    <ThemeProvider theme={light}>
        <Tweet {...args} />
    </ThemeProvider>
);

export const Dark = (args: ITweetComponent) => (
    <ThemeProvider theme={dark}>
        <Tweet {...args} />
    </ThemeProvider>
);
