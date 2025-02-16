import Button from "./components/Button";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import retypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
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
      const res = await axios.post("http://localhost:3000/ai/get-response", { prompt: code });
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
      <main className="w-full h-screen flex gap-1 bg-zinc-900 px-2 py-3">
        <div className="left relative w-1/2 h-full bg-zinc-900 px-1 py-1">
          <div className="flex flex-col w-full h-full gap-1 justify-center items-center">
            <Editor
              className="w-full h-full"
              value={code}
              placeholder="Write your code here..."
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
                // overflow: "auto",
                maxHeight: "100%",
                minHeight: "100%",
                minWidth: "100%",
                
              }}
            />

            <Button
              reviewCode={reviewCode}
              btntxt={isLoading ? "Loading..." : "Review My Code"}
            />
          </div>
        </div>
        <div className="right w-1/2 h-full text-sm bg-black/5 text-white px-3 py-1 overflow-y-auto">
          <div className="w-full break-words whitespace-pre-wrap ">
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