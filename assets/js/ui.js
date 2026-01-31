
// Minimal UI Logic for CatCode Translator
// Auto-generated for MVP

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const input = document.getElementById('catcode-input');
    const output = document.getElementById('english-output');
    const translateBtn = document.getElementById('translate-btn');
    const formatSelect = document.getElementById('format-select');
    const errorDiv = document.getElementById('error');
    
    // Check if elements exist
    if (!input || !output || !translateBtn || !formatSelect || !errorDiv) {
        console.error('❌ Missing required DOM elements');
        return;
    }
    
    // Initialize translator
    let translator = null;
    
    function initializeTranslator() {
        try {
            if (window.CatCodeTranslator) {
                translator = new CatCodeTranslator();
                console.log('✅ CatCode Translator initialized');
                return true;
            } else {
                console.error('❌ CatCodeTranslator class not found');
                return false;
            }
        } catch (error) {
            console.error('❌ Error initializing translator:', error);
            return false;
        }
    }
    
    function translate() {
        try {
            errorDiv.style.display = 'none';
            
            if (!translator) {
                if (!initializeTranslator()) {
                    throw new Error('Failed to initialize translator');
                }
            }
            
            const text = input.value.trim();
            
            if (!text) {
                output.value = '';
                errorDiv.textContent = 'Please enter some CatCode text to translate';
                errorDiv.style.display = 'block';
                return;
            }
            
            // Validate input
            const [isValid, issues] = translator.validateText(text);
            if (!isValid && issues.length > 0) {
                errorDiv.textContent = 'Warning: ' + issues.join('; ');
                errorDiv.style.display = 'block';
                // Continue with translation even if there are warnings
            }
            
            // Perform translation
            const format = formatSelect.value;
            const result = translator.translateDetailed(text, format);
            
            output.value = result.translation;
            
            // Log detailed information (for debugging)
            if (result.patternsUsed.length > 0) {
                console.log('Patterns used:', result.patternsUsed);
                console.log('Coverage:', (result.coverage * 100).toFixed(1) + '%');
            }
            
            if (result.unknownChars.length > 0) {
                console.warn('Unknown characters:', result.unknownChars);
            }
            
        } catch (error) {
            console.error('Translation error:', error);
            errorDiv.textContent = 'Error: ' + error.message;
            errorDiv.style.display = 'block';
            output.value = '';
        }
    }
    
    function clearError() {
        errorDiv.style.display = 'none';
    }
    
    function handleInputChange() {
        clearError();
        // Auto-translate if there's content and translator is ready
        if (input.value.trim() && translator) {
            translate();
        }
    }
    
    // Event listeners
    translateBtn.addEventListener('click', translate);
    formatSelect.addEventListener('change', translate);
    input.addEventListener('input', handleInputChange);
    
    // Auto-translate on Ctrl+Enter
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            translate();
        }
    });
    
    // Clear error when user starts typing
    input.addEventListener('focus', clearError);
    
    // Initialize translator after a short delay to ensure all scripts are loaded
    setTimeout(function() {
        if (!initializeTranslator()) {
            errorDiv.textContent = 'Failed to initialize CatCode translator. Please refresh the page.';
            errorDiv.style.display = 'block';
        } else {
            console.log('🎉 CatCode Translator ready!');
        }
    }, 500);
    
    // Export functions for potential external use
    window.catcodeUI = {
        translate: translate,
        clearError: clearError,
        getTranslator: () => translator
    };
});
