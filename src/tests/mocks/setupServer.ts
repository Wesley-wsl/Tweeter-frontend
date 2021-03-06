import { rest } from "msw";
import { setupServer } from "msw/node";

import { tweetMocked, userJest } from "./constants";

export const baseURL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

const handlers = [
    rest.put(`${baseURL}/comment/*/like`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                validation: {
                    body: {
                        message: "Access denied.",
                    },
                },
            }),
        );
    }),
    rest.delete(`${baseURL}/comment/*/like`, (req, res, ctx) => {
        return res(
            ctx.status(400),
            ctx.json({
                validation: {
                    body: {},
                },
            }),
        );
    }),
    rest.put(`${baseURL}/user/follower/*`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.delete(`${baseURL}/user/unfollow/*`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.get(`${baseURL}/user/me/whofollow`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [{ ...userJest }, { ...userJest, name: "Second User" }],
            }),
        );
    }),
    rest.get(`${baseURL}/user/me/verify`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                id: "2",
            }),
        );
    }),
    rest.put(`${baseURL}/user/*`, (req, res, ctx) => {
        return res(
            ctx.status(404),
            ctx.json({
                error: {
                    response: {
                        data: {
                            error: "Access denied.",
                        },
                    },
                },
            }),
        );
    }),
    rest.get(`${baseURL}/tweet/me/trends`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        trend: "#backend",
                        tweetsQuantity: 10,
                    },
                ],
            }),
        );
    }),
    rest.get(`${baseURL}/user/*/following`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        id: "2",
                        name: "Second User",
                        followers_id: ["100"],
                        avatar: "/png.png",
                        about_me: "About me.",
                    },
                ],
            }),
        );
    }),
    rest.get(`${baseURL}/user/*/followers`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        id: "2",
                        name: "Second User",
                        followers_id: ["100"],
                        avatar: "/png.png",
                        about_me: "About me.",
                    },
                ],
            }),
        );
    }),
    rest.get(`${baseURL}/user/*`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: userJest,
            }),
        );
    }),
    rest.post(`${baseURL}/tweet`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: tweetMocked,
            }),
        );
    }),
];

export const server = setupServer(...handlers);
