import walletIcon from "../../assets/images/icons/wallet-icon.svg";
import paperPlaneIcon from "../../assets/images/icons/paper-plane-icon.svg";
import "../../assets/styles/Dashboard.css";

const AccountCard = () => {
    return (
        <section className="flex_col account-card">
                <div className="flex_between">
                  <p className="small-text green-text">Main Account</p>
                  <button>
                    <img
                      src={walletIcon}
                      alt="wallet button"
                      className="wallet_button button-radius1"
                    />
                  </button>
                </div>
                <h2 className="bold_font self-start h3_style white-text">$12,450.00</h2>
                <hr className="my-5" />
                <div className="flex_between">
                  <div className="flex_col flex_center">
                    <h4 className="semibold card_holder">CARD HOLDER</h4>
                    <p className="bold_font white-text">USER</p>
                  </div>
                  <button className="button-radius1 transfer_button">
                    <div className="flex flex_center pb-1">
                      <img
                        src={paperPlaneIcon}
                        alt="paper plane icon"
                        className="w-3.25 h-2.75 mt-2 mr-1"
                      />
                      <p className="black-text bold_font">Transfer</p>
                    </div>
                  </button>
                </div>
              </section>
    )
}

export default AccountCard