import EmailButton from "./EmailButton";
import ExternalButton from "./ExternalButton";

const socialData = [
    { title: "Resume", href: "https://resume.rmfrt.com" },
    { title: "TypoLyon", href: "https://www.typolyon.fr/" },
    { title: "Bluesky", href: "https://bsky.app/profile/rmfrt.com" },
    { title: "Instagram", href: "https://www.instagram.com/rmfrt/" },
    { title: "LinkedIn", href: "https://www.linkedin.com/in/rmfrt/" },
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
