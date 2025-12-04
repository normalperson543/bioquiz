"use client";

import { ChangeEvent } from "react";
import Button from "../button";
import { CheckIcon, TrashIcon, XIcon } from "lucide-react";
import { icons } from "@/lib/constants";

export default function EditableOption({
  onChangeOptionText,
  onDelete,
  optionText,
  icon,
  onChangeIcon,
  isCorrectAnswer,
  onToggleCorrectAnswer,
}: {
  onChangeOptionText: (e: ChangeEvent<HTMLInputElement>) => void;
  optionText: string;
  onDelete: () => void;
  icon?: number | null;
  onChangeIcon: (e: ChangeEvent<HTMLSelectElement>) => void;
  isCorrectAnswer: boolean;
  onToggleCorrectAnswer: () => void;
  
}) {
  return (
    <div className="flex flex-row gap-2 border-2 border-pink-100 bg-pink-50 p-2">
      <select
        className="border-2 border-pink-200 bg-pink-100"
        onChange={onChangeIcon}
        value={icon ?? 0}
      >
        {icons.map((icon, i) => (
          <option value={i} key={i}>
            {icon}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="border-solid border-2 border-pink-200 bg-pink-100 p-2 flex-1"
        value={optionText}
        onChange={onChangeOptionText}
      />
      {isCorrectAnswer ? (
        <Button onClick={onToggleCorrectAnswer}>
          <XIcon width={16} height={16} />
        </Button>
      ) : (
        <Button onClick={onToggleCorrectAnswer}>
          <CheckIcon width={16} height={16} />
        </Button>
      )}
      <Button onClick={onDelete}>
        <TrashIcon width={16} height={16} />
      </Button>
    </div>
  );
}
