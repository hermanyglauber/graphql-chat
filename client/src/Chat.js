import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import React, { useState } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { messagesQuery, messageAddedSubscription, addMessageMutation } from './graphql/queries';

const Chat = ({ user }) => {
    const [messages, setMessage] = useState([]);

    useQuery(messagesQuery, {
        onCompleted: ({ messages }) => setMessage(messages)
    });
  useSubscription(messageAddedSubscription, {
     onSubscriptionData: ({ subscriptionData }) => {
        setMessage(messages.concat(subscriptionData.data.messageAdded))
     }
  });
  const [addMessage] = useMutation(addMessageMutation);

  const handleSend = async (text) => {
    await addMessage({ variables: { input: { text } } });
  };

  return (
      <section className="section">
        <div className="container">
          <h1 className="title">Chatting as {user}</h1>
          <MessageList user={user} messages={messages} />
          <MessageInput onSend={ handleSend } />
        </div>
      </section>
  );
};

export default Chat;
