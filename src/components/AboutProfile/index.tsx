import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { IAboutProfile } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import AvatarProfile from "../AvatarProfile";
import FollowButton from "../FollowButton";
import * as S from "./styles";

const AboutProfile: React.FC<IAboutProfile> = ({ userInformations }) => {
    const { user: userAuthenticated } = useContext(AuthContext);
    const [aboutMe, setAboutMe] = useState("");

    async function onEditAboutMe() {
        if (
            aboutMe &&
            aboutMe !== userInformations.about_me &&
            aboutMe !== "Nothing about me. :/" &&
            userAuthenticated?.id === userInformations.id
        ) {
            const formData = new FormData();
            formData.append("about_me", aboutMe);

            await api
                .put(`/user/${userInformations.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .catch(error =>
                    toast.error(
                        error.response?.data.error ??
                            "Something went wrong, please try again later.",
                    ),
                );
        }
    }

    return (
        <S.Container>
            <AvatarProfile
                avatar={userInformations.avatar}
                userId={userInformations.id}
            />

            <S.Informations>
                <div>
                    <div className="top-informations">
                        <h2>{userInformations.name}</h2>
                        <p>
                            <span>{userInformations.followingCount}</span>{" "}
                            Following
                        </p>
                        <p>
                            <span>{userInformations.followersCount}</span>{" "}
                            Followers
                        </p>
                    </div>

                    <FollowButton
                        followersId={userInformations.followers_id}
                        userToFollowId={userInformations.id}
                    />
                </div>
                <S.Description
                    maxLength={120}
                    rows={3}
                    disabled={userAuthenticated?.id !== userInformations.id}
                    defaultValue={
                        userInformations.about_me.length !== 0
                            ? userInformations.about_me.trim()
                            : "Nothing about me. :/"
                    }
                    onBlur={onEditAboutMe}
                    onChange={({ target }) => setAboutMe(target.value)}
                />
            </S.Informations>
        </S.Container>
    );
};

export default AboutProfile;
