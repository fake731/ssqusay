import React from "react";

/**
 * Renders text and highlights historical adversary names in red.
 * Currently highlights all "Byzantine"-family terms in Arabic.
 */
const HIGHLIGHT_TERMS = [
  "الإمبراطورية البيزنطية",
  "الامبراطورية البيزنطية",
  "البيزنطيين",
  "البيزنطيون",
  "البيزنطية",
  "البيزنطي",
  "بيزنطة",
  "بيزنطا",
];

const buildRegex = () => {
  const escaped = HIGHLIGHT_TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`(${escaped.join("|")})`, "g");
};

const REGEX = buildRegex();

interface Props {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const HistoricalProse: React.FC<Props> = ({ text, className, as: Tag = "p" }) => {
  if (!text) return null;
  const parts = text.split(REGEX);
  return (
    <Tag className={className} style={{ whiteSpace: "pre-line" }}>
      {parts.map((part, i) =>
        HIGHLIGHT_TERMS.includes(part) ? (
          <span key={i} className="text-byzantine font-semibold">
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </Tag>
  );
};

export default HistoricalProse;