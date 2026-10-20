const manuals = [
  {
    id: "smart-tab",
    type: "teclado",
    title: "Teclado Smart TAB",
    icon: "▣",
    pages: "14 páginas",
    description: "Mensagem livre e pré-definida, macros, comando remoto e consulta de status.",
    tags: ["Macros", "Texto livre", "Sensores"],
    source: "Manual - Teclado Smart TAB.pdf",
    accent: "#1598ff",
    alert: "Ao gerar o código de comando remoto, permaneça na tela até concluir a etapa autorizada. Sair da tela invalida a senha gerada.",
    flow: [
      ["Mensagem livre", "Abra Mensagens, digite o texto e confirme o envio. Para mensagem pré-definida, escolha a opção cadastrada."],
      ["Enviar macro", "Abra Macros, selecione a macro desejada, preencha os campos solicitados e confirme."],
      ["Consultar status", "Acesse Configuração > Status para ver comunicação, sensores e atuadores."],
      ["Comando remoto", "Abra Comando Remoto, informe à Central o código exibido e digite somente a senha autorizada."],
    ],
  },
  {
    id: "onixsmart",
    type: "teclado",
    title: "Teclado OnixSmart",
    icon: "⌨",
    pages: "15 páginas",
    description: "Uso do teclado de texto livre, mensagens recebidas e macros pré-configuradas.",
    tags: ["Mensagens", "Macros", "Leitura"],
    source: "Manual Teclado OnixSmart.pdf",
    accent: "#f3275c",
    alert: "Antes de qualquer manutenção no veículo, comunique a central responsável para evitar acionamentos automáticos.",
    flow: [
      ["Iniciar mensagem", "Na tela principal, pressione 1 para escrever uma mensagem."],
      ["Escolher o formato", "Digite o código da macro, se conhecido, ou pressione ENTER para escolher mensagem pré-formatada ou texto livre."],
      ["Editar e confirmar", "Use ALT para alternar letras e números. Ao finalizar, pressione ENTER e escolha Enviar."],
      ["Ler recebidas", "Quando houver aviso sonoro e LED vermelho, pressione 2 para abrir as mensagens recebidas."],
    ],
  },
  {
    id: "omnilink",
    type: "teclado",
    title: "Teclado Alfanumérico Omnilink",
    icon: "⌁",
    pages: "23 páginas",
    description: "Operação do teclado multimídia, mensagens, atalhos e funções de segurança.",
    tags: ["Teclas", "Mensagens", "Atalhos"],
    source: "Teclado Alfanumérico Multimidia Omnilink.pdf",
    accent: "#7357ef",
    alert: "Os atalhos e permissões podem variar conforme a configuração embarcada no veículo.",
    flow: [
      ["Identificar o menu", "Confirme na tela inicial quais funções estão liberadas para o perfil do veículo."],
      ["Selecionar função", "Use as teclas de navegação para abrir mensagens, macros ou status."],
      ["Preencher", "Digite somente os campos solicitados pela macro ou mensagem."],
      ["Confirmar", "Revise as informações no visor antes de concluir o envio."],
    ],
  },
  {
    id: "guia-motorista",
    type: "teclado",
    title: "Guia do Motorista",
    icon: "◫",
    pages: "12 páginas",
    description: "Orientações rápidas para o uso cotidiano do teclado e comunicação com a central.",
    tags: ["Motorista", "Comunicação", "Rotina"],
    source: "teclado novo Guia_motorista.pdf",
    accent: "#15a77d",
    alert: "Use as funções de segurança apenas conforme o procedimento da transportadora e da central.",
    flow: [
      ["Verificar o visor", "Leia os alertas e confirme se o equipamento está comunicando."],
      ["Abrir a função", "Escolha mensagem, macro ou status conforme a necessidade."],
      ["Enviar", "Revise a informação e confirme apenas uma vez."],
      ["Aguardar retorno", "Mantenha o equipamento na tela indicada quando houver validação com a central."],
    ],
  },
  {
    id: "sasmdt",
    type: "teclado",
    title: "SasMDT Sascar",
    icon: "▤",
    pages: "34 páginas",
    description: "Mensagens, sensores, atuadores, geração de senha e sequenciamento de macros.",
    tags: ["Sascar", "Macros", "Status"],
    source: "MANUAL_SASMDT.pdf",
    accent: "#e89b1e",
    alert: "A liberação de segurança exige autorização e seleção correta dos sensores e atuadores aplicáveis.",
    flow: [
      ["Caixa de mensagens", "Abra a caixa para consultar recebidas ou iniciar o envio."],
      ["Status", "Em Home, acesse Sensores e Atuadores para revisar o estado atual."],
      ["Gerar senha", "Use a função prevista e repasse o identificador à central autorizada."],
      ["Macros", "Abra o sequenciamento, selecione a macro e confirme os textos solicitados."],
    ],
  },
  {
    id: "gestao-riscos",
    type: "tecnologia",
    title: "Sistema de Gestão de Riscos",
    icon: "◈",
    pages: "29 páginas",
    description: "Pesquisa de placa, histórico, mensagens, comandos, sensores, atuadores e embarques.",
    tags: ["Placa", "Comandos", "Histórico"],
    source: "Manual do Sistema de Gestão de Riscos.pdf",
    accent: "#1194b8",
    alert: "Comandos de atuação ou inibição devem respeitar o nível de permissão do usuário e o processo de autorização.",
    flow: [
      ["Pesquisar placa", "Use o grid de monitoramento e filtre pela placa disponível no seu grupo ou hierarquia."],
      ["Atalhos da placa", "Clique com o botão direito para abrir telas já filtradas, enviar comando ou mensagem."],
      ["Ver sensores", "Consulte Entradas para verificar sensores habilitados, desabilitados ou violados."],
      ["Ver atuadores", "Consulte Saídas para confirmar o estado de bloqueio, sirene e travas instaladas."],
    ],
  },
  {
    id: "site-gsm",
    type: "tecnologia",
    title: "Site GSM",
    icon: "⌖",
    pages: "49 páginas",
    description: "Navegação do portal GSM, localização, consulta e funções operacionais da tecnologia.",
    tags: ["GSM", "Rastreamento", "Portal"],
    source: "Manual_Site_GSM_v4.pdf",
    accent: "#2e7be7",
    alert: "Os nomes dos menus podem variar conforme a versão e as permissões liberadas para o usuário.",
    flow: [
      ["Localizar o veículo", "Abra a pesquisa do portal e informe a placa ou identificador disponível."],
      ["Conferir comunicação", "Valide a última posição e o horário de comunicação antes de agir."],
      ["Abrir detalhes", "Consulte eventos, histórico e status vinculados ao veículo."],
      ["Executar ação", "Envie comandos somente após confirmar veículo, estado atual e autorização."],
    ],
  },
];

