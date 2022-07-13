import { Meta } from "@storybook/react";

import AvatarProfile from ".";
import { IAvatarProfile } from "../../../@types";

export default {
    title: "Global/AvatarProfile",
    component: AvatarProfile,
} as Meta<IAvatarProfile>;

const Template = (args: IAvatarProfile) => <AvatarProfile {...args} />;

export const Default = Template.bind({});
