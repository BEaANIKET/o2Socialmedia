interface Message {
    id: string;
    content: string;
    timestamp: string;
    senderId: string;
}

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${isOwn
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
            >
                <p>{message.content}</p>
                <span className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                    {message.timestamp}
                </span>
            </div>
        </div>
    );
}