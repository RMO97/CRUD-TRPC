import express from 'express'
import morgan from 'morgan'
import * as trpc from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import {router, createContext} from './trpc'
import { notesRouter } from './routes/notes'
import cors from 'cors'


const app = express()

const appRouter = router({
    note:notesRouter,
})

//Permite que se puedan conectar a nuestro Back
app.use(cors())

app.use(morgan("dev"))

app.use("/trpc",
    trpcExpress.createExpressMiddleware({
     router: appRouter,
     createContext,
})
)

export type AppRouter = typeof appRouter

export default app