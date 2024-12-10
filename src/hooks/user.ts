import { User } from "types/user";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";
import { useEffect } from "react";

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const {run, ...result} = useAsync<User[]>()

    useEffect(() => {
        run(client("users"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return result
}