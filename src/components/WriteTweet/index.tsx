import { Image as BootstrapImage } from "@styled-icons/bootstrap";
import { Earth } from "@styled-icons/ionicons-sharp";
import Image from "next/image";

import { Button } from "../Button";
import * as S from "./styles";

const WriteTweet: React.FC = () => {
    return (
        <S.Container>
            <p>Tweet something</p>
            <S.Write>
                <span>
                    <Image
                        width="45"
                        height="45"
                        src="/background/akishino.webp"
                        alt="Profile Avatar"
                    />
                </span>

                <textarea placeholder="What's happening?" maxLength={1400} />
            </S.Write>

            <S.Filter>
                <div>
                    <BootstrapImage size={18} color="#2F80ED" />
                    <Earth size={18} color="#2F80ED" />
                    <p>Everyone can reply</p>
                </div>

                <Button title="Tweet" />
            </S.Filter>
        </S.Container>
    );
};

export default WriteTweet;
