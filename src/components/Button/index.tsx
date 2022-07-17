/* eslint-disable @typescript-eslint/no-unused-vars */
import { IButton } from "../../@types";
import LittleLoading from "../LittleLoading";
import * as S from "./styles";

export const Button: React.FC<IButton> = ({
    title,
    iconLeft,
    color,
    disabled,
    loading,
    type,
    ...rest
}) => {
    return (
        <S.Container color={color} disabled={disabled ?? false} {...rest}>
            {loading ? (
                <LittleLoading color="#fff" />
            ) : (
                <>
                    {iconLeft}
                    {title}
                </>
            )}
        </S.Container>
    );
};
