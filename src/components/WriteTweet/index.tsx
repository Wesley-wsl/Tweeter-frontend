import { Image as BootstrapImage } from "@styled-icons/bootstrap";
import { Earth } from "@styled-icons/ionicons-sharp";
import { People } from "@styled-icons/material-rounded";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import { ITweet, IWriteTweet } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import { API_BASE_URL } from "../../utils/constants";
import { fadeInUp } from "../../utils/variants";
import { Button } from "../Button";
import WhoCanSee from "../WhoCanSee";
import * as S from "./styles";

const WriteTweet = ({ setTweets }: IWriteTweet) => {
    const [tweetImage, setTweetImage] = useState<File | undefined>(undefined);
    const [tweetContent, setTweetContent] = useState("");
    const [tweetIsPublic, setTweetIsPublic] = useState("true");
    const { user } = useContext(AuthContext);

    async function onSendTweet() {
        const formData = new FormData();
        formData.append("content", tweetContent.trim());
        formData.append("isPublic", tweetIsPublic);

        if (tweetImage !== undefined) {
            formData.append("image", tweetImage);
        }

        if (tweetContent.trim().length > 50) {
            await api
                .post("/tweet", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(response => {
                    setTweetContent("");
                    setTweets((currentValue: ITweet[]) => {
                        const newTweet = Object.assign(response.data.data, {
                            author: {
                                avatar: user?.avatar,
                                name: user?.name,
                            },
                        });
                        return [newTweet, ...currentValue];
                    });
                })
                .catch(error =>
                    toast.error(
                        error.response?.data.validation.body.message ??
                            "Something went wrong, please try again later.",
                    ),
                );
        }

        if (tweetContent.trim().length < 50)
            toast.error("Must have at least 50 characters in a tweet.");
    }

    return (
        <S.Container
            as={motion.div}
            variants={fadeInUp}
            initial="hidden"
            animate="enter"
        >
            <p>Tweet something</p>
            <S.Write>
                <span>
                    <Image
                        width="45"
                        height="45"
                        src={
                            user && user.avatar != "null"
                                ? `${API_BASE_URL}/files/${user.avatar}`
                                : "/background/background.webp"
                        }
                        alt="Profile Avatar"
                    />
                </span>

                <textarea
                    placeholder="What's happening?"
                    maxLength={1400}
                    onChange={({ target }) => setTweetContent(target.value)}
                    value={tweetContent}
                />
            </S.Write>

            <S.Filter>
                <div>
                    <input
                        id="tweet-file"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        data-testid="tweet-file"
                        onChange={({ target }) =>
                            setTweetImage(
                                target.files ? target.files[0] : undefined,
                            )
                        }
                    />
                    <label htmlFor="tweet-file">
                        {tweetImage ? (
                            <Image
                                src={URL.createObjectURL(tweetImage)}
                                width={20}
                                height={20}
                                alt="Image uploaded"
                            />
                        ) : (
                            <BootstrapImage
                                size={20}
                                height={20}
                                color="#2F80ED"
                                aria-label="Landscape icon to upload image."
                            />
                        )}
                    </label>

                    {tweetIsPublic === "true" ? (
                        <Earth
                            size={20}
                            color="#2F80ED"
                            aria-label="Earth icon that indicate that this tweet is public."
                        />
                    ) : (
                        <People
                            size={20}
                            color="#2F80ED"
                            aria-label="People icon that indicate that this tweet is private."
                        />
                    )}

                    <WhoCanSee setTweetIsPublic={setTweetIsPublic} />
                </div>

                <Button title="Tweet" color={"#2F80ED"} onClick={onSendTweet} />
            </S.Filter>
        </S.Container>
    );
};

export default WriteTweet;
