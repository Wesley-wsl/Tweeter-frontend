import PersonToFollow from "../PersonToFollow";
import * as S from "./styles";

const WhoFollow: React.FC = () => {
    return (
        <S.Container>
            <p>Who to follow</p>
            <S.WhoFollow>
                <PersonToFollow />
            </S.WhoFollow>
        </S.Container>
    );
};

export default WhoFollow;
