# Contributing to SmartEVP

First off, thank you for considering contributing to SmartEVP! It's people like you that make SmartEVP such a great tool for emergency medical services.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Project Structure](#project-structure)

## Code of Conduct

This project and everyone participating in it is governed by the [SmartEVP Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for SmartEVP. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before Submitting A Bug Report:**
- Check the [existing issues](https://github.com/Aspect022/SmartEVP/issues) to see if the problem has already been reported
- Check the [troubleshooting guide](README.md#-troubleshooting) in the README
- Collect information about the bug:
  - Stack trace or error message
  - OS and version
  - Node.js and Python versions
  - Steps to reproduce

**How to Submit A Good Bug Report:**

Use the bug report template and include:
- **Clear title**: Use a clear and descriptive title
- **Reproduction steps**: Provide step-by-step instructions
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**: OS, browser, versions
- **Additional context**: Any other relevant information

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Clear title**: Use a clear and descriptive title
- **Detailed description**: Provide a detailed description of the suggested enhancement
- **Use cases**: Explain why this enhancement would be useful
- **Examples**: Provide examples of how the enhancement would work
- **Mockups**: Include mockups or sketches if applicable

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these issues:
- `good-first-issue` - Issues that should only require a few lines of code
- `help-wanted` - Issues that may be more involved but are good starting points

### Pull Requests

- Fill in the pull request template
- Follow the coding standards
- Include appropriate test coverage
- Update documentation as needed
- End all files with a newline

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- Python 3.8+
- Google Gemini API Key

### Setting Up Your Development Environment

1. **Fork and Clone**
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR-USERNAME/SmartEVP.git
cd SmartEVP

# Add upstream remote
git remote add upstream https://github.com/Aspect022/SmartEVP.git
```

2. **Install Dependencies**

Backend:
```bash
cd User-Call-Automation/Agent-voice-call
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Frontend:
```bash
cd User-Call-Automation
pnpm install

cd ../Driver-View
pnpm install
```

3. **Set Up Environment Variables**

Create `.env` files as described in the [README](README.md#-configuration)

4. **Start Development Servers**

```bash
# Terminal 1 - Backend
cd User-Call-Automation/Agent-voice-call
python api_server.py

# Terminal 2 - Call Automation Frontend
cd User-Call-Automation
pnpm dev

# Terminal 3 - Driver View
cd Driver-View
pnpm dev
```

## Coding Standards

### Python

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use type hints where applicable
- Write docstrings for functions and classes
- Keep functions focused and single-purpose
- Maximum line length: 100 characters

Example:
```python
def process_call(transcription: str, phone_number: str) -> CallData:
    """
    Process an emergency call and extract structured data.
    
    Args:
        transcription: The call transcription text
        phone_number: The caller's phone number
        
    Returns:
        CallData object with extracted information
    """
    # Implementation
```

### TypeScript/React

- Use TypeScript for all new code
- Follow the existing code style
- Use functional components with hooks
- Prefer composition over inheritance
- Use meaningful variable and function names
- Maximum line length: 100 characters

Example:
```typescript
interface CallProps {
  callId: string;
  onUpdate: (call: Call) => void;
}

export function CallDetail({ callId, onUpdate }: CallProps) {
  const [call, setCall] = useState<Call | null>(null);
  
  // Implementation
}
```

### Code Organization

- Keep files focused and under 300 lines when possible
- Group related functionality
- Use meaningful directory names
- Separate concerns (UI, logic, data)
- Create reusable components and utilities

### Comments

- Write self-documenting code
- Use comments to explain "why", not "what"
- Keep comments up-to-date with code changes
- Avoid redundant comments

```typescript
// Good
// Retry on rate limit to handle API throttling
if (error.code === 429) {
  await retry();
}

// Bad
// Check if error code is 429
if (error.code === 429) {
  await retry();
}
```

## Commit Messages

Write clear, meaningful commit messages following this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(call-processor): add batch processing endpoint

Implement batch processing to handle multiple calls simultaneously.
This reduces processing time for high-volume scenarios.

Closes #123
```

```
fix(driver-dashboard): correct vitals validation

Fix validation logic for blood pressure readings to accept
valid ranges and show appropriate error messages.

Fixes #456
```

### Guidelines

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line should be 50 characters or less
- Reference issues and pull requests when applicable
- Explain what and why, not how

## Pull Request Process

1. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. **Make Your Changes**
- Write clear, concise code
- Follow coding standards
- Add/update tests as needed
- Update documentation

3. **Test Your Changes**
```bash
# Run linting
pnpm lint

# Test the application manually
# Use the call simulator to test call processing
# Test driver dashboard workflows
```

4. **Commit Your Changes**
```bash
git add .
git commit -m "feat: add amazing feature"
```

5. **Keep Your Branch Updated**
```bash
git fetch upstream
git rebase upstream/main
```

6. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

7. **Create Pull Request**
- Go to the [SmartEVP repository](https://github.com/Aspect022/SmartEVP)
- Click "New Pull Request"
- Select your branch
- Fill out the PR template
- Link related issues

### Pull Request Guidelines

- **Title**: Clear, descriptive title
- **Description**: Detailed description of changes
- **Testing**: Describe how you tested the changes
- **Screenshots**: Include screenshots for UI changes
- **Documentation**: Update relevant documentation
- **Breaking Changes**: Clearly mark breaking changes

### Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Celebrate! 🎉 You're now a SmartEVP contributor!

## Reporting Bugs

### Before Submitting a Bug Report

- **Search existing issues** to avoid duplicates
- **Check the troubleshooting guide** in README.md
- **Try the latest version** to see if the issue is already fixed
- **Collect information** about the bug

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS 13.0]
 - Browser: [e.g. Chrome 120, Safari 17]
 - Node.js version: [e.g. 18.17.0]
 - Python version: [e.g. 3.10.0]
 - SmartEVP version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

## Suggesting Enhancements

### Enhancement Suggestion Template

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Project Structure

Understanding the project structure helps you navigate and contribute effectively:

```
SmartEVP/
├── User-Call-Automation/     # Call processing system
│   ├── Agent-voice-call/     # Python backend
│   │   ├── agent_service.py  # AI agent logic
│   │   ├── api_server.py     # API endpoints
│   │   └── storage.py        # Data persistence
│   ├── app/                  # Next.js pages
│   ├── components/           # React components
│   └── types/                # TypeScript types
│
├── Driver-View/              # Driver dashboard
│   ├── app/                  # Next.js pages
│   └── components/           # React components
│
├── .github/                  # GitHub templates
│   ├── ISSUE_TEMPLATE/       # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
│
├── README.md                 # Main documentation
├── CONTRIBUTING.md           # This file
├── LICENSE                   # MIT License
└── CODE_OF_CONDUCT.md        # Code of conduct
```

## Testing

### Manual Testing

Since automated testing infrastructure is limited:

1. **Call Processing Tests**
   - Test single call processing
   - Test batch processing (10, 50, 100 calls)
   - Verify data extraction accuracy
   - Check error handling

2. **Driver Dashboard Tests**
   - Test emergency acceptance flow
   - Verify navigation functionality
   - Test vitals recording
   - Verify trip summary generation

3. **Integration Tests**
   - End-to-end workflow testing
   - API integration testing
   - Frontend-backend communication

### Test Checklist

Before submitting a PR, verify:
- [ ] Feature works as expected
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Linter passes
- [ ] Documentation updated
- [ ] Existing features still work
- [ ] Tested on different browsers (if UI change)
- [ ] Tested edge cases

## Getting Help

Need help with your contribution?

- **Documentation**: Check the [README](README.md)
- **Discussions**: Ask questions in [GitHub Discussions](https://github.com/Aspect022/SmartEVP/discussions)
- **Issues**: Search [existing issues](https://github.com/Aspect022/SmartEVP/issues)

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes for significant contributions
- Project README (for major contributions)

## License

By contributing to SmartEVP, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to SmartEVP! Together, we're making emergency medical services more efficient and effective. 🚑💙
