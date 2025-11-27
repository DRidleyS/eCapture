"use client";

import React, { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: React.ReactNode;
  color: string;
  modelId: string;
  link: string;
}

export default function ServiceCard({
  title,
  description,
  color,
  modelId,
  link,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden transition-all duration-500 cursor-pointer ${
        isExpanded ? "" : "aspect-square"
      }`}
      style={{
        backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.1)" : color,
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Collapsed State - Just Title */}
      {!isExpanded && (
        <div className="h-full flex items-center justify-center p-8">
          <h3 className="text-3xl font-bold text-white text-center">{title}</h3>
        </div>
      )}

      {/* Expanded State - Full Content */}
      {isExpanded && (
        <div className="bg-white/10 backdrop-blur-md p-8 h-full overflow-auto">
          <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
          <div className="text-white/80 text-lg mb-6">{description}</div>
          <div
            className="rounded-lg overflow-hidden"
            style={{ height: "480px" }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://my.matterport.com/show/?m=${modelId}`}
              frameBorder="0"
              allowFullScreen
              allow="xr-spatial-tracking"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
