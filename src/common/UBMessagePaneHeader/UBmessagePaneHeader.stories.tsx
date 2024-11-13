// UBMessagePaneHeader.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBMessagePaneHeader }  from "./UBMessagePaneHeader";

const meta: Meta<typeof UBMessagePaneHeader> = {
  title: 'common/UBMessagePaneHeader', 
  component: UBMessagePaneHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
  

export const Default: Story = {
  args: {
   
  },
};