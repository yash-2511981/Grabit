import apiClient from '@/lib/axiosclient'
import { toast } from 'sonner'

const useApi = () => {

    const makeRequest = async (method, route, data, successMessage) => {

        try {
            const config = { withCredentials: true }
            let response;

            switch (method.toLowerCase()) {
                case 'get':
                    response = await apiClient.get(route, config)
                    break
                case 'post':
                    response = await apiClient.post(route, data, config)
                    break
                case 'patch':
                    response = await apiClient.patch(route, data, config)
                    break
                case 'delete':
                    response = await apiClient.delete(route, data, config)
                    break
            }

            if (response.status >= 200 && response.status < 300) {
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
                errorMessage = "Server Error.Try again after some time"
            }

            toast.error(errorMessage)

            return {
                success: false
            }
        }
    }

    return {
        post: (route, data, successMessage) => makeRequest('post', route, data, successMessage),
        get: (route, data, successMessage) => makeRequest('get', route, data, successMessage),
        patch: (route, data, successMessage) => makeRequest('patch', route, data, successMessage),
        delete: (route, data, successMessage) => makeRequest('delete', route, data, successMessage),
    }
}

export default useApi
