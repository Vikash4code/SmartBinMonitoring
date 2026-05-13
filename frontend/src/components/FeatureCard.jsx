const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        {title}
      </h2>

      <p className="text-slate-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;