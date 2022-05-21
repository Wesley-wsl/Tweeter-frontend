/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { ITweet } from "../@types";
import api from "../services/api";

export const useInfiniteScroll = (url: string) => {
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isEndPage, setIsEndPage] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const { ref, inView } = useInView();

    function handleFilter(filterName: string) {
        if (filter !== filterName) {
            setCurrentPage(0);
            setFilter(filterName);
            setIsEndPage(false);
            setTweets([]);
        }
    }

    async function getTweets() {
        setScrollLoading(true);
        await api
            .get(`${url}?page=${currentPage}&filter=${filter}`)
            .then(response => {
                setTweets((currentTweet: ITweet[]) => [
                    ...currentTweet,
                    ...response.data.data,
                ]);
                setCurrentPage(currentPage + 1);
                setIsEndPage(response.data.lastPage);
            });
        setScrollLoading(false);
    }

    useEffect(() => {
        if (inView) {
            getTweets();
        }
    }, [inView]);

    return { ref, scrollLoading, isEndPage, tweets, handleFilter, filter };
};
