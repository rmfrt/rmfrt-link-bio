import Link from "next/link";
import Image from "next/image";
import { STORAGE_URL } from "@/app/config";

export default function Card({ title, slug, date, category, coverUrl, coverWidth, coverHeight }) {
    return (
        <Link
            className="flex flex-col bg-neutral-900 rounded-xl hover:text-accent hover:bg-neutral-800"
            href={`/work/${slug}`}
        >
            <div className="overflow-hidden aspect-[2/1] rounded-xl">
                <Image
                    src={`${STORAGE_URL}${coverUrl}`}
                    alt="Image"
                    width={coverWidth}
                    height={coverHeight}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
            <div className="flex flex-col p-4">
                <div className="text-2xl">{title}</div>
            </div>
        </Link>
    );
}
