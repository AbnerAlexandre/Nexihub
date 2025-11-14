'use client'

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type ActiveLinkProps = {
    children: React.ReactNode;
    href: string;
 } & LinkProps;

export function ActiveLink({ children, href, ...props }: ActiveLinkProps) {
    const pathname = usePathname();
    
    // Para a home ("/"), verifica se o pathname é exatamente "/"
    // Para outras rotas, verifica se começa com o href (exceto para "/")
    const isCurrentPath = href === '/' 
        ? pathname === '/' 
        : pathname === href || pathname === props.as || pathname.startsWith(String(href) + '/');
    
    return (
        <Link
            href={href}
            className={cn("text-action-sm font-medium transition-color hover:text-accent-cyan", isCurrentPath ? 'text-accent-cyan' : 'text-content-primary')}
            {...props}
        >
            {children}
        </Link>
    )

}
