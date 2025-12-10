import { useState, useRef } from 'react';
import { pipeline, env } from '@xenova/transformers';

// Configure environment to allow local models from the public folder
env.allowLocalModels = true;
// In Vite with base='./', the public folder contents are at the root in production
// but we need to ensure the path is correct relative to the hosted location.
// pipeline() requests will be relative to the current page URL.
// We'll set the localModelPath to 'models/' which expects a 'models' directory 
// relative to index.html
env.localModelPath = 'models/';

// Define types for the global window object if needed or just use standard TS

export const useBarkTTS = () => {
    const [status, setStatus] = useState<string>('Ready');
    const [isGenerating, setIsGenerating] = useState(false);
    const synthRef = useRef<any>(null);

    const initialize = async () => {
        if (synthRef.current) return;

        setStatus('Loading model... (this may take a while)');
        try {
            // Load the pipeline
            // We use 'bark-small' as the model ID. 
            // The transformers.js library will look for it in env.localModelPath + 'bark-small'
            synthRef.current = await pipeline('text-to-speech', 'bark-small', {
                device: 'webgpu',
                dtype: 'q8', // Quantized for better performance/size
            } as any);
            setStatus('Model loaded');
        } catch (error) {
            console.error('Failed to load model:', error);
            setStatus('Error loading model');
            throw error;
        }
    };

    const generateAudio = async (text: string) => {
        setIsGenerating(true);
        try {
            await initialize(); // Ensure model is loaded

            setStatus('Generating audio...');
            const out = await synthRef.current(text);

            setStatus('Done!');

            // audio_url is typically returned in the output
            // Or we create a blob from the output tensor if needed
            // Xenova pipeline usually returns { audio: Float32Array, sampling_rate: number } 
            // OR for T5-TTS/Bark it might return a URL-like object or specific structure.
            // Let's check the original code: "out.url" was used.

            // Play the audio
            const audio = new Audio(out.url);
            audio.play();

            return out.url;
        } catch (err) {
            console.error('Generation failed:', err);
            setStatus('Error generating audio');
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        generateAudio,
        status,
        isGenerating
    };
};
