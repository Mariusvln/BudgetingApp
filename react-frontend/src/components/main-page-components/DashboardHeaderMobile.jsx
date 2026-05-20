import userIcon from "../../assets/images/icons/user-icon.svg"
import searchIcon from "../../assets/images/icons/search-icon.svg"
import bellIcon from "../../assets/images/icons/bell-icon.svg"
import { useAuth } from "../../contexts/AuthContext"

const DashboardHeaderMobile = () => {
    const { user } = useAuth();

    return (
        <header className="flex justify-between gap-4 border-b border-base-300 bg-base-100/90 p-5 text-base-content backdrop-blur lg:hidden">
            <section className="flex min-w-0 justify-between gap-4">
                <img src={userIcon} alt="user icon" className="h-12 w-12 shrink-0 self-center"/>
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-base-content/50">Good Morning</p>
                    <h4 className="truncate text-lg font-bold text-base-content">{user?.name || "User"}</h4>
                </div>
            </section>
            <nav className="flex shrink-0 justify-center gap-3">
                <button className="my-1 grid h-11 w-11 place-items-center rounded-full bg-base-200 transition hover:bg-base-300"><img src={searchIcon} alt="search button" className="h-4.5 w-4.5"/></button>
                <button className="my-1 grid h-11 w-11 place-items-center rounded-full bg-base-200 transition hover:bg-base-300"><img src={bellIcon} alt="notifications button" className="h-5 w-4"/></button>
            </nav>
        </header>
    )
}

export default DashboardHeaderMobile
