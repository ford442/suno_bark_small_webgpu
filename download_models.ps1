$baseUrl = "https://1ink.us/files/barksmall"
$outputDir = "public/models/bark-small"
$files = @(
    "fine_acoustics_model_quantized.onnx",
    "coarse_acoustics_model_quantized.onnx",
    "semantic_model_quantized.onnx"
)

# Ensure directory exists
if (-not (Test-Path -Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    Write-Host "Created directory: $outputDir"
}

foreach ($file in $files) {
    $url = "$baseUrl/$file"
    $outputPath = "$outputDir/$file"
    
    Write-Host "Downloading $file..."
    Invoke-WebRequest -Uri $url -OutFile $outputPath
    Write-Host "Downloaded to $outputPath"
}

Write-Host "All models downloaded successfully."
