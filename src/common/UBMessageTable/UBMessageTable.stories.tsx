// UBMessageTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import   UBMessageTable  from './UBMessageTable';

const meta: Meta<typeof UBMessageTable> = {
  title: 'common/UBMessageTable', 
  component: UBMessageTable,
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