// creator.js
function checkDG8ABPresence() {
  let found = false;
  if (document.body.innerHTML.toUpperCase().includes('DG8AB')) found = true;
  document.querySelectorAll('a').forEach(a => {
    if (a.href.toUpperCase().includes('DG8AB')) found = true;
    if ((a.textContent||'').toUpperCase().includes('DG8AB')) found = true;
  });
  let nn = document.querySelector('.dg8ab-name');
  if (nn && nn.textContent.toUpperCase().includes('DG8AB')) found = true;
  if (!found) {
    document.getElementById('block-screen').style.display = 'flex';
  }
}
checkDG8ABPresence();

window.onload = function() {
  const u = localStorage.getItem("c0user");
  if (!u) {
    window.location.href = "/index.html";
    return;
  }
};

document.getElementById("theme-select").onchange = function() {
  const url = this.value;
  let link = document.getElementById("theme-css");
  if (!link && url) {
    link = document.createElement("link");
    link.id = "theme-css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link) link.href = url;
};

window.applyCustomCSS = function() {
  const css = document.getElementById("css-custom").value;
  if (css) {
    let styleTag = document.getElementById("user-css");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "user-css";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
  }
};

document.getElementById("chat-btn").onclick = async function() {
  const sysPrompt = document.getElementById("ai-prompt").value || "You are a helpful, creative assistant.";
  const userPrompt = document.getElementById("user-prompt").value;
  if (!userPrompt) return;
  const aiResult = document.getElementById("ai-result");
  aiResult.innerHTML = "<i>Thinking...</i>";
  // Simulate AI call (replace with your API)
  setTimeout(() => {
    aiResult.textContent = `(Fake AI response to: ${JSON.stringify(userPrompt)} — prompt: ${JSON.stringify(sysPrompt)})`;
  }, 1000);
};

window.logout = function() {
  localStorage.removeItem("c0user");
  window.location.href = "/index.html";
};