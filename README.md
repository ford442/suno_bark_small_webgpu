# Bark WebGPU React

React + TypeScript application for running Suno Bark TTS models in the browser using WebGPU.

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Download Models**:
   Run the download script to fetch the ONNX models:

   ```bash
   bash download_models.sh
   ```

   *Note: This downloads models to `./public/models/bark-small/`*

   Alternatively, using PowerShell:

   ```powershell
   .\download_models.ps1
   ```

3. **Run Locally**:

   ```bash
   npm run dev
   ```

## Build for Static Hosting

To build for FTP/Static hosting (supports subdirectories):

```bash
npm run build
```

Upload the contents of the `dist/` folder to your FTP server.

**Note**: Large model files located in `public/models/` will be copied to `dist/models/` during build. Ensure your FTP upload includes these files.
