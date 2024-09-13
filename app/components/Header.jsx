import Link from "next/link";

export default async function Header() {
    return (
        <div className="fixed top-0 z-10 w-full bg-primary-dark">
            <header className="flex items-center justify-between px-4 pt-4 pb-2">
                <Link className="hover:text-accent" href="/">
                    Rémi Forte
                </Link>
            </header>
        </div>
    );
}
