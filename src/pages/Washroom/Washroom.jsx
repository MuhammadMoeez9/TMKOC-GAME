import React from "react";

export default function Washroom() {
  return (
    <div className="bg-black p-6 min-h-screen">
      <p className="text-white text-lg mb-6 max-w-xl leading-relaxed">
        You quickly finish your breakfast and get ready for school.
      </p>

      {/* Alex Message */}
      <div className="max-w-xl mb-6 shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border border-white bg-[#007B85] p-4 flex gap-4">
        <img
          src="https://placehold.co/80x80?text=Alex&font=roboto"
          alt="Portrait of a young man with brown hair looking at the camera in natural light"
          className="w-20 h-20 rounded-lg border-2 border-white object-cover flex-shrink-0"
        />
        <p className="text-white font-semibold text-lg leading-snug">
          Alex: Are you ready for
          <br />
          school?
        </p>
      </div>

      {/* Emma Message */}
      <div className="max-w-xl mb-6 shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border border-white bg-[#FA5591] p-4 flex gap-4">
        <img
          src="https://placehold.co/80x80?text=Emma&font=roboto"
          alt="Portrait of a young woman with long brown hair smiling softly at the camera"
          className="w-20 h-20 rounded-lg border-2 border-white object-cover flex-shrink-0"
        />
        <p className="text-white font-semibold text-lg leading-snug">
          Emma: Almost. Just need to
          <br />
          grab my bag.
        </p>
      </div>

      {/* Alex Message */}
      <div className="max-w-xl mb-6 shadow-[4px_4px_4px_rgba(0,0,0,0.5)] rounded-lg border border-white bg-[#1B5E61] p-4 flex gap-4">
        <img
          src="https://placehold.co/80x80?text=Alex&font=roboto"
          alt="Portrait of a young man with brown hair looking at the camera in natural light"
          className="w-20 h-20 rounded-lg border-2 border-white object-cover flex-shrink-0"
        />
        <p className="text-white font-semibold text-lg leading-snug">
          Alex: I hope we don't have too
          <br />
          much homework today
        </p>
      </div>
    </div>
  );
}
