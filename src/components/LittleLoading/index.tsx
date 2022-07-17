import React from "react";
import { ILittleLoading } from "src/@types";

import * as S from "./styles";

const LittleLoading = ({ color }: ILittleLoading) => {
    return (
        <S.Container data-testid="little-loading" color={color}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </S.Container>
    );
};

export default LittleLoading;
