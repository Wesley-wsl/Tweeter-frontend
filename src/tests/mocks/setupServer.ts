import { rest } from "msw";
import { setupServer } from "msw/node";

import { userJest } from "./constants";

export const baseURL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

const handlers = [
    rest.put(`${baseURL}/comment/*/like`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.delete(`${baseURL}/comment/*/like`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.put(`${baseURL}/comment/1/like`, (req, res, ctx) => {
        return res(ctx.status(500));
    }),
    rest.delete(`${baseURL}/comment/*/like`, (req, res, ctx) => {
        return res(ctx.status(200));
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
];

export const server = setupServer(...handlers);
