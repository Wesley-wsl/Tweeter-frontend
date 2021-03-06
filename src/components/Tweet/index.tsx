import {
    Heart,
    HeartFill,
    Bookmark,
    BookmarkFill,
} from "@styled-icons/bootstrap";
import { ModeComment } from "@styled-icons/material-outlined";
import { Close } from "@styled-icons/material-rounded";
import { motion } from "framer-motion";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { ITweetComponent } from "../../@types";
import { useTweetServices } from "../../hooks/useTweetServices";
import api from "../../services/api";
import { CLOUDINARY_URL } from "../../utils/constants";
import { fadeInUp } from "../../utils/variants";
import { Comment } from "./Comment";
import * as S from "./styles";
import WriteComment from "./WriteComment";

const Tweet: React.FC<ITweetComponent> = ({ data, mutateTweets }) => {
    const [commentsQuantity, setCommentsQuantity] = useState(3);
    const createdAt = new Date(data.created_at).toLocaleDateString();

    const showMoreComments = () => setCommentsQuantity(current => current + 3);
    const {
        alreadyLiked,
        alreadySaved,
        handleLikeTweet,
        handleSaveTweet,
        handleUnlikeTweet,
        handleUnsaveTweet,
        likedCount,
        savedCount,
        user,
    } = useTweetServices(data);

    async function handleDeleteTweet() {
        await api
            .delete(`/tweet/${data.id}`)
            .then(() => {
                mutateTweets();
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    return (
        <S.Container
            as={motion.div}
            variants={fadeInUp}
            initial="hidden"
            animate="enter"
            exit="hidden"
        >
            <S.TopInformations
                onClick={() => Router.push(`/profile/${data.author.id}`)}
            >
                <Image
                    width="60"
                    height="60"
                    src={
                        data.author.avatar
                            ? `${CLOUDINARY_URL}/${data.author.avatar}`
                            : "/background/background.webp"
                    }
                    alt="Profile Avatar"
                />
                <div>
                    <p>{data.author.name}</p>
                    <p>{createdAt}</p>
                </div>
            </S.TopInformations>

            <p>{data.content}</p>

            {data.image && (
                <Image
                    width="700"
                    height="400"
                    src={`${CLOUDINARY_URL}/${data.image}`}
                    alt="Image tweet"
                />
            )}

            <S.Status>
                <p>{data.comments.length} Comments</p>
                <p>{savedCount} Saved</p>
                <p>{likedCount} Likes</p>
            </S.Status>

            <S.Divider />

            <S.Actions>
                <label htmlFor={`comment-${data.id}`}>
                    <li>
                        <ModeComment
                            size={18}
                            aria-label="Comment icon for go to make a comment."
                        />
                        Comment
                    </li>
                </label>
                <li
                    className={"heart"}
                    onClick={alreadyLiked ? handleUnlikeTweet : handleLikeTweet}
                >
                    {alreadyLiked ? (
                        <HeartFill
                            size={18}
                            color="#EB5757"
                            aria-label="Heart fill icon to remove your like on click."
                        />
                    ) : (
                        <Heart
                            size={18}
                            color="#EB5757"
                            aria-label="Heart icon to give like on click."
                        />
                    )}
                    Likes
                </li>
                <li
                    className={"bookmark"}
                    onClick={alreadySaved ? handleUnsaveTweet : handleSaveTweet}
                >
                    {alreadySaved ? (
                        <BookmarkFill
                            size={18}
                            color="#2D9CDB"
                            aria-label="Bookmark fill icon to remove this tweet from bookmarks on click."
                        />
                    ) : (
                        <Bookmark
                            size={18}
                            color="#2D9CDB"
                            aria-label="Bookmark icon to add this tweet in bookmarks on click."
                        />
                    )}
                    Saved
                </li>
            </S.Actions>

            <S.Divider />

            <WriteComment mutateTweets={mutateTweets} tweetId={data.id} />

            <div>
                {data.comments
                    ?.slice(0, commentsQuantity)
                    .map((data, index) => (
                        <Comment
                            data={data}
                            key={index}
                            mutateTweets={mutateTweets}
                        />
                    ))}

                {commentsQuantity < data.comments?.length && (
                    <S.LoadComment onClick={showMoreComments}>
                        Load more.
                    </S.LoadComment>
                )}
            </div>

            {data.author_id === user?.id && (
                <S.DeleteTweet>
                    <Close
                        width={18}
                        height={18}
                        onClick={handleDeleteTweet}
                        aria-label="Icon close to delete this comment on click."
                    />
                </S.DeleteTweet>
            )}
        </S.Container>
    );
};

export default Tweet;
