import React from "react";


type BookCardprops ={

    title:string;
    author:string;
    price:number;
}

function BookCard({title,author,price}:BookCardprops){
    return (
        <div style={{border:"1px solid black",padding:"10px",margin:"10px" }}>
            <h2>{title}</h2>
            <p>author:{author}</p>
            <p>price: {price}</p>
        </div>

    );

}
export default BookCard;