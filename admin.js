const ADMIN_LOGIN = "admin@smartrisk.com.br";
const ADMIN_PASSWORD = "SmartRisk@2026";
const ADMIN_SESSION_KEY = "smartAdminAuthenticatedV4";
const escapeAdminHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

const loginForm = document.getElementById("adminAccessForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("adminAccessEmail").value.trim().toLowerCase();
    const password = document.getElementById("adminAccessPassword").value;
    const valid = email === ADMIN_LOGIN && password === ADMIN_PASSWORD;
    document.getElementById("loginError").hidden = valid;
    if (!valid) return;
    localStorage.setItem(ADMIN_SESSION_KEY, "true");
    window.location.href = "admin.html";
  });
}

if (document.body.hasAttribute("data-admin-page")) {
  if (localStorage.getItem(ADMIN_SESSION_KEY) !== "true") window.location.replace("admin-login.html");

  let toastTimer;
  const showAdminToast = (message) => {
    const toast = document.getElementById("adminToast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  };

  document.getElementById("adminPageLogout").addEventListener("click", () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.href = "admin-login.html";
  });

  const activateAdminPage = (name) => {
    const activeButton = document.querySelector(`[data-admin-page-tab="${name}"]`);
    if (!activeButton) return;
    document.querySelectorAll("[data-admin-page-tab]").forEach((item) => item.classList.toggle("active", item === activeButton));
    document.querySelectorAll("[data-admin-page-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.adminPagePanel === name));
  };
  document.querySelectorAll("[data-admin-page-tab]").forEach((button) => button.addEventListener("click", () => activateAdminPage(button.dataset.adminPageTab)));

  document.getElementById("openCosmoSettings").addEventListener("click", () => activateAdminPage("settings"));
  document.querySelectorAll("[data-settings-tab]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-settings-tab]").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll("[data-settings-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.settingsPanel === button.dataset.settingsTab));
  }));

  document.getElementById("adminKnowledgeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const items = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
    items.unshift({
      id: crypto.randomUUID(),
      title: document.getElementById("adminKnowledgeTitle").value.trim(),
      category: document.getElementById("adminKnowledgeCategory").value,
      answer: document.getElementById("adminKnowledgeAnswer").value.trim(),
      keywords: document.getElementById("adminKnowledgeKeywords").value.split(",").map((item) => item.trim()).filter(Boolean),
    });
    localStorage.setItem("smartKnowledge", JSON.stringify(items));
    event.target.reset();
    showAdminToast("Orientação adicionada ao treinamento do Cosmo.");
  });

  let trainingQuestion = "";
  const trainingMessages = document.getElementById("trainingChatMessages");
  const addTrainingBubble = (text, role) => {
    trainingMessages.insertAdjacentHTML("beforeend", `<div class="training-bubble ${role}">${escapeAdminHtml(text)}</div>`);
    trainingMessages.scrollTop = trainingMessages.scrollHeight;
  };
  const resetTrainingConversation = () => {
    trainingQuestion = "";
    trainingMessages.innerHTML = '<div class="training-bubble bot">Qual pergunta do operador você quer me ensinar a responder?</div>';
    document.getElementById("trainingChatInput").value = "";
  };
  document.getElementById("trainingChatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("trainingChatInput");
    const message = input.value.trim();
    if (!message) return;
    addTrainingBubble(message, "user");
    input.value = "";
    if (!trainingQuestion) {
      trainingQuestion = message;
      addTrainingBubble("Entendi a pergunta. Agora escreva a resposta correta que devo aprender.", "bot");
      return;
    }
    const items = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
    const keywords = trainingQuestion.toLocaleLowerCase("pt-BR").split(/[^a-záàâãéêíóôõúç0-9]+/i).filter((word) => word.length > 3).slice(0, 12);
    items.unshift({ id: crypto.randomUUID(), title: `Conversa: ${trainingQuestion.slice(0, 55)}`, category: "Conversa simulada", question: trainingQuestion, answer: message, keywords });
    localStorage.setItem("smartKnowledge", JSON.stringify(items));
    addTrainingBubble("Aprendi esta resposta. Você pode iniciar outra conversa de treinamento.", "bot");
    trainingQuestion = "";
    showAdminToast("Conversa aprendida pelo Cosmo.");
  });
  document.getElementById("resetTrainingChat").addEventListener("click", resetTrainingConversation);

  const renderAdminFiles = () => {
    const items = JSON.parse(localStorage.getItem("smartPendingFiles") || "[]");
    document.getElementById("adminFilesList").innerHTML = items.map((item) => `<article><b>${escapeAdminHtml(item.name)}</b><small>${escapeAdminHtml(item.status || item.type)}</small></article>`).join("");
  };
  document.getElementById("registerAdminFiles").addEventListener("click", () => {
    const files = [...document.getElementById("adminKnowledgeFiles").files];
    if (!files.length) { showAdminToast("Selecione ao menos um arquivo."); return; }
    const items = JSON.parse(localStorage.getItem("smartPendingFiles") || "[]");
    files.forEach((file) => items.unshift({ id: crypto.randomUUID(), name: file.name, type: file.type || "Arquivo", size: file.size, status: "Registrado para processamento" }));
    localStorage.setItem("smartPendingFiles", JSON.stringify(items));
    document.getElementById("adminKnowledgeFiles").value = "";
    renderAdminFiles();
    showAdminToast(`${files.length} arquivo(s) registrado(s).`);
  });

  const renderAdminManuals = async () => {
    const items = await window.ManualStore.list();
    const target = document.getElementById("adminManualUploadsList");
    target.innerHTML = items.length ? items.sort((a, b) => b.createdAt - a.createdAt).map((item) => `<article><span><b>${escapeAdminHtml(item.title)}</b><small>${escapeAdminHtml(item.technologyName)} · ${item.category === "keyboard" ? "Teclado" : "Tecnologia/software"}</small></span><button type="button" data-delete-manual="${item.id}" aria-label="Excluir ${escapeAdminHtml(item.title)}">Excluir</button></article>`).join("") : `<article><span><b>Nenhum manual adicionado</b><small>Os documentos enviados aparecerão aqui e na biblioteca pública.</small></span></article>`;
    target.querySelectorAll("[data-delete-manual]").forEach((button) => button.addEventListener("click", async () => {
      await window.ManualStore.remove(button.dataset.deleteManual);
      await renderAdminManuals();
      showAdminToast("Manual removido.");
    }));
  };
  document.getElementById("adminManualUploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = document.getElementById("adminManualFile").files[0];
    const technologySelect = document.getElementById("adminManualTechnology");
    const category = document.getElementById("adminManualType").value;
    await window.ManualStore.add({ id: crypto.randomUUID(), technology: technologySelect.value, technologyName: technologySelect.options[technologySelect.selectedIndex].text, category, title: document.getElementById("adminManualName").value.trim(), fileName: file.name, mime: file.type, size: file.size, createdAt: Date.now(), file });
    event.target.reset();
    await renderAdminManuals();
    showAdminToast("Manual adicionado e publicado na biblioteca local.");
  });

  const appendAdminChat = (text, role) => {
    const target = document.getElementById("adminChatMessages");
    target.insertAdjacentHTML("beforeend", `<div class="admin-chat-message ${role}">${role === "bot" ? '<img src="assets/analista-smart-robot.png" alt="" />' : ""}<p>${escapeAdminHtml(text)}</p></div>`);
    target.scrollTop = target.scrollHeight;
  };
  document.getElementById("adminChatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("adminChatInput");
    const question = input.value.trim();
    if (!question) return;
    appendAdminChat(question, "user");
    input.value = "";
    const knowledge = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
    const normalized = question.toLocaleLowerCase("pt-BR");
    const match = knowledge.find((item) => (item.keywords || []).some((key) => normalized.includes(String(key).toLocaleLowerCase("pt-BR"))));
    setTimeout(() => appendAdminChat(match?.answer || "Ainda não há uma resposta cadastrada para essa pergunta. Use a engrenagem para treinar o Cosmo.", "bot"), 250);
  });
  document.getElementById("newAdminChat").addEventListener("click", () => {
    document.getElementById("adminChatMessages").innerHTML = '<div class="admin-chat-message bot"><img src="assets/analista-smart-robot.png" alt="" /><p>Nova conversa iniciada. Como posso ajudar?</p></div>';
  });

  renderAdminFiles();
  renderAdminManuals().catch(() => showAdminToast("Não foi possível carregar os manuais neste navegador."));
}
