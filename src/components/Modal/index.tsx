import React from "react";

import { IModal } from "../../@types";
import * as S from "./styles";

const Modal: React.FC<IModal> = ({ children, isActive, setIsActive }) => {
    return (
        <>
            {isActive && (
                <>
                    <S.Container>
                        <div>{children}</div>
                    </S.Container>
                    <S.Background onClick={() => setIsActive(!isActive)} />
                </>
            )}
        </>
    );
};

export default Modal;
