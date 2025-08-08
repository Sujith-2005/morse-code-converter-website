# Morse Code Converter

A beautiful, modern web application that converts text to Morse code and vice versa. Built with HTML, CSS, and JavaScript, featuring a responsive design and advanced functionality.

## 🌟 Features

### Core Functionality
- **Text to Morse Code**: Convert any text (letters, numbers, punctuation) to Morse code
- **Morse Code to Text**: Convert Morse code back to readable text
- **Real-time Conversion**: Instant conversion with visual feedback
- **Copy to Clipboard**: One-click copying of converted results

### Advanced Features
- **Audio Playback**: Listen to your Morse code with realistic beep sounds
- **Morse Code Reference**: Complete reference guide for all characters
- **Conversion History**: Track your recent conversions with timestamps
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### User Experience
- **Modern UI**: Beautiful gradient design with smooth animations
- **Keyboard Shortcuts**: Use Ctrl+Enter for quick conversions
- **Auto-resize Textareas**: Dynamic textarea sizing for better usability
- **Notifications**: Helpful feedback messages for all actions
- **Local Storage**: History is saved locally in your browser

## 🚀 How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The application will load with a welcome message
3. Start converting text or Morse code immediately

### Text to Morse Code
1. Type or paste text in the "Text Input" field
2. Click "Convert to Morse" or press Ctrl+Enter
3. View the Morse code result in the output area
4. Use the "Copy" button to copy the result
5. Click "Play Morse Code" to hear the audio

### Morse Code to Text
1. Enter Morse code in the "Morse Code Input" field
2. Use dots (.) for short signals and dashes (-) for long signals
3. Separate letters with spaces
4. Separate words with forward slashes (/)
5. Click "Convert to Text" or press Ctrl+Enter
6. View the decoded text in the output area

### Example Morse Code Format
```
HELLO WORLD
```
Becomes:
```
.... . .-.. .-.. --- / .-- --- .-. .-.. -..
```

## 🎵 Audio Features

The application includes realistic Morse code audio playback:
- **Dot Duration**: 0.1 seconds
- **Dash Duration**: 0.3 seconds
- **Letter Gap**: 0.3 seconds
- **Word Gap**: 0.7 seconds
- **Frequency**: 800 Hz sine wave

## 📚 Morse Code Reference

The application includes a complete reference for:
- **Letters**: A-Z (26 characters)
- **Numbers**: 0-9 (10 characters)
- **Punctuation**: 16 common punctuation marks

Access the reference by clicking "Show Reference" in the features section.

## 💾 History Feature

- **Automatic Tracking**: All conversions are automatically saved
- **Persistent Storage**: History is saved in your browser's local storage
- **50 Item Limit**: Keeps the last 50 conversions for performance
- **Clear History**: Option to clear all history at once

## ⌨️ Keyboard Shortcuts

- **Ctrl+Enter**: Convert text to Morse code (when in text input)
- **Ctrl+Enter**: Convert Morse code to text (when in Morse input)
- **Escape**: Close any open modals

## 🎨 Design Features

- **Responsive Layout**: Adapts to any screen size
- **Modern Gradients**: Beautiful purple-blue gradient theme
- **Smooth Animations**: Hover effects and transitions
- **Font Awesome Icons**: Professional iconography
- **Google Fonts**: Clean, readable Inter font family

## 🔧 Technical Details

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Web Audio API**: Required for audio playback
- **Local Storage**: Required for history feature
- **Clipboard API**: Modern browsers support copy functionality

### File Structure
```
morse-code-converter/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

### Dependencies
- **Font Awesome 6.0.0**: For icons
- **Google Fonts (Inter)**: For typography
- **Web Audio API**: For Morse code audio playback

## 🚀 Installation

1. **Download**: Clone or download the project files
2. **Extract**: Unzip the files to a folder
3. **Open**: Double-click `index.html` or open it in your browser
4. **Enjoy**: Start converting text and Morse code!

No server setup required - this is a pure client-side application.

## 🎯 Use Cases

- **Learning Morse Code**: Practice encoding and decoding
- **Amateur Radio**: Quick reference and practice tool
- **Educational Purposes**: Teaching Morse code in classrooms
- **Emergency Communication**: Quick text-to-Morse conversion
- **Fun and Games**: Morse code challenges and puzzles

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the design
- Adding more Morse code patterns
- Enhancing accessibility

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Samuel Morse**: For inventing the Morse code system
- **Font Awesome**: For the beautiful icons
- **Google Fonts**: For the Inter font family
- **Web Audio API**: For enabling audio playback

---

**Happy Coding!** 🎉 