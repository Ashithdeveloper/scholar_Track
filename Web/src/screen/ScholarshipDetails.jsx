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
      <div className="text-center mt-24 text-gray-500 animate-pulse text-lg">
        Loading scholarships...
      </div>
    );

  if (!scholar)
    return (
      <div className="text-center mt-24 text-red-500 font-semibold text-xl">
        Scholarship not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all font-medium"
        >
          ← Back to Scholarships
        </button>
      </div>

      {/* Scholarship Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white p-10 md:p-16">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            {scholar.scholarship_name}
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">
            {scholar["providerName "] || "Unknown Provider"}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <span className="bg-white/20 px-4 py-2 rounded-full font-semibold text-center">
              Prize: {scholar.scholar_prize}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full font-semibold text-center">
              Deadline: {scholar.deadline}
            </span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-8 md:p-12 space-y-12">
          {/** Section Component */}
          {[
            { title: "Description", content: scholar.description },
            { title: "Eligibility Criteria", content: scholar.eligibility_criteria },
            { title: "Benefits", content: scholar.benefits },
          ].map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 border-b-2 border-gray-200 pb-2">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </section>
          ))}

          {/* Required Documents */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 border-b-2 border-gray-200 pb-2">
              Required Documents
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              {scholar.required_documents?.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </section>

          {/* Application Process */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 border-b-2 border-gray-200 pb-2">
              Application Process
            </h2>
            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
              {scholar.application_process_steps?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </section>

          {/* Apply Button */}
          <div className="text-center mt-6">
            <a
              href={scholar.website_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-12 py-4 rounded-3xl font-bold shadow-xl hover:scale-105 transition-transform duration-300"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
