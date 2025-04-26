import Logo from "../assets/logo.png"

const Header = () => {
  return (
    <div>
        <nav>
            <ul className="flex items-center cursor-pointer">
                <li className="mr-auto"><div><img width={130} src={Logo}></img></div></li>
                <li className="mx-2 font-semibold">Popular Recipes</li>
                <li className="mx-3 ml-auto"><button className="px-6 py-2 hover:bg-white rounded-lg hover:text-red-600 bg-red-600 text-white transition ease-in-out duration-300">
                Login
                </button></li>
                <li className="mx-3"><button className="px-6 py-2 hover:bg-white rounded-lg hover:text-red-600 bg-red-600 text-white transition ease-in-out duration-300">
                SignUp
                </button></li>
            </ul>
        </nav>

    </div>
  )
}

export default Header