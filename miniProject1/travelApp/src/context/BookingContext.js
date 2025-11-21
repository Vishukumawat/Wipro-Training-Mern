import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState([]);

  const addBooking = (newBooking) => {
    setBookingData((prev) => [...prev, newBooking]);
  };

  return (
    <BookingContext.Provider value={{ bookingData, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
