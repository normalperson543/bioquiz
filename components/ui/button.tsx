export default function Button({children, onClick}: { children: React.ReactNode, onClick?: () => void}) {
  return (
    <button type="submit" className="flex flex-row gap-2 items-center bg-pink-200 border-pink-300 border-2 p-3 justify-center text-center font-bold hover:bg-pink-300" onClick={onClick}>
      {children}
    </button>
  )
}