import { Heart, HeartFill } from "@styled-icons/bootstrap";
import { Close } from "@styled-icons/material-rounded";
import Image from "next/image";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IComment, ICommentData } from "../../../@types";
import { AuthContext } from "../../../contexts/AuthContext";
import api from "../../../services/api";
import { API_BASE_URL } from "../../../utils/constants";
import { DeleteTweet } from "../styles";
import * as S from "./styles";

export const Comment: React.FC<ICommentData> = ({ data, setTweetComments }) => {
    const [alreadyLiked, setAlreadyLiked] = useState(Boolean);
    const [likedCount, setLikedCount] = useState(Number);
    const { user } = useContext(AuthContext);
    const createdAt = new Date(data.created_at).toLocaleDateString();

    async function handleLikeComment() {
        await api
            .put(`/comment/${data.id}/like`)
            .then(() => {
                setAlreadyLiked(true);
                setLikedCount(current => current + 1);
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    async function handleUnlikeComment() {
        await api
            .delete(`/comment/${data.id}/like`)
            .then(() => {
                setAlreadyLiked(false);
                setLikedCount(current => current - 1);
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    async function handleDeleteComment() {
        await api
            .delete(`/comment/${data.id}`)
            .then(() => {
                setTweetComments((comment): IComment[] => {
                    const commentsFiltered = comment.filter(
                        comment => comment.id !== data.id,
                    );
                    return commentsFiltered;
                });
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    useEffect(() => {
        setLikedCount(data.likes);
        setAlreadyLiked(data.liked_users_id.some(id => id === user?.id));
    }, [data.liked_users_id, data.likes, user?.id]);

    return (
        <S.Container>
            <S.TopInformations
                onClick={() => Router.push(`/profile/${data.author_id}`)}
            >
                <Image
                    width="45"
                    height="45"
                    src={
                        data.author.avatar
                            ? `${API_BASE_URL}/files/${data.author.avatar}`
                            : "/background/background.webp"
                    }
                    alt="Profile Avatar"
                />

                <div>
                    <p>{data.author.name}</p>
                    <p>{createdAt}</p>
                </div>
            </S.TopInformations>

            <S.Comment>{data.comment}</S.Comment>

            <S.LikeInformations
                onClick={alreadyLiked ? handleUnlikeComment : handleLikeComment}
                className={alreadyLiked ? "liked" : ""}
            >
                <p>
                    {alreadyLiked ? (
                        <HeartFill
                            size={16}
                            color="#EB5757"
                            aria-label="Heart fill icon."
                        />
                    ) : (
                        <Heart size={16} aria-label="Heart icon." />
                    )}
                </p>
                <p>{likedCount} Likes</p>
            </S.LikeInformations>

            {data.author_id === user?.id && (
                <DeleteTweet>
                    <Close
                        width={18}
                        height={18}
                        onClick={handleDeleteComment}
                        aria-label="Close icon - delete comment."
                    />
                </DeleteTweet>
            )}
        </S.Container>
    );
};
