"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { useLanguage } from '@/context/languageContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatWidget() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    const welcomeMessage = {
      id: '1',
      content: language === 'fr'
        ? "Salut ! Je suis l'Assistant MissionPro. Je suis là pour vous aider avec la recherche d'emploi, les conseils de carrière et la navigation sur notre plateforme. Comment puis-je vous aider aujourd'hui ?"
        : "Hi! I'm MissionPro Assistant. I'm here to help you with job searching, career advice, and navigating our platform. How can I assist you today?",
      role: 'assistant' as const,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [language]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to render message content with clickable links
  const renderMessageContent = (content: string) => {
    // Convert markdown links to clickable links
    const linkRegex = /\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/g;
    const parts = content.split(linkRegex);

    return parts.map((part, index) => {
      // Every third element starting from index 2 is a URL
      if (index % 3 === 2) {
        const linkText = parts[index - 1];
        const url = part;
        return (
          <button
            key={index}
            onClick={() => {
              setIsOpen(false); // Close chat
              router.push(url); // Navigate to the page
            }}
            className="text-[#7263F3] hover:text-[#7263F3]/80 underline font-semibold mx-1 transition-colors"
          >
            {linkText}
          </button>
        );
      }
      // Skip link text (every third element starting from index 1)
      else if (index % 3 === 1) {
        return null;
      }
      // Regular text
      else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  // Send message to chatbot
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await axios.post('/api/v1/chat', {
        message: inputMessage,
        language: language, // Send current page language
        conversationHistory: conversationHistory.slice(-10) // Keep last 10 messages for context
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.data.message,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error.response?.data?.message || (language === 'fr'
          ? "Désolé, j'ai des difficultés en ce moment. Veuillez réessayer plus tard."
          : "Sorry, I'm having trouble right now. Please try again later."),
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#7263F3] hover:bg-[#7263F3]/90 shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col bg-white dark:bg-gray-800">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-[#7263F3] text-white rounded-t-lg">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bot className="h-5 w-5" />
              {language === 'fr' ? 'Assistant MissionPro' : 'MissionPro Assistant'}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-[#7263F3] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <Bot className="h-4 w-4 mt-0.5 text-[#7263F3]" />
                    )}
                    {message.role === 'user' && (
                      <User className="h-4 w-4 mt-0.5" />
                    )}
                    <div className="text-sm">{renderMessageContent(message.content)}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-[#7263F3]" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#7263F3] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#7263F3] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-[#7263F3] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'fr'
                  ? "Demandez-moi des informations sur les emplois, carrières ou MissionPro..."
                  : "Ask me about jobs, careers, or MissionPro..."}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
                className="bg-[#7263F3] hover:bg-[#7263F3]/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
