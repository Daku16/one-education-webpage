type ProjectRichContentProps = {
  content: unknown;
};

type BlockChild = {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type BlockNode = {
  type?: string;
  level?: number;
  format?: string;
  children?: BlockChild[];
};

function renderText(children?: BlockChild[]) {
  if (!children?.length) return null;

  return children.map((child, index) => {
    let node: React.ReactNode = child.text || "";

    if (child.bold) node = <strong key={`b-${index}`}>{node}</strong>;
    if (child.italic) node = <em key={`i-${index}`}>{node}</em>;
    if (child.underline) node = <u key={`u-${index}`}>{node}</u>;
    if (child.strikethrough) node = <s key={`s-${index}`}>{node}</s>;
    if (child.code) {
      node = (
        <code
          key={`c-${index}`}
          className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.95em]"
        >
          {child.text}
        </code>
      );
    }

    return <span key={index}>{node}</span>;
  });
}

export function ProjectRichContent({ content }: ProjectRichContentProps) {
  if (!Array.isArray(content) || content.length === 0) {
    return null;
  }

  const blocks = content as BlockNode[];

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const text = renderText(block.children);

        if (!text) return null;

        switch (block.type) {
          case "heading": {
            const level = Math.min(Math.max(block.level || 2, 2), 4);

            if (level === 2) {
              return (
                <h2
                  key={index}
                  className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
                >
                  {text}
                </h2>
              );
            }

            if (level === 3) {
              return (
                <h3
                  key={index}
                  className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl"
                >
                  {text}
                </h3>
              );
            }

            return (
              <h4
                key={index}
                className="text-lg font-semibold tracking-tight text-slate-900"
              >
                {text}
              </h4>
            );
          }

          case "list": {
            const isOrdered = block.format === "ordered";

            return isOrdered ? (
              <ol
                key={index}
                className="list-decimal space-y-2 pl-6 text-base leading-7 text-slate-700"
              >
                <li>{text}</li>
              </ol>
            ) : (
              <ul
                key={index}
                className="list-disc space-y-2 pl-6 text-base leading-7 text-slate-700"
              >
                <li>{text}</li>
              </ul>
            );
          }

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-teal-600 pl-4 text-lg leading-8 text-slate-700"
              >
                {text}
              </blockquote>
            );

          case "paragraph":
          default:
            return (
              <p key={index} className="text-base leading-7 text-slate-700">
                {text}
              </p>
            );
        }
      })}
    </div>
  );
}