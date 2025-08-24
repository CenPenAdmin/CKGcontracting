// Home Renovation Simulator - Custer & Kinney General Contracting LLC

document.addEventListener('DOMContentLoaded', function() {
    initSimulator();
});

let currentImage = null;
let isDeckVisible = false;
let currentColorFilter = 'none';
let colorIntensity = 30;

function initSimulator() {
    initImageUpload();
    initColorTools();
    initDeckTool();
    initActionButtons();
}

// Image upload functionality
function initImageUpload() {
    const uploadArea = document.getElementById('upload-area');
    const imageUpload = document.getElementById('image-upload');
    const previewSection = document.getElementById('preview-section');
    const previewImage = document.getElementById('preview-image');

    // Handle file input change
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(44, 85, 48, 0.1)';
        uploadArea.style.borderColor = 'var(--primary-color)';
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '';
        uploadArea.style.borderColor = '';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.backgroundColor = '';
        uploadArea.style.borderColor = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                imageUpload.files = files;
                handleImageUpload(file);
            } else {
                showError('Please upload an image file (JPG, PNG, etc.)');
            }
        }
    });
}

function handleImageUpload(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please upload an image file (JPG, PNG, etc.)');
        return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showError('Image file is too large. Please choose a file smaller than 10MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        displayUploadedImage(e.target.result);
    };
    reader.onerror = function() {
        showError('Error reading the image file. Please try again.');
    };
    reader.readAsDataURL(file);
}

function displayUploadedImage(imageSrc) {
    const previewSection = document.getElementById('preview-section');
    const previewImage = document.getElementById('preview-image');
    
    currentImage = imageSrc;
    previewImage.src = imageSrc;
    previewSection.style.display = 'grid';
    
    // Reset all effects
    resetAllEffects();
    
    // Scroll to preview section
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Color filter tools
function initColorTools() {
    const colorButtons = document.querySelectorAll('.color-btn');
    const intensitySlider = document.getElementById('color-intensity');
    const intensityValue = document.getElementById('intensity-value');

    // Color button handlers
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            colorButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Apply color filter
            const color = this.dataset.color;
            currentColorFilter = color;
            applyColorFilter(color, colorIntensity);
        });
    });

    // Intensity slider handler
    if (intensitySlider && intensityValue) {
        intensitySlider.addEventListener('input', function() {
            colorIntensity = parseInt(this.value);
            intensityValue.textContent = colorIntensity + '%';
            
            if (currentColorFilter !== 'none') {
                applyColorFilter(currentColorFilter, colorIntensity);
            }
        });
    }
}

function applyColorFilter(color, intensity) {
    const colorOverlay = document.getElementById('color-overlay');
    
    if (!colorOverlay) return;
    
    if (color === 'none') {
        colorOverlay.style.display = 'none';
        return;
    }
    
    // Color mapping
    const colorMap = {
        'blue': '#4A90E2',
        'green': '#7ED321',
        'red': '#D0021B',
        'gray': '#9B9B9B',
        'brown': '#8B4513',
        'cream': '#F5F5DC',
        'white': '#FFFFFF'
    };
    
    const selectedColor = colorMap[color] || '#4A90E2';
    const opacity = intensity / 100 * 0.5; // Max 50% opacity
    
    colorOverlay.style.backgroundColor = selectedColor;
    colorOverlay.style.opacity = opacity;
    colorOverlay.style.display = 'block';
}

// Deck overlay tool
function initDeckTool() {
    const toggleDeckBtn = document.getElementById('toggle-deck');
    
    if (toggleDeckBtn) {
        toggleDeckBtn.addEventListener('click', function() {
            toggleDeck();
        });
    }
}

function toggleDeck() {
    const deckOverlay = document.getElementById('deck-overlay');
    const deckText = document.getElementById('deck-text');
    
    if (!deckOverlay || !deckText) return;
    
    isDeckVisible = !isDeckVisible;
    
    if (isDeckVisible) {
        deckOverlay.style.display = 'block';
        deckText.textContent = 'Remove Deck';
    } else {
        deckOverlay.style.display = 'none';
        deckText.textContent = 'Add Deck';
    }
}

// Action buttons
function initActionButtons() {
    const resetBtn = document.getElementById('reset-changes');
    const saveBtn = document.getElementById('save-simulation');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllEffects);
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveSimulation);
    }
}

