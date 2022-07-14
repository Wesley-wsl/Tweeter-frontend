import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import FollowCard from ".";
import { IFollowCard } from "../../@types";
import { dark } from "../../styles/themes";

export default {
    title: "Global/FollowCard",
    component: FollowCard,
    argTypes: {
        data: {
            defaultValue: {
                id: "2",
                avatar: null,
                name: "Jorkis",
                followers_id: [],
                about_me: "About me...",
            },
        },
    },
} as Meta<IFollowCard>;

export const Default = (args: IFollowCard) => (
    <ThemeProvider theme={dark}>
        <FollowCard {...args} />
    </ThemeProvider>
);
