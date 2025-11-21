import React from "react";
import DestinationCard from "../components/DestinationCard";

function Home() {
  const destinations = [
    {
      id: 1,
      title: "Bali, Indonesia",
      description: "Experience beaches, temples, and nightlife.",
      image: "/bali.jpg",
      price: "$499"
    },
    {
      id: 2,
      title: "Jaipur, India",
      description: "Royal palaces, forts and rich culture.",
      image: "/jaipur.jpg",
      price: "$299"
    },
    {
      id: 3,
      title: "Maldives",
      description: "Crystal clear water and luxury stays.",
      image: "/bali.jpg",
      price: "$899"
    }
  ];

  return (
    <div className="container mt-5">
      
      {/* Hero Section */}
      <div className="hero-section text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#0d6efd" }}>
          Explore Your Next Destination
        </h1>
        <p className="text-secondary mt-2">
          Find the best travel deals and unforgettable adventures.
        </p>
      </div>

      <h3 className="text-center mb-4 fw-semibold" style={{ color: "#0d6efd" }}>
        Featured Destinations
      </h3>

      <div className="row">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} {...dest} />
        ))}
      </div>
    </div>
  );
}

export default Home;
