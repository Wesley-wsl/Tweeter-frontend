export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3333/api/v1";

export const headerNav = [
    {
        path: "/home",
        name: "Home",
    },
    {
        path: "/explorer",
        name: "Explorer",
    },
    {
        path: "/bookmarks",
        name: "Bookmarks",
    },
];
