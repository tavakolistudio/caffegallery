import Branches from "@/components/Branches"
import { siteData } from "@/data/site"

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{siteData.brand.fa}</h1>
        <p className="text-sm text-gray-500 mt-1">{siteData.brand.en}</p>
      </header>

      {/* Branches */}
      <Branches lang="fa" />
    </main>
  )
}
