import { Meta } from "@storybook/react";

import { ProfileWidget } from ".";
import { IAuthContext } from "../../../@types";
import { AuthContext } from "../../../contexts/AuthContext";

export default {
    title: "Header/ProfileWidget",
    component: ProfileWidget,
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

export const Default = () => <ProfileWidget />;
