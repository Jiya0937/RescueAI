async function sendChat(message, language = "en") {

    const response = await fetch(
        CONFIG.BASE_URL + CONFIG.CHAT_ENDPOINT,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message,
                language
            })
        }
    );

    if (!response.ok) {
        throw new Error("Unable to connect to RescueAI.");
    }

    return await response.json();
}