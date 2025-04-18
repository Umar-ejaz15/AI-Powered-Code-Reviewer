import Button from "./components/Button";
import { useEffect, useState } from "react";
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import retypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { Analytics } from '@vercel/analytics/react';
import { IoSend } from 'react-icons/io5';
import { HelmetProvider, Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const reviewCode = async function () {
    setIsLoading(true);
    setShowWelcome(false);
    try {
      const res = await axios.post(
        "https://devin-dusky.vercel.app/ai/get-response",
        { prompt: code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setReview(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      reviewCode();
    }
  };

  const highlight = (code) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>AI Chat Assistant | Smart Conversational AI</title>
        <meta name="description" content="Engage with our intelligent AI chatbot for natural conversations and helpful responses. Experience seamless communication powered by advanced AI." />
        <meta name="keywords" content="AI chatbot, conversational AI, virtual assistant, chat interface, AI communication, smart chat, AI messaging, interactive AI, chatbot assistant" />
        <meta property="og:title" content="AI Chat Assistant | Smart Conversational AI" />
        <meta property="og:description" content="Engage with our intelligent AI chatbot for natural conversations and helpful responses. Experience seamless communication powered by advanced AI." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://devin-dusky.vercel.app" />
      </Helmet>
      <Analytics />
      <main className="w-full min-h-screen flex flex-col bg-black text-white">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {showWelcome ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20"
                >
                  <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-4"
                  >
                    Welcome to Devin Dusky
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-purple-300"
                  >
                    Your Intelligent AI Assistant
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/50 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-purple-500"
                >
                  <Markdown
                    rehypePlugins={[retypeHighlight]}
                    className="prose prose-invert max-w-none prose-pre:bg-black prose-pre:rounded-lg"
                  >
                    {review}
                  </Markdown>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-purple-500 bg-black/50 backdrop-blur-lg p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Editor
                value={code}
                placeholder="Type your message here..."
                onValueChange={(code) => setCode(code)}
                highlight={highlight}
                onKeyPress={handleKeyPress}
                padding={16}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: "#000000",
                  color: "white",
                  borderRadius: "12px",
                  minHeight: "120px",
                  paddingRight: "48px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(139, 92, 246, 0.5)",
                }}
              />
              <motion.button
                onClick={reviewCode}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-4 bottom-4 p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-lg"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                ) : (
                  <IoSend className="w-5 h-5 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    </HelmetProvider>
  );
}

export default App;