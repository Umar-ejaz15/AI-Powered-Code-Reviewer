import Button from "./components/Button";
import { useEffect, useState } from "react";
import 'prismjs/themes/prism-tomorrow.css';

import Editor from "react-simple-code-editor";
// For prismjs theme

// For rehype-highlight

import axios from "axios";
import Markdown from "react-markdown";
import retypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { Analytics } from "@vercel/analytics/react";
import { Helmet } from "react-helmet";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const Prism = require('prismjs');
      Prism.highlightAll();
    }
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
    if (typeof window !== 'undefined') {
      const Prism = require('prismjs');
      return Prism.highlight(code, Prism.languages.javascript, "javascript");
    }
    return code;
  };

  return (
    <>
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
      <main className="w-full min-h-screen flex flex-col bg-[#1a1a1a] text-white">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {showWelcome ? (
              <div className="text-center py-20">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                  Welcome to Devin Dusky
                </h1>
                <p className="text-xl text-gray-400">
                  Your Intelligent AI Assistant
                </p>
              </div>
            ) : (
              <div className="bg-[#2a2a2a] rounded-lg shadow-xl p-6">
                <Markdown
                  rehypePlugins={[retypeHighlight]}
                  className="prose prose-invert max-w-none prose-pre:bg-[#1a1a1a] prose-pre:rounded-lg"
                >
                  {review}
                </Markdown>
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-zinc-800 bg-[#1a1a1a] p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-1">
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
                    backgroundColor: "#2a2a2a",
                    color: "white",
                    borderRadius: "8px",
                    minHeight: "120px",
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button
                  reviewCode={reviewCode}
                  btntxt={isLoading ? "Sending..." : "Send Message"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;