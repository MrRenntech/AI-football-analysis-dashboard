const API_BASE = "http://localhost:8000";

export async function uploadVideo(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
    });

    return res.json();
}

export async function getStatus(taskId: string) {
    const res = await fetch(`${API_BASE}/status/${taskId}`);
    return res.json();
}

export async function getResult(taskId: string) {
    const res = await fetch(`${API_BASE}/result/${taskId}`);
    return res.json();
}
