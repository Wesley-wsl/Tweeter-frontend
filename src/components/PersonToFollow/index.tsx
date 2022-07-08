import Image from "next/image";
import Router from "next/router";
import React from "react";

import { IFollowCard } from "../../@types";
import { API_BASE_URL } from "../../utils/constants";
import FollowButton from "../FollowButton";
import * as S from "./styles";

const PersonToFollow = ({ data }: IFollowCard) => {
    return (
        <S.Container>
            <div>
                <div onClick={() => Router.push(`/profile/${data.id}`)}>
                    <span>
                        <Image
                            width="40"
                            height="40"
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
                        <p>{data.followersCount} followers</p>
                    </div>
                </div>

                <FollowButton
                    followersId={data.followers_id}
                    userToFollowId={data.id}
                />
            </div>
            <p>{data.about_me}</p>
            <span className="background_profile">
                <Image
                    width="330"
                    height="165"
                    src={
                        data.background
                            ? `${API_BASE_URL}/files/${data.background}`
                            : "/background/background.webp"
                    }
                    alt="Background image"
                />
            </span>
        </S.Container>
    );
};

export default PersonToFollow;
