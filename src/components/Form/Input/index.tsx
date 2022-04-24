import { IInput } from "../../../@types";
import * as S from "./styles";

const Input: React.FC<IInput> = ({ type, placeholder, IconRight }) => {
    return (
        <S.Container>
            <input type={type} placeholder={placeholder} />
            {IconRight}
        </S.Container>
    );
};

export default Input;
