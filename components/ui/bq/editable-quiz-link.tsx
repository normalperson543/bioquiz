'use client'

import { ChangeEvent } from "react"

export default function EditableQuizLink({ onChangeLinkType, linkType, linkContents }: {onChangeLinkType: (e: ChangeEvent<HTMLInputElement>) => void, linkType: number, linkContents: string}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <select
          className="border-2 border-pink-200 bg-pink-100"
      </div>
    </div>
  )
}