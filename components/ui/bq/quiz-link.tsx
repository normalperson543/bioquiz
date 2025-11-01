export default function QuizLink({href, children}: {href: string, children: React.ReactNode}) {
    return (
        <button className="p-4 rounded-full bg-pink-200 text-black hover:bg-pink-300">
            {children}
          </button>
    )
}