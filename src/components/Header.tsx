import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {IoIosLogOut} from "react-icons/io"
import {useDispatch} from "react-redux"
import {signOut} from "../redux/user/userSlice"

export default function Header() {
  const {currentUser} = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout")
      dispatch(signOut())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-[#0186da] min-h-20 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-3xl capitalize ">short url</h1>
        </Link>
        <nav>
          <ul className="flex gap-4 items-center text-white">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shortener" className="hover:underline">
                Shortener
              </Link>
            </li>
            <li>
              <Link to="/my-urls" className="hover:underline">
                My URLs
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="flex gap-4 items-center">
          {currentUser?.admin ? (
            <h1 className="flex gap-2 items-center ">
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="cursor-pointer">
                <IoIosLogOut onClick={handleSignOut} />
              </span>
            </h1>
          ) : (
            <div className="flex gap-3 items-center">
              {currentUser ? (
                <>
                  <img
                    src="https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg"
                    alt="profile"
                    className="h-9 w-9 rounded-full object-cover mt-2"
                  />
                  <div>
                    <p className="capitalize">{currentUser.name}</p>
                    <p className="text-sm">{currentUser.email}</p>
                  </div>
                  <img
                    src="https://cdn.pixabay.com/photo/2017/05/29/23/02/logging-out-2355227_1280.png"
                    alt=""
                    className="h-12 w-12 mb-2  object-cover mt-2 cursor-pointer"
                    onClick={handleSignOut}
                  />
                </>
              ) : (
                <Link to="/sign-in">
                  <li>Sign In</li>
                </Link>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}
