function AnalyticsHeader() {
  return (
    <div className="p-10 ml-5">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, Alex
      </h1>

      <p className="text-gray-500 mt-1">
        Your wealth has grown by{" "}
        <span className="text-green-500 font-semibold">
          +12.4%
        </span>{" "}
        since last month.
      </p>
    </div>
  );
}

export default AnalyticsHeader