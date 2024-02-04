import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
  return (
    <div className="wrap">
    <div className="container c1">
    <Link to="/Stylist" style={{
                textDecoration: 'none',
            }}>
    <div style={{paddingTop:"1rem"}} className='wrp'>
      <Button variant="outlined"  style={{color:"black", borderColor:"#f7ffeb"}}>Virtual Stylist</Button>
    </div>
    </Link>
    </div>
    <div className="container c2" >
        <div className="grid">
            <Link to="/ChatBot" style={{
                textDecoration: 'none',
            }}>
            <div className="one" style={{paddingBottom:"1rem",paddingTop:"1rem"}}>
                <Button variant="contained" style={{color:"white",backgroundColor:"black"}}>Chat </Button>
            </div>
            </Link>
            <div className="two">
                <p style={{fontWeight: '700', fontSize:"2rem",margin:"0rem",marginTop:"1rem"}}>On Point</p>
            </div>
            <div className="three" style={{paddingBottom:"1rem",paddingTop:"1rem"}} >
                <Button variant="outlined"  style={{color:"black", borderColor:"black"}}>Virtual Try-On</Button>
            </div>
        </div>
    </div>
    <div className="container c3">
    <Link to="/Color" style={{
                textDecoration: 'none',
            }}>
      <div style={{paddingTop:"1rem"}}className='wrp'>

        <Button variant="outlined"  style={{color:"black", borderColor:"#eaf5ff"}}>Create Your Color Palette</Button>
      </div>
      </Link>


    </div>
    </div>
  )
}

export default Navbar