"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuLink({ name, url }) {
    const pathname = usePathname();
    return (
        <Link className={`${url === pathname && "text-accent"} hover:text-accent`} href={url}>
            {name}
        </Link>
    );
}
