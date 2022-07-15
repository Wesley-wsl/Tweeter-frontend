import Router from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import useSWRInfinite from "swr/infinite";

import { IAuthor, ITweet } from "../@types";
import api from "../services/api";

export const useInfiniteScroll = (url: string) => {
    const [users, setUsers] = useState<IAuthor[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isEndPage, setIsEndPage] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const { ref, inView } = useInView();

    function handleReset(searchName: string, filterName: string) {
        if (filter !== filterName) setFilter(filterName);
        if (search !== searchName) setSearch(searchName);
        setCurrentPage(0);
        setSize(0);
        setIsEndPage(false);
        setUsers([]);
    }

    const getKey = (pageIndex: number, previousPageData: ITweet[]) => {
        if (previousPageData && !previousPageData.length && isEndPage)
            return null;
        return `${url}?page=${pageIndex}&filter=${filter}&search=${search}`;
    };

    const {
        data: tweets,
        mutate: mutateTweets,
        size,
        setSize,
        isValidating,
    } = useSWRInfinite(
        getKey,
        async url => {
            setScrollLoading(true);
            const response = await api
                .get(url)
                .then(response => {
                    setIsEndPage(response.data.lastPage);
                    setScrollLoading(false);
                    return response.data.data;
                })
                .catch(error => {
                    const invalidToken = "JWT Token is invalid!";
                    if (error.response?.data.error === invalidToken)
                        Router.push("/");
                    toast.error(
                        error.response?.data.error ??
                            "Something went wrong, please try again later.",
                    );
                    return [];
                });
            return response;
        },
        {
            initialSize: 0,
            revalidateAll: true,
        },
    );

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
        if (inView && filter === "people") getUsers();
        if (inView && filter !== "people" && !isEndPage && !isValidating) {
            setSize(size + 1);
        }
    }, [inView, filter, isValidating]);

    useEffect(() => {
        setSearch("");
    }, [filter]);

    return {
        ref,
        scrollLoading,
        isEndPage,
        users,
        setUsers,
        tweets,
        mutateTweets,
        search,
        filter,
        handleReset,
    };
};
