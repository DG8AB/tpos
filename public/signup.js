// signup.js
document.getElementById("signup-form").onsubmit = async function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const number = document.getElementById("number").value.replace(/\D/g, "");
  const msgEl = document.getElementById("signup-msg");
  const btn = document.getElementById("signup-btn");
  msgEl.textContent = "";

  if (!name || name.length < 2) {
    msgEl.textContent = "Enter your full name.";
    return;
  }
  if (!/^[0-9]{10,15}$/.test(number)) {
    msgEl.textContent = "Invalid phone number.";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Processing...";

  // Save user in localStorage
  const user = {name, number};
  localStorage.setItem("c0user", JSON.stringify(user));
  let ok = false;
  let errorMsg = "Signup failed.";
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        ok = true;
      } else {
        errorMsg = data && data.error ? data.error : errorMsg;
      }
    } else {
      errorMsg = "Network/server error.";
    }
  } catch (err) {
    errorMsg = "Network issue. Try again.";
  }
  if (ok) {
    msgEl.textContent = "";
    window.location.href = "/creator.html";
  } else {
    btn.disabled = false;
    btn.textContent = "Sign up & Create your AI";
    msgEl.textContent = errorMsg;
  }
};

window.onload = function() {
  if (localStorage.getItem("c0user")) {
    window.location.href = "/creator.html";
  }
};