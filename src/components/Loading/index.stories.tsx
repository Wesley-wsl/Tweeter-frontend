import { Meta } from "@storybook/react";

import { Loading } from "./index";

export default {
    title: "Loading",
    component: Loading,
} as Meta;

export const Primary = () => <Loading />;