function resetAllEffects() {
    // Reset color filter
    currentColorFilter = 'none';
    const colorOverlay = document.getElementById('color-overlay');
    if (colorOverlay) {
        colorOverlay.style.display = 'none';
    }
    
    // Reset deck
    isDeckVisible = false;
    const deckOverlay = document.getElementById('deck-overlay');
    const deckText = document.getElementById('deck-text');
    if (deckOverlay) {
        deckOverlay.style.display = 'none';
    }
    if (deckText) {
        deckText.textContent = 'Add Deck';
    }
    
    // Reset color intensity
    colorIntensity = 30;
    const intensitySlider = document.getElementById('color-intensity');
    const intensityValue = document.getElementById('intensity-value');
    if (intensitySlider) {
        intensitySlider.value = 30;
    }
    if (intensityValue) {
        intensityValue.textContent = '30%';
    }
    
    // Reset active color button
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => btn.classList.remove('active'));
    const originalBtn = document.querySelector('.color-btn[data-color="none"]');
    if (originalBtn) {
        originalBtn.classList.add('active');
    }
}

async function saveSimulation() {
    if (!currentImage) {
        showError('Please upload an image first.');
        return;
    }
    
    const saveBtn = document.getElementById('save-simulation');
    const originalText = saveBtn.innerHTML;
    
    try {
        // Show loading state
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        // Capture the current simulation state
        const canvas = await captureSimulation();
        
        // Convert canvas to blob
        canvas.toBlob(async function(blob) {
            try {
                // Create FormData for upload
                const formData = new FormData();
                formData.append('simulation', blob, 'simulation.png');
                formData.append('color', currentColorFilter);
                formData.append('intensity', colorIntensity);
                formData.append('deck', isDeckVisible);
                
                // Upload to server
                const response = await fetch('php/upload.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showSuccess('Design saved successfully! You can now contact us for an estimate.');
                    
                    // Optionally redirect to contact page after a delay
                    setTimeout(() => {
                        if (confirm('Would you like to contact us now for a free estimate?')) {
                            window.location.href = 'contact.html';
                        }
                    }, 2000);
                } else {
                    throw new Error(result.error || 'Failed to save simulation');
                }
            } catch (error) {
                console.error('Save error:', error);
                showError('Failed to save the design. Please try again.');
            } finally {
                // Reset button state
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }
        }, 'image/png');
        
    } catch (error) {
        console.error('Capture error:', error);
        showError('Failed to capture the design. Please try again.');
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }
}

async function captureSimulation() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Get the preview image
    const previewImage = document.getElementById('preview-image');
    const imageWrapper = previewImage.parentElement;
    
    // Set canvas size to match the displayed image
    const rect = previewImage.getBoundingClientRect();
    canvas.width = previewImage.naturalWidth || rect.width;
    canvas.height = previewImage.naturalHeight || rect.height;
    
    // Draw the base image
    await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve();
        };
        img.src = currentImage;
    });
    
    // Apply color overlay if active
    if (currentColorFilter !== 'none') {
        const colorMap = {
            'blue': '#4A90E2',
            'green': '#7ED321',
            'red': '#D0021B',
            'gray': '#9B9B9B',
            'brown': '#8B4513',
            'cream': '#F5F5DC',
            'white': '#FFFFFF'
        };
        
        const color = colorMap[currentColorFilter];
        if (color) {
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = color;
            ctx.globalAlpha = colorIntensity / 100 * 0.5;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
        }
    }
    
    // Add deck overlay if active
    if (isDeckVisible) {
        await new Promise((resolve) => {
            const deckImg = new Image();
            deckImg.onload = () => {
                ctx.globalAlpha = 0.8;
                ctx.drawImage(deckImg, 0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
                ctx.globalAlpha = 1;
                resolve();
            };
            deckImg.onerror = () => resolve(); // Continue even if deck image fails
            deckImg.src = 'images/deck-overlay.png';
        });
    }
    
    return canvas;
}

// Utility functions
function showError(message) {
    showNotification(message, 'error');
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.simulator-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `simulator-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        background: ${type === 'error' ? '#f8d7da' : '#d4edda'};
        color: ${type === 'error' ? '#721c24' : '#155724'};
        border: 1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'};
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        color: inherit;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Image validation
function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Please upload a valid image file (JPG, PNG, GIF, or WebP).' };
    }
    
    if (file.size > maxSize) {
        return { valid: false, error: 'Image file is too large. Please choose a file smaller than 10MB.' };
    }
    
    return { valid: true };
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Only work when image is loaded
    if (!currentImage) return;
    
    // Ctrl/Cmd + Z for reset
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        resetAllEffects();
    }
    
    // Ctrl/Cmd + S for save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveSimulation();
    }
    
    // Space for toggle deck
    if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        toggleDeck();
    }
});

// Touch/mobile support
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger some action
        } else {
            // Swipe down - could trigger some action
        }
    }
}
