import walletIcon from "../assets/images/icons/wallet-icon.svg"
import paperPlaneIcon from "../assets/images/icons/paper-plane-icon.svg"
import listIcon from "../assets/images/icons/list-icon.svg"
import statsIcon from "../assets/images/icons/stats-icon.svg"
import piggybankIcon from "../assets/images/icons/piggybank-icon.svg"
import "../assets/styles/Dashboard.css";

const DashboardMobile = () => {
    return (
        <div className="flex_col flex_center gap-7 mobile-display">
        <section className="flex_col account-card">
            <div className="flex_between">
            <p className="small-text green-text">Main Account</p>
            <button>
                <img src={walletIcon} alt="wallet button" className="wallet_button button-radius1"/>
            </button>
            </div>
            <h2 className="bold_font account-card-money">$12,450.00</h2>
            <hr className="my-5"/>
            <div className="flex_between">
                <div className="flex_col flex_center">
                <h4 className="semibold card_holder">CARD HOLDER</h4>
                <p className="bold_font">USER</p>
                </div>
                <button className="button-radius1 transfer_button">
                    <div className="flex flex_center pb-1">
                    <img src={paperPlaneIcon} alt="paper plane icon" className="w-3.25 h-2.75 mt-2 mr-1"/>
                    <p className="black-text bold_font">Transfer</p>
                    </div>
                </button>
            </div>
        </section>
        <section className="flex_col flex_center bg-white p-4 rounded-xl gap-4">
            <div className="flex_between">
            <div>
                <div className="flex_between gap-22 text-gray-500">
                <h4 className="black-text h4_style">Saving Goal</h4>
                <p className="bold_font">$2,300.00</p>
                </div>
                <h2 className="black-text bold_font text-3xl">$1,840.00</h2>
            </div>
            <div className="self-center">
            <button className="green-text bold_font saving-goal_button">{">"}</button>
            </div>
            </div>
            <progress
            max="100"
            value="80"
            className="progress-bar-green h-2"
            ></progress>
        </section>
        <nav className="flex_between mx-2">
            <div>
            <button className="bg-[#DBEAFE] nav_button_style hover:bg-[#bdd7fa]">
                <img src={listIcon} alt="list icon" className="w-4.5 h-5"/>
            </button>
            <p className="nav_element_style">Bills</p>
            </div>
            <div>
            <button className="bg-[#FFEDD5] nav_button_style hover:bg-[#ffdcad]">
                <img src={statsIcon} alt="stats icon" className="w-4.5 h-5"/>
            </button>
            <p className="nav_element_style">Stats</p>
            </div>
            <div>
            <button className="bg-[#F3E8FF] nav_button_style hover:bg-[#e0c3ff]">
                <img src={piggybankIcon} alt="piggybank icon" className="w-4.5 h-5"/>
            </button>
            <p className="nav_element_style">Vaults</p>
            </div>
            <div>
            <button className="nav_button_plus green-text semibold">
                +
            </button>
            <p className="nav_element_style">Add</p>
            </div>
        </nav>
        </div>
    )
}

export default DashboardMobile