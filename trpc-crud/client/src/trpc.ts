import { createTRPCReact } from "@trpc/react-query";
import {AppRouter} from "../../src/app"

//Las cosas que pueda consultar del front va a derivar de AppRouter
export const trpc = createTRPCReact<AppRouter>()
