'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { apiClient, Message } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm Juno, your AI fashion stylist. I can help you with styling advice, product recommendations, and creating moodboards. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { autoStyleEnabled, setAutoStyleEnabled, addSelectedProduct } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const allMessages = [...messages, userMessage];
      const stream = await apiClient.chat(allMessages);

      let assistantResponse = '';
      const newMessage: Message = {
        role: 'assistant',
        content: '',
      };
      setMessages((prev) => [...prev, newMessage]);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') {
              reader.cancel();
              break;
            }

            if (data) {
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantResponse += parsed.content;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      ...updated[updated.length - 1],
                      content: assistantResponse,
                    };
                    return updated;
                  });
                }
              } catch (e) {
                // Ignore parsing errors for malformed JSON
                console.warn('Failed to parse SSE data:', data);
              }
            }
          }
        }
      }

      // Auto-style processing if enabled
      if (autoStyleEnabled && assistantResponse.length > 50) {
        toast.promise(
          apiClient.proactiveStyleGenerator(assistantResponse).then((moodboard) => {
            toast.success(`New moodboard "${moodboard.title}" created!`);
          }),
          {
            loading: 'Creating moodboard...',
            success: 'Moodboard created!',
            error: 'Failed to create moodboard',
          }
        );
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="border-b bg-white/90 backdrop-blur-md shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Juno
              </span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Chat</h1>
              <p className="text-xs text-gray-500">AI Fashion Stylist</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/gallery">
              <Button variant="outline" size="icon" className="hover:bg-purple-50 hover:border-purple-300">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant={autoStyleEnabled ? 'default' : 'outline'}
              size="icon"
              onClick={() => setAutoStyleEnabled(!autoStyleEnabled)}
              className={autoStyleEnabled ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0' : 'hover:bg-purple-50 hover:border-purple-300'}
            >
              <Sparkles className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-transparent via-purple-50/30 to-pink-50/30">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-5 rounded-2xl shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white border border-gray-100'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown>{message.content as string}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-white">{message.content as string}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-white p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-white/90 backdrop-blur-md shadow-lg p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask me about fashion styling..."
            disabled={isLoading}
            className="flex-1 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl px-6 hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

