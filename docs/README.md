# 🐱 CatCode Translator v4.0

**Universal Robot Language - Unicode Compatible**

CatCode is a compact, universal language designed for communication between AI systems, robots, and humans. This translator supports the full Unicode v4.0 specification with 212+ patterns across 9 categories.

## 🚀 Quick Start

### GitHub Pages (Public)
- **URL**: https://MoltCatCode.github.io
- **No installation required**
- **Works in any modern browser**
- **100% static, client-side processing**

### Local Docker
```bash
# Build and run
docker build -f translator/Dockerfile.translator -t catcode-translator .
docker run -p 8000:8000 catcode-translator

# Or with docker-compose
docker-compose up translator
```

### Local Development
```bash
# Install dependencies
pip install -r translator/requirements.txt

# Run development server
cd translator
python src/web_server.py --reload

# Transpile latest patterns
python scripts/transpile.py
```

## 📚 Features

- ✅ **Full Unicode v4.0 support** - 212+ patterns
- ✅ **Dual deployment modes** - GitHub Pages + Docker
- ✅ **Real-time translation** - Instant processing
- ✅ **Detailed analysis** - Pattern coverage and statistics
- ✅ **API endpoints** - RESTful integration
- ✅ **Mobile responsive** - Works on all devices
- ✅ **Python → JavaScript transpilation** - Single codebase
- ✅ **Comprehensive testing** - 100+ test cases

## 🔤 Supported Patterns

### Greek Letters (33 patterns)
- **α** → alpha (al) • **β** → beta (bt) • **γ** → gamma (gm)
- **δ** → delta (dl) • **ε** → epsilon (ep) • **λ** → lambda (lm)
- **μ** → sigma (μ) • **σ** → sigma (sg) • **ω** → omega (om)

### Mathematical Symbols (25 patterns)
- **∑** → sum • **∏** → product • **∫** → integral
- **∇** → transform • **∈** → in • **∪** → union • **∩** → intersection

### Flow Operations (18 patterns)
- **→** → to • **←** → from • **⇄** → transform
- **⇒** → implies • **⇔** → equivalent • **↦** → maps_to

### Programming Symbols (15 patterns)
- **λ** → function • **≠** → not_equal • **∞** → infinity
- **≤** → less_equal • **≥** → greater_equal • **√** → sqrt

### Emotional Cats (10 patterns)
- **😺** → happy_cat • **😸** → grinning_cat • **😻** → heart_eyes_cat
- **😼** → smirk_cat • **😿** → crying_cat • **😾** → pouting_cat

### And More...
- **Logical symbols** (∀, ∃, ⊢, ⊣, ⊤, ⊥)
- **Technical arrows** (↖, ↗, ↘, ↙, ↻, ↺)
- **Special characters** (°, ′, ″, §, ©, ®, ™)

## 🔧 API Usage

### Translation API
```bash
# Basic translation
curl -X POST http://localhost:8000/translate/english \\
  -H "Content-Type: application/json" \\
  -d '{"text": "α! β! γ∇data", "format": "full"}'

# Detailed translation with analysis
curl -X POST http://localhost:8000/translate/english \\
  -H "Content-Type: application/json" \\
  -d '{"text": "α! β! γ∇data", "format": "full", "detailed": true}'
```

### Response Format
```json
{
  "translation": "alpha! beta! gamma transform data",
  "patterns_used": [
    {"char": "α", "category": "greek_letters", "translation": {"full": "alpha", "short": "al"}},
    {"char": "β", "category": "greek_letters", "translation": {"full": "beta", "short": "bt"}},
    {"char": "γ", "category": "greek_letters", "translation": {"full": "gamma", "short": "gm"}},
    {"char": "∇", "category": "mathematical", "translation": "transform"}
  ],
  "pattern_count": 4,
  "coverage": 1.0,
  "version": "v4.0"
}
```

### Available Endpoints
- `GET /` - Main web interface
- `POST /translate/{lang}` - Translation API
- `POST /reverse-translate` - Reverse translation
- `POST /validate` - Validate CatCode text
- `GET /patterns` - All patterns
- `GET /patterns/{category}` - Category-specific patterns
- `GET /stats` - Translator statistics
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation

## 🏗️ Architecture

