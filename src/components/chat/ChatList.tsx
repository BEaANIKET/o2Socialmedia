import { useState } from 'react';
import { Search } from 'lucide-react';
import { ChatPreview } from './ChatPreview';
import { chats } from '../../data/chatData';

export default function ChatList({ onSelectChat }: { onSelectChat: (chatId: string) => void }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = chats.filter(chat =>
        chat.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col border-r dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search messages"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 pl-8 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white"
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredChats.map(chat => (
                    <ChatPreview
                        key={chat.id}
                        chat={chat}
                        onClick={() => onSelectChat(chat.id)}
                    />
                ))}
            </div>
        </div>
    );
}