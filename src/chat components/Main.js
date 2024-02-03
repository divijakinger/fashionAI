import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Container, Paper, TextField, Button, Card, CardContent, Grid, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';



function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketState, setSocketState] = useState(null); // Rename to avoid conflict
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const socket = io('https://3b67-115-112-43-148.ngrok-free.app', {
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
      // Handle incoming messages from the server
      setMessages((prevMessages) => [...prevMessages, { text: message, isUser: false }]);
    });

    return () => {
      socket.disconnect();
    };


  }, []);

  const sendMessage = (message) => {
    // Emit a message to the server
    socketState.emit('llm_chat_bot', message);
    console.log('Sent message to server');
    setMessages((prevMessages) => [...prevMessages, { text: message, isUser: true }]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const message = inputValue.trim();
    console.log(message);
    if (message) {
      sendMessage(message);
      setInputValue(''); // Clear the TextField value by updating the state
    }
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
                    backgroundColor:  '#FFF' ,
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
