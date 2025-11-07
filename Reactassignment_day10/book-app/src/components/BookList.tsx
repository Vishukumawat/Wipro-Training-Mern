import React,{useState} from "react";
import BookCard from "./BookCard";

// some books data

const books =[
    { title: "JAVA", author: "Author J", price: 1000 },
  { title: "REACT", author: "Author R", price: 500 },
  { title: "MySQL", author: "Author S", price: 200 },
]

function BookList(){
    const[searchTerm , setSearchTerm]=useState("");
    // filter books
    const filterBooks =books.filter ((book)=>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return(
    <div>
    <input type="text"  placeholder="searchbooks" value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
    <div>
        {filterBooks.map((book,index) => (
        <BookCard
        key={index}
        title={book.title}
        author={book.author}
        price={book.price}
        />

       ))}
    </div>
</div>

);

}
export default BookList;