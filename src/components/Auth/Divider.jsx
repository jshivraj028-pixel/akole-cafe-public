import React from 'react';

const Divider = ({ text = 'OR' }) => {
  return (
    <div className="relative flex items-center justify-center my-6">
      <div className="border-t border-[#D8E3D2] w-full" />
      <span className="bg-white/80 px-3.5 text-[11px] font-bold text-[#88998C] uppercase tracking-widest font-montserrat shrink-0 rounded-full border border-white">
        {text}
      </span>
      <div className="border-t border-[#D8E3D2] w-full" />
    </div>
  );
};

export default Divider;
