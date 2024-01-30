import "./loading.css"

export default function Loading() {
    return (
    <div className="flex justify-center" aria-label="読み込み中">
      <div className="animate-spin load h-50 w-50 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
    )
  }

