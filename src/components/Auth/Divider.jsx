import React from 'react';

const Divider = ({ text = 'OR' }) => {
  return (
    <div className="relative flex items-center justify-center my-6">
      <div className="border-t border-[#E5DDD0] dark:border-[#C8A96A]/20 w-full" />
      <span className="bg-[#FAF6EE] dark:bg-[#1D2C22] px-4 text-[11px] font-semibold text-[#8B9B90] dark:text-[#7A8E81] uppercase tracking-widest font-montserrat shrink-0">
        {text}
      </span>
      <div className="border-t border-[#E5DDD0] dark:border-[#C8A96A]/20 w-full" />
    </div>
  );
};

export default Divider;
