import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ThemeContext } from "../../contexts/Theme";
import { ProfileWidget } from "../ProfileWidget";
import * as S from "./styles";

const Header: React.FC = () => {
    const { asPath } = useRouter();
    const { lightMode } = useContext(ThemeContext);

    return (
        <S.Container>
            <Image
                src={
                    lightMode
                        ? "/assets/tweeter.svg"
                        : "/assets/tweeter-light.svg"
                }
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
                        <Link href={"/explorer"}>Explorer</Link>
                    </li>
                    <li className={asPath === "/bookmarks" ? "active" : ""}>
                        <Link href={"/bookmarks"}>Bookmarks</Link>
                    </li>
                </ul>
            </nav>

            <ProfileWidget />
        </S.Container>
    );
};

export default Header;
