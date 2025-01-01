import { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, Info } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageBubble } from './MessageBubble';
import { chats } from '../../data/chatData';
import { RootState } from '../../store/store';
import { useChat } from '../../hooks/useChat';
import { addMessage } from '../../store/slices/chatSlice';

interface ChatWindowProps {
    chatId: string;
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const chat = chats.find(c => c.id === chatId);
    const chatMessages = useSelector((state: RootState) => state.chat.messages[chatId] || []);
    const { sendMessage, isLoading, error } = useChat(chatId);
    const dispatch = useDispatch()


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isLoading) return;

        dispatch(addMessage({ chatId, message: { id: 'new', content: newMessage, timestamp: new Date().toISOString(), senderId: 'currentUser' } }));

        const success = await sendMessage(newMessage.trim());
        if (success) {
            setNewMessage('');
        }
    };

    if (!chat) return null;

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900">
            {/* Chat Header */}
            <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-900">
                <div className="flex items-center space-x-3">
                    <img
                        src={chat.avatar}
                        alt={chat.username}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium dark:text-white">{chat.username}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        <Video className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        <Info className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isOwn={message.senderId === 'currentUser'}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Message..."
                        className="flex-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none dark:text-white"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || isLoading}
                        className="p-2 text-blue-500 disabled:opacity-50"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
}