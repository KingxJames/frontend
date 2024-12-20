import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

import { UBMessagePane } from '../UBMessagePane/UBMessagePane';
import { UBChatsPane } from '../UBChatsPane/UBChatsPane';
import { ChatProps } from '../types';
import { chats } from '../data';

export const UBMyMessage: React.FC = () => {
    const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);
    return(
        <Sheet
        sx={{
          flex: 1,
          width: '100%',
          mx: '',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(min-content, min(30%, 400px)) 1fr',
          },
        }}
      >
        <Sheet
          sx={{
            position: { xs: 'fixed', sm: 'sticky' },
            transform: {
              xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
              sm: 'none',
            },
            transition: 'transform 0.4s, width 0.4s',
            zIndex: 100,
            width: '100%',
            top: 52,
          }}
        >
          <UBChatsPane
            chats={chats}
            selectedChatId={selectedChat.id}
            setSelectedChat={setSelectedChat}
          />
        </Sheet>
        <UBMessagePane chat={selectedChat} />
      </Sheet>
    )
}