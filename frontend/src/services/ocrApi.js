const OCR_API = "http://127.0.0.1:8000/api/ocr/";

export async function extractText(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(OCR_API, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("OCR API Failed");
    }

    return await response.json();
}