import React from "react";

import { ILittleLoading } from "../../@types";
import * as S from "./styles";

const LittleLoading: React.FC<ILittleLoading> = ({ color }) => {
    return (
        <S.Container color={color} data-testid="little-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </S.Container>
    );
};

export default LittleLoading;
