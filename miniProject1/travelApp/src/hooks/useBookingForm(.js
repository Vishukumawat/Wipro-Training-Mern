import { useContext } from "react";
import axios from "axios";
import { BookingContext } from "../context/BookingContext";

function useBookingForm() {
  const { addBooking } = useContext(BookingContext);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      // 1️ Add to React Context
      addBooking(values);

      // 2️Save to JSON Server
      await axios.post("http://localhost:5000/bookings", values);

      alert("Booking submitted successfully!");

      resetForm();
    } catch (error) {
      console.error("Booking submit failed:", error);
      alert("Something went wrong! Try again.");
    }
  };

  return { handleFormSubmit };
}

export default useBookingForm;
