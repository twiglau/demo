import { configureStore } from "@reduxjs/toolkit"
import { projectListSlice } from "screens/project-list/project-list.slice"
import { authSlice } from './auth.slice'
import { 
    TypedUseSelectorHook, 
    useSelector as useReduxSelector ,
    useDispatch as useReduxDispatch
} from "react-redux"

export const rootReducer = {
    projectList: projectListSlice.reducer,
    auth: authSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
// 获取 getState 函数 的返回值类型
export type RootState = ReturnType<typeof store.getState>

// 主要解决在每次使用 useSelector 和 useDispatch 都要去重新定义 TS 类型的问题
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch: () => AppDispatch = useReduxDispatch