import { Heart } from "@styled-icons/bootstrap";
import Image from "next/image";

import * as S from "./styles";

const Comment: React.FC = () => {
    return (
        <S.Container>
            <S.TopInformations>
                <Image
                    width="45"
                    height="45"
                    src="/background/akishino.webp"
                    alt="Profile Avatar"
                />
                <div>
                    <p>Shino Aki</p>
                    <p>24 August at 20:43</p>
                </div>
            </S.TopInformations>

            <S.Comment>
                <p>
                    I&apos;ve felt this pull many times, like while road
                    tripping through Morocco. Seeking out the vastness of the
                    desert, and looking inward at the same time.
                </p>

                <div>
                    <p>
                        <Heart size={14} /> Liked
                    </p>
                    <p>12k Likes</p>
                </div>
            </S.Comment>
        </S.Container>
    );
};

export default Comment;
