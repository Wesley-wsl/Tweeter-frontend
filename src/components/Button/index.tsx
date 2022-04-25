import { IButton } from "../../@types";
import * as S from "./styles";

export const Button: React.FC<IButton> = ({ title, iconLeft }) => {
    return (
        <S.Container>
            {iconLeft}
            {title}
        </S.Container>
    );
};
