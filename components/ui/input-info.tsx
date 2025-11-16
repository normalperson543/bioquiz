"use client";
export default function InputInfo({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-row gap-3 items-center">
      <div className="p-2 bg-pink-200 rounded-full">{icon}</div>
      <label className="font-bold">{label}</label>
    </div>
  );
}
