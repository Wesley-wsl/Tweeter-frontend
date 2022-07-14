import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PersonAdd } from "@styled-icons/ionicons-sharp";

import { Button } from "./index";

export default {
    title: "Global/Button",
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
        disabled: {
            control: "boolean",
        },
        color: {
            control: "select",
            options: ["#0050bc", "#e20008"],
            defaultValue: "#0050bc",
        },
        onClick: { action: "onClick" },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});

export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
    title: "Follow",
    iconLeft: <PersonAdd width={12} height={12} aria-label="Person add icon" />,
};
