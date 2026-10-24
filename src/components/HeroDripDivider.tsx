import React from 'react';

interface HeroDripDividerProps {
  color?: string;
  className?: string;
}

export const HeroDripDivider: React.FC<HeroDripDividerProps> = ({
  color = '#7A2500',
  className = ''
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none relative -mb-1 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-[120px] sm:h-[150px] md:h-[160px] block"
        preserveAspectRatio="none"
      >
        {/* Main continuous dripping sheet */}
        <path
          d="M0,0 L1440,0 L1440,30 
             C1420,30 1410,45 1400,60 C1390,75 1375,80 1365,65 C1355,50 1345,35 1330,35
             C1315,35 1305,55 1295,95 C1290,115 1275,120 1265,100 C1255,80 1245,45 1230,45
             C1215,45 1205,70 1195,110 C1190,130 1175,135 1165,110 C1155,85 1145,50 1130,50
             C1115,50 1105,75 1095,125 C1090,150 1070,152 1060,125 C1050,95 1040,40 1020,40
             C1000,40 990,65 980,85 C970,105 955,100 945,80 C935,60 925,35 905,35
             C885,35 875,60 865,105 C860,130 840,135 830,105 C820,75 810,45 790,45
             C770,45 760,75 750,130 C745,155 725,158 715,130 C705,95 695,40 675,40
             C655,40 645,65 635,95 C625,120 610,120 600,95 C590,70 580,35 560,35
             C540,35 530,60 520,110 C515,135 495,140 485,110 C475,80 465,45 445,45
             C425,45 415,75 405,135 C400,160 380,160 370,130 C360,95 350,50 330,50
             C310,50 300,75 290,115 C285,135 270,138 260,115 C250,90 240,40 220,40
             C200,40 190,65 180,95 C170,120 155,120 145,95 C135,70 125,35 105,35
             C85,35 75,60 65,110 C60,135 45,138 35,110 C25,80 15,40 0,40 Z"
          fill={color}
        />

        {/* Separated hanging drops for authentic melting creamery effect */}
        <ellipse cx="385" cy="158" rx="4.5" ry="5.5" fill={color} />
        <ellipse cx="732" cy="156" rx="5" ry="6" fill={color} />
        <ellipse cx="1075" cy="154" rx="4.5" ry="5.5" fill={color} />
        <ellipse cx="1178" cy="140" rx="3.5" ry="4.5" fill={color} />
        <ellipse cx="845" cy="142" rx="4" ry="5" fill={color} />
        <ellipse cx="502" cy="145" rx="3.5" ry="4.5" fill={color} />
        <ellipse cx="52" cy="144" rx="3.5" ry="4.5" fill={color} />
      </svg>
    </div>
  );
};
