// UBMedia.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBMedia } from "./UBMedia";

const meta: Meta<typeof UBMedia> = {
  title: "components/UBMedia",
  component: UBMedia,
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
