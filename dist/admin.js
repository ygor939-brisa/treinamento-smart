const ADMIN_LOGIN = "admin@smartrisk.com.br";
const ADMIN_PASSWORD = "SmartRisk@2026";
const ADMIN_SESSION_KEY = "smartAdminAuthenticatedV4";
const escapeAdminHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
const DEFAULT_COSMO_KNOWLEDGE = [
  { keywords: ["caminhão", "caminhao", "truck"], answer: "Caminhão é um veículo rodoviário projetado principalmente para transportar cargas. Ele pode ter carroceria própria ou trabalhar como cavalo mecânico, tracionando uma carreta ou semirreboque." },
  { keywords: ["logística", "logistica"], answer: "Logística é o planejamento e o controle do fluxo de mercadorias, informações e recursos desde a origem até o destino. Ela envolve coleta, armazenagem, transporte, rastreamento e entrega." },
  { keywords: ["carreta", "semirreboque", "semi reboque"], answer: "Carreta é o conjunto usado no transporte de cargas formado, em geral, por um cavalo mecânico e um semirreboque. O semirreboque não possui tração própria e depende do cavalo mecânico." },
  { keywords: ["cavalo mecânico", "cavalo mecanico"], answer: "Cavalo mecânico é a parte motorizada do conjunto rodoviário. Ele possui cabine e motor e é responsável por tracionar a carreta ou o semirreboque." },
  { keywords: ["rota", "itinerário", "itinerario"], answer: "Rota é o caminho planejado entre a origem e o destino. Na operação logística, ela considera pontos de parada, restrições, horários, riscos e o tempo estimado de chegada." },
  { keywords: ["carga", "embarque", "coleta", "entrega"], answer: "Carga é o conjunto de mercadorias transportadas. O fluxo normalmente passa por coleta, conferência, embarque, transporte, monitoramento, descarga e confirmação da entrega." },
  { keywords: ["rastreamento", "monitoramento"], answer: "Rastreamento acompanha a posição e os eventos do veículo por tecnologias embarcadas. O monitoramento usa essas informações para apoiar a operação, identificar desvios e tratar ocorrências conforme o procedimento autorizado." },
];
const normalizeCosmoText = (value = "") => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

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
    window.location.href = "admin.html#settings";
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
    if (location.hash !== `#${name}`) history.replaceState(null, "", `#${name}`);
  };
  document.querySelectorAll("[data-admin-page-tab]").forEach((button) => button.addEventListener("click", () => activateAdminPage(button.dataset.adminPageTab)));
  const initialAdminPage = location.hash.slice(1);
  if (["library", "cosmo", "settings"].includes(initialAdminPage)) activateAdminPage(initialAdminPage);

  document.getElementById("openCosmoSettings").addEventListener("click", () => activateAdminPage("settings"));
  document.querySelectorAll("[data-settings-tab]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-settings-tab]").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll("[data-settings-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.settingsPanel === button.dataset.settingsTab));
  }));

  const renderCosmoContexts = () => {
    const items = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
    const target = document.getElementById("cosmoContextList");
    target.innerHTML = items.length ? items.map((item) => `<article><span><b>${escapeAdminHtml(item.title || "Contexto do Cosmo")}</b><small>${escapeAdminHtml(item.category || "Orientação")} · ${(item.keywords || []).map(escapeAdminHtml).join(", ") || "sem palavras-chave"}</small></span><button type="button" data-delete-context="${item.id}" aria-label="Excluir ${escapeAdminHtml(item.title || "contexto")}">Excluir</button></article>`).join("") : `<article><span><b>Nenhum contexto adicional</b><small>Orientações e conversas salvas aparecerão aqui.</small></span></article>`;
    target.querySelectorAll("[data-delete-context]").forEach((button) => button.addEventListener("click", () => {
      const next = items.filter((item) => item.id !== button.dataset.deleteContext);
      localStorage.setItem("smartKnowledge", JSON.stringify(next));
      const conversations = JSON.parse(localStorage.getItem("smartSavedCosmoConversations") || "[]").filter((item) => item.id !== button.dataset.deleteContext);
      localStorage.setItem("smartSavedCosmoConversations", JSON.stringify(conversations));
      renderCosmoContexts();
      showAdminToast("Contexto removido do Cosmo.");
    }));
  };

  const renderAdminFiles = () => {
    const items = JSON.parse(localStorage.getItem("smartPendingFiles") || "[]");
    const target = document.getElementById("adminFilesList");
    target.innerHTML = items.length ? items.map((item) => `<article><span><b>${escapeAdminHtml(item.name)}</b><small>${escapeAdminHtml(item.status || item.type)}</small></span><button type="button" data-delete-file="${item.id}" aria-label="Excluir ${escapeAdminHtml(item.name)}">Excluir</button></article>`).join("") : `<article><span><b>Nenhum arquivo do Cosmo</b><small>Os arquivos registrados aparecerão aqui.</small></span></article>`;
    target.querySelectorAll("[data-delete-file]").forEach((button) => button.addEventListener("click", () => {
      localStorage.setItem("smartPendingFiles", JSON.stringify(items.filter((item) => item.id !== button.dataset.deleteFile)));
      renderAdminFiles();
      showAdminToast("Arquivo removido do Cosmo.");
    }));
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
    const categoryLabels = { keyboard: "Manual do teclado", technology: "Tecnologia/software", driver: "PDF para o motorista" };
    target.innerHTML = items.length ? items.sort((a, b) => b.createdAt - a.createdAt).map((item) => `<article><span><b>${escapeAdminHtml(item.title)}</b><small>${escapeAdminHtml(item.technologyName)} · ${categoryLabels[item.category] || "Documento"}</small></span><button type="button" data-delete-manual="${item.id}" aria-label="Excluir ${escapeAdminHtml(item.title)}">Excluir</button></article>`).join("") : `<article><span><b>Nenhum manual adicionado</b><small>Os documentos enviados aparecerão aqui e na biblioteca pública.</small></span></article>`;
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

  let adminConversation = [];
  const appendAdminChat = (text, role) => {
    const target = document.getElementById("adminChatMessages");
    target.insertAdjacentHTML("beforeend", `<div class="admin-chat-message ${role}">${role === "bot" ? '<img src="assets/analista-smart-robot.png" alt="" />' : ""}<p>${escapeAdminHtml(text)}</p></div>`);
    adminConversation.push({ role: role === "bot" ? "assistant" : "user", text: String(text) });
    target.scrollTop = target.scrollHeight;
  };
  document.getElementById("adminChatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("adminChatInput");
    const question = input.value.trim();
    if (!question) return;
    appendAdminChat(question, "user");
    input.value = "";
    const custom = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
    const choices = [...custom, ...DEFAULT_COSMO_KNOWLEDGE];
    const normalized = normalizeCosmoText(question);
    const ranked = choices.map((item) => ({ item, score: (item.keywords || []).reduce((total, key) => total + (normalized.includes(normalizeCosmoText(key)) ? 1 : 0), 0) })).sort((a, b) => b.score - a.score);
    const match = ranked[0]?.score ? ranked[0].item : null;
    setTimeout(() => appendAdminChat(match?.answer || "Ainda não encontrei essa informação na base. Tente usar outras palavras ou salve uma conversa com a orientação correta.", "bot"), 250);
  });
  document.getElementById("adminChatInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      document.getElementById("adminChatForm").requestSubmit();
    }
  });
  document.getElementById("newAdminChat").addEventListener("click", () => {
    adminConversation = [];
    document.getElementById("adminChatMessages").innerHTML = '<div class="admin-chat-message bot"><img src="assets/analista-smart-robot.png" alt="" /><p>Nova conversa iniciada. Como posso ajudar?</p></div>';
  });
  document.getElementById("saveAdminChat").addEventListener("click", () => {
    const question = [...adminConversation].reverse().find((message) => message.role === "user")?.text;
    const answer = [...adminConversation].reverse().find((message) => message.role === "assistant")?.text;
    if (!question || !answer) { showAdminToast("Converse com o Cosmo antes de salvar."); return; }
    const id = crypto.randomUUID();
    const saved = JSON.parse(localStorage.getItem("smartSavedCosmoConversations") || "[]");
    saved.unshift({ id, title: question.slice(0, 70), createdAt: Date.now(), messages: adminConversation.slice() });
    localStorage.setItem("smartSavedCosmoConversations", JSON.stringify(saved));
    const knowledge = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
    const keywords = question.toLocaleLowerCase("pt-BR").split(/[^a-záàâãéêíóôõúç0-9]+/i).filter((word) => word.length > 3).slice(0, 14);
    knowledge.unshift({ id, title: `Conversa salva: ${question.slice(0, 55)}`, category: "Conversa do administrador", question, answer, keywords });
    localStorage.setItem("smartKnowledge", JSON.stringify(knowledge));
    renderCosmoContexts();
    showAdminToast("Conversa salva no contexto do Cosmo.");
  });

  renderAdminFiles();
  renderCosmoContexts();
  renderAdminManuals().catch(() => showAdminToast("Não foi possível carregar os manuais neste navegador."));
}
