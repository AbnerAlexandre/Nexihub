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
    const isCurrentPath = pathname === href || pathname === props.as || pathname.startsWith(String(href));
    
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
