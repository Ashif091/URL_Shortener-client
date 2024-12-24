import React, {useRef, useState} from "react"
import axios from "axios"
import {toast} from "sonner"
const serverUrl = import.meta.env.VITE_SERVER_URL;
const clientUrl = import.meta.env.VITE_CLIENT_URL;

const URLShortener = () => {
  const [url, setUrl] = useState("")
  const urlInput = useRef<HTMLInputElement | null>(null)
  const [shortenedData, setShortenedData] = useState<{
    url: string
    shorterUrl: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${serverUrl}/urls/create`,
        {url},
        {withCredentials: true}
      )
      if (response.data) {
        toast.success("URL has been created")
        setShortenedData({
          url: response.data.newUrl.url,
          shorterUrl: `${clientUrl}/url/${response.data.newUrl.shorterUrl}`,
        })
        if (urlInput.current) urlInput.current.value = ""
        setUrl("")
      }
      console.log("url", response.data)
    } catch (error) {
      toast.error("Error shortening URL")
      console.error("Error shortening URL:", error)
    }
  }
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("URL has been copied")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast.error("Failed to copy URL")
      })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-96 bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md mt-20">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Paste the URL to be shortened
        </h1>
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="url"
            value={url}
            ref={urlInput}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL here"
            required
            className="text-gray-800 flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#0186da] text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Shorten
          </button>
        </form>
      </div>
      {shortenedData && (
          <div className="w-full max-w-3xl mt-8 space-y-4 text-gray-700 overflow-hidden">
            <div className="bg-gray-50 p-4  rounded-md ">
            <div className="mb-3 flex gap-4">
            <h2 className="text-lg font-semibold mb-2">Original URL:</h2>
              <p className="text-gray-700 break-all">{shortenedData.url}</p>
            </div>
            
              <h2 className="text-lg font-semibold mb-2">Shortened URL:</h2>
              <div className="flex items-center space-x-2">
                <p className="text-blue-600 break-all flex-grow">
                  {shortenedData.shorterUrl}
                </p>
                <button
                  onClick={() => handleCopy(shortenedData.shorterUrl)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default URLShortener
