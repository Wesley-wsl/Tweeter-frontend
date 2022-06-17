import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { IModal } from "../../@types";
import { modal, overlay } from "../../utils/variants";
import * as S from "./styles";

const Modal: React.FC<IModal> = ({ children, isActive, setIsActive }) => {
    return (
        <AnimatePresence exitBeforeEnter>
            {isActive && (
                <>
                    <S.Container
                        as={motion.div}
                        variants={modal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div>{children}</div>
                    </S.Container>
                    <S.Background
                        as={motion.div}
                        variants={overlay}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={() => setIsActive(!isActive)}
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
