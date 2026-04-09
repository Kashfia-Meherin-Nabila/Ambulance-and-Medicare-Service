import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";

const WhyChooseUs = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from the public folder
    fetch("/data/features.json")
      .then((response) => response.json())
      .then((data) => {
        setFeatures(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  if (loading)
    return (
      <div className="text-center py-20">Loading AmbuSaver Excellence...</div>
    );

  return (
    <section className="py-24 space-y-10 bg-white">
      <div className=" mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold">
          Why Choose{" "}
          <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400 animate-gradient-x">
            AmbuSaver???
          </span>
        </h2>
        <p className="w-[50%] mx-auto text-gray-400 ">
          At AmbuSaver, we redefine emergency response with precision logistics
          and professional medical expertise. Our mission is simple: saving
          lives through 24/7 reliability. Whether it’s a planned transfer or an
          urgent crisis, we are with you—anytime, anywhere.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item) => {
          // Dynamically get the Icon component by its string name
          const Icon = LucideIcons[item.iconName];

          return (
            <div
              key={item.id}
              className="p-8 border border-gray-300 shadow rounded-3xl hover:shadow-xl transition-all"
            >
              <div
                className={`w-12 h-12 ${item.bgColor} ${item.color} rounded-xl flex items-center justify-center mb-4`}
              >
                {Icon ? (
                  <Icon size={24} />
                ) : (
                  <LucideIcons.HelpCircle size={24} />
                )}
              </div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-slate-500 text-sm">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
