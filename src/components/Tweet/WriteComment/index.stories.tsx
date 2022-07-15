import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import WriteComment from ".";
import { IAuthContext, IWriteComment } from "../../../@types";
import { AuthContext } from "../../../contexts/AuthContext";
import { dark, light } from "../../../styles/themes";

export default {
    title: "Tweet/WriteComment",
    component: WriteComment,
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
} as Meta<IWriteComment>;

export const Light = (args: IWriteComment) => (
    <ThemeProvider theme={light}>
        <WriteComment {...args} />
    </ThemeProvider>
);

export const Dark = (args: IWriteComment) => (
    <ThemeProvider theme={dark}>
        <WriteComment {...args} />
    </ThemeProvider>
);
