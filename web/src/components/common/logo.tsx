import Image from "next/image";
import Link from "next/link";

export function Logo() {
    return (
        <div className="flex h-20 items-center justify-between">
            <Link href={"/"}>
                <Image src={"/logo.svg"} alt="Logo site" width={80} height={80} />
            </Link>
        </div>

    );
}
