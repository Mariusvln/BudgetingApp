import walletIcon from "../../assets/images/icons/wallet-icon.svg";
import paperPlaneIcon from "../../assets/images/icons/paper-plane-icon.svg";
import { useAuth } from "../../contexts/AuthContext";

const AccountCard = ({balance}) => {
    const { user } = useAuth();

    return (
        <section className="flex w-[22.5rem] flex-col self-center overflow-hidden rounded-2xl border border-primary/35 bg-[radial-gradient(circle_at_14%_12%,rgb(255_255_255_/_0.24),transparent_9rem),linear-gradient(145deg,color-mix(in_oklch,var(--color-primary)_88%,black),color-mix(in_oklch,var(--color-neutral)_88%,black))] p-8 shadow-[0_18px_42px_color-mix(in_oklch,var(--color-primary)_18%,transparent)]">
                <div className="flex justify-between">
                  <p className="small-text font-bold text-primary-content/75">Main Account</p>
                  <button>
                    <img
                      src={walletIcon}
                      alt="wallet button"
                      className="rounded-lg bg-white/16 p-2"
                    />
                  </button>
                </div>
                <h2 className="self-start text-3xl font-bold text-white">{balance}</h2>
                <hr className="my-5" />
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center">
                    <h4 className="font-semibold tracking-wide text-slate-400">CARD HOLDER</h4>
                    <p className="font-bold text-white">{user?.name || "USER"}</p>
                  </div>
                  <button className="w-30 rounded-lg bg-primary-content text-primary transition hover:bg-primary-content/90">
                    <div className="flex justify-center pb-1">
                      <img
                        src={paperPlaneIcon}
                        alt="paper plane icon"
                        className="w-3.25 h-2.75 mt-2 mr-1"
                      />
                      <p className="font-bold text-primary">Transfer</p>
                    </div>
                  </button>
                </div>
              </section>
    )
}

export default AccountCard
