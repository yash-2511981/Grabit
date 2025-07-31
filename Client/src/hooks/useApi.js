import apiClient from '@/lib/axiosclient'
import { useAppStore } from '@/store/store'
import { toast } from 'sonner'

const useApi = () => {
    const { setLoading } = useAppStore()

    const makeRequest = async (method, route, data, successMessage) => {
        console.log(data)

        try {
            setLoading(true)
            const config = { withCredentials: true }
            let response;

            switch (method.toLowerCase()) {
                case 'get':
                    response = await apiClient.get(route, config)
                    break
                case 'post':
                    response = await apiClient.post(route, data, config)
                    break
            }
            
            if (response.status >= 200 && response.status < 300) {
                console.log("i am here")
                if (successMessage) {
                    toast.success(successMessage)   
                }

                return {
                    success: true,
                    data: response.data
                }
            }
        } catch (error) {
            console.log("API Error:", error)
            let errorMessage = "Something went wrong.Try again later";
            if (error.response) {
                errorMessage = error.response.data || `Server error:${error.response.status}`
            } else {
                errorMessage = "Network error.Check your internet connection."
            }

            toast.error(errorMessage)

            return {
                success: false
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        post: (route, data, successMessage) => makeRequest('post', route, data, successMessage),
        get: (route, data, successMessage) => makeRequest('get', route, data, successMessage)
    }
}

export default useApi