const technologies = [
  { id: "sighra", name: "SIGHRA", summary: "Comando remoto no equipamento e validação na plataforma.", steps: [
    ["Abra Comando Remoto", "No teclado SIGHRA, acesse a função Comando Remoto."],
    ["Anote o identificador", "Mantenha a tela aberta e informe à Central o código exibido."],
    ["Gere a autorização", "Na plataforma autorizada, localize a placa e gere a senha para o comando solicitado."],
    ["Digite e confirme", "Insira a senha recebida no equipamento e confirme sem sair da tela."],
  ]},
  { id: "ravex", name: "RAVEX", summary: "Consulta do código no teclado e geração de contrassenha na plataforma.", steps: [
    ["Acesse a segurança", "No teclado Ravex, abra a opção de desbloqueio ou segurança."],
    ["Obtenha o código", "Leia o código apresentado no equipamento sem divulgar em canais não autorizados."],
    ["Localize a placa", "Na plataforma, pesquise a placa e selecione o equipamento correto."],
    ["Confirme a ação", "Gere a contrassenha autorizada, digite no teclado e valide o retorno."],
  ]},
  { id: "onixsat", name: "ONIXSAT", summary: "Fluxo de segurança pelo teclado e geração na plataforma OnixSat.", steps: [
    ["Abra o menu", "Acesse a função de segurança no teclado OnixSmart."],
    ["Leia a solicitação", "Confirme o identificador e o tipo de liberação solicitado."],
    ["Pesquise o veículo", "Na plataforma, localize a placa e abra a opção de contrassenha."],
    ["Finalize", "Digite o valor autorizado e confirme o estado de bloqueio e sensores."],
  ]},
  { id: "omnilink", name: "OMNILINK", summary: "Liberação a partir do teclado alfanumérico e portal Omnilink.", steps: [
    ["Entre em segurança", "Use o menu do teclado para iniciar o procedimento sem sinal."],
    ["Selecione a função", "Escolha a ação autorizada, como desalarme ou liberação específica."],
    ["Gere no portal", "Localize a placa e gere a autorização correspondente à solicitação."],
    ["Valide o retorno", "Digite no teclado, confirme e confira a mensagem final."],
  ]},
  { id: "sascar-aba", name: "SASCAR · ABA", summary: "Procedimento pela aba Sascar do sistema de atendimento.", steps: [
    ["Identifique o veículo", "Pesquise a placa e confira os dados cadastrais."],
    ["Abra a aba Sascar", "Selecione a ação de liberação disponível para o equipamento."],
    ["Defina o escopo", "Marque somente sensores ou atuadores previstos na autorização."],
    ["Registre e confirme", "Conclua o envio e registre o resultado da operação."],
  ]},
  { id: "sascar-novo", name: "SASCAR · NOVO TABLET", summary: "Liberação pelo novo tablet Sascar com seleção de segurança.", steps: [
    ["Abra Segurança", "No tablet, acesse o menu de segurança ou geração de senha."],
    ["Selecione itens", "Marque sensores e atuadores que precisam ser liberados."],
    ["Gere a senha", "Informe o código à Central e aguarde a senha autorizada."],
    ["Confirme", "Digite no tablet e valide o status apresentado."],
  ]},
  { id: "sascar-tablet", name: "SASCAR · TABLET", summary: "Fluxo no tablet legado Sascar e conferência de retorno.", steps: [
    ["Acesse o menu", "Abra o módulo de segurança do tablet Sascar."],
    ["Confirme o código", "Mantenha a tela e repasse o identificador pelo canal autorizado."],
    ["Escolha a liberação", "Na central, selecione apenas a ação necessária."],
    ["Aplicar e verificar", "Insira a senha e confirme o estado dos itens liberados."],
  ]},
  { id: "hibrido", name: "HÍBRIDO", summary: "Fluxo para equipamentos híbridos com validação de comunicação.", steps: [
    ["Confirme falta de sinal", "Valide a última comunicação e o tipo de equipamento."],
    ["Abra a função local", "No terminal, acesse a geração de código de segurança."],
    ["Gere a resposta", "Na plataforma correta, pesquise a placa e gere a senha autorizada."],
    ["Teste o resultado", "Digite, confirme e valide se o desbloqueio foi efetivado."],
  ]},
  { id: "sascar-teclado", name: "TECLADO SASCAR", summary: "Geração de senha e liberação diretamente no teclado Sascar.", steps: [
    ["Abra Gerar Senha", "No teclado, acesse a função de liberação de segurança."],
    ["Marque o necessário", "Selecione os sensores e atuadores autorizados."],
    ["Troque os códigos", "Repasse o código à Central e receba a resposta pelo canal seguro."],
    ["Finalizar", "Digite a senha e confirme a mensagem de sucesso."],
  ]},
  { id: "positron", name: "POSITRON", summary: "Procedimento sem sinal para equipamento Positron.", steps: [
    ["Identifique o modelo", "Confirme a versão do equipamento e a placa."],
    ["Acesse a liberação", "Abra o menu local de desbloqueio manual."],
    ["Gere a autorização", "Use a plataforma definida para criar a resposta do código."],
    ["Conferir", "Digite, confirme e valide bloqueio, sirene e travas."],
  ]},
  { id: "autotrac", name: "AUTOTRAC", summary: "Fluxo por terminal Autotrac e ferramenta de geração autorizada.", steps: [
    ["Abra a função", "No terminal Autotrac, acesse o procedimento de segurança."],
    ["Colete o código", "Registre o identificador exibido e mantenha a tela."],
    ["Gerar resposta", "Localize o veículo e gere a autorização correspondente."],
    ["Aplicar", "Digite a resposta no terminal e confirme a liberação."],
  ]},
];

