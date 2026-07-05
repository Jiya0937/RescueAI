const SPEECH_API = "http://127.0.0.1:8000/api/speech/";

export async function speechToText(audioBlob) {
    const formData = new FormData();
    // We name the file audio.webm so the backend recognizes it correctly
    formData.append("file", audioBlob, "audio.webm");

    const response = await fetch(SPEECH_API, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Speech API Failed");
    }

    const data = await response.json();
    if (!data.success) {
        throw new Error(data.error || "Speech recognition failed");
    }

    return data;
}
