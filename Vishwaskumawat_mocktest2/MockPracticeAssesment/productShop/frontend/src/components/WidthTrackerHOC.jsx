// question 5

// Reusability Using HOC or Render Props 

import React, { useEffect, useState } from "react";

// Higher Order Component
const withWindowWidth = (WrappedComponent) => {
  return () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <WrappedComponent windowWidth={width} />;
  };
};

export default withWindowWidth;