const builtInKnowledge = [
  { keys: ["macro", "smart tab"], answer: "No Smart TAB, abra <b>Macros</b>, selecione a macro desejada, preencha os campos solicitados e confirme. Revise o nome da macro antes do envio.", source: "Manual - Teclado Smart TAB" },
  { keys: ["sensor", "atuador", "status"], answer: "No Smart TAB, acesse <b>Configuração > Status</b>. No Sistema de Gestão de Riscos, consulte <b>Entradas</b> para sensores e <b>Saídas</b> para atuadores.", source: "Smart TAB + Sistema de Gestão de Riscos" },
  { keys: ["placa", "pesquisar", "pesquisa"], answer: "No grid de monitoramento, filtre pela placa disponível na sua hierarquia. Ao clicar com o botão direito na placa, você pode abrir telas já filtradas e acessar ações rápidas.", source: "Manual do Sistema de Gestão de Riscos" },
  { keys: ["texto livre", "mensagem"], answer: "Abra a função <b>Mensagens</b>, escolha texto livre, digite e revise antes de confirmar. No OnixSmart, pressione 1 na tela principal e use ALT para alternar letras e números.", source: "Smart TAB + OnixSmart" },
  { keys: ["desbloqueio", "sem sinal", "contrassenha", "senha"], answer: "Primeiro confirme placa, tecnologia, falta de sinal e autorização. No equipamento, abra a função de segurança e mantenha a tela. Gere a resposta apenas na plataforma autorizada e registre o resultado.", source: "Treinamento Central Atualizado" },
];

