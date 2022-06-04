import { useFetch } from "../../hooks/useFetch";
import PersonToFollow from "../PersonToFollow";
import * as S from "./styles";

const WhoFollow: React.FC = () => {
    const { data: whoFollow } = useFetch("/user/me/whofollow");

    return (
        <S.Container>
            <p>Who to follow</p>
            <S.WhoFollow>
                {whoFollow && whoFollow.data[0] && (
                    <PersonToFollow data={whoFollow.data[0]} />
                )}
                {whoFollow && whoFollow.data[1] && (
                    <PersonToFollow data={whoFollow.data[1]} />
                )}
                {whoFollow && whoFollow.data.length === 0 && (
                    <p>Nobody to indicate</p>
                )}
            </S.WhoFollow>
        </S.Container>
    );
};

export default WhoFollow;
