import {
    Heart,
    Bookmark,
    Image as BootstrapImage,
} from "@styled-icons/bootstrap";
import { ModeComment, Loop } from "@styled-icons/material-outlined";
import Image from "next/image";
import React from "react";

import Comment from "../Comment";
import * as S from "./styles";

const Tweet: React.FC = () => {
    return (
        <S.Container>
            <S.TopInformations>
                <Image
                    width="60"
                    height="60"
                    src="/background/akishino.webp"
                    alt="Profile Avatar"
                />
                <div>
                    <p>Shino Aki</p>
                    <p>24 August at 20:43</p>
                </div>
            </S.TopInformations>

            <p>
                Traveling - it leaves you speechless, then turns you into a
                storyteller.
            </p>

            <Image
                width="700"
                height="400"
                src="/background/background.webp"
                alt="Image tweet"
            />
            <S.Status>
                <p>449 Comments</p>
                <p>59k Retweets</p>
                <p>234 Saved</p>
            </S.Status>

            <div className="divider" />

            <ul>
                <li>
                    <ModeComment size={18} /> Comments
                </li>
                <li>
                    <Loop size={18} /> Retweets
                </li>
                <li>
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
                    src="/background/akishino.webp"
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
                <Comment />
            </div>
        </S.Container>
    );
};

export default Tweet;
