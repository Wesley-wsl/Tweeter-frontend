import { useEffect, useState } from "react";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

import api from "../services/api";

export const usePagination = (url: string) => {
    const [paginatedData, setPaginatedData] = useState([]);

    const getKey = (pageIndex: number) => `${url}?page=${pageIndex}`;
    const {
        data: tweets,
        size,
        setSize,
    }: SWRInfiniteResponse = useSWRInfinite(getKey, async url => {
        const response = await api.get(url);
        return response.data;
    });

    useEffect(() => {
        if (tweets) {
            const items: any = [];
            tweets.flat().forEach(element => items.push(...element.data));
            setPaginatedData(items);
        }
    }, [tweets]);

    return {
        size,
        setSize,
        paginatedData,
    };
};
