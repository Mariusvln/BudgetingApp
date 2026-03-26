function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 p-1">
        <div className="w-8 h-8">
          <img src={icon} alt={icon} />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}

export default FeatureCard;
