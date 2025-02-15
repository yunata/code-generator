# Javascript Code Generator

## Overview
Javascript Code Generator is a web application that generates HTML code using AI and provides real-time preview functionality. Using OpenAI's GPT models, it can generate HTML code from prompts and instantly show the preview.

## Features
- AI-powered HTML code generation
- Real-time preview of generated code
- Support for multiple GPT models (GPT-3.5 Turbo, GPT-4, GPT-4 Turbo)
- Customizable prompt suffix
- Secure API configuration management

## Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge, etc.)
- OpenAI API key
- Internet connection

## Installation
1. Clone or download the repository:
2. Navigate to the project directory:
3. Either serve the files using a web server or open index.html directly in your browser.

## Usage
1. Configure the following in the "LLM Settings" section on the left:
   - Endpoint URL
   - API key
   - GPT model selection
   - Prompt suffix (if needed)

2. Click "Save" to store your settings

3. Enter your HTML description in the prompt input field

4. Click "Execute" to generate the code

5. The generated code will be automatically previewed
   - Use the "Update Preview" button to refresh the preview if needed

## File Structure
- `index.html` - Main HTML structure
- `style.css` - Application styling
- `script.js` - Application logic

## Security Notes
- Handle API keys with care and never commit them to public repositories
- Generated code is executed safely within an iframe

## Customization
You can customize the prompt suffix to adjust the format and constraints of the generated code. The default setting is:

## Advanced Configuration
The application allows you to:
- Choose between different GPT models
- Customize the endpoint URL
- Modify the default prompt suffix
- Adjust the preview display

## Development
The application is built using vanilla JavaScript, HTML, and CSS, making it easy to modify and extend. The code is structured as follows:

- Frontend UI components in `index.html`
- Styling and layout in `style.css`
- Core functionality and API integration in `script.js`

## Error Handling
The application includes comprehensive error handling for:
- API connection issues
- Invalid input validation
- Preview rendering problems
- Configuration errors

## Best Practices
- Always review generated code before using in production
- Keep your API key secure
- Monitor your API usage and costs
- Test generated code thoroughly

## Known Limitations
- API rate limits may apply
- Preview functionality may not support all HTML features
- Some complex JavaScript interactions may not work in preview mode

## License
This project is released under the MIT License.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Support
If you encounter any issues or have questions, please open an issue in the repository.

## Disclaimer
- API usage may incur charges
- Be aware of API usage limits
- Always review generated code before use