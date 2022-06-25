import { rest } from "msw";
import { setupServer } from "msw/node";

import { commentJest } from "./constants";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

const handlers = [
    rest.put(`${baseURL}/comment/${commentJest.id}/like`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.delete(
        `${baseURL}/comment/${commentJest.id}/like`,
        (req, res, ctx) => {
            return res(ctx.status(200));
        },
    ),
];

export const server = setupServer(...handlers);
