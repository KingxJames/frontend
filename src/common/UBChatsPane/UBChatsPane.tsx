import React from "react";
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Input } from '@mui/joy';
import List from '@mui/joy/List';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { UBChatListItem } from "../UBChatListItem/UBChatListItem";
import { ChatProps } from '../types';
import { toggleMessagesPane } from '../utils';

type IUBChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};


export const UBChatsPane: React.FC<IUBChatsPaneProps> = (props) => {
  const { chats, setSelectedChat, selectedChatId } = props;
  return (
    <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        overflowY: '',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 1.5 }}
      >
        <Typography
          sx={{ fontSize: { xs: 'md', md: 'lg' }, fontWeight: 'lg', mr: 'auto' }}
        >
          Messages
        </Typography>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          onClick={() => {
            toggleMessagesPane();
          }}
          sx={{ display: { sm: 'none' } }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      <List
        sx={{
          py: 0,
          '--ListItem-paddingY': '0.75rem',
          '--ListItem-paddingX': '1rem',
        }}
      >
        {chats.map((chat) => (
          <UBChatListItem
            key={chat.id}
            {...chat}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}
          />
        ))}
      </List>
    </Sheet>
  )
}