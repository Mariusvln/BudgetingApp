import "../assets/styles/Dashboard.css"
import userIcon from "../assets/images/icons/user-icon.svg"
import searchIcon from "../assets/images/icons/search-icon.svg"
import bellIcon from "../assets/images/icons/bell-icon.svg"

const DashboardHeaderMobile = () => {
    return (
        <header className="header_allignment mobile-display">
            <section className="flex_gap5 justify-between">
                <img src={userIcon} alt="user icon" className="h-12.5 w-12.5 self-center"/>
                <div className="flex flex-col flex_center">
                    <p className="text-gray-400 bold-font">Good Morning</p>
                    <h4 className="black-text bold-font text-lg">User</h4>
                </div>
            </section>
            <nav className="flex_gap5 flex_center">
                <button className="header_nav_element px-3.25"><img src={searchIcon} alt="search button" className="h-4.5 w-4.5"/></button>
                <button className="header_nav_element px-3.5"><img src={bellIcon} alt="notifications button" className="h-5 w-4"/></button>
            </nav>
        </header>
    )
}

export default DashboardHeaderMobile