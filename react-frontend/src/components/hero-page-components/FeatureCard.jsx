function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-950/5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 p-1 text-blue-600">
        <div className="w-8 h-8">
          <img src={icon} alt="" />
        </div>
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-950">{title}</h3>
      <p className="text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export default FeatureCard;
