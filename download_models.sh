#!/bin/bash
mkdir -p ./public/models/bark-small
wget -O ./public/models/bark-small/fine_acoustics_model_quantized.onnx https://1ink.us/files/barksmall/fine_acoustics_model_quantized.onnx
wget -O ./public/models/bark-small/coarse_acoustics_model_quantized.onnx https://1ink.us/files/barksmall/coarse_acoustics_model_quantized.onnx
wget -O ./public/models/bark-small/semantic_model_quantized.onnx https://1ink.us/files/barksmall/semantic_model_quantized.onnx
