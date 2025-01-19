import fetcher from "@/lib/fetcher"
import useSWR from "swr"

const useNotifications  = (userId: string) => {
    const { data, isLoading, error, mutate } = useSWR(`/api/notifications/${userId}`, fetcher)

    return { data, isLoading, error, mutate }
}

export default useNotifications;