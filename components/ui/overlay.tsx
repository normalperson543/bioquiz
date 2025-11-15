"use client";
export default function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
