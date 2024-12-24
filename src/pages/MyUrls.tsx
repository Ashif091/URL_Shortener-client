import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { FaCopy, FaExternalLinkAlt,FaTrash  } from 'react-icons/fa';

interface UrlData {
  _id: string;
  url: string;
  shorterUrl: string;
}

const MyUrls: React.FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const clientUrl = import.meta.env.VITE_CLIENT_URL;

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(`${serverUrl}/urls`, { withCredentials: true });
        setUrls(response.data.urls);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch URLs. Please try again later.');
        setLoading(false);
        console.error('Error fetching URLs:', err);
      }
    };

    fetchUrls();
  }, []);

  const handleCopy = (shorterUrl: string) => {
    const fullUrl = `${clientUrl}/url/${shorterUrl}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast.success('Shortened URL copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy URL');
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await axios.delete(`${serverUrl}/urls/${id}`, { withCredentials: true });
        setUrls(urls.filter(url => url._id !== id));
        toast.success('URL deleted successfully');
      } catch (err) {
        console.error('Error deleting URL:', err);
        toast.error('Failed to delete URL. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#0186da]">My URLs</h1>
      {urls.length === 0 ? (
        <p className="text-center text-gray-600">You haven't created any shortened URLs yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {urls.map((urlData) => (
            <div key={urlData._id} className="bg-white  rounded-lg shadow-md p-6">
              <h2 className="text-xl text-gray-600 font-semibold mb-2 truncate" title={urlData.url}>
                {urlData.url}
              </h2>
              <p className="text-blue-600 mb-4">
                {`${clientUrl}/url/${urlData.shorterUrl}`}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleCopy(urlData.shorterUrl)}
                  className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                >
                  <FaCopy className="mr-2" /> Copy
                </button>
                <a
                  href={urlData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                  <FaExternalLinkAlt className="mr-2" /> Visit
                </a>
                <button
                  onClick={() => handleDelete(urlData._id)}
                  className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyUrls;

