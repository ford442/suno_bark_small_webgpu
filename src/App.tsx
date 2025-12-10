import { useState } from 'react'
import { useBarkTTS } from './hooks/useBarkTTS'
import './index.css'

function App() {
    const [text, setText] = useState('Hello world! This is a test of Bark WebGPU.')
    const { generateAudio, status, isGenerating } = useBarkTTS()

    const handleGenerate = () => {
        generateAudio(text)
    }

    return (
        <div className="container">
            <h1>Bark WebGPU (React)</h1>
            <p>Run locally or host on static FTP (supports subdirectories)</p>

            <div className="card">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    disabled={isGenerating}
                />
                <br />
                <button onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? 'Processing...' : 'Generate Audio'}
                </button>
                <div className="status" style={{ marginTop: '1rem' }}>
                    Status: {status}
                </div>
            </div>
        </div>
    )
}

export default App