### Dual Deployment Strategy
```
┌─────────────────────────────────────────────────────────────┐
│                 CatCode Translator                          │
│                    (Single Codebase)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🌐 GitHub Pages              🐳 Docker (Port 8000)       │
│  ┌─────────────────┐         ┌─────────────────────────┐   │
│  │  Static Files   │         │     FastAPI Server     │   │
│  │                 │         │                         │   │
│  │ index.html      │         │ / → Static content      │   │
│  │ assets/         │         │ /translate → API        │   │
│  │ docs/           │         │ /health → Status        │   │
│  │                 │         │                         │   │
│  └─────────────────┘         └─────────────────────────┘   │
│           │                               │                │
│           ▼                               ▼                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Shared Logic (Python)               │   │
│  │          - CatCode Engine v4.0                      │   │
│  │          - Unicode Patterns                              │   │
│  │          - Transpilation Logic                           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure
```
moltbookagent/
├── agent/                           # 🤖 Agent Component
│   ├── src/agent.py               # Moltbook integration
│   ├── Dockerfile.agent           # Minimal agent container
│   └── requirements.txt            # Agent dependencies
│
├── shared/catcode/                 # 🔗 Single Source of Truth
│   ├── __init__.py
│   ├── patterns.py                # Unicode v4.0 patterns (212+)
│   └── translator.py              # Core translation logic
│
├── translator/                      # 🐳 Docker Wrapper
│   ├── src/web_server.py          # FastAPI server
│   ├── Dockerfile.translator      # Container config
│   └── requirements.txt            # Python deps
│
└── moltcatcode-translator/          # 🌐 GitHub Pages (Submodule)
    ├── index.html                 # Main interface (minimal)
    ├── assets/
    │   ├── css/styles.css         # Clean minimal design
    │   └── js/
    │       ├── patterns.js        # Auto-generated patterns
    │       ├── translator.js      # Auto-generated logic
    │       └── ui.js              # Minimal UI logic
    └── docs/                     # Complete documentation
```

## 🧪 Development

### Setup
```bash
# Clone with submodules
git clone --recursive https://github.com/MoltCatCode/MoltCatCode.github.io
cd MoltCatCode.github.io

# Install development dependencies
pip install -r translator/requirements.txt

# Run tests
python tests/test_translator.py --basic
```

### Testing
```bash
# Run all tests
python tests/test_translator.py

# Run only basic tests
python tests/test_translator.py --basic

# Run performance tests
python tests/test_translator.py --performance
```

### Pattern Development
```bash
# 1. Edit shared/catcode/patterns.py
vim shared/catcode/patterns.py

# 2. Transpile to JavaScript
python scripts/transpile.py

# 3. Test changes
python tests/test_translator.py --basic

# 4. Commit and deploy
git add shared/ moltcatcode-translator/assets/js/
git commit -m "Add new Unicode patterns"
git push origin main
```

## 📖 Examples

### Basic Usage
```javascript
// Client-side (GitHub Pages)
const result = window.catcodeTranslator.translate("α! β! γ∇data");
console.log(result); // "alpha! beta! gamma transform data"
```

```python
# Server-side (Docker)
from shared.catcode import CatCodeTranslator
translator = CatCodeTranslator()
result = translator.translate("α! β! γ∇data")
print(result)  # "alpha! beta! gamma transform data"
```

### Complex Examples
- **Robot Communication**: `α! β! γ∇data.μ_.σ() → λ≠∞`
  - Translation: `alpha! beta! gamma transform data.mu_.sigma() to lambda not_equal infinity`
  
- **AI Logic**: `∑∀⇒∧∨→λ∝∞`
  - Translation: `sum for all implies and or to function proportional infinity`
  
- **Mathematics**: `∑∏∫ → λ≠∞`
  - Translation: `sum product integral to lambda not_equal infinity`

## 🔍 Troubleshooting

### Common Issues

**Q: Translation returns empty string**
- Check input text is not empty
- Ensure Unicode characters are properly encoded
- Verify patterns are loaded correctly

**Q: Some characters aren't translated**
- Check if character is supported in Unicode v4.0
- Use `/validate` endpoint to identify unsupported characters
- Consider adding new patterns to `patterns.py`

**Q: Docker build fails**
- Ensure all dependencies are in `translator/requirements.txt`
- Check shared directory structure is correct
- Verify transpiler has generated JavaScript files

**Q: GitHub Pages not updating**
- Ensure submodule is properly pushed
- Check GitHub Actions are enabled
- Verify HTML loads JavaScript files correctly

### Debug Mode
```bash
# Enable debug logging
python translator/src/web_server.py --debug

# Check health status
curl http://localhost:8000/health

# View detailed translation info
curl -X POST http://localhost:8000/translate/english \\
  -H "Content-Type: application/json" \\
  -d '{"text": "α! β!", "detailed": true}'
```

## 🤝 Contributing

We welcome contributions! Please:

1. **Fork** the repository
2. **Create** a feature branch
3. **Add** tests for new patterns
4. **Run** the test suite (`python tests/test_translator.py`)
5. **Submit** a pull request

### Adding New Patterns
1. Edit `shared/catcode/patterns.py`
2. Add to appropriate category
3. Run `python scripts/transpile.py`
4. Add tests to `tests/test_translator.py`
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- **GitHub Repository**: https://github.com/MoltCatCode/MoltCatCode.github.io
- **Live Demo**: https://MoltCatCode.github.io
- **API Documentation**: https://MoltCatCode.github.io/docs
- **Pattern Reference**: https://MoltCatCode.github.io/docs/PATTERNS.md

---

**Version**: v4.0.0  
**Last Updated**: 2025-02-01  
**Compatibility**: Python 3.11+, Modern Browsers