const pages = [...document.querySelectorAll("[data-page]")];
const routeControls = [...document.querySelectorAll("[data-route]")];
const navLinks = [...document.querySelectorAll(".main-nav [data-route]")];
const splash = document.getElementById("splash");
const menu = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");

function finishSplash() {
  splash?.classList.add("hide");
  window.setTimeout(() => splash?.remove(), 700);
}
document.getElementById("skipIntro")?.addEventListener("click", finishSplash);
window.setTimeout(finishSplash, 4800);

function navigate(route, updateHash = true) {
  const page = document.querySelector(`[data-page="${route}"]`);
  if (!page) return;
  pages.forEach((item) => item.classList.toggle("active", item === page));
  navLinks.forEach((link) => link.classList.toggle("active", link.dataset.route === route));
  menu.classList.remove("mobile-open");
  menuToggle.setAttribute("aria-expanded", "false");
  if (updateHash) history.replaceState(null, "", `#${route}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  const titles = { inicio: "Treinamento Smart", manuais: "Manuais", desbloqueio: "Desbloqueio sem sinal", analista: "Analista Smart", admin: "Área ADM" };
  document.title = `${titles[route] || "Treinamento Smart"} | Smart Risk`;
}
routeControls.forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    navigate(control.dataset.route);
  });
  if (control.matches("article")) control.addEventListener("keydown", (event) => { if (event.key === "Enter") navigate(control.dataset.route); });
});
menuToggle?.addEventListener("click", () => {
  const open = menu.classList.toggle("mobile-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
window.addEventListener("hashchange", () => navigate(location.hash.slice(1) || "inicio", false));

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: .14 });
document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const manualGrid = document.getElementById("manualGrid");
let manualFilter = "todos";
function renderManuals() {
  const term = document.getElementById("manualSearch").value.trim().toLocaleLowerCase("pt-BR");
  const filtered = manuals.filter((manual) => (manualFilter === "todos" || manual.type === manualFilter) && [manual.title, manual.description, ...manual.tags].join(" ").toLocaleLowerCase("pt-BR").includes(term));
  manualGrid.innerHTML = filtered.map((manual) => `
    <article class="manual-card" style="--accent:${manual.accent}">
      <div class="manual-top"><span class="manual-type">${manual.type === "teclado" ? "Manual de teclado" : "Manual de tecnologia"}</span><span class="manual-pages">${manual.pages}</span></div>
      <div class="manual-illustration"><span>${manual.icon}</span></div>
      <h3>${manual.title}</h3><p>${manual.description}</p>
      <div class="manual-tags">${manual.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <button class="manual-open" type="button" data-manual="${manual.id}">Ver guia essencial <span>→</span></button>
    </article>`).join("");
  document.getElementById("manualEmpty").hidden = filtered.length > 0;
  manualGrid.querySelectorAll("[data-manual]").forEach((button) => button.addEventListener("click", () => openManual(button.dataset.manual)));
}
document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
  manualFilter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
  renderManuals();
}));
document.querySelectorAll("[data-manual-filter]").forEach((button) => button.addEventListener("click", () => {
  navigate("manuais"); manualFilter = button.dataset.manualFilter;
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item.dataset.filter === manualFilter));
  renderManuals();
}));
document.getElementById("manualSearch").addEventListener("input", renderManuals);

const manualDialog = document.getElementById("manualDialog");
function openManual(id) {
  const manual = manuals.find((item) => item.id === id);
  if (!manual) return;
  document.getElementById("dialogContent").innerHTML = `<div class="dialog-body" style="--accent:${manual.accent}">
    <span class="manual-type">${manual.type === "teclado" ? "Guia de teclado" : "Guia de tecnologia"}</span>
    <h2>${manual.title}</h2><p>${manual.description}</p>
    <div class="dialog-section"><h3>Fluxo essencial</h3><div class="dialog-flow">${manual.flow.map((step, index) => `<div class="dialog-step"><span>${index + 1}</span><div><b>${step[0]}</b><p>${step[1]}</p></div></div>`).join("")}</div></div>
    <div class="dialog-alert"><b>Atenção:</b> ${manual.alert}</div>
    <div class="dialog-source">Fonte de treinamento: ${manual.source}</div>
  </div>`;
  manualDialog.showModal();
}
manualDialog.querySelector(".dialog-close").addEventListener("click", () => manualDialog.close());
manualDialog.addEventListener("click", (event) => { if (event.target === manualDialog) manualDialog.close(); });

const techList = document.getElementById("techList");
let selectedTech = technologies[0];
let unlockStep = 0;
function renderTechList() {
  techList.innerHTML = technologies.map((tech) => `<button type="button" class="${tech === selectedTech ? "active" : ""}" data-tech="${tech.id}"><span><i></i>${tech.name}</span><b>→</b></button>`).join("");
  techList.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    selectedTech = technologies.find((tech) => tech.id === button.dataset.tech);
    unlockStep = 0; renderUnlock(); renderTechList();
  }));
}
function renderUnlock() {
  document.getElementById("techBadge").textContent = selectedTech.name;
  document.getElementById("techTitle").textContent = `Desbloqueio ${selectedTech.name}`;
  document.getElementById("techSummary").textContent = selectedTech.summary;
  const step = selectedTech.steps[unlockStep];
  document.getElementById("mockMain").textContent = step[0];
  document.getElementById("mockSub").textContent = step[1];
  document.getElementById("unlockSteps").innerHTML = selectedTech.steps.map((item, index) => `<li class="${index === unlockStep ? "active" : index < unlockStep ? "done" : ""}"><span>${index < unlockStep ? "✓" : index + 1}</span><div><b>${item[0]}</b><p>${item[1]}</p></div></li>`).join("");
  document.querySelectorAll(".unlock-progress span").forEach((item, index) => item.classList.toggle("active", index <= unlockStep));
  document.getElementById("prevUnlock").disabled = unlockStep === 0;
  document.getElementById("nextUnlock").innerHTML = unlockStep === 3 ? "Concluir guia <span>✓</span>" : "Próxima etapa <span>→</span>";
}
document.getElementById("nextUnlock").addEventListener("click", () => {
  if (unlockStep < 3) { unlockStep += 1; renderUnlock(); }
  else showToast("Guia concluído. Registre o resultado conforme o procedimento da operação.");
});
document.getElementById("prevUnlock").addEventListener("click", () => { if (unlockStep > 0) { unlockStep -= 1; renderUnlock(); } });

function getCustomKnowledge() { return JSON.parse(localStorage.getItem("smartKnowledge") || "[]"); }
function answerQuestion(question) {
  const normalized = question.toLocaleLowerCase("pt-BR");
  const candidates = [...getCustomKnowledge().map((item) => ({ keys: item.keywords, answer: item.answer, source: `Base ADM · ${item.title}` })), ...builtInKnowledge];
  const ranked = candidates.map((entry) => ({ entry, score: entry.keys.reduce((total, key) => total + (normalized.includes(key.toLocaleLowerCase("pt-BR")) ? 1 : 0), 0) })).sort((a, b) => b.score - a.score);
  if (!ranked[0] || ranked[0].score === 0) return { answer: "Ainda não encontrei essa orientação na base cadastrada. Tente mencionar a tecnologia ou a tarefa, como <b>Smart TAB</b>, <b>macro</b>, <b>placa</b>, <b>sensores</b> ou <b>desbloqueio</b>.", source: "Sem correspondência na base" };
  return ranked[0].entry;
}
const chatMessages = document.getElementById("chatMessages");
function submitQuestion(question) {
  if (!question.trim()) return;
  chatMessages.querySelector(".suggestions")?.remove();
  chatMessages.insertAdjacentHTML("beforeend", `<div class="message user-message"><div><p>${escapeHtml(question)}</p><small>Agora</small></div></div>`);
  const typing = document.createElement("div"); typing.className = "message bot-message"; typing.innerHTML = `<span class="message-avatar">✦</span><div><p>Consultando a base...</p></div>`; chatMessages.appendChild(typing); chatMessages.scrollTop = chatMessages.scrollHeight;
  window.setTimeout(() => {
    const response = answerQuestion(question);
    typing.innerHTML = `<span class="message-avatar">✦</span><div><p>${response.answer}</p><small>Fonte: ${response.source}</small></div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 650);
}
document.getElementById("chatForm").addEventListener("submit", (event) => { event.preventDefault(); const input = document.getElementById("chatInput"); submitQuestion(input.value); input.value = ""; });
document.querySelectorAll(".suggestions button").forEach((button) => button.addEventListener("click", () => submitQuestion(button.textContent)));
document.getElementById("clearChat").addEventListener("click", () => location.reload());
document.getElementById("chatInput").addEventListener("input", (event) => { event.target.style.height = "auto"; event.target.style.height = `${Math.min(event.target.scrollHeight, 110)}px`; });

async function digest(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
const hasAdmin = () => Boolean(localStorage.getItem("smartAdmin"));
function updateAdminMode() {
  document.getElementById("adminHeading").textContent = hasAdmin() ? "Entrar na área ADM" : "Configure seu acesso";
  document.getElementById("adminIntro").textContent = hasAdmin() ? "Use o e-mail e a senha configurados neste navegador." : "Crie o acesso inicial deste protótipo para testar o cadastro da base.";
  document.getElementById("adminSubmitText").textContent = hasAdmin() ? "Entrar" : "Configurar acesso";
}
document.getElementById("adminLoginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("adminEmail").value.trim().toLocaleLowerCase("pt-BR");
  const passwordHash = await digest(document.getElementById("adminPassword").value);
  if (!hasAdmin()) localStorage.setItem("smartAdmin", JSON.stringify({ email, passwordHash }));
  const admin = JSON.parse(localStorage.getItem("smartAdmin"));
  if (admin.email !== email || admin.passwordHash !== passwordHash) { showToast("E-mail ou senha incorretos."); return; }
  document.getElementById("adminLogin").hidden = true;
  document.getElementById("adminDashboard").hidden = false;
  renderKnowledge();
});
document.getElementById("adminLogout").addEventListener("click", () => { document.getElementById("adminDashboard").hidden = true; document.getElementById("adminLogin").hidden = false; document.getElementById("adminLoginForm").reset(); });
document.getElementById("knowledgeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const items = getCustomKnowledge();
  items.unshift({ id: crypto.randomUUID(), title: document.getElementById("knowledgeTitle").value.trim(), category: document.getElementById("knowledgeCategory").value, answer: escapeHtml(document.getElementById("knowledgeAnswer").value.trim()).replaceAll("\n", "<br>"), keywords: document.getElementById("knowledgeKeywords").value.split(",").map((item) => item.trim().toLocaleLowerCase("pt-BR")).filter(Boolean) });
  localStorage.setItem("smartKnowledge", JSON.stringify(items)); event.target.reset(); renderKnowledge(); showToast("Conteúdo adicionado à base local do Analista Smart.");
});
function renderKnowledge() {
  const items = getCustomKnowledge();
  document.getElementById("knowledgeCount").textContent = `${items.length} ${items.length === 1 ? "item" : "itens"}`;
  document.getElementById("knowledgeList").innerHTML = items.length ? items.map((item) => `<div class="knowledge-item"><div><b>${item.title}</b><small>${item.category} · ${item.keywords.join(", ") || "sem palavras-chave"}</small></div><button type="button" data-delete="${item.id}" aria-label="Excluir ${item.title}">×</button></div>`).join("") : `<div class="prototype-warning"><span>i</span>Nenhum conteúdo personalizado foi adicionado ainda.</div>`;
  document.querySelectorAll("[data-delete]").forEach((button) => button.addEventListener("click", () => { localStorage.setItem("smartKnowledge", JSON.stringify(items.filter((item) => item.id !== button.dataset.delete))); renderKnowledge(); }));
}

function escapeHtml(value) { return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }
let toastTimer;
function showToast(message) { const toast = document.getElementById("toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 3200); }
document.getElementById("replayDemo").addEventListener("click", () => { const demo = document.querySelector(".keyboard-demo"); demo.classList.add("paused"); requestAnimationFrame(() => requestAnimationFrame(() => demo.classList.remove("paused"))); });

renderManuals(); renderTechList(); renderUnlock(); updateAdminMode();
const initialRoute = location.hash.slice(1);
if (initialRoute && document.querySelector(`[data-page="${initialRoute}"]`)) navigate(initialRoute, false);
