export default function QuizExtendedLink({
  icon,
  friendlyName,
  description,
}: {
  icon: React.ReactNode;
  friendlyName: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl flex flex-row gap-2 bg-pink-200 self-start w-fit">
      <div className="rounded-full p-2 bg-pink-300">
        {icon}
      </div>
      <div className="flex flex-row gap-2 items-center mr-2">
        <b>{friendlyName}</b> <p>({description})</p>
      </div>
    </div>
  );
}
