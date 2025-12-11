export default function QuizLink({
  hover,
  children,
}: {
  hover: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button className="p-4 rounded-full bg-pink-200 text-black hover:bg-pink-300 group flex flex-row gap-2">
      {children}
      <div className="hidden group-hover:block">{hover}</div>
    </button>
  );
}
