import userIcon from "../../assets/images/icons/user-icon.svg"
import searchIcon from "../../assets/images/icons/search-icon.svg"
import bellIcon from "../../assets/images/icons/bell-icon.svg"
import { useAuth } from "../../contexts/AuthContext"

const DashboardHeaderMobile = () => {
    const { user } = useAuth();

    return (
        <header className="flex justify-between border-b border-base-300 bg-base-100/90 p-5 text-base-content backdrop-blur min-[930px]:hidden">
            <section className="flex justify-between gap-5">
                <img src={userIcon} alt="user icon" className="h-12.5 w-12.5 self-center"/>
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-base-content/50">Good Morning</p>
                    <h4 className="text-lg font-bold text-base-content">{user?.name || "User"}</h4>
                </div>
            </section>
            <nav className="flex justify-center gap-5">
                <button className="my-1 rounded-full bg-base-200 px-3.25 transition hover:bg-base-300"><img src={searchIcon} alt="search button" className="h-4.5 w-4.5"/></button>
                <button className="my-1 rounded-full bg-base-200 px-3.5 transition hover:bg-base-300"><img src={bellIcon} alt="notifications button" className="h-5 w-4"/></button>
            </nav>
        </header>
    )
}

export default DashboardHeaderMobile
