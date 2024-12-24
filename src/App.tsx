import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import URLShortener from "./pages/URLShortener"
import SignIn from "./pages/SingIn"
import SignUp from "./pages/SingUp"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import { Toaster } from 'sonner'
import RedirectPage from "./pages/RedirectPage"
import MyUrls from "./pages/MyUrls"

const App = () => {
  return (
    <BrowserRouter> 
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/url/:encryptedKey" element={<RedirectPage />} /> 
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} /> 
        <Route element={<PrivateRoute />}>
        <Route path="/shortener" element={<URLShortener />} />
          <Route path="/my-urls" element={<MyUrls/>} />
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
