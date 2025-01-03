import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

export default function MessagesPage() {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    return (
        <div className="h-[calc(100vh-4rem)] flex bg-white dark:bg-gray-900">
            <div className={`${selectedChatId ? 'hidden md:block' : 'block'
                } w-full md:w-96 border-r dark:border-gray-700`}>
                <ChatList onSelectChat={(chatId) => setSelectedChatId(chatId)} />
            </div>

            <div className={`${selectedChatId ? 'block' : 'hidden'
                } md:block flex-1 h-full`}>
                {selectedChatId ? (
                    <div className="h-full flex flex-col">
                        <button
                            onClick={() => setSelectedChatId(null)}
                            className="md:hidden p-4 flex items-center text-gray-600 dark:text-gray-300"
                        >
                            <ArrowLeft className="w-6 h-6 mr-2" />
                            Back to messages
                        </button>
                        <div className="flex-1">
                            <ChatWindow chatId={selectedChatId} />
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
}