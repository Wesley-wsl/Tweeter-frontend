import { Meta } from "@storybook/react";
import { PersonFill } from "@styled-icons/bootstrap";
import { RefAttributes } from "react";
import { ThemeProvider } from "styled-components";

import Input from ".";
import { IInput } from "../../../@types";
import { dark, light } from "../../../styles/themes";

export default {
    title: "Form/Input",
    component: Input,
    argTypes: {
        placeholder: {
            type: "string",
            control: "text",
            defaultValue: "Email",
        },
        error: {
            control: "object",
            defaultValue: {
                message: "This is an error message",
            },
        },
        iconRight: {
            control: "none",
        },
    },
} as Meta<IInput & RefAttributes<HTMLInputElement>>;

export const Light = (
    args: JSX.IntrinsicAttributes & IInput & RefAttributes<HTMLInputElement>,
) => (
    <ThemeProvider theme={light}>
        <Input
            {...args}
            IconRight={
                <PersonFill
                    width="20"
                    color={"#3d3d3d"}
                    aria-label="Person icon for field email"
                    className="formIcon"
                />
            }
        />
    </ThemeProvider>
);

export const Dark = (
    args: JSX.IntrinsicAttributes & IInput & RefAttributes<HTMLInputElement>,
) => (
    <ThemeProvider theme={dark}>
        <Input
            {...args}
            IconRight={
                <PersonFill
                    width="20"
                    color={"#3d3d3d"}
                    aria-label="Person icon for field email"
                    className="formIcon"
                />
            }
        />
    </ThemeProvider>
);
