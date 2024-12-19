import { Label } from "@/components/ui/label";
import {  useSafeState } from "ahooks";
import { Tag, TagInput } from "emblor";
import { useState } from "react";

function InputWithTags({ name, value, onChange }: { name: string; value: { id: string, text: string }[]; onChange: (value: Tag[]) => void }) {
  const [exampleTags, setExampleTags] = useSafeState<Tag[]>(value);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2 w-[300px]">
      <Label htmlFor={name}>技能</Label>
      <TagInput
        id={name}
        name={name}
        tags={exampleTags}
        setTags={(newTags) => {
          onChange(newTags);
          setExampleTags(newTags);
        }}
        placeholder="添加标签"
        styleClasses={{
          // ... existing code ...
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
    </div>
  );
}

export { InputWithTags };
