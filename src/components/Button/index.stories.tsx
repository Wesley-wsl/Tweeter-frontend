import { Meta } from "@storybook/react";
import { PersonAdd } from "@styled-icons/ionicons-sharp";

import { IButton } from "../../@types";
import { Button } from "./index";

export default {
    title: "Button",
    component: Button,
    argTypes: {
        title: {
            type: "string",
            control: "text",
            defaultValue: "Followers",
        },
        iconLeft: {
            control: "none",
        },
    },
} as Meta;

export const Primary = (args: IButton) => <Button {...args} />;

export const WithLeftIcon = (args: IButton) => <Button {...args} />;
WithLeftIcon.args = {
    title: "Follow",
    iconLeft: <PersonAdd width={12} height={12} aria-label="Person add icon" />,
};
