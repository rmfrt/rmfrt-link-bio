import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Header from "./components/Header";

export const metadata = {
    title: "Rémi Forte",
    description: "Poetic Program, Typographic System",
    keywords: "poetry, typography, design, graphic design, art, code",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <GoogleTagManager gtmId="GTM-T3CWJ57W" />
            <body className="py-12">
                <Header />
                <div className="">{children}</div>
            </body>
        </html>
    );
}
