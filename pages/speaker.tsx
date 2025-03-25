import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Explicitly declare webkitSpeechRecognition to avoid the TypeScript error
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const socket = io("wss://your-amplify-backend-url"); // Replace with your WebSocket backend URL

export default function Speaker() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState(null); // Updated type
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recog = new window.webkitSpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.onresult = (event) => {
        const transcriptText = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(" ");
        setTranscript(transcriptText);
        socket.emit("speech-data", transcriptText);
      };
      setRecognition(recog);
    }

    socket.on("receive-transcript", (data) => {
      setTranscript(data);
    });
  }, []);

  const startSpeaking = () => {
    if (recognition) {
      recognition.start();
      setIsSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    if (recognition) {
      recognition.stop();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-xl font-bold mb-4">Speaker Page</h1>
      <button
        onClick={isSpeaking ? stopSpeaking : startSpeaking}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isSpeaking ? "Stop Speaking" : "Start Speaking"}
      </button>
      <div className="mt-4 p-2 border rounded w-full max-w-md">
        <h2 className="text-lg font-semibold">Transcription:</h2>
        <p className="text-gray-700">{transcript}</p>
      </div>
    </div>
  );
}
