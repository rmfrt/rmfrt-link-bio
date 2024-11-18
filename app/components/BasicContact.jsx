import EmailButton from "./EmailButton";
import ExternalButton from "./ExternalButton";

const socialData = [
    { title: "Resume", href: "https://resume.rmfrt.com" },
    { title: "Bluesky", href: "https://bsky.app/profile/rmfrt.bsky.social" },
    { title: "Instagram", href: "https://www.instagram.com/rmfrt/" },
    { title: "LinkedIn", href: "https://www.linkedin.com/in/rmfrt/" },
    { title: "Mastodon", href: "https://mastodon.design/@rmfrt" },
    { title: "X", href: "https://twitter.com/rmfrt" },
    { title: "Shop", href: "https://www.etsy.com/shop/rmfrt/" },
    { title: "NFT", href: "https://objkt.com/profile/rmfrt/created" },
];

export default function BasicContact() {
    const email = process.env.EMAIL;
    return (
        <div className="flex flex-col space-y-4">
            <EmailButton email={email} />
            {socialData.map((item, index) => (
                <ExternalButton key={index} href={item.href}>
                    {item.title}
                </ExternalButton>
            ))}
        </div>
    );
}
