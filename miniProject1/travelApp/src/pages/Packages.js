import React from "react";
import { motion } from "framer-motion";
import PackageCard from "../components/PackageCard";

function Packages() {
  const travelPackages = [
    {
      id: 1,
      title: "Bali Premium Tour",
      description: "5 nights stay · Guided tours · Beach activities",
      image: "/bali.jpg",
      price: "$599"
    },
    {
      id: 2,
      title: "Jaipur Heritage Trip",
      description: "Royal forts · Culture walk · 3 nights stay",
      image: "/jaipur.jpg",
      price: "$349"
    },
    {
      id: 3,
      title: "Maldives Luxury Escape",
      description: "Water villa · All inclusive · Private beach",
      image: "/bali.jpg",
      price: "$999"
    }
  ];

  return (
    <motion.div
      className="container mt-5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: "#0d6efd" }}>
          Travel Packages
        </h2>
        <p className="text-secondary">
          Choose from our handpicked tour packages for your next adventure.
        </p>
      </div>

      <div className="row">
        {travelPackages.map((pkg) => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </div>
    </motion.div>
  );
}

export default Packages;
