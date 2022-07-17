export const CLOUDINARY_URL =
    process.env.NEXT_PUBLIC_CLOUDINARY_URL ?? "http://localhost:3333/api/v1";

export const BaseUrlStorybook =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

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
