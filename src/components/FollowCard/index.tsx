import Image from "next/image";
import Router from "next/router";
import React from "react";

import { IFollowCard } from "../../@types";
import { API_BASE_URL } from "../../utils/constants";
import FollowButton from "../FollowButton";
import * as S from "./styles";

const FollowCard: React.FC<IFollowCard> = ({ data }) => {
    return (
        <S.Container>
            <S.TopCard>
                <div onClick={() => Router.push(`/profile/${data.id}`)}>
                    <span>
                        <Image
                            width="50"
                            height="50"
                            src={
                                data.avatar
                                    ? `${API_BASE_URL}/files/${data.avatar}`
                                    : "/background/background.webp"
                            }
                            alt="Profile Avatar"
                        />
                    </span>

                    <div>
                        <p>{data.name}</p>
                        <p>{data.followers_id.length} followers</p>
                    </div>
                </div>

                <FollowButton
                    followersId={data.followers_id}
                    userToFollowId={data.id}
                />
            </S.TopCard>

            <p>
                {data.about_me.length !== 0
                    ? data.about_me
                    : "Nothing about me. :/"}
            </p>
        </S.Container>
    );
};

export default FollowCard;
