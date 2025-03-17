// UBWhatsappDetail.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBWhatsappDetail } from "./UBWhatsappDetail";

const meta: Meta<typeof UBWhatsappDetail> = {
  title: "components/UBWhatsappDetail",
  component: UBWhatsappDetail,
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
