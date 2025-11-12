import { ActiveLink, Logo } from "@/components/common";

export function Header() {
  return (
    <div className="fixed top-0 z-50 w-full border-b border-white/5 bg-background-primary">
      <div className="mx-auto max-w-5/6  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-6">
            <ActiveLink
              href={"/"}
            >
              Home
            </ActiveLink>

            <ActiveLink
              href={"/"}
            >
              Membros
            </ActiveLink>

            <ActiveLink
              href={"/"}
            >
              Indicações
            </ActiveLink>

            <ActiveLink
              href={"/"}
            >
              Intenções
            </ActiveLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
