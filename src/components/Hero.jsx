import { FiArrowRight } from "react-icons/fi";

const Hero = ({ setPage }) => {
  return (
    <section className="py-24 bg-linear-to-b from-green-50 to-white rounded-2xl">
      <div className="flex flex-col items-center text-center px-6">
        <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold">
          Turn Waste Into{" "}
          <span className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Opportunity
          </span>
        </h1>

        <p className="text-gray-600 max-w-3xl mb-10">
          UpCycle Connect is a hyper-local platform that transforms waste into valuable resources. Connect sellers and buyers in your community for sustainable material exchange.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setPage("dashboard")}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium text-lg"
          >
            Get Started <FiArrowRight />
          </button>

          <button
            onClick={() => setPage("browse")}
            className="px-7 py-3 rounded-xl bg-white border text-lg"
          >
            Browse Listings
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
