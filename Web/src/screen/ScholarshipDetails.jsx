import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ScholarshipDetail = ({ scholarships }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholar, setScholar] = useState(null);

  useEffect(() => {
    if (scholarships && scholarships.length > 0) {
      const index = parseInt(id);
      if (!isNaN(index) && scholarships[index]) {
        setScholar(scholarships[index]);
      } else {
        setScholar(null);
      }
    }
  }, [scholarships, id]);

  if (!scholarships || scholarships.length === 0)
    return (
      <div className="text-center mt-16 text-gray-500 animate-pulse">
        Loading scholarships...
      </div>
    );

  if (!scholar)
    return (
      <div className="text-center mt-16 text-red-500 font-semibold">
        Scholarship not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all font-medium"
        >
          ← Back to Scholarships
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white backdrop-blur-md bg-opacity-80 rounded-3xl shadow-2xl border border-gray-200 p-8 lg:p-12">
        {/* Scholarship Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">
            {scholar.scholarship_name}
          </h1>
          <p className="text-lg sm:text-xl font-medium">
            {scholar["providerName "]}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <span className="bg-white/20 px-4 py-2 rounded-full font-semibold text-center">
              Prize: {scholar.scholar_prize}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full font-semibold text-center">
              Deadline: {scholar.deadline}
            </span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Description */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 border-b-2 border-blue-100 pb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {scholar.description}
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 border-b-2 border-green-100 pb-2">
              Eligibility Criteria
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {scholar.eligibility_criteria}
            </p>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 border-b-2 border-yellow-100 pb-2">
              Benefits
            </h2>
            <p className="text-gray-700 leading-relaxed">{scholar.benefits}</p>
          </section>

          {/* Required Documents */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 border-b-2 border-purple-100 pb-2">
              Required Documents
            </h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              {scholar.required_documents?.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </section>

          {/* Application Process */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 border-b-2 border-pink-100 pb-2">
              Application Process Steps
            </h2>
            <ol className="list-decimal ml-6 space-y-1 text-gray-700">
              {scholar.application_process_steps?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </section>

          {/* Apply Button */}
          <div className="text-center mt-8">
            <a
              href={scholar.website_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
