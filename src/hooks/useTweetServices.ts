import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ITweet } from "../@types";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

export const useTweetServices = (data: ITweet) => {
    const [alreadySaved, setAlreadySaved] = useState(Boolean);
    const [alreadyLiked, setAlreadyLiked] = useState(Boolean);
    const [likedCount, setLikedCount] = useState(Number);
    const [savedCount, setSavedCount] = useState(Number);
    const { user } = useContext(AuthContext);

    async function handleLikeTweet() {
        await api
            .put(`/tweet/${data.id}/like`)
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

    async function handleUnlikeTweet() {
        await api
            .delete(`/tweet/${data.id}/like`)
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

    async function handleSaveTweet() {
        await api
            .put(`/tweet/${data.id}/save`)
            .then(() => {
                setAlreadySaved(true);
                setSavedCount(current => current + 1);
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    async function handleUnsaveTweet() {
        await api
            .delete(`/tweet/${data.id}/save`)
            .then(() => {
                setAlreadySaved(false);
                setSavedCount(current => current - 1);
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    }

    useEffect(() => {
        setAlreadySaved(data.users_saved_id.some(id => id === user?.id));
        setAlreadyLiked(data.liked_users_id.some(id => id === user?.id));
        setLikedCount(data.likes);
        setSavedCount(data.users_saved_id.length);
    }, [data.liked_users_id, data.likes, data.users_saved_id, user?.id]);

    return {
        handleLikeTweet,
        handleUnlikeTweet,
        handleSaveTweet,
        handleUnsaveTweet,
        alreadySaved,
        alreadyLiked,
        likedCount,
        savedCount,
        user,
    };
};
