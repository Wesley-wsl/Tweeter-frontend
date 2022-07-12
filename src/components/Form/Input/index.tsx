import { forwardRef, ForwardRefRenderFunction } from "react";

import { IInput } from "../../../@types";
import * as S from "./styles";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
    { error, IconRight, ...rest },
    ref,
) => {
    return (
        <S.Container>
            <S.InputArea margin={!error ? "17px" : "0"}>
                <input {...rest} ref={ref} />
                {IconRight}
            </S.InputArea>
            {!!error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
        </S.Container>
    );
};

const Input = forwardRef(InputBase);

export default Input;
