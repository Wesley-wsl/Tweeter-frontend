import { ArrowUpCircleFill } from "@styled-icons/bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { fadeInScroll } from "../../utils/variants";
import * as S from "./styles";

const ScrollToTop = () => {
    const [hidden, setHidden] = useState(false);

    const scrollToTop = () => window.scrollTo(0, 0);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            setHidden(scrollY > 600);
        });

        return () =>
            window.removeEventListener("scroll", () => {
                const scrollY = window.scrollY;
                setHidden(scrollY > 600);
            });
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            {hidden && (
                <S.Container
                    as={motion.div}
                    onClick={scrollToTop}
                    variants={fadeInScroll}
                    initial="hidden"
                    animate="enter"
                    exit="hidden"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.7 }}
                    transition={{ type: "spring", duration: 0.4 }}
                >
                    <ArrowUpCircleFill width={45} height={45} />
                </S.Container>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
