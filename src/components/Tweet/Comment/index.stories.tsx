import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import { Comment } from ".";
import { ICommentData } from "../../../@types";
import { dark, light } from "../../../styles/themes";

export default {
    title: "Tweet/Comment",
    component: Comment,
    argTypes: {
        data: {
            defaultValue: {
                id: "1",
                author_id: "1",
                author: { name: "Aki Shino", avatar: null },
                comment: "Comment test.",
                likes: 0,
                liked_users_id: [],
                created_at: new Date(),
            },
        },
    },
} as Meta<ICommentData>;

export const Light = (args: ICommentData) => (
    <ThemeProvider theme={light}>
        <Comment {...args} />
    </ThemeProvider>
);

export const Dark = (args: ICommentData) => (
    <ThemeProvider theme={dark}>
        <Comment {...args} />
    </ThemeProvider>
);
