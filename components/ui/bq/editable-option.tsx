'use client'

import { ChangeEvent } from "react"

export default function EditableOption({onChangeOptionText, optionText}: {onChangeOptionText: (e: ChangeEvent<HTMLInputElement>) => void, optionText: string}) {
  return (
    <div className="flex flex-row gap-2 border-2 border-pink-100 bg-pink-50 p-2">
      <input type="text" className="border-solid border-2 border-pink-200 bg-pink-100 p-2" value={optionText} onChange={onChangeOptionText} />
    </div>
  )
}