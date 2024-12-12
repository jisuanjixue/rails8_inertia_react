import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useRef } from "react";

function TextareaInput({ name, id, rows, className, maxLength, value, onChange }: { name: string, id: string, rows: number, className: string, maxLength: number, value: string, onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxRows = undefined;

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    const textarea = e.target;
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const borderHeight = parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
    const paddingHeight = parseInt(style.paddingTop) + parseInt(style.paddingBottom);

    const lineHeight = parseInt(style.lineHeight);
    const maxHeight = maxRows ? lineHeight * maxRows + borderHeight + paddingHeight : Infinity;

    const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
  };

  return (
    <>
      <Textarea
        id={id}
        name={name}
        rows={rows}
        className={className}
        value={value}
        maxLength={maxLength}
        ref={textareaRef}
        onChange={handleInput}
        aria-describedby="characters-left-textarea"
      />
      <p
        id="characters-left-textarea"
        className="mt-2 text-xs text-right text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        <span className="tabular-nums">{maxLength - value.length}</span> characters left
      </p>
    </>
  );
}

export { TextareaInput };


