import "./globals.css";
import Header from "./components/Header";

export const metadata = {
    title: "Rémi Forte ",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="py-12">
                <Header />
                <div className="">{children}</div>
            </body>
        </html>
    );
}
