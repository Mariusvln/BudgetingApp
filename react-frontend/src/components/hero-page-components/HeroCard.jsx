function HeroCard({ icon, title, description }) {
  return (
    <div className="w-[260px] rounded-2xl border border-blue-100 bg-white/95 p-5 text-left shadow-xl shadow-blue-950/10 backdrop-blur xl:w-[312px] xl:p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 p-1 text-blue-600">
        <div className="w-8 h-8">
          <img src={icon} alt="" />
        </div>
      </div>
      <h2 className="font-bold text-slate-950">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}

export default HeroCard;
