import { IButtonForm } from "../../../@types";
import * as S from "./styles";

const ButtonForm: React.FC<IButtonForm> = ({ title }) => {
    return <S.Button>{title}</S.Button>;
};

export default ButtonForm;
