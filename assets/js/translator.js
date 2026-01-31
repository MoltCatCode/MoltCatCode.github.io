
// CatCode Translator (auto-generated from Python)
// Unicode v4.0 Compatible

class CatCodeTranslator {
    constructor() {
        this.patterns = window.UNICODE_PATTERNS || {};
        this.allPatterns = window.getAllPatterns ? window.getAllPatterns() : {};
        this._compileRegexPatterns();
    }
    
    _compileRegexPatterns() {
        // Pre-compile regex patterns for performance
        this.compiledPatterns = {};
        for (const [category, patterns] of Object.entries(this.patterns)) {
            const patternChars = Object.keys(patterns);
            const escapedChars = patternChars.map(char => this._escapeRegex(char));
            const regexPattern = `(${escapedChars.join('|')})`;
            this.compiledPatterns[category] = new RegExp(regexPattern, 'g');
        }
    }
    
    _escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    translate(text, format = 'full') {
        if (!text) return '';
        
        let result = text;
        
        // Apply patterns in order of categories
        for (const [category, patterns] of Object.entries(this.patterns)) {
            for (const [char, translation] of Object.entries(patterns)) {
                if (result.includes(char)) {
                    // Handle different translation formats
                    let replacement;
                    if (typeof translation === 'object' && translation !== null) {
                        replacement = translation[format] || translation.full || translation.short || char;
                    } else {
                        replacement = translation;
                    }
                    
                    // Replace all occurrences
                    result = result.split(char).join(replacement);
                }
            }
        }
        
        return result;
    }
    
    translateDetailed(text, format = 'full') {
        if (!text) {
            return {
                translation: '',
                patternsUsed: [],
                unknownChars: [],
                patternCount: 0,
                totalChars: 0,
                coverage: 0.0
            };
        }
        
        // Find all patterns in the text
        const patternsUsed = [];
        const unknownChars = [];
        const seenChars = new Set();
        
        for (const char of text) {
            if (seenChars.has(char)) continue;
            seenChars.add(char);
            
            const patternInfo = window.getPatternByChar ? window.getPatternByChar(char) : null;
            if (patternInfo) {
                patternsUsed.push({
                    char: char,
                    category: patternInfo.category,
                    translation: patternInfo.translation
                });
            } else if (!/\s/.test(char) && !/[\x00-\x7F]/.test(char)) {
                unknownChars.push(char);
            }
        }
        
        // Perform translation
        const translation = this.translate(text, format);
        
        // Calculate coverage
        const catcodeChars = [...text].filter(char => !/\s/.test(char) && !/[\x00-\x7F]/.test(char));
        const coverage = catcodeChars.length > 0 ? patternsUsed.length / catcodeChars.length : 1.0;
        
        return {
            translation: translation,
            patternsUsed: patternsUsed,
            unknownChars: unknownChars,
            patternCount: patternsUsed.length,
            totalChars: text.length,
            coverage: coverage,
            version: 'v4.0'
        };
    }
    
    reverseTranslate(text, format = 'full') {
        if (!text) return '';
        
        let result = text.toLowerCase();
        
        // Create reverse lookup dictionary
        const reversePatterns = {};
        for (const [category, patterns] of Object.entries(this.patterns)) {
            for (const [char, translation] of Object.entries(patterns)) {
                let key;
                if (typeof translation === 'object' && translation !== null) {
                    key = translation[format] || translation.full || translation.short || '';
                } else {
                    key = translation;
                }
                
                if (key) {
                    reversePatterns[key.toLowerCase()] = char;
                }
            }
        }
        
        // Replace words with CatCode
        for (const [word, char] of Object.entries(reversePatterns)) {
            // Use word boundaries to avoid partial matches
            const pattern = new RegExp(`\\b${this._escapeRegex(word)}\\b`, 'gi');
            result = result.replace(pattern, char);
        }
        
        return result;
    }
    
