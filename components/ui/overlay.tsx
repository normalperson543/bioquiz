"use client";
export default function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed w-full h-full top-0 left-0 backdrop-blur-md flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
