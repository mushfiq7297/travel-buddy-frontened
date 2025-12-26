/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function TagInput({
  value = [],
  onChange,
  placeholder,
}: any) {
  const [input, setInput] = useState("");

  const addItem = () => {
    const trimmed = input.trim();

    if (!trimmed) return;
    if (trimmed.includes(" ")) return;
    if (value.includes(trimmed)) return;

    onChange([...value, trimmed]);
    setInput("");
  };

  return (
    <div className="space-y-2">
      <Input
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // ⭐ FIX
            addItem();
          }
        }}
      />

      <div className="flex flex-wrap gap-2">
        {value.map((item: string) => (
          <Badge key={item} variant="secondary">
            {item}
            <button
              type="button"
              onClick={() => onChange(value.filter((v: string) => v !== item))}
              className="ml-2"
            >
              <X size={12} />
            </button>
          </Badge>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        One word only. Press Enter to add.
      </p>
    </div>
  );
}
