import { useAsync } from "./useAsync"
import { Project } from "types/project"
import { useEffect } from 'react'
import { cleanObject } from "utils"
import { useHttp } from "utils/http"



// TODO: 如何使用参数
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const {run, ...result } = useAsync<Project[]>()

    useEffect(() => {
        run(client("projects", { data: cleanObject(param || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}