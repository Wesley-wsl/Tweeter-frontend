import { IButtonForm } from "../../../@types";
import * as S from "./styles";

const ButtonForm: React.FC<IButtonForm> = ({ title, loading }) => {
    return (
        <S.Button disabled={loading}>
            {loading ? (
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : (
                title
            )}
        </S.Button>
    );
};

export default ButtonForm;
