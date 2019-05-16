window.requestAnimationFrame = window.requestAnimationFrame || function(callback:FrameRequestCallback) { setTimeout(callback, 0); };
