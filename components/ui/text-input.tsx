import { ChangeEvent } from "react";
import InputInfo from "./input-info";

export default function TextInput({
  icon,
  onChange,
  value,
  label,
}: {
  icon: React.ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <InputInfo label={label} icon={icon} />
      <input
        type="text"
        onChange={onChange}
        value={value}
        name="username"
        className="border-2 bg-pink-100 border-pink-200 rounded-sm p-2"
      />
    </div>
  );
}
