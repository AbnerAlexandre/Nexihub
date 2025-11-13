import Image from 'next/image'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-5/6 h-[700px] p-6 bg-background-secondary rounded-sm">
        <div className="flex flex-row items-center min-h-full">
          <div className="flex flex-col justify-center items-center w-4/6">
            <h1 className='text-7xl'>SEJA BEM VINDO AO</h1>
            <Image
              src="/name-logo.svg"
              alt="NexiHub Logo"
              width={650}
              height={300}
            />
          </div>
          <div className="w-2/6 h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
