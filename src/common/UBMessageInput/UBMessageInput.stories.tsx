// UBMessageInput.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBMessageInput }  from "./UBMessageInput";

const meta: Meta<typeof UBMessageInput> = {
  title: 'common/UBMessageInput', 
  component: UBMessageInput,
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