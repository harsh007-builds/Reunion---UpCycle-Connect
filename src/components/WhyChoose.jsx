import { FiRefreshCw, FiUsers, FiTrendingUp, FiShield } from "react-icons/fi";

const features = [
  {
    title: "Sustainable Impact",
    desc: "Reduce waste and carbon footprint by giving materials a second life through local reuse.",
    icon: <FiRefreshCw className="text-green-600" />,
    bg: "bg-green-100",
  },
  {
    title: "Community-Driven",
    desc: "Connect with local businesses, labs, and individuals for hyper-local material exchange.",
    icon: <FiUsers className="text-blue-600" />,
    bg: "bg-blue-100",
  },
  {
    title: "Cost Savings",
    desc: "Save money by sourcing materials locally at reduced costs or for free.",
    icon: <FiTrendingUp className="text-purple-600" />,
    bg: "bg-purple-100",
  },
  {
    title: "Verified Sellers",
    desc: "Trust verified sellers for quality materials from reputable sources.",
    icon: <FiShield className="text-orange-600" />,
    bg: "bg-orange-100",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose UpCycle Connect?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg}`}
              >
                <span className="text-xl">{item.icon}</span>
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
