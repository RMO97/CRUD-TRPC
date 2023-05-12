import { initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext =({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({})

const trpc = initTRPC.context().create()

export const router = trpc.router
export const middleware = trpc.middleware
export const publicProcedure = trpc.procedure