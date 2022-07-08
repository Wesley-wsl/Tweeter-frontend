import { Close } from "@styled-icons/material-rounded";

import { IAuthor, IFollowList } from "../../@types";
import { useFetch } from "../../hooks/useFetch";
import FollowCard from "../FollowCard";
import Modal from "../Modal";
import * as S from "./styles";

const FollowList: React.FC<IFollowList> = ({
    showFollowing,
    setShowFollowing,
    userId,
    path,
    owner,
}) => {
    const { data } = useFetch(`/user/${userId}/${path}`);

    return (
        <Modal isActive={showFollowing} setIsActive={setShowFollowing}>
            <S.Container>
                <S.TopFollowList>
                    <p>
                        {owner} is {path}.
                    </p>
                    <Close
                        width={24}
                        height={24}
                        color="#4F4F4F"
                        onClick={() => setShowFollowing(false)}
                        aria-label="Close icon to close modal."
                    />
                </S.TopFollowList>

                {data &&
                    data.data.map((user: IAuthor, index: number) => (
                        <FollowCard
                            data={user}
                            key={index}
                            setShowFollowing={setShowFollowing}
                        />
                    ))}

                {data && data.data.length === 0 && (
                    <S.WithoutFollow>
                        This user dont is {path} nobody. :/
                    </S.WithoutFollow>
                )}
            </S.Container>
        </Modal>
    );
};

export default FollowList;
