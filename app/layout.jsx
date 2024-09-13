import "./globals.css";
import Header from "./components/Header";

export const metadata = {
    title: "Rémi Forte ",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="">
                <Header />
                <div className="pt-24">{children}</div>
            </body>
        </html>
    );
}
