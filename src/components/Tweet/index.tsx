import {
    Heart,
    HeartFill,
    Bookmark,
    BookmarkFill,
} from "@styled-icons/bootstrap";
import { ModeComment } from "@styled-icons/material-outlined";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";

import { ITweetComponent } from "../../@types";
import { useTweetServices } from "../../hooks/useTweetServices";
import { API_BASE_URL } from "../../utils/constants";
import { Comment } from "../Comment";
import WriteComment from "../WriteComment";
import * as S from "./styles";

const Tweet: React.FC<ITweetComponent> = ({ data }) => {
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
    } = useTweetServices(data);

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
        </S.Container>
    );
};

export default Tweet;
