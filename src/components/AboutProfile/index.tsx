import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { IAboutProfile } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import AvatarProfile from "../AvatarProfile";
import FollowButton from "../FollowButton";
import FollowList from "../FollowList";
import * as S from "./styles";

const AboutProfile: React.FC<IAboutProfile> = ({ userInformations }) => {
    const { user: userAuthenticated } = useContext(AuthContext);
    const [aboutMe, setAboutMe] = useState("");
    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);

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

                        <p onClick={() => setShowFollowing(!showFollowing)}>
                            <span>{userInformations.followingCount}</span>{" "}
                            Following
                        </p>
                        <p onClick={() => setShowFollowers(!showFollowers)}>
                            <span>{userInformations.followersCount}</span>{" "}
                            Followers
                        </p>

                        <FollowList
                            showFollowing={showFollowing}
                            setShowFollowing={setShowFollowing}
                            userId={userInformations.id}
                            path="following"
                            owner={userInformations.name}
                        />

                        <FollowList
                            showFollowing={showFollowers}
                            setShowFollowing={setShowFollowers}
                            userId={userInformations.id}
                            path="followers"
                            owner={userInformations.name}
                        />
                    </div>

                    <FollowButton
                        followersId={userInformations.followers_id}
                        userToFollowId={userInformations.id}
                    />
                </div>
                <S.Description
                    data-testid="about_me"
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
