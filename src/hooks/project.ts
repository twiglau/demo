import { useAsync } from "./useAsync"
import { Project } from "types/project"
import { useCallback, useEffect } from 'react'
import { cleanObject } from "utils"
import { useHttp } from "utils/http"



// TODO: 如何使用参数
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const {run, ...result } = useAsync<Project[]>()

    const fetchProjects = useCallback(() => client("projects", { data: cleanObject(param || {})}), [client, param])

    useEffect(() => {
        run(fetchProjects(), {
            retry: fetchProjects
        })
    }, [param, run, fetchProjects])

    return result
}


export const useEditProject = () => {
    const { run,...asyncResult } = useAsync()
    const client = useHttp()

    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params,
        }))
    }

    return {
        mutate,
        ...asyncResult
    }
}