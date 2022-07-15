import React from "react";

import * as S from "./styles";

const LittleLoading: React.FC = () => {
    return (
        <S.Container data-testid="little-loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </S.Container>
    );
};

export default LittleLoading;
