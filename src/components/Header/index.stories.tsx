import { Meta } from "@storybook/react";

import Header from ".";
import SignInForm from ".";
import { IAuthContext } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";

export default {
    title: "Header/Header",
    component: SignInForm,
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
} as Meta;

export const Default = () => <Header />;
