// UBMessengerChat.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBMessenger } from "./UBMessenger";

const meta: Meta<typeof UBMessenger> = {
  title: "components/UBMessenger",
  component: UBMessenger,
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
