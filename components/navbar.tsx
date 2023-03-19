import { useEffect, useState } from 'react'
import NavbarItem from "./navbaritem";
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import MobileMenu from "./mobileMenu";
import AccountMenu from './accountMenu';

const TOP_OFFSET = 66

export default function Navbar() {
    const [showMobileMenu, setMobileMenu] = useState(false)
    const [showAccountMenu, setAccountMenu] = useState(false)
    const [showBackground, setShowBackGround] = useState(false)

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackGround(true)
            } else {
                setShowBackGround(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])


    function toggleMobileMenu() {
        setMobileMenu((prevState) => !prevState)
    }

    function toggleAccountMenu() {
        setAccountMenu((prevState) => !prevState)
    }

    return (
        <nav className="w-full fixed z-40 ">
            <section className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>

                <img className="h-4 lg:h-7" src="/imgs/logo.png" alt="logo" />

                <div className="flex-row ml-8 gap-7 hidden lg:flex ">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                </div>

                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>

                <div className="flex flex-row ml-auto gap-7 items-center">

                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transtion">
                        <BsSearch />
                    </div>

                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transtion">
                        <BsBell />
                    </div>

                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">

                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/imgs/default-green.png" alt="" />
                        </div>

                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>

                </div>

            </section>
        </nav>
    )
}