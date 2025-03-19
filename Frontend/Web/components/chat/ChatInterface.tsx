// Recommended implementation: components/chat/ChatInterface.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Send } from 'lucide-react';

export default function ChatInterface({ recipientId, recipientName, recipientImage }: {
  recipientId: string;
  recipientName: string;
  recipientImage?: string;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const socket = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket || !user) return;

    // Connect to the chat
    socket.emit('joinChat', { userId: user.id, recipientId });

    // Load previous messages
    socket.emit('getMessages', { 
      userId: user.id, 
      recipientId 
    }, (response: any[]) => {
      setMessages(response);
    });

    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket, user, recipientId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket || !user) return;

    socket.emit('sendMessage', {
      recipientId,
      content: newMessage
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-xl overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b bg-white">
        <Avatar className="mr-3 h-9 w-9">
          <img src={recipientImage || "/placeholder.svg"} alt={recipientName} />
        </Avatar>
        <div>
          <h3 className="font-medium">{recipientName}</h3>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message, i) => (
          <div 
            key={i}
            className={`mb-4 flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === user?.id 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.senderId === user?.id ? 'text-primary-foreground/70' : 'text-gray-500'
              }`}>
                {new Date(message.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="p-3 border-t bg-white">
        <div className="flex">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button className="ml-2" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}