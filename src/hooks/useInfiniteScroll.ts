import { FormEvent, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { IAuthor, ITweet } from "../@types";
import api from "../services/api";

export const useInfiniteScroll = (url: string) => {
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const [users, setUsers] = useState<IAuthor[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isEndPage, setIsEndPage] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const { ref, inView } = useInView();

    function handleFilter(filterName: string) {
        if (filter !== filterName) {
            setCurrentPage(0);
            setFilter(filterName);
            setIsEndPage(false);
            setTweets([]);
            setUsers([]);
        }
    }

    function handleSearch(e: FormEvent, searchName: string) {
        e.preventDefault();
        if (search !== searchName) {
            setCurrentPage(0);
            setSearch(searchName);
            setIsEndPage(false);
            setTweets([]);
            setUsers([]);
        }
    }

    function handleReset() {
        setCurrentPage(0);
        setFilter("");
        setSearch("");
        setIsEndPage(false);
        setTweets([]);
        setUsers([]);
    }

    async function getTweets() {
        setScrollLoading(true);
        await api
            .get(`${url}?page=${currentPage}&filter=${filter}&search=${search}`)
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

    async function getUsers() {
        setScrollLoading(true);
        await api
            .get(`/user?page=${currentPage}&name=${search}`)
            .then(response => {
                setUsers((currentUser: IAuthor[]) => [
                    ...currentUser,
                    ...response.data.data,
                ]);
                setCurrentPage(currentPage + 1);
                setIsEndPage(response.data.lastPage);
            });
        setScrollLoading(false);
    }

    useEffect(() => {
        if (inView && filter !== "people") getTweets();
        if (inView && filter === "people") getUsers();
    }, [inView, filter]);

    useEffect(() => {
        setSearch("");
    }, [filter]);

    return {
        ref,
        scrollLoading,
        isEndPage,
        tweets,
        users,
        handleFilter,
        setUsers,
        search,
        filter,
        handleReset,
        handleSearch,
        setTweets,
    };
};
