import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Index() {
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-xl font-bold mb-4">Welcome to the Speech Transcription App</h1>
      <p className="text-gray-700">Choose a role:</p>
      <div className="flex gap-4 mt-4">
        <Link href="/speaker">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Speaker</button>
        </Link>
        <Link href="/audience">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Audience</button>
        </Link>
      </div>
    </div>
  );
}
