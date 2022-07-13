import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import AboutProfile from ".";
import { IAboutProfile } from "../../@types";
import { dark, light } from "../../styles/themes";

export default {
    title: "Global/AboutProfile",
    component: AboutProfile,
    argTypes: {
        userInformations: {
            defaultValue: {
                id: "2",
                name: "Jorkis",
                avatar: null,
                background: null,
                followingCount: 0,
                followersCount: 0,
                followers_id: [],
                following_id: [],
                about_me: "About me...",
            },
        },
    },
    decorators: [
        story => (
            <div
                style={{
                    marginTop: "10rem",
                }}
            >
                {story()}
            </div>
        ),
    ],
} as Meta<IAboutProfile>;

export const Light = (args: IAboutProfile) => (
    <ThemeProvider theme={light}>
        <AboutProfile {...args} />
    </ThemeProvider>
);

export const Dark = (args: IAboutProfile) => (
    <ThemeProvider theme={dark}>
        <AboutProfile {...args} />
    </ThemeProvider>
);
