import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { Provider } from "react-redux";
import { store } from "store";

export const AppProviders = ({children}:{children: ReactNode}) => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient} >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    )
    
}