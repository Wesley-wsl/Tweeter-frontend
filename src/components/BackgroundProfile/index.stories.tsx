import { Meta } from "@storybook/react";

import BackgroundProfile from ".";
import { IBackgroundProfile } from "../../@types";

export default {
    title: "Global/BackgroundProfile",
    component: BackgroundProfile,
} as Meta<IBackgroundProfile>;

const Template = (args: IBackgroundProfile) => <BackgroundProfile {...args} />;

export const Default = Template.bind({});
