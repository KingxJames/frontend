// UBMessengerDetail.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBMessengerDetail } from "./UBMessengerDetail";

const meta: Meta<typeof UBMessengerDetail> = {
  title: "components/UBMessengerDetail",
  component: UBMessengerDetail,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
