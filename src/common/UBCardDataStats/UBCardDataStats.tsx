import React, { ReactNode } from "react";

interface IUBCardDataStatsProps {
  title: string;
  total: number;
  children: ReactNode;
}

export const UBCardDataStats: React.FC<IUBCardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  // Determine the color class for the rate indicator based on levelUp or levelDown props

  return (
    <div
      className={`rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark`}
      style={{border:"2px solid rgba(255, 196, 3, 0.5)" }}
    >
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default UBCardDataStats;
