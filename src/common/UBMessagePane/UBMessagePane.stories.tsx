// UBMessagePane.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UBMessagePane }  from "./UBMessagePane";

const meta: Meta<typeof UBMessagePane> = {
  title: 'common/UBMessagePane', 
  component: UBMessagePane,
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