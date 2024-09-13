import Email from "./Email";
import Link from "next/link";

export default function Contact() {
    return (
        <div className="max-w-xl mx-auto mt-2 space-y-2">
            <div className="p-4 text-2xl bg-neutral-800 rounded-2xl">Lyon, France</div>
            <div className="p-4 text-2xl bg-neutral-800 rounded-2xl">info@rmfrt.com</div>
            <div className="">
                <ul>
                    <li>{/* <Email /> */}</li>
                    <li>
                        <Link href="https://instagram.com/rmfrt/">Instagram</Link>,{" "}
                        <Link href="https://www.linkedin.com/in/rmfrt/">LinkedIn</Link>,{" "}
                        <Link href="https://mastodon.design/@rmfrt">Mastodon</Link>,{" "}
                        <Link href="https://twitter.com/rmfrt">Twitter</Link>
                    </li>
                    <li>
                        <Link href="https://www.etsy.com/shop/rmfrt/">Shop</Link>,{" "}
                        <Link href="https://objkt.com/profile/rmfrt/created">NFTs</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
