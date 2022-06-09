import { Send } from "@styled-icons/boxicons-regular";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { IWriteComment } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import { API_BASE_URL } from "../../utils/constants";
import * as S from "./styles";

const WriteComment = ({ setTweetComments, tweetId }: IWriteComment) => {
    const [comment, setComment] = useState("");
    const { user } = useContext(AuthContext);

    async function handleComment() {
        if (comment.trim() === "") return;
        if (comment.trim().length > 250)
            return toast.error("Maximum 250 characters.");

        await api
            .post(`/comment/${tweetId}`, {
                comment,
            })
            .then(response => {
                setTweetComments(current => {
                    const newComment = Object.assign(response.data.data, {
                        author: {
                            avatar: user?.avatar,
                            name: user?.name,
                        },
                    });
                    return [newComment, ...current];
                });
                setComment("");
            })
            .catch(error =>
                toast.error(
                    error.response?.data.validation.body.message ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    return (
        <S.Container>
            <Image
                width="50"
                height="50"
                src={
                    user && user.avatar != "null"
                        ? `${API_BASE_URL}/files/${user.avatar}`
                        : "/background/background.webp"
                }
                alt="Profile Avatar"
            />

            <div>
                <textarea
                    placeholder="Make a comment."
                    id={`comment-${tweetId}`}
                    maxLength={250}
                    onChange={({ target }) => setComment(target.value)}
                    value={comment}
                />
                <button onClick={handleComment}>
                    <Send color="#fff" width={25} />
                </button>
            </div>
        </S.Container>
    );
};

export default WriteComment;
