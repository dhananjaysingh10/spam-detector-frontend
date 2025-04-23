import { useState } from 'react';
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
    fetch('https://spamdet.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setShowResult(true);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setResult({ error: 'Something went wrong!' });
        setShowResult(true);
      });
  }

  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-amber-50 mt-10 flex flex-col items-center p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Text Analyzer</h1>
        <p className="text-center text-gray-500 mb-4">Enter your text below to analyze it.</p>

        <div className="w-full mb-4">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="w-full"
          >
            <TextField
              id="outlined-multiline-static"
              label="Enter Text"
              multiline
              rows={4}
              placeholder="Type your message here..."
              fullWidth
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </Box>
        </div>

        <Button
          variant="contained"
          onClick={handleSubmit}
          className="w-full md:w-auto"
        >
          Analyze
        </Button>

        {showResult && result && (
          <div className="mt-4 w-full">
            {result.error ? (
              <Alert severity="error">{result.error}</Alert>
            ) : (
              <Alert severity={result.prediction === 'Spam' ? 'warning' : 'success'}>
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
