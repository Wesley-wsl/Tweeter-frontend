import { CaretDownFill } from "@styled-icons/bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import * as S from "./styles";

const Header: React.FC = () => {
    const { asPath } = useRouter();

    return (
        <S.Container>
            <Image
                src={"/assets/tweeter.svg"}
                width="120"
                height="40"
                alt="Logo"
            />

            <nav>
                <ul>
                    <li className={asPath === "/home" ? "active" : ""}>
                        <Link href={"/home"}>Home</Link>
                    </li>
                    <li className={asPath === "/explorer" ? "active" : ""}>
                        <Link href={"/home"}>Explorer</Link>
                    </li>
                    <li className={asPath === "/bookmarks" ? "active" : ""}>
                        <Link href={"/home"}>Bookmarks</Link>
                    </li>
                </ul>
            </nav>

            <div>
                <div />
                <p>Jorkis</p>
                <CaretDownFill
                    width={7}
                    height={30}
                    aria-label="Icon arrow down that open profile menu"
                />
            </div>
        </S.Container>
    );
};

export default Header;
