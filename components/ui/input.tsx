import { ChangeEvent } from "react";

export default function Input({
  icon,
  onChange,
  value,
  label
}: {
  icon: React.ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-3 items-center">
        <div className="p-2 bg-pink-200 rounded-full">
          {icon}
        </div>
        <label className="font-bold">{label}</label>
      </div>
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
