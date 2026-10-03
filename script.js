const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');

inputText.addEventListener('input', () => {
    const text = inputText.value;
    if (text.length === 0) {
        outputText.value = '';
        return;
    }
    
    try {
        // Convert text to UTF-8 byte array and map to Hexadecimal
        const hex = Array.from(new TextEncoder().encode(text))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
            
        outputText.value = hex.toUpperCase();
    } catch (err) {
        outputText.value = 'Error encoding text';
    }
});

// Handle the Copy button click
copyBtn.addEventListener('click', async () => {
    if (!outputText.value) return;
    
    try {
        await navigator.clipboard.writeText(outputText.value);

        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        copyBtn.classList.add('success');

        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.classList.remove('success');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        
        // Fallback for older browsers
        outputText.select();
        try {
            document.execCommand('copy');
            copyBtn.innerText = 'Copied!';
            copyBtn.classList.add('success');
            setTimeout(() => {
                copyBtn.innerText = 'Copy';
                copyBtn.classList.remove('success');
            }, 2000);
        } catch (fallbackErr) {
            alert('Failed to copy. Your browser might not support this feature.');
        }
    }
});