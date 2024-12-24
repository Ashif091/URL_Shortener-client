import  {useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"
import {toast} from "sonner"
const serverUrl = import.meta.env.VITE_SERVER_URL;
const RedirectPage = () => {
  const {encryptedKey} = useParams<{encryptedKey: string}>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/urls/${encryptedKey}`,
          {withCredentials: true}
        )
        const originalUrl = response.data
        console.log("🚀 ~ fetchOriginalUrl ~ response:", response)

        if (response.data) {
          window.location.href = originalUrl
        } else {
          toast.error("No URL found for this key")
            navigate('/');
        }
      } catch (error) {
        console.error("Error fetching the original URL:", error)
        toast.error("Something went wrong. Please try again.")
        navigate('/');
      }
    }

    if (encryptedKey) {
      fetchOriginalUrl()
    }
  }, [encryptedKey, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-lg font-semibold text-gray-800">Redirecting...</h1>
    </div>
  )
}

export default RedirectPage
