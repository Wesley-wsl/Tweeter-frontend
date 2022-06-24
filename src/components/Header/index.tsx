import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ThemeContext } from "../../contexts/Theme";
import { headerNav } from "../../utils/constants";
import { ProfileWidget } from "../ProfileWidget";
import MenuMobile from "./MenuMobile";
import * as S from "./styles";

const Header: React.FC = () => {
    const { asPath } = useRouter();
    const { lightMode } = useContext(ThemeContext);

    return (
        <>
            <S.Container>
                <span>
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
                </span>

                <nav>
                    <S.NavigationWeb>
                        {headerNav.map(({ name, path }) => (
                            <motion.li
                                whileTap={{ scale: 0.7 }}
                                className={asPath === path ? "active" : ""}
                                key={path}
                            >
                                <Link href={path}>{name}</Link>
                            </motion.li>
                        ))}
                    </S.NavigationWeb>
                </nav>

                <ProfileWidget />
            </S.Container>
            <MenuMobile />
        </>
    );
};

export default Header;
