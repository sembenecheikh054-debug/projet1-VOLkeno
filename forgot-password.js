async function forgotPassword() {
    const email   = document.getElementById("email").value;
    const message = document.getElementById("message");

    if (!email) {
        message.textContent = "Entre ton email";
        message.className = "text-red-500 text-sm";
        return;
    }

    const res = await request("/auth/forgot-password", "POST", { email });

    message.textContent = res.message;
    message.className = res.message.includes("✅")
        ? "text-green-500 text-sm"
        : "text-red-500 text-sm";
}