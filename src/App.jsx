import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

function App() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [text, setText] = useState('');

  function handleSubmit() {
    setShowResult(false);
    fetch('https://spam-detector-xkkh.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text })  
    })
      .then(response => response.json())
      .then(data => {
        setResult(data);
        setShowResult(true);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
        setResult({ error: "Something went wrong!" });
        setShowResult(true);
      });
  }

  return (
    <div className='bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen flex items-center justify-center'>
    <div className='max-w-4xl bg-amber-50 mx-auto mt-10 flex flex-col items-center m-6 p-6 rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold text-center'>Text Analyzer</h1>
      <p className='text-center text-gray-500'>Enter your text below to analyze it.</p>

      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '100ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-multiline-static"
          label="Enter Text"
          multiline
          rows={4}
          placeholder="Type your message here..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </Box>

      <Button variant="contained" onClick={handleSubmit}>Analyze</Button>

      {showResult && result && (
        <div className='mt-4 w-full'>
          {result.error ? (
            <Alert severity="error">{result.error}</Alert>
          ) : (
            <Alert severity={result.prediction === "Spam" ? "warning" : "success"}>
              {result.prediction} — Confidence: {result.confidence}
            </Alert>
          )}
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
