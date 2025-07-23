import React from "react";

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-16">
      {/* Feature Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-2">Eco-Friendly</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Made from 100% recyclable polystyrene with hot-stamp finish.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-2">Easy Installation</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Quick and easy glue-on installation with matching mounting strips.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-2">Sound Absorbing</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Improve your room's acoustics with our sound-absorbing panels.
          </p>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div>
        <h2 className="text-2xl font-semibold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote className="bg-gray-100 p-6 rounded-lg italic text-gray-800 leading-relaxed">
            "The Linerio panels transformed our living room. Easy to install and the quality is outstanding."
            <footer className="mt-4 font-semibold not-italic">- Sarah J.</footer>
          </blockquote>

          <blockquote className="bg-gray-100 p-6 rounded-lg italic text-gray-800 leading-relaxed">
            "Perfect solution for our office space. The acoustic properties make a noticeable difference."
            <footer className="mt-4 font-semibold not-italic">- Michael T., Interior Designer</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Banner;
