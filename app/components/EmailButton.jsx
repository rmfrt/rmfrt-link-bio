"use client";

import Obfuscate from "react-obfuscate";

export default function EmailButton({ email }) {
    return (
        <Obfuscate
            email={email}
            className="inline-flex items-center justify-center h-10 px-4 py-8 text-xl font-medium transition-colors border rounded-xl bg-primary-dark hover:bg-accent whitespace-nowrap border-secondary-dark"
        >
            Email
        </Obfuscate>
    );
}
