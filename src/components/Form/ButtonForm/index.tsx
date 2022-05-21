import { IButtonForm } from "../../../@types";
import LittleLoading from "../../LittleLoading";
import * as S from "./styles";

const ButtonForm: React.FC<IButtonForm> = ({ title, loading }) => {
    return (
        <S.Button disabled={loading}>
            {loading ? <LittleLoading color="#fff" /> : title}
        </S.Button>
    );
};

export default ButtonForm;
