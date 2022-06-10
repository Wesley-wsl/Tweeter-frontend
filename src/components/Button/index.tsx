/* eslint-disable @typescript-eslint/no-unused-vars */
import { IButton } from "../../@types";
import * as S from "./styles";

export const Button: React.FC<IButton> = ({
    title,
    iconLeft,
    color,
    disabled,
    type,
    ...rest
}) => {
    return (
        <S.Container color={color} disabled={disabled ?? false} {...rest}>
            {iconLeft}
            {title}
        </S.Container>
    );
};
