import { Link } from 'react-router-dom'
import { FaLink, FaClipboard, FaRocket } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Short URL</h1>
          <p className="text-xl text-gray-600 mb-8">Simplify your links, amplify your reach</p>
          <Link 
            to="/shortener" 
            className="bg-[#0186da] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaLink className="text-[#0186da] text-4xl mb-4" />
            <h2 className="text-[#0186da] text-2xl font-semibold mb-2">Shorten Any URL</h2>
            <p className="text-gray-600">Transform long, complex URLs into short, memorable links with just a click.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaClipboard className="text-[#0186da] text-4xl mb-4" />
            <h2 className="text-[#0186da] text-2xl font-semibold mb-2">Easy to Share</h2>
            <p className="text-gray-600">Copy and share your shortened URLs effortlessly across any platform or device.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaRocket className="text-[#0186da] text-4xl mb-4" />
            <h2 className="text-[#0186da] text-2xl font-semibold mb-2">Boost Your Reach</h2>
            <p className="text-gray-600">Increase click-through rates with clean, professional-looking links.</p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700">
            <li>Enter your long URL into our shortener tool</li>
            <li>Click the "Shorten" button to generate a unique, shortened URL</li>
            <li>Copy your new short URL and share it anywhere</li>
            <li>Anyone who clicks the short URL will be redirected to your original long URL</li>
          </ol>
        </section>

        <section className="text-center mt-16">
          <h2 className="text-[#0186da] text-3xl font-bold mb-4">Ready to simplify your links?</h2>
          <Link 
            to="/shortener" 
            className="bg-[#0186da] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition duration-300 inline-block"
          >
            Shorten URL Now
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Home

