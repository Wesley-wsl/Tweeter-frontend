import { Meta } from "@storybook/react";

import CustomBackground from ".";
import { ICustomBackground } from "../../@types";

export default {
    title: "Global/CustomBackground",
    component: CustomBackground,
} as Meta<ICustomBackground>;

const Template = () => (
    <CustomBackground image="/background/background.webp">
        <div />
    </CustomBackground>
);

export const Default = Template.bind({});
