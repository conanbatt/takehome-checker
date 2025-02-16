import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Card from "./Card";

const ReadmeViewer = ({ markdown }: { markdown: string }) => (
    <Card fullHeight maxHeight={"75vh"}>
        <ReactMarkdown
            components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-3 mb-1" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-2 mb-1" {...props} />,
                p: ({ node, ...props }) => <p className="leading-relaxed mb-4" {...props} />,
                a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                code: ({ node, inline, className, children, ...props }) =>
                    inline ? (
                        <code className="bg-gray-100 px-1 py-0.5 rounded-sm text-sm">{children}</code>
                    ) : (
                        <SyntaxHighlighter
                            language="javascript"
                            style={docco}
                            className="my-4 rounded-md"
                            customStyle={{ fontSize: "14px", background: "#f6f8fa" }}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ),
            }}
        >
            {markdown}
        </ReactMarkdown>
    </Card>
);

export default ReadmeViewer;
