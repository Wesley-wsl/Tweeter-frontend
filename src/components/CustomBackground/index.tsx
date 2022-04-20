import { ICustomBackground } from "../../@types";
import * as S from "./styles";

const CustomBackground: React.FC<ICustomBackground> = ({ children, image }) => {
    return (
        <S.Background image={image}>
            <S.BackgroundFilter>{children}</S.BackgroundFilter>
        </S.Background>
    );
};

export default CustomBackground;
