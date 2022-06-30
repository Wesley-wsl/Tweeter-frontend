import { Menu } from "@styled-icons/boxicons-regular";
import { Close } from "@styled-icons/material-rounded";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { headerNav } from "../../../utils/constants";
import { menuMobile, overlay } from "../../../utils/variants";
import * as S from "./styles";

const MenuMobile: React.FC = () => {
    const { asPath } = useRouter();
    const [mobileActive, setMobileActive] = useState(false);

    return (
        <>
            <S.ToggleMenu
                as={motion.button}
                whileTap={{ scale: 0.6 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setMobileActive(!mobileActive)}
            >
                {mobileActive ? (
                    <Close
                        width={30}
                        height={30}
                        aria-label="Close icon to close menu mobile."
                    />
                ) : (
                    <Menu
                        width={30}
                        height={30}
                        aria-label="Hamburguer icon to open menu mobile."
                    />
                )}
            </S.ToggleMenu>

            <AnimatePresence exitBeforeEnter>
                {mobileActive && (
                    <nav>
                        <S.NavigationMobile
                            as={motion.ul}
                            variants={menuMobile}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ type: "spring", duration: 0.6 }}
                        >
                            {headerNav.map(({ name, path }) => (
                                <motion.li
                                    whileHover={{ scale: 1.4 }}
                                    whileTap={{ scale: 0.7 }}
                                    className={asPath === path ? "active" : ""}
                                    onClick={() =>
                                        setMobileActive(!mobileActive)
                                    }
                                    key={path}
                                    data-testid="motion_li"
                                >
                                    <Link href={path}>{name}</Link>
                                </motion.li>
                            ))}
                        </S.NavigationMobile>
                        <S.OverlayMobile
                            as={motion.div}
                            data-testid="overlay"
                            variants={overlay}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={() => setMobileActive(!mobileActive)}
                        />
                    </nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default MenuMobile;
