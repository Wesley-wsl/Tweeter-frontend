import { Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";

import Modal from ".";
import { IModal } from "../../@types";
import { light } from "../../styles/themes";

export default {
    title: "Global/Modal",
    component: Modal,
    args: {
        isActive: {
            control: "boolean",
            defaultValue: true,
        },
    },
} as unknown as Meta<IModal>;

export const Default = (args: IModal) => (
    <ThemeProvider theme={light}>
        <Modal {...args}>
            <div
                style={{
                    backgroundColor: "red",
                    width: "35rem",
                    height: "35rem",
                    borderRadius: "3rem",
                }}
            />
        </Modal>
    </ThemeProvider>
);
