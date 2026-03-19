import "../assets/styles/MainPage.css"

const MainPage = () => {
    return (
        <main className="flex justify-center bg-gray-100 py-2 gap-6">
            <section className="grid grid-rows-2 grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-2xl flex flex-col justify-center gap-3">
                    <p className="text-gray-500 font-semibold">Total Income</p>
                    <h3 className="text-3xl my-1 font-bold mb-2">$8,500.00</h3>
                    <progress max="100" value="80" className="h-1 w-50 rounded-xl progress-bar-green"></progress>
                </div>
                <div className="bg-white py-4 px-4 rounded-2xl flex flex-col justify-center gap-3">
                    <p className="text-gray-500 font-semibold">Total Expenses</p>
                    <h3 className="text-3xl font-bold mb-2">$4,200.00</h3>
                    <progress max="100" value="40" className="h-1 w-50 rounded-xl progress-bar-orange"></progress>
                </div>
                <div className="bg-white py-4 px-4 rounded-2xl flex flex-col justify-center gap-3">
                    <p className="text-gray-500 font-semibold">Monthly Savings</p>
                    <h3 className="text-3xl my-1 font-bold mb-2">$4,300.00</h3>
                    <progress max="100" value="60" className="h-1 w-50 rounded-xl progress-bar-green"></progress>
                </div>
                <div className="bg-white py-4 px-4 rounded-2xl flex gap-8 justify-center items-center">
                    <div className="flex flex-col">
                    <p className="text-gray-500 font-semibold">Savings Ratio</p>
                    <h3 className="text-3xl my-1 font-bold">40.8%</h3>
                    </div>
                    <div className="w-15 h-15 border-4 rounded-[50%] mt-3 border-green-500"></div>
                </div>
            </section>
            <section className="flex flex-col bg-white rounded-2xl p-4 justify-between gap-4">
                <div className="flex justify-between">
                <h4 className="font-bold text-lg">Saving Goals</h4>
                <button className="bg-gray-100 pb-1 px-2 rounded-4xl hover:bg-gray-200">+</button>
                </div>
                <div>
                    <div className="flex justify-between">
                        <p>New Car Fund</p>
                        <p className="text-gray-500">$12,000 / $25,000</p>
                    </div>
                    <progress max="100" value="30" className="h-2 w-100 rounded-xl progress-bar-green"></progress>
                </div>
                <div>
                    <div className="flex justify-between">
                        <p>Emegency Fund</p>
                        <p className="text-gray-500">$8,500 / $10,000</p>
                    </div>
                    <progress max="100" value="80" className="h-2 w-100 rounded-xl progress-bar-green"></progress>
                </div>
                <button className="bg-green-600 text-white p-2 py-3 rounded-xl font-bold hover:bg-green-700">+ View All Goals</button>
            </section>
        </main>
    )
}

export default MainPage