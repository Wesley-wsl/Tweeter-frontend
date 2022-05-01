import { forwardRef, ForwardRefRenderFunction } from "react";

import { IInput } from "../../../@types";
import * as S from "./styles";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = (
    { error, IconRight, ...rest },
    ref,
) => {
    return (
        <>
            <S.Container margin={!error ? "17px" : "0"}>
                <input {...rest} ref={ref} />
                {IconRight}
            </S.Container>
            {!!error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
        </>
    );
};

const Input = forwardRef(InputBase);

export default Input;
