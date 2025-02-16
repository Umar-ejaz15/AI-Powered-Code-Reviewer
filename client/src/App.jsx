import Button from "./components/Button";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import retypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { Analytics } from "@vercel/analytics/react";
import { Helmet } from "react-helmet";

// import "prismjs/components/prism-jsx";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const reviewCode = async function () {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://devin-dusky.vercel.app/ai/get-response",
        { prompt: code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }

        // "http://localhost:3000/ai/get-response",
        // { prompt: code }
      );

      console.log(res.data);
      setReview(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>AI Code  Assistant | Smart Code Analysis Tool</title>
        <meta name="description" content="Powerful AI-powered code review assistant that helps developers analyze, optimize, and improve their code quality. Get instant feedback and suggestions for your code." />
        <meta name="keywords" content="AI code review, code analysis tool, code optimization, programming assistant, code quality checker, automated code review, developer tools, code improvement, code suggestions, AI programming" />
        <meta property="og:title" content="AI Code Review Assistant | Smart Code Analysis Tool" />
        <meta property="og:description" content="Powerful AI-powered code review assistant that helps developers analyze, optimize, and improve their code quality. Get instant feedback and suggestions for your code." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://devin-dusky.vercel.app" />
      </Helmet>
      <Analytics />
      <main className="w-full min-h-screen flex flex-col md:flex-row gap-4 bg-zinc-900 p-4">
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen bg-zinc-900 p-2">
          <div className="flex relative flex-col w-full h-full gap-4 justify-center items-center">
            <Editor
              className="w-full h-full"
              value={code}
              placeholder="Write your prompt here..."
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor: "black",
                color: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                maxHeight: "100%",
                minHeight: "100%",
                minWidth: "100%",
              }}
            />

            <Button
              reviewCode={reviewCode}
              btntxt={isLoading ? "Loading..." : "Start"}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen text-sm bg-black/5 text-white p-4 overflow-y-auto">
          <div className="w-full break-words whitespace-pre-wrap">
            <Markdown
              rehypePlugins={[retypeHighlight]}
              className="prose prose-invert"
            >
              {review}
            </Markdown>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;