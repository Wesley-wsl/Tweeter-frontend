import { Heart } from "@styled-icons/bootstrap";
import Image from "next/image";

import { ICommentData } from "../../@types";
import { API_BASE_URL } from "../../utils/constants";
import * as S from "./styles";

export const Comment: React.FC<ICommentData> = ({ data }) => {
    const createdAt = new Date(data.author.created_at).toLocaleDateString();

    return (
        <S.Container>
            <S.TopInformations>
                <Image
                    width="45"
                    height="45"
                    src={
                        data.author.avatar
                            ? `${API_BASE_URL}/files/${data.author.avatar}`
                            : "/background/background.webp"
                    }
                    alt="Profile Avatar"
                />
                <div>
                    <p>{data.author.name}</p>
                    <p>{createdAt}</p>
                </div>
            </S.TopInformations>

            <S.Comment>
                <p>{data.comment}</p>

                <div>
                    <p>
                        <Heart size={14} /> Liked
                    </p>
                    <p>{data.likes} Likes</p>
                </div>
            </S.Comment>
        </S.Container>
    );
};
