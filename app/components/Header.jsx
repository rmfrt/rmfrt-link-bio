import Link from "next/link";

export default async function Header() {
    return (
        <h1 className="mb-10 text-lg font-semibold text-center">
            <Link className="hover:text-accent" href="/">
                Rémi Forte
            </Link>
        </h1>
    );
}
