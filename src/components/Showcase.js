import React from 'react'
import myImg1 from "../Images/img2.jpeg"
import myImg2 from "../Images/img1.jpeg"
import myImg3 from "../Images/img3.jpeg"
function Showcase() {
  return (
    <div style={{display: "grid",gridTemplateColumns: "1fr 1fr 1fr 1fr",gridColumnGap: "1.5rem",padding: "2rem 2rem",}}>
        <div className="container parent2">
            <img src={myImg1 }  style={{borderBottom: "3px solid black"}} className ="img"  alt="" srcset="" />
            <h2>Product 1 </h2>
            <h2>$ 50</h2>
        </div>
        <div className="container parent2">
            <img src={myImg2} style={{borderBottom: "3px solid black"}} className ="img"  alt="" srcset="" />
            <h2>Product 1 </h2>
            <h2>$ 50</h2>        </div>
        <div className="container parent2" style={{backgroundColor:"#fff5eb"}}>
        <h2>Product 1 </h2>
            <h2>$ 50</h2>
            <img src={myImg3} style={{marginTop:"1rem" ,borderTop: "3px solid black"}} className ="img"  alt="" srcset="" />
        </div>
        <div className="container parent2">
            <img src={myImg3} className ="img" style={{borderBottom: "3px solid black"}} alt="" srcset="" />
            <h2>Product 1 </h2>
            <h2>$ 50</h2>
        </div>
    </div>
  )
}

export default Showcase