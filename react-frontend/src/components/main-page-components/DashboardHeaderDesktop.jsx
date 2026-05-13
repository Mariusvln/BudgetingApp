import { useAuth } from "../../contexts/AuthContext";

const DashboardHeaderDesktop = () => {
    const { user } = useAuth();

    return (
        <header className="desktop-display px-6 pt-6 md:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        Overview
                    </p>
                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-base-content">
                        Welcome back, {user?.name || "User"}
                    </h1>
                    <p className="mt-2 text-sm text-base-content/60">
                        Keep an eye on cash flow, savings and recent movement.
                    </p>
                </div>

                <div className="rounded-2xl border border-base-300 bg-base-100/80 px-5 py-3 text-right shadow-sm backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/40">
                        Current month
                    </p>
                    <p className="mt-1 text-sm font-semibold text-base-content">
                        {new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            year: "numeric",
                        }).format(new Date())}
                    </p>
                </div>
            </div>
        </header>
    )
}

export default DashboardHeaderDesktop
