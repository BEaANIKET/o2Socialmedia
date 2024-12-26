import { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setComment('');
  };

  return (
    <div className="mt-4 border-t dark:border-gray-700 pt-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 bg-transparent border-none focus:ring-0 dark:text-white placeholder-gray-500"
        />
        <button 
          type="submit"
          disabled={!comment.trim()}
          className="text-blue-500 font-semibold disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}