    validateText(text) {
        const issues = [];
        
        if (!text) {
            issues.push('Text is empty');
            return [false, issues];
        }
        
        // Check for unknown Unicode characters
        const unknownChars = [];
        for (const char of text) {
            if (!/\s/.test(char) && !/[\x00-\x7F]/.test(char)) {
                const patternInfo = window.getPatternByChar ? window.getPatternByChar(char) : null;
                if (!patternInfo) {
                    unknownChars.push(char);
                }
            }
        }
        
        if (unknownChars.length > 0) {
            const uniqueUnknowns = [...new Set(unknownChars)];
            issues.push(`Unknown Unicode characters: ${uniqueUnknowns.join(', ')}`);
        }
        
        // Check for mixed conventions (optional)
        const hasGreek = Object.keys(this.patterns.greek_letters || {}).some(char => text.includes(char));
        const hasEmotional = Object.keys(this.patterns.emotional || {}).some(char => text.includes(char));
        
        if (hasGreek && hasEmotional) {
            issues.push('Mixed Greek and emotional conventions detected');
        }
        
        return [issues.length === 0, issues];
    }
    
    getStats() {
        const totalPatterns = Object.values(this.patterns).reduce((sum, patterns) => sum + Object.keys(patterns).length, 0);
        
        return {
            totalPatterns: totalPatterns,
            categories: Object.keys(this.patterns),
            patternsPerCategory: Object.fromEntries(
                Object.entries(this.patterns).map(([category, patterns]) => [category, Object.keys(patterns).length])
            ),
            version: 'v4.0',
            supportedFormats: ['full', 'short'],
            features: [
                'translation',
                'reverse_translation',
                'validation',
                'detailed_analysis',
                'pattern_stats'
            ]
        };
    }
    
    getCategoryPatterns(category) {
        return this.patterns[category] || {};
    }
    
    searchPatterns(query, searchType = 'char') {
        const results = [];
        
        for (const [category, patterns] of Object.entries(this.patterns)) {
            for (const [char, translation] of Object.entries(patterns)) {
                let match = false;
                
                if (searchType === 'char' && query.toLowerCase().includes(char.toLowerCase())) {
                    match = true;
                } else if (searchType === 'translation') {
                    const translations = typeof translation === 'object' ? Object.values(translation) : [translation];
                    match = translations.some(t => query.toLowerCase().includes(String(t).toLowerCase()));
                }
                
                if (match) {
                    results.push({
                        char: char,
                        category: category,
                        translation: translation
                    });
                }
            }
        }
        
        return results;
    }
    
    exportPatternsJSON() {
        return JSON.stringify({
            patterns: this.patterns,
            metadata: {
                version: 'v4.0',
                totalPatterns: Object.values(this.patterns).reduce((sum, patterns) => sum + Object.keys(patterns).length, 0),
                categories: Object.keys(this.patterns)
            }
        }, null, 2);
    }
}

// Convenience functions for quick usage
function quickTranslate(text, format = 'full') {
    const translator = new CatCodeTranslator();
    return translator.translate(text, format);
}

function quickValidate(text) {
    const translator = new CatCodeTranslator();
    return translator.validateText(text);
}

function quickReverse(text, format = 'full') {
    const translator = new CatCodeTranslator();
    return translator.reverseTranslate(text, format);
}

// Initialize global translator
let globalTranslator = null;

function getGlobalTranslator() {
    if (!globalTranslator) {
        globalTranslator = new CatCodeTranslator();
    }
    return globalTranslator;
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CatCodeTranslator,
        quickTranslate,
        quickValidate,
        quickReverse,
        getGlobalTranslator
    };
} else {
    window.CatCodeTranslator = CatCodeTranslator;
    window.quickTranslate = quickTranslate;
    window.quickValidate = quickValidate;
    window.quickReverse = quickReverse;
    window.getGlobalTranslator = getGlobalTranslator;
}

// Auto-initialize global translator when patterns are loaded
if (typeof window !== 'undefined' && window.UNICODE_PATTERNS) {
    window.catcodeTranslator = new CatCodeTranslator();
}
