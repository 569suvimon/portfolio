import { Header } from "@/components/layout"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <Header/>
      <main className="min-h-screen flex items-center justify-center bg-red-200">
        {children}
      </main>
    </>

  )

}