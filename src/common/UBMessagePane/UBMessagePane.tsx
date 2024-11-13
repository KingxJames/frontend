import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import UBAvatarWithStatus from '../UBAvatarWithStatus/UBAvatarWithStatus';
import { UBChatBubble } from '../UBChatBubble/UBChatBubble';
import { UBMessageInput } from '../UBMessageInput/UBMessageInput';
import { UBMessagePaneHeader } from '../UBMessagePaneHeader/UBMessagePaneHeader';
import { ChatProps, MessageProps } from '../types';

type IUBMessagesPaneProps = {
  chat: ChatProps;
};

export const UBMessagePane: React.FC<IUBMessagesPaneProps> = (props) => {
  const { chat } = props;
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState('');

  React.useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  return (
    <Sheet
      className="dark:bg-boxdark dark:text-white"
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', md: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
    >
      <UBMessagePaneHeader sender={chat.sender} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
        className="dark:bg-meta-4"
      >
        <Stack spacing={2} sx={{ justifyContent: 'flex-end' }}>
          {chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === 'You';
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{ flexDirection: isYou ? 'row-reverse' : 'row' }}
              >
                {message.sender !== 'You' && (
                  <UBAvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <UBChatBubble
                  // className={isYou ? 'dark:bg-primary' : 'dark:bg-meta-4'}
                  variant={isYou ? 'sent' : 'received'}
                  {...message}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <UBMessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          const newId = chatMessages.length + 1;
          const newIdString = newId.toString();
          setChatMessages([
            ...chatMessages,
            {
              id: newIdString,
              sender: 'You',
              content: textAreaValue,
              timestamp: 'Just now',
            },
          ]);
        }}
      />
    </Sheet>
  );
};
