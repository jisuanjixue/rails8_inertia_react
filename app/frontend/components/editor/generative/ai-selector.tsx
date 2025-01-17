"use client";

import { Command, CommandInput } from "@/components/ui/command";

import { useCompletion } from "ai/react";
import { ArrowUp } from "lucide-react";
import { useEditor } from "novel";
import { addAIHighlight } from "novel/extensions";
import { useState } from "react";
import Markdown from "react-markdown";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import CrazySpinner from "@/components/ui/icons/crazy-spinner";
import Magic from "@/components/ui/icons/magic";
import { ScrollArea } from "@/components/ui/scroll-area";
import AICompletionCommands from "./ai-completion-command";
import AISelectorCommands from "./ai-selector-commands";
//TODO: I think it makes more sense to create a custom Tiptap extension for this functionality https://tiptap.dev/docs/editor/ai/introduction

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState("");

  const { completion, complete, isLoading } = useCompletion({
    // id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast({
          variant: 'destructive',
          title: 'You have reached your request limit for the day.'
        })
        return;
      }
    },
    onError: (e) => {
      toast({
        variant: 'destructive',
        title: `${e.message}`
      })
    },
  });

  const hasCompletion = completion.length > 0;

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="p-2 px-4 prose-sm prose">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center w-full h-12 px-4 text-sm font-medium text-purple-500 text-muted-foreground">
          <Magic className="w-4 h-4 mr-2 shrink-0 " />
          AI is thinking
          <div className="mt-1 ml-2">
            <CrazySpinner />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={hasCompletion ? "Tell AI what to do next" : "Ask AI to edit or generate..."}
              onFocus={() => addAIHighlight(editor)}
            />
            <Button
              size="icon"
              className="absolute w-6 h-6 -translate-y-1/2 bg-purple-500 rounded-full right-2 top-1/2 hover:bg-purple-900"
              onClick={() => {
                if (completion)
                  return complete(completion, {
                    body: { option: "zap", command: inputValue },
                  }).then(() => setInputValue(""));

                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(slice.content);

                complete(text, {
                  body: { option: "zap", command: inputValue },
                }).then(() => setInputValue(""));
              }}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                editor.chain().unsetHighlight().focus().run();
                onOpenChange(false);
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands onSelect={(value, option) => complete(value, { body: { option } })} />
          )}
        </>
      )}
    </Command>
  );
}
