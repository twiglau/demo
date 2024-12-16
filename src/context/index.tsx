import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const AppProviders = ({children}:{children: ReactNode}) => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })
    return (
        <QueryClientProvider client={queryClient} >
            <AuthProvider>
                {children}
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
    
}