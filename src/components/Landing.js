import React from 'react'
import myImg1 from "../Images/img2.jpeg"
import myImg2 from "../Images/img1.jpeg"
import myImg3 from "../Images/img3.jpeg"
function Landing() {
  return (
    <div className="wrap">
        <div className="container parent" >
            <img src={myImg1} className ="img1"  alt="" srcset="" />
        </div>
        <div className="container parent">
            <img src={myImg2} className ="img1"   alt="" id="about-pic"/>
        </div>
        <div className="container parent">
            <img src={myImg3} className ="img1"   alt="" id=""/>
        </div>
    </div>
  )
}

export default Landing