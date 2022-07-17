import { Send } from "@styled-icons/boxicons-regular";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { IWriteComment } from "../../../@types";
import { AuthContext } from "../../../contexts/AuthContext";
import api from "../../../services/api";
import { CLOUDINARY_URL } from "../../../utils/constants";
import * as S from "./styles";

const WriteComment = ({ mutateTweets, tweetId }: IWriteComment) => {
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
            .then(() => {
                mutateTweets();
                setComment("");
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
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
                    user && user.avatar
                        ? `${CLOUDINARY_URL}/${user.avatar}`
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
                <motion.button
                    onClick={handleComment}
                    whileTap={{ scale: 0.7 }}
                    transition={{ duration: 0.05 }}
                >
                    <Send
                        color="#fff"
                        width={25}
                        aria-label="Icon send to send comment."
                    />
                </motion.button>
            </div>
        </S.Container>
    );
};

export default WriteComment;
