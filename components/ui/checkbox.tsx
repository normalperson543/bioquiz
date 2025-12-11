import { ChangeEvent } from "react";

export default function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="border-2 bg-pink-100 border-pink-200 rounded-sm p-2"
      value={1}
    />
  );
}
