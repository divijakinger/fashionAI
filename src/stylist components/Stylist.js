import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import app from '../firebase_setup/firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { Container, Paper, TextField, Button, Card, CardContent, Grid, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../App.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const storage = getStorage();

function Stylist() {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [inputText, setInputText] = useState('');
    const [responseData, setResponseData] = useState(null); // State to store API response data

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (file) {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error('Error uploading file:', error.message);
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                        console.log('File available at', downloadURL);
                    });
                }
            );
        } else {
            console.error('No file selected.');
        }
    };

    const handleTextInputChange = (e) => {
        setInputText(e.target.value);
    };

    async function handleSubmit(event) {
        event.preventDefault(); // Prevents the default form submission behavior
    
        const postData = {
            url: url,
            question: inputText,
        };
    
        try {
            const response = await axios.post('https://f9e2-115-112-43-148.ngrok-free.app/virtual_stylist', postData);
    
            // Handle success by updating the state with the response data
            setResponseData(response.data);
            console.log('Post request successful:', response.data);
        } catch (error) {
            // Handle error
            console.error('Error making post request:', error.message);
        }
    }
    

    return (
        <div className='wrap' style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        }} >
            <Navbar />
            <Paper elevation={3} style={{ padding: '50px', backgroundColor: "#F4EAFF" }}>
                {responseData ? (
                    // Display the API response data
                    <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '10px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    {url && <img src={url} className='container' alt="Uploaded" style={{ maxWidth: '50%', marginBottom: '10px' }} />}
                    <p style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                    }}>Asked Question: {inputText}</p>
                    <h3 style={{
                        fontWeight: 'bolder',
                        fontSize: '30px',
                    }}>Stylist Suggestions</h3>
                    <p style={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                    }}>Suggestions: {responseData.output}</p>
                </div>

                ) : (
                    // Display the file upload and textfield section
                    <div>
    <div style={{ marginBottom: '300px', display: 'flex', justifyContent: 'center' }}>
        <Card variant="outlined" style={{ width: '50%', backgroundColor: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>
            <CardContent>
                <label htmlFor="upload-file" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="upload-file"
                    />
                    <CloudUploadIcon style={{ marginRight: '5px' }} />
                    Upload
                </label>
                <Button onClick={handleUpload} variant="contained" style={{ marginTop: '10px', backgroundColor: "#fff", color: "#000" }}>
                    Upload File
                </Button>
                {url && <p>File Upload successful</p>}
            </CardContent>
        </Card>
    </div>
    <form onSubmit={(event) => handleSubmit(event)} style={{ marginTop: '20px', display: 'flex', alignItems: 'center', width: '100%' }}>
        <TextField
            label="Enter text"
            variant='filled'
            fullWidth
            style={{ backgroundColor: '#fff', width: '100%' }}
            value={inputText}
            onChange={handleTextInputChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <Button type="submit" variant="contained" style={{ marginLeft: '10px', backgroundColor: "#fff" }}>
                            <SendIcon style={{ color: '#000' }} />
                        </Button>
                    </InputAdornment>
                ),
            }}
        />
    </form>
</div>
                )}
            </Paper>
        </div>
    );
}

export default Stylist;
