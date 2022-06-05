import {
    Heart,
    Bookmark,
    Image as BootstrapImage,
} from "@styled-icons/bootstrap";
import { ModeComment, Loop } from "@styled-icons/material-outlined";
import Image from "next/image";
import Router from "next/router";
import React, { useContext } from "react";

import { ITweetComponent } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import { API_BASE_URL } from "../../utils/constants";
import { Comment } from "../Comment";
import * as S from "./styles";

const Tweet: React.FC<ITweetComponent> = ({ data }) => {
    const { user } = useContext(AuthContext);
    const createdAt = new Date(data.created_at).toLocaleDateString();

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
                <p>{data.retweets_id.length} Retweets</p>
                <p>{data.users_saved_id.length} Saved</p>
                <p>{data.likes} Likes</p>
            </S.Status>

            <div className="divider" />

            <ul>
                <li>
                    <ModeComment size={18} /> Comments
                </li>
                <li>
                    <Loop size={18} /> Retweets
                </li>
                <li className={"heart"}>
                    <Heart size={18} /> Likes
                </li>
                <li>
                    <Bookmark size={18} /> Saved
                </li>
            </ul>

            <div className="divider" />

            <S.Comment>
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
                    <input
                        type="text"
                        name="reply"
                        id="reply"
                        placeholder="Tweet your reply"
                    />
                    <BootstrapImage size={17} />
                </div>
            </S.Comment>

            <div>
                {data.comments &&
                    data.comments.map((data, index) => (
                        <Comment data={data} key={index} />
                    ))}
            </div>
        </S.Container>
    );
};

export default Tweet;
