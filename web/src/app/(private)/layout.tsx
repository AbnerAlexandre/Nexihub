import { Header, Container } from '@/components/common'

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Container>
        {children}
      </Container>
    </div>
  )
}
