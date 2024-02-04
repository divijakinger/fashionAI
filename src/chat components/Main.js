import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Container, Paper, TextField, Button, Card, CardContent, Grid, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';



function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketState, setSocketState] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedGender, setSelectedGender] = useState(''); // New state for selected gender
  const [isMaleButtonActive, setIsMaleButtonActive] = useState(false);
  const [isFemaleButtonActive, setIsFemaleButtonActive] = useState(false);

  useEffect(() => {
    const socket = io('https://46e4-115-112-43-148.ngrok-free.app', {
      extraHeaders: {
        "ngrok-skip-browser-warning": "69420"
      }
    });
    setSocketState(socket); // Set the state variable to the constant socket

    socket.on('connect', () => {
      console.log('Connected to server');
      setIsLoading(false);
    });

    socket.on('llm_chat', (message) => {
      console.log('Received message from server');
      console.log(message);
      const topwear = message.topwear;
      const bottomwear = message.bottomwear;
      const footwear = message.footwear;
      const accessories = message.accessories;
      if (topwear.name !== '' || bottomwear.name !== '' || footwear.name !== '' || accessories.name !== '') {
        const productMessage = `
        <div>
          <p>${message.text}</p>
          </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          
          ${[topwear, bottomwear, footwear, accessories].map((product) => {
            if (product && product.name !== '') {
              return `
                <div class="container" style="display: flex; flex-direction: column; align-items: center;">
                  <img src="${product.img}" alt="${product.name}" style="max-width: 100px; margin-bottom: 10px;" />
                  <div>
                    <p>${product.name}</p>
                    <br/>
                    <p>Price: ₹${product.price}</p>
                    <!-- Add more details as needed -->
                  </div>
                </div>
              `;
            }
            return ''; // Empty string for products that are not present
          }).join('')}
        </div>

      `;
      setMessages([...messages, { text: productMessage, isUser: false }]);
      } else{
        console.error('No product data present in the message:', message);
        setMessages((prevMessages) => [...prevMessages, { text: message.text, isUser: false }]);

      }
      
    });

    return () => {
      socket.disconnect();
    };


  }, []);

  const sendMessage = (message) => {
    // Emit a message to the server
    socketState.emit('llm_chat_bot', message);
    console.log('Sent message to server');
    setMessages((prevMessages) => [...prevMessages, { text: message.text, isUser: true }]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    console.log(message);
    if (message) {
      sendMessage({
        "text": message,
        "gender": selectedGender, 
      });
      setInputValue(''); // Clear the TextField value by updating the state
    }
    
  };
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setIsMaleButtonActive(gender === 'Male');
    setIsFemaleButtonActive(gender === 'Female');
    console.log(selectedGender);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '30px' }}>
        <Paper className='container' elevation={3} style={{ padding: '50px', height: '400px', overflowY: 'auto', backgroundColor: "#F4EAFF" }}>
        {messages.map((message, index) => (
        <Grid container justifyContent={message.isUser ? 'flex-end' : 'flex-start'} key={index}>
        <Grid item xs={12}>
        <Card
        className='container'
        variant="outlined"
        style={{
          maxWidth: '50%',
          color: '#000',
          marginLeft: message.isUser ? 'auto' : '0',
          marginBottom: '10px',
          borderRadius: '0px 0px 0px 0px',
          backgroundColor: '#FFF',
          fontWeight: 'bold',
        }}
      >
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: message.text }} />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
))}

        </Paper>
        <form onSubmit={handleFormSubmit} className='container' style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <TextField
            label="ex: Generate an outfit for a Pool Party"
            variant='filled'
            fullWidth
            style={{ backgroundColor: '#fff' }}
            value={inputValue} // Use the state variable for the value
            onChange={(e) => setInputValue(e.target.value)} // Update the state when the value changes
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
            variant="outlined"
            style={{ marginLeft: '10px', backgroundColor: isMaleButtonActive ? "#000" : "#fff" ,color:isMaleButtonActive? "#fff":"#000"}}
            onClick={() => handleGenderSelect('Male')}
          >
            Male
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: '10px', backgroundColor: isFemaleButtonActive ? "#000" : "#fff" ,color:isFemaleButtonActive? "#fff":"#000"}}
            onClick={() => handleGenderSelect('Female')}
          >
            Female
          </Button>
                  <Button type="submit" variant="contained" style={{ marginLeft: '10px', backgroundColor: "#fff" }}>
                    <SendIcon style={{
                      color: '#000',
                    }} />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
