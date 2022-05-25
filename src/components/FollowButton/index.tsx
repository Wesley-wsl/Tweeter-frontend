import { PersonAdd, PersonRemove } from "@styled-icons/ionicons-sharp";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

import { IFollowButton } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import { Button } from "../Button";

const FollowButton: React.FC<IFollowButton> = ({
    followersId,
    userToFollowId,
}) => {
    const [isFollow, setIsFollow] = useState(false);
    const { user } = useContext(AuthContext);
    const { mutate } = useSWRConfig();

    async function handleFollow() {
        await api
            .put(`/user/follower/${userToFollowId}`)
            .then(() => {
                setIsFollow(true);
                mutate(`/user/${user?.id}`);
                mutate(`/user/${userToFollowId}`);
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    async function handleUnFollow() {
        await api
            .delete(`/user/unfollow/${userToFollowId}`)
            .then(() => {
                setIsFollow(false);
                mutate(`/user/${user?.id}`);
                mutate(`/user/${userToFollowId}`);
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    useEffect(() => {
        if (followersId.some((id: string) => id === user?.id))
            setIsFollow(true);
    }, [followersId, user?.id]);

    return (
        <>
            {userToFollowId === user?.id ? (
                <Button
                    title="Follow"
                    color="#2F80ED"
                    disabled={true}
                    aria-label="Button for follow user."
                    iconLeft={
                        <PersonAdd
                            width={12}
                            height={12}
                            aria-label="Person add icon"
                        />
                    }
                />
            ) : (
                <>
                    {!isFollow ? (
                        <span onClick={handleFollow}>
                            <Button
                                title="Follow"
                                color="#2F80ED"
                                aria-label="Button for follow user."
                                iconLeft={
                                    <PersonAdd
                                        width={12}
                                        height={12}
                                        aria-label="Person add icon"
                                    />
                                }
                            />
                        </span>
                    ) : (
                        <span onClick={handleUnFollow}>
                            <Button
                                title="Unfollow"
                                color="#e20008"
                                aria-label="Button for unfollow user."
                                iconLeft={
                                    <PersonRemove
                                        width={12}
                                        height={12}
                                        aria-label="Person remove icon"
                                    />
                                }
                            />
                        </span>
                    )}
                </>
            )}
        </>
    );
};

export default FollowButton;
