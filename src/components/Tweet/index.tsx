import {
    Heart,
    HeartFill,
    Bookmark,
    BookmarkFill,
} from "@styled-icons/bootstrap";
import { ModeComment } from "@styled-icons/material-outlined";
import { Close } from "@styled-icons/material-rounded";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { ITweet, ITweetComponent } from "../../@types";
import { useTweetServices } from "../../hooks/useTweetServices";
import api from "../../services/api";
import { API_BASE_URL } from "../../utils/constants";
import { Comment } from "../Comment";
import WriteComment from "../WriteComment";
import * as S from "./styles";

const Tweet: React.FC<ITweetComponent> = ({ data, setTweets }) => {
    const [commentsQuantity, setCommentsQuantity] = useState(3);
    const [tweetComments, setTweetComments] = useState(data.comments);
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
                setTweets((tweets): ITweet[] => {
                    const tweetsFiltered = tweets.filter(
                        tweet => tweet.id !== data.id,
                    );
                    return tweetsFiltered;
                });
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
            <S.TopInformations
                onClick={() => Router.push(`/profile/${data.author.id}`)}
            >
                <Image
                    width="60"
                    height="60"
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

            <p>{data.content}</p>

            {data.image && (
                <Image
                    width="700"
                    height="400"
                    src={`${API_BASE_URL}/files/${data.image}`}
                    alt="Image tweet"
                />
            )}

            <S.Status>
                <p>{data.comments_id.length} Comments</p>
                <p>{savedCount} Saved</p>
                <p>{likedCount} Likes</p>
            </S.Status>

            <S.Divider />

            <S.Actions>
                <label htmlFor={`comment-${data.id}`}>
                    <li>
                        <ModeComment size={18} /> Comment
                    </li>
                </label>
                <li
                    className={"heart"}
                    onClick={alreadyLiked ? handleUnlikeTweet : handleLikeTweet}
                >
                    {alreadyLiked ? (
                        <HeartFill size={18} color="#EB5757" />
                    ) : (
                        <Heart size={18} color="#EB5757" />
                    )}
                    Likes
                </li>
                <li
                    className={"bookmark"}
                    onClick={alreadySaved ? handleUnsaveTweet : handleSaveTweet}
                >
                    {alreadySaved ? (
                        <BookmarkFill size={18} color="#2D9CDB" />
                    ) : (
                        <Bookmark size={18} color="#2D9CDB" />
                    )}
                    Saved
                </li>
            </S.Actions>

            <S.Divider />

            <WriteComment
                setTweetComments={setTweetComments}
                tweetId={data.id}
            />

            <div>
                {tweetComments
                    ?.slice(0, commentsQuantity)
                    .map((data, index) => (
                        <Comment data={data} key={index} />
                    ))}

                {commentsQuantity < tweetComments?.length && (
                    <S.LoadComment onClick={showMoreComments}>
                        Load more.
                    </S.LoadComment>
                )}
            </div>

            {data.author_id === user?.id && (
                <S.DeleteTweet>
                    <Close width={18} height={18} onClick={handleDeleteTweet} />
                </S.DeleteTweet>
            )}
        </S.Container>
    );
};

export default Tweet;
