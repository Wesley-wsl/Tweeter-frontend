import Image from "next/image";
import Router from "next/router";
import React from "react";

import { IFollowCard } from "../../@types";
import { CLOUDINARY_URL } from "../../utils/constants";
import FollowButton from "../FollowButton";
import * as S from "./styles";

const FollowCard: React.FC<IFollowCard> = ({ data, setShowFollowing }) => {
    function goToProfile() {
        if (setShowFollowing) setShowFollowing(current => !current);
        Router.push(`/profile/${data.id}`);
    }

    return (
        <S.Container>
            <S.TopCard>
                <div onClick={goToProfile}>
                    <span>
                        <Image
                            width="50"
                            height="50"
                            src={
                                data.avatar
                                    ? `${CLOUDINARY_URL}/${data.avatar}`
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

            <p>{data.about_me}</p>
        </S.Container>
    );
};

export default FollowCard;
