import { PersonAdd } from "@styled-icons/ionicons-sharp";
import Image from "next/image";
import React from "react";

import { Button } from "../Button";
import * as S from "./styles";

const PersonToFollow: React.FC = () => {
    return (
        <S.Container>
            <div>
                <div>
                    <Image
                        width="40"
                        height="40"
                        src="/background/akishino.webp"
                        alt="Profile Avatar"
                    />

                    <div>
                        <p>Shino Aki</p>
                        <p>230k followers</p>
                    </div>
                </div>
                <Button
                    title="Follow"
                    iconLeft={<PersonAdd width={12} height={12} color="#fff" />}
                />
            </div>

            <p>Photographer e Filmmaker based In Copenhagen, Denmark</p>

            <span className="background_profile">
                <Image
                    width="330"
                    height="165"
                    src="/background/background.webp"
                    alt="Background image"
                />
            </span>
        </S.Container>
    );
};

export default PersonToFollow;
