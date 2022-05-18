import { Heart } from "@styled-icons/bootstrap";
import Image from "next/image";

import { ICommentData } from "../../@types";
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
                        `http://localhost:3333/files/${data.author.avatar}` ??
                        "https://pm1.narvii.com/6879/34a567bc12e59a4c20f723a0809f5ad9b6f1df2fr1-736-590v2_hq.jpg"
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
