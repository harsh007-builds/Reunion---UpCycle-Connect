import { FiArrowRight } from "react-icons/fi";

const ReadyDiff = ({setPage}) => {
  return (
    <section className="py-24 bg-linear-to-b from-green-50 to-white rounded-2xl">
      <div className="flex flex-col items-center text-center px-6">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Ready To Make the Difference?
        </h2>

        <p className="text-gray-600 text-[clamp(1rem,1.2vw,1.25rem)] max-w-3xl mb-10">
          Join the sustainable revolution and start connecting with your local community today.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button onClick={() => setPage("create")} className="flex items-center gap-2 px-7 py-3 rounded-xl bg-linear-to-r from-green-400 to-blue-500 text-white font-light text-lg shadow-md hover:shadow-lg hover:opacity-90 transition">
            Post Your First Listing
            <FiArrowRight />
          </button>

        </div>
      </div>
    </section>
  );
};

export default ReadyDiff;
