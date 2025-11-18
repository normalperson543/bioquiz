export default function Button({children, onClick, disabled = false}: { children: React.ReactNode, onClick?: () => void, disabled?: boolean}) {
  return (
    <button type="submit" className="flex flex-row gap-2 items-center bg-pink-200 border-pink-300 border-2 p-3 justify-center text-center font-bold hover:bg-pink-300" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}