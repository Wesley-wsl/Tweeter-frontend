import { Meta } from "@storybook/react";

import ButtonForm from ".";
import { IButtonForm } from "../../../@types";

export default {
    title: "Form/ButtonForm",
    component: ButtonForm,
    argTypes: {
        title: {
            control: "text",
            defaultValue: "Sign In",
        },
        loading: {
            control: "boolean",
            defaultValue: false,
        },
    },
} as Meta<IButtonForm>;

export const Default = (args: IButtonForm) => <ButtonForm {...args} />;
