"use client";

export default function Modal({
  header,
  children,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 bg-pink-50 bg-opacity-10 border-pink-100 border-2">
      <div className="bg-pink-100 p-4">{header}</div>
      <div className="p-4 flex flex-col gap-2">{children}</div>
    </div>
  );
}
