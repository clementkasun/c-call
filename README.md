# 🎯 Video Interview Platform

A modern, real-time video interview platform built with WebRTC, Socket.IO, and Express.js. This application enables seamless video interviews between interviewers and candidates with multiple viewing modes, chat functionality, and screen sharing capabilities.

## ✨ Features

### 🎥 Video Communication
- **Real-time video calls** using WebRTC technology
- **Multiple viewing modes**: Gallery, Speaker, Side-by-Side, Picture-in-Picture, Focus, and Minimize
- **Audio/Video controls**: Mute/unmute microphone, enable/disable camera
- **Screen sharing** capability for presentations or code reviews
- **Responsive design** that works on desktop and mobile devices

### 💬 Chat System
- **Real-time messaging** during video calls
- **File sharing** support for images and documents
- **Emoji picker** for expressive communication
- **Message history** maintained throughout the session

### 👥 Role-Based Access
- **Interviewer role**: Can create and start interview rooms
- **Candidate role**: Can join existing interview rooms
- **Room management** with automatic cleanup after inactivity

### 🔧 Technical Features
- **WebRTC peer-to-peer connections** for low-latency video
- **Socket.IO** for real-time signaling and chat
- **Automatic reconnection** handling
- **STUN server** integration for NAT traversal
- **Responsive UI** with modern glassmorphism design

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with WebRTC support

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd video-interview-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the project structure**
```
video-interview-platform/
├── server.js          # Main server file
├── public/
│   └── index.html     # Frontend application
├── package.json
└── README.md
```

4. **Move the HTML file**
```bash
mkdir public
mv paste.txt public/index.html
```

5. **Install required packages**
```bash
npm install express socket.io
```

### Running the Application

1. **Start the server**
```bash
node server.js
```

2. **Open your browser**
Navigate to `http://localhost:3000`

3. **Start an interview**
   - **Interviewer**: Enter your name and role as "interviewer"
   - **Candidate**: Enter your name and role as "candidate"
   - Both users should use the same room ID (currently hardcoded as 'room123')

## 📁 Project Structure

```
video-interview-platform/
├── server.js                 # Express server with Socket.IO
├── public/
│   └── index.html            # Complete frontend application
├── package.json              # Dependencies and scripts
└── README.md                 # Documentation
```

## 🎮 How to Use

### For Interviewers
1. Enter your name when prompted
2. Select role as "interviewer"
3. Wait for the candidate to join
4. Use the view controls to switch between different layouts
5. Share your screen when needed for presentations
6. Use chat for additional communication

### For Candidates
1. Enter your name when prompted
2. Select role as "candidate"
3. Join the interview room
4. Interact naturally using video, audio, and chat
5. View shared screens from the interviewer

### View Modes
- **📊 Gallery**: Equal-sized video windows
- **🎤 Speaker**: Main speaker with small participant window
- **⬌ Side by Side**: Two equal videos side by side
- **📺 Picture in Picture**: One large video with small overlay
- **👤 Focus Me**: Focus on your own video
- **👥 Focus Them**: Focus on the other participant
- **🔍 Minimize**: Show only one participant

### Controls
- **🎤 Mute/Unmute**: Toggle microphone
- **📹 Camera**: Toggle video feed
- **🖥️ Screen Share**: Share your screen
- **📞 End Call**: Terminate the session

## 🔧 Configuration

### Server Configuration
The server runs on port 3000 by default. To change this:

```javascript
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

### Room Management
- Rooms are automatically created when an interviewer joins
- Automatic cleanup after 5 minutes of inactivity
- Maximum 2 users per room (1 interviewer + 1 candidate)

### WebRTC Configuration
The application uses Google's STUN server for NAT traversal:
```javascript
const peer = new RTCPeerConnection({ 
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] 
});
```

## 🌐 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

**Note**: Requires HTTPS for production deployment (WebRTC requirement)

## 🚀 Deployment

### Development
```bash
npm start
# or
node server.js
```

### Production
1. **Set up HTTPS** (required for WebRTC)
2. **Configure environment variables**
3. **Use a process manager like PM2**
```bash
npm install -g pm2
pm2 start server.js --name "video-interview"
```

### Environment Variables
```bash
PORT=3000
NODE_ENV=production
```

## 🛠️ Customization

### Changing Room ID
Currently hardcoded as 'room123'. To make it dynamic:

```javascript
// In the HTML file, replace:
const roomId = 'room123';

// With:
const roomId = prompt("Enter room ID:") || 'room123';
```

### Styling
The application uses modern CSS with:
- Glassmorphism effects
- Gradient backgrounds
- Smooth animations
- Responsive design

Modify the `<style>` section in `index.html` to customize appearance.

### Adding Features
The modular structure makes it easy to add:
- Recording functionality
- File transfer improvements
- Advanced chat features
- User authentication
- Room persistence

## 🔍 Troubleshooting

### Common Issues

1. **Camera/Microphone Access Denied**
   - Ensure HTTPS in production
   - Check browser permissions
   - Allow microphone/camera access

2. **Connection Issues**
   - Verify both users are in the same room
   - Check network connectivity
   - Ensure WebRTC is supported

3. **No Video/Audio**
   - Check device permissions
   - Verify media devices are available
   - Test with browser dev tools

### Debug Mode
Open browser developer tools and check the console for WebRTC connection logs and errors.

## 📄 API Reference

### Socket Events

#### Client to Server
- `join-room`: Join an interview room
- `offer`: Send WebRTC offer
- `answer`: Send WebRTC answer
- `ice-candidate`: Exchange ICE candidates
- `chat-message`: Send chat message
- `leave-room`: Leave the room

#### Server to Client
- `user-joined`: Another user joined
- `user-left`: User left the room
- `room-full`: Room is at capacity
- `invalid-room`: Invalid room or role
- `chat-message`: Receive chat message

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Ensure all prerequisites are met
4. Test with different browsers/devices

## 🔮 Future Enhancements

- [ ] User authentication system
- [ ] Recording functionality
- [ ] Advanced chat features (typing indicators, read receipts)
- [ ] File sharing improvements
- [ ] Mobile app development
- [ ] Integration with calendar systems
- [ ] Analytics and reporting
- [ ] Multi-language support

---

**Built with ❤️ for seamless video interviews**
