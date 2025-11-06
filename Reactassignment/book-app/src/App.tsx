import React from "react";
import BookList from "./components/BookList";


function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Featured Books</h1>
      <BookList />
    </div>
  );
}

export default App;