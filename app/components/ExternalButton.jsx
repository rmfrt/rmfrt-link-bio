export default function ExternalButton({ children, href }) {
    return (
        <a
            className="inline-flex items-center justify-center h-10 px-4 py-8 text-xl font-medium transition-colors border rounded-xl bg-primary-dark hover:bg-accent whitespace-nowrap border-secondary-dark"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
}
