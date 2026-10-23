const icon = (name, className = "") => `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const handSvg = (id) => `<svg class="touch-hand" id="${id}" viewBox="0 0 92 108" aria-hidden="true"><path d="M38 76V29c0-8 12-8 12 0v22-11c0-8 12-8 12 0v13-8c0-8 12-8 12 0v15-5c0-7 11-7 11 1v22c0 17-12 27-31 27H43c-9 0-15-4-20-11L9 73c-5-8 6-15 12-8l17 11Z"/><circle cx="44" cy="25" r="12"/></svg>`;
const escapeHtml = (value = "") => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

const manuals = [
  {
    id: "smart-tab", type: "teclado", title: "Teclado Smart TAB", pages: "14 páginas",
    description: "Macros, mensagens livres, comando remoto e consulta de sensores e atuadores.",
    tags: ["Macros", "Mensagens", "Status"], source: "Manual - Teclado Smart TAB.pdf", image: "assets/devices/smart-tab.png",
    alert: "Ao gerar o código de comando remoto, mantenha a tela aberta até digitar a senha fornecida pela Central.",
    flow: [
      ["Abrir Macros", "Na tela inicial, toque em Macros.", 67, 36],
      ["Selecionar a macro", "Escolha a macro correta na lista apresentada.", 48, 42],
      ["Preencher os campos", "Informe somente os dados solicitados na tela.", 48, 57],
      ["Enviar", "Revise o preenchimento e toque no botão de envio.", 77, 72],
    ],
  },
  {
    id: "onixsmart", type: "teclado", title: "Teclado OnixSmart", pages: "15 páginas",
    description: "Texto livre, mensagens recebidas e macros pré-configuradas no terminal OnixSat.",
    tags: ["Texto livre", "Leitura", "Teclas"], source: "Manual Teclado OnixSmart.pdf", image: "assets/devices/onixsmart.png",
    alert: "Antes de manutenção ou intervenção no veículo, comunique a Central para evitar acionamentos automáticos.",
    flow: [
      ["Pressionar 1", "Na tela principal, pressione a tecla 1 para iniciar uma mensagem.", 19, 57],
      ["Escolher o formato", "Selecione uma mensagem pré-formatada ou texto livre.", 48, 28],
      ["Digitar e alternar", "Use ALT para alternar letras, números e símbolos.", 10, 65],
      ["Confirmar", "Revise a mensagem e pressione ENTER para enviar.", 89, 65],
    ],
  },
  {
    id: "omnilink", type: "teclado", title: "Terminal Alfanumérico Omnilink", pages: "23 páginas",
    description: "Mensagens, macros, navegação e funções de segurança do terminal multimídia.",
    tags: ["Menu", "Mensagens", "Atalhos"], source: "Teclado Alfanumérico Multimidia Omnilink.pdf", image: "assets/devices/omnilink.png",
    alert: "Atalhos e permissões podem mudar conforme a configuração embarcada no veículo.",
    flow: [
      ["Abrir o menu", "Pressione MENU no canto superior direito do teclado.", 87, 37],
      ["Localizar Mensagem", "Use as setas até encontrar a função MENSAGEM.", 82, 66],
      ["Confirmar", "Pressione ENTER para abrir a opção selecionada.", 80, 82],
      ["Escrever e enviar", "Digite o conteúdo, revise e confirme novamente.", 48, 65],
    ],
  },
  {
    id: "guia-motorista", type: "teclado", title: "Guia do Motorista", pages: "12 páginas",
    description: "Rotina de comunicação, leitura de alertas e operação do teclado embarcado.",
    tags: ["Motorista", "Comunicação", "Rotina"], source: "teclado novo Guia_motorista.pdf", image: "assets/devices/guia-motorista.png",
    alert: "Use funções de segurança somente conforme o procedimento da transportadora e da Central.",
    flow: [
      ["Verificar o visor", "Leia o status antes de iniciar qualquer sequência.", 34, 27],
      ["Abrir a função", "Use MENU ou o atalho previsto no procedimento.", 20, 58],
      ["Preencher", "Digite os dados solicitados e revise o visor.", 47, 72],
      ["Confirmar", "Pressione a tecla de confirmação uma única vez.", 83, 77],
    ],
  },
  {
    id: "sasmdt", type: "teclado", title: "SasMDT Sascar", pages: "34 páginas",
    description: "Mensagens, sensores, atuadores, geração de senha e sequenciamento de macros.",
    tags: ["Sascar", "Macros", "Segurança"], source: "MANUAL_SASMDT.pdf", image: "assets/devices/sasmdt-screen.png",
    alert: "A liberação exige autorização e seleção exata dos sensores e atuadores aplicáveis.",
    flow: [
      ["Abrir o menu", "Na tela inicial, escolha a função necessária.", 78, 33],
      ["Selecionar o recurso", "Acesse Macros, Mensagens ou Sensores e Atuadores.", 79, 50],
      ["Conferir os itens", "Marque somente os sensores e atuadores autorizados.", 50, 58],
      ["Validar", "Revise e confirme o procedimento na própria interface.", 80, 72],
    ],
  },
  {
    id: "gestao-riscos", type: "tecnologia", title: "Sistema de Gestão de Riscos", pages: "29 páginas",
    description: "Pesquisa de placa, histórico, comandos, mensagens, sensores, atuadores e embarques.",
    tags: ["Placa", "Comandos", "Histórico"], source: "Manual do Sistema de Gestão de Riscos.pdf", image: null,
    alert: "Comandos de atuação ou inibição devem respeitar a permissão do usuário e o processo de autorização.",
    flow: [
      ["Pesquisar a placa", "Use o grid de monitoramento e filtre pela placa disponível no seu grupo."],
      ["Abrir os atalhos", "Clique com o botão direito sobre a placa para acessar telas já filtradas."],
      ["Ver sensores", "Abra Entradas para consultar sensores habilitados, desabilitados ou violados."],
      ["Ver atuadores", "Abra Saídas para confirmar bloqueio, sirene e travas instaladas."],
    ],
  },
  {
    id: "site-gsm", type: "tecnologia", title: "Site GSM", pages: "49 páginas",
    description: "Pesquisa, localização, histórico e funções operacionais do portal GSM.",
    tags: ["GSM", "Rastreamento", "Portal"], source: "Manual_Site_GSM_v4.pdf", image: null,
    alert: "Os nomes dos menus podem variar conforme a versão e as permissões do usuário.",
    flow: [
      ["Localizar o veículo", "Abra a pesquisa do portal e informe a placa ou identificador."],
      ["Conferir comunicação", "Valide a última posição e o horário antes de agir."],
      ["Abrir detalhes", "Consulte eventos, histórico e status vinculados ao veículo."],
      ["Executar a ação", "Envie comandos somente após confirmar veículo, estado e autorização."],
    ],
  },
];

const technologies = [
  { id: "sighra", name: "SIGHRA", summary: "Comando remoto no terminal SIGHRA e validação na plataforma.", image: "assets/devices/sighra.png", points: [[72,42],[50,53],[69,62],[72,69]], steps: [["Abrir Comando Remoto","No terminal, toque em Comando Remoto."],["Manter a tela aberta","Leia o identificador e não saia da tela."],["Gerar a autorização","Na plataforma autorizada, localize a placa e gere a resposta."],["Digitar e validar","Informe a senha recebida e confirme o retorno."]] },
  { id: "ravex", name: "RAVEX", summary: "Consulta do código no terminal e geração da resposta na plataforma.", image: null, points: [[31,66],[51,66],[69,66],[78,66]], steps: [["Acessar Segurança","Abra a função de segurança ou desbloqueio."],["Obter o código","Mantenha o identificador visível no equipamento."],["Localizar a placa","Pesquise a placa na plataforma correta."],["Confirmar a ação","Digite a resposta autorizada e valide o retorno."]] },
  { id: "onixsat", name: "ONIXSAT", summary: "Fluxo de segurança no teclado OnixSat.", image: "assets/devices/onixsat-panel.png", points: [[50,42],[62,57],[55,70],[76,73]], steps: [["Abrir o menu","Acesse a função de segurança no teclado."],["Ler a solicitação","Confirme o identificador apresentado."],["Pesquisar o veículo","Localize a placa na plataforma autorizada."],["Finalizar","Digite a resposta e confira o estado do veículo."]] },
  { id: "omnilink", name: "OMNILINK", summary: "Liberação pelo terminal alfanumérico e portal Omnilink.", image: "assets/devices/omnilink.png", points: [[87,37],[82,66],[80,82],[48,65]], steps: [["Entrar no menu","Pressione MENU para iniciar o procedimento."],["Selecionar a função","Use as setas para localizar DESBLOQUEIA."],["Confirmar","Pressione ENTER e mantenha a ocorrência no visor."],["Validar o retorno","Digite a autorização e confirme a mensagem final."]] },
  { id: "sascar-aba", name: "SASCAR · ABA", summary: "Procedimento pela aba Sascar do sistema de atendimento.", image: "assets/devices/sasmdt-screen.png", points: [[77,35],[76,51],[46,55],[78,73]], steps: [["Identificar o veículo","Pesquise a placa e confira o cadastro."],["Abrir a aba Sascar","Selecione a ação de liberação disponível."],["Definir o escopo","Marque somente os itens autorizados."],["Registrar e confirmar","Conclua e registre o resultado."]] },
  { id: "sascar-novo", name: "SASCAR · NOVO TABLET", summary: "Liberação pelo novo tablet com seleção de segurança.", image: "assets/devices/smart-tab.png", points: [[67,58],[49,51],[52,63],[72,72]], steps: [["Abrir Segurança","Acesse Configuração ou Segurança."],["Selecionar itens","Marque sensores e atuadores autorizados."],["Gerar a senha","Informe o código à Central."],["Confirmar","Digite a resposta e valide o status."]] },
  { id: "sascar-tablet", name: "SASCAR · TABLET", summary: "Fluxo no tablet Sascar e conferência do retorno.", image: "assets/devices/sasmdt-screen.png", points: [[78,34],[78,50],[50,60],[78,72]], steps: [["Acessar o menu","Abra o módulo de segurança."],["Confirmar o código","Mantenha o identificador visível."],["Escolher a liberação","Selecione somente a ação necessária."],["Aplicar e verificar","Insira a resposta e confira o resultado."]] },
  { id: "hibrido", name: "HÍBRIDO", summary: "Fluxo para equipamentos híbridos com validação de comunicação.", image: null, points: [[31,66],[50,66],[69,66],[78,66]], steps: [["Confirmar falta de sinal","Valide a última comunicação e o equipamento."],["Abrir a função local","Acesse a geração do código de segurança."],["Gerar a resposta","Pesquise a placa na plataforma correta."],["Testar o resultado","Digite, confirme e valide a liberação."]] },
  { id: "sascar-teclado", name: "TECLADO SASCAR", summary: "Geração de senha e liberação no terminal Sascar.", image: "assets/devices/sasmdt-screen.png", points: [[79,34],[48,56],[72,62],[80,72]], steps: [["Abrir Gerar Senha","Acesse a função de liberação."],["Marcar o necessário","Selecione os itens autorizados."],["Trocar os códigos","Repasse o código pelo canal seguro."],["Finalizar","Digite a resposta e confirme a mensagem."]] },
  { id: "positron", name: "POSITRON", summary: "Procedimento sem sinal para rastreador Pósitron.", image: null, points: [[31,66],[50,66],[69,66],[78,66]], steps: [["Identificar o modelo","Confirme o rastreador e a placa."],["Acessar a liberação","Abra o procedimento local indicado."],["Gerar a autorização","Use a plataforma definida para o equipamento."],["Conferir","Valide bloqueio, sirene e travas."]] },
  { id: "autotrac", name: "AUTOTRAC", summary: "Fluxo pelo terminal Autotrac e ferramenta autorizada.", image: "assets/devices/autotrac.png", points: [[17,49],[47,49],[72,49],[85,50]], steps: [["Abrir a função","Acesse o procedimento de segurança no terminal."],["Coletar o código","Mantenha o identificador exibido na tela."],["Gerar a resposta","Localize o veículo na ferramenta autorizada."],["Aplicar","Digite a resposta e confirme a liberação."]] },
];

const demoSequences = manuals.filter((manual) => ["smart-tab", "onixsmart", "omnilink"].includes(manual.id));
const builtInKnowledge = [
  { keys: ["macro","smart tab"], answer: "No Smart TAB, abra <b>Macros</b>, selecione a macro desejada, preencha os campos e confirme após revisar.", source: "Manual - Teclado Smart TAB" },
  { keys: ["sensor","atuador","status"], answer: "No Smart TAB, acesse <b>Configuração &gt; Status</b>. No Sistema de Gestão de Riscos, consulte <b>Entradas</b> para sensores e <b>Saídas</b> para atuadores.", source: "Smart TAB + Sistema de Gestão de Riscos" },
  { keys: ["placa","pesquisar","pesquisa"], answer: "No grid de monitoramento, filtre pela placa disponível na sua hierarquia. O menu de contexto da placa reúne telas filtradas e ações rápidas.", source: "Manual do Sistema de Gestão de Riscos" },
  { keys: ["texto livre","mensagem"], answer: "Abra <b>Mensagens</b>, escolha texto livre, digite e revise antes de confirmar. No OnixSmart, pressione 1 na tela principal e use ALT para alternar caracteres.", source: "Smart TAB + OnixSmart" },
  { keys: ["desbloqueio","sem sinal","contrassenha","senha"], answer: "Confirme placa, tecnologia, falta de sinal e autorização. Abra a função de segurança no equipamento e mantenha a tela. Gere a resposta somente na plataforma autorizada.", source: "Treinamento Central Atualizado" },
];

const pages = [...document.querySelectorAll("[data-page]")];
const routeControls = [...document.querySelectorAll("[data-route]")];
const navLinks = [...document.querySelectorAll(".main-nav [data-route]")];
const splash = document.getElementById("splash");
const menu = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");

function finishSplash() { splash?.classList.add("hide"); window.setTimeout(() => splash?.remove(), 600); }
document.getElementById("skipIntro")?.addEventListener("click", finishSplash);
window.setTimeout(finishSplash, 4500);

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
routeControls.forEach((control) => control.addEventListener("click", (event) => { event.preventDefault(); navigate(control.dataset.route); }));
menuToggle?.addEventListener("click", () => { const open = menu.classList.toggle("mobile-open"); menuToggle.setAttribute("aria-expanded", String(open)); });
window.addEventListener("hashchange", () => navigate(location.hash.slice(1) || "inicio", false));

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }), { threshold: .1 });
document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

function moveHand(canvas, x, y) {
  canvas.style.setProperty("--hand-x", `${x}%`);
  canvas.style.setProperty("--hand-y", `${y}%`);
  canvas.classList.remove("is-tapping");
  void canvas.offsetWidth;
  canvas.classList.add("is-tapping");
}

let demoDeviceIndex = 0;
let demoStep = 0;
let demoTimer;
const demoCanvas = document.getElementById("demoDeviceCanvas");
function renderDemoTabs() {
  document.getElementById("demoDeviceTabs").innerHTML = demoSequences.map((device, index) => `<button type="button" class="${index === demoDeviceIndex ? "active" : ""}" data-demo-device="${index}">${device.title.replace("Teclado ", "")}</button>`).join("");
  document.querySelectorAll("[data-demo-device]").forEach((button) => button.addEventListener("click", () => { demoDeviceIndex = Number(button.dataset.demoDevice); demoStep = 0; renderHomeDemo(); restartDemoTimer(); }));
}
function renderHomeDemo() {
  const device = demoSequences[demoDeviceIndex];
  const step = device.flow[demoStep];
  document.getElementById("demoDeviceImage").src = device.image;
  document.getElementById("demoDeviceImage").alt = device.title;
  document.getElementById("demoDeviceLabel").textContent = device.title.toUpperCase();
  document.getElementById("demoTitle").textContent = device.id === "smart-tab" ? "Envio de macro" : device.id === "onixsmart" ? "Envio de mensagem" : "Mensagem no terminal";
  document.getElementById("demoScreenCaption").textContent = step[0];
  document.getElementById("demoSteps").innerHTML = device.flow.map((item, index) => `<li class="${index === demoStep ? "active" : index < demoStep ? "done" : ""}" data-demo-step="${index}"><span>${index < demoStep ? icon("check") : index + 1}</span><div><b>${item[0]}</b><p>${item[1]}</p></div></li>`).join("");
  document.getElementById("demoCounter").textContent = `${demoStep + 1} / ${device.flow.length}`;
  moveHand(demoCanvas, step[2], step[3]);
  document.querySelectorAll("[data-demo-step]").forEach((item) => item.addEventListener("click", () => { demoStep = Number(item.dataset.demoStep); renderHomeDemo(); restartDemoTimer(); }));
  renderDemoTabs();
}
function nextDemo(delta = 1) { const count = demoSequences[demoDeviceIndex].flow.length; demoStep = (demoStep + delta + count) % count; renderHomeDemo(); }
function restartDemoTimer() { window.clearInterval(demoTimer); demoTimer = window.setInterval(() => nextDemo(1), 3200); }
document.getElementById("nextDemo").addEventListener("click", () => { nextDemo(1); restartDemoTimer(); });
document.getElementById("prevDemo").addEventListener("click", () => { nextDemo(-1); restartDemoTimer(); });
document.getElementById("replayDemo").addEventListener("click", () => { demoStep = 0; renderHomeDemo(); restartDemoTimer(); });

const manualGrid = document.getElementById("manualGrid");
let manualFilter = "todos";
function renderManuals() {
  const term = document.getElementById("manualSearch").value.trim().toLocaleLowerCase("pt-BR");
  const filtered = manuals.filter((manual) => (manualFilter === "todos" || manual.type === manualFilter) && [manual.title, manual.description, ...manual.tags].join(" ").toLocaleLowerCase("pt-BR").includes(term));
  manualGrid.innerHTML = filtered.map((manual) => `<article class="manual-card"><div class="manual-thumb">${manual.image ? `<img src="${manual.image}" alt="${manual.title}" />` : `<span class="manual-fallback">${icon("monitor")}</span>`}</div><div class="manual-copy"><div class="manual-meta"><span>${manual.type === "teclado" ? "Manual de teclado" : "Manual de tecnologia"}</span><span>${manual.pages}</span></div><h3>${manual.title}</h3><p>${manual.description}</p><div class="manual-tags">${manual.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><button class="manual-open" type="button" data-manual="${manual.id}">Abrir guia ${icon("arrow")}</button></div></article>`).join("");
  document.getElementById("manualEmpty").hidden = filtered.length > 0;
  manualGrid.querySelectorAll("[data-manual]").forEach((button) => button.addEventListener("click", () => openManual(button.dataset.manual)));
}
document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => { manualFilter = button.dataset.filter; document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button)); renderManuals(); }));
document.querySelectorAll("[data-manual-filter]").forEach((button) => button.addEventListener("click", () => { navigate("manuais"); manualFilter = button.dataset.manualFilter; document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item.dataset.filter === manualFilter)); renderManuals(); }));
document.getElementById("manualSearch").addEventListener("input", renderManuals);

const manualDialog = document.getElementById("manualDialog");
function openManual(id) {
  const manual = manuals.find((item) => item.id === id);
  if (!manual) return;
  const visual = manual.image ? `<div class="device-canvas dialog-device-canvas" id="dialogDeviceCanvas"><img src="${manual.image}" alt="${manual.title}" /><div class="screen-caption" id="dialogCaption">${manual.flow[0][0]}</div>${handSvg("dialogHand")}</div>` : `<div class="device-canvas dialog-device-canvas"><span class="manual-fallback">${icon("monitor")}</span><div class="screen-caption">Fluxo de plataforma</div></div>`;
  document.getElementById("dialogContent").innerHTML = `<div class="dialog-body"><div class="dialog-head"><span class="section-kicker">${manual.type === "teclado" ? "Guia de teclado" : "Guia de tecnologia"}</span><h2>${manual.title}</h2><p>${manual.description}</p></div><div class="dialog-training">${visual}<div class="dialog-steps"><h3>Passo a passo</h3><ol>${manual.flow.map((step, index) => `<li class="${index === 0 ? "active" : ""}" data-dialog-step="${index}"><span>${index + 1}</span><div><b>${step[0]}</b><p>${step[1]}</p></div></li>`).join("")}</ol></div></div><div class="dialog-alert"><b>Atenção:</b> ${manual.alert}</div><div class="dialog-source">Fonte de treinamento: ${manual.source}</div></div>`;
  if (manual.image) {
    const canvas = document.getElementById("dialogDeviceCanvas");
    const selectDialogStep = (index) => { const step = manual.flow[index]; document.getElementById("dialogCaption").textContent = step[0]; document.querySelectorAll("[data-dialog-step]").forEach((item) => item.classList.toggle("active", Number(item.dataset.dialogStep) === index)); moveHand(canvas, step[2] || 50, step[3] || 50); };
    document.querySelectorAll("[data-dialog-step]").forEach((item) => item.addEventListener("click", () => selectDialogStep(Number(item.dataset.dialogStep))));
    selectDialogStep(0);
  }
  manualDialog.showModal();
}
manualDialog.querySelector(".dialog-close").addEventListener("click", () => manualDialog.close());
manualDialog.addEventListener("click", (event) => { if (event.target === manualDialog) manualDialog.close(); });

const techList = document.getElementById("techList");
let selectedTech = technologies[0];
let unlockStep = 0;
function renderTechList() {
  techList.innerHTML = technologies.map((tech) => `<button type="button" class="${tech === selectedTech ? "active" : ""}" data-tech="${tech.id}"><span>${tech.name}</span>${icon("arrow")}</button>`).join("");
  techList.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => { selectedTech = technologies.find((tech) => tech.id === button.dataset.tech); unlockStep = 0; renderUnlock(); renderTechList(); }));
}
function renderUnlock() {
  document.getElementById("techBadge").textContent = selectedTech.name;
  document.getElementById("techTitle").textContent = `Desbloqueio ${selectedTech.name}`;
  document.getElementById("techSummary").textContent = selectedTech.summary;
  const image = document.getElementById("unlockDeviceImage");
  const generic = document.getElementById("genericTerminal");
  const note = document.getElementById("illustrationNote");
  if (selectedTech.image) { image.src = selectedTech.image; image.alt = `Equipamento ${selectedTech.name}`; image.hidden = false; generic.hidden = true; note.hidden = true; }
  else { image.hidden = true; generic.hidden = false; note.hidden = false; }
  const step = selectedTech.steps[unlockStep];
  document.getElementById("unlockCaption").textContent = step[0];
  document.getElementById("unlockSteps").innerHTML = selectedTech.steps.map((item, index) => `<li class="${index === unlockStep ? "active" : index < unlockStep ? "done" : ""}" data-unlock-step="${index}"><span>${index < unlockStep ? icon("check") : index + 1}</span><div><b>${item[0]}</b><p>${item[1]}</p></div></li>`).join("");
  document.getElementById("unlockProgress").innerHTML = selectedTech.steps.map((_, index) => `<span class="${index <= unlockStep ? "active" : ""}"></span>`).join("");
  document.getElementById("prevUnlock").disabled = unlockStep === 0;
  document.getElementById("nextUnlock").innerHTML = unlockStep === selectedTech.steps.length - 1 ? `Concluir guia ${icon("check")}` : `Próxima etapa ${icon("arrow")}`;
  const point = selectedTech.points[unlockStep];
  moveHand(document.getElementById("unlockDeviceCanvas"), point[0], point[1]);
  document.querySelectorAll("[data-unlock-step]").forEach((item) => item.addEventListener("click", () => { unlockStep = Number(item.dataset.unlockStep); renderUnlock(); }));
}
document.getElementById("nextUnlock").addEventListener("click", () => { if (unlockStep < selectedTech.steps.length - 1) { unlockStep += 1; renderUnlock(); } else showToast("Guia concluído. Registre o resultado conforme o procedimento da operação."); });
document.getElementById("prevUnlock").addEventListener("click", () => { if (unlockStep > 0) { unlockStep -= 1; renderUnlock(); } });

function appendMessage(content, type = "bot", source = "") {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${type === "user" ? "user-message" : "bot-message"}`;
  wrapper.innerHTML = type === "bot" ? `<span class="message-avatar">${icon("bot")}</span><div><p>${content}</p><small>${source ? `Fonte: ${escapeHtml(source)}` : "Agora"}</small></div>` : `<div><p>${escapeHtml(content)}</p><small>Agora</small></div>`;
  document.getElementById("chatMessages").appendChild(wrapper);
  wrapper.scrollIntoView({ behavior: "smooth", block: "end" });
}
function findAnswer(question) {
  const normalized = question.toLocaleLowerCase("pt-BR");
  const custom = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
  const choices = [...builtInKnowledge, ...custom.map((item) => ({ keys: item.keywords, answer: escapeHtml(item.answer).replace(/\n/g,"<br>"), source: `Base ADM · ${item.title}` }))];
  const ranked = choices.map((item) => ({ item, score: item.keys.reduce((total, key) => total + (normalized.includes(key.toLocaleLowerCase("pt-BR")) ? 1 : 0), 0) })).sort((a,b) => b.score - a.score);
  return ranked[0]?.score ? ranked[0].item : { answer: "Ainda não encontrei essa orientação na base. Tente citar o equipamento e a função desejada ou peça ao administrador para cadastrar o procedimento.", source: "Base de treinamento" };
}
document.getElementById("chatForm").addEventListener("submit", (event) => { event.preventDefault(); const input = document.getElementById("chatInput"); const question = input.value.trim(); if (!question) return; appendMessage(question,"user"); input.value = ""; const result = findAnswer(question); window.setTimeout(() => appendMessage(result.answer,"bot",result.source), 350); });
document.querySelectorAll(".suggestions button").forEach((button) => button.addEventListener("click", () => { document.getElementById("chatInput").value = button.textContent; document.getElementById("chatForm").requestSubmit(); }));
document.getElementById("clearChat").addEventListener("click", () => { document.getElementById("chatMessages").innerHTML = `<div class="message bot-message"><span class="message-avatar">${icon("bot")}</span><div><p>Conversa limpa. Como posso ajudar?</p><small>Agora</small></div></div>`; });

const credentialKey = "smartAdminCredentialV2";
const sessionKey = "smartAdminSessionV2";
async function hashText(value) { const data = new TextEncoder().encode(value); const digest = await crypto.subtle.digest("SHA-256", data); return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2,"0")).join(""); }
function updateAdminView() {
  const hasCredential = Boolean(localStorage.getItem(credentialKey));
  const loggedIn = sessionStorage.getItem(sessionKey) === "true";
  document.getElementById("adminLogin").hidden = loggedIn;
  document.getElementById("adminDashboard").hidden = !loggedIn;
  if (!loggedIn) {
    document.getElementById("adminHeading").textContent = hasCredential ? "Entrar na Área ADM" : "Configurar acesso";
    document.getElementById("adminIntro").textContent = hasCredential ? "Use o e-mail e a senha configurados neste navegador." : "Crie o acesso inicial deste protótipo para testar o cadastro da base.";
    document.getElementById("adminSubmitText").textContent = hasCredential ? "Entrar" : "Configurar acesso";
  }
  renderKnowledge();
}
document.getElementById("adminLoginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("adminEmail").value.trim().toLowerCase();
  const password = document.getElementById("adminPassword").value;
  const hash = await hashText(`${email}:${password}`);
  const saved = JSON.parse(localStorage.getItem(credentialKey) || "null");
  if (!saved) { localStorage.setItem(credentialKey, JSON.stringify({ email, hash })); sessionStorage.setItem(sessionKey,"true"); showToast("Acesso administrativo configurado neste navegador."); }
  else if (saved.email === email && saved.hash === hash) { sessionStorage.setItem(sessionKey,"true"); showToast("Acesso autorizado."); }
  else { showToast("E-mail ou senha não conferem."); return; }
  event.target.reset(); updateAdminView();
});
document.getElementById("adminLogout").addEventListener("click", () => { sessionStorage.removeItem(sessionKey); updateAdminView(); });
document.getElementById("knowledgeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const items = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
  items.unshift({ id: crypto.randomUUID(), title: document.getElementById("knowledgeTitle").value.trim(), category: document.getElementById("knowledgeCategory").value, answer: document.getElementById("knowledgeAnswer").value.trim(), keywords: document.getElementById("knowledgeKeywords").value.split(",").map((item) => item.trim()).filter(Boolean) });
  localStorage.setItem("smartKnowledge", JSON.stringify(items)); event.target.reset(); renderKnowledge(); showToast("Conteúdo adicionado à base local.");
});
function renderKnowledge() {
  const items = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
  document.getElementById("knowledgeCount").textContent = `${items.length} ${items.length === 1 ? "item" : "itens"}`;
  document.getElementById("knowledgeList").innerHTML = items.length ? items.map((item) => `<div class="knowledge-item"><div><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.category)} · ${item.keywords.map(escapeHtml).join(", ") || "sem palavras-chave"}</small></div><button type="button" data-remove-knowledge="${item.id}" aria-label="Excluir ${escapeHtml(item.title)}">×</button></div>`).join("") : `<div class="knowledge-item"><div><b>Nenhum conteúdo adicional</b><small>Use o formulário acima para cadastrar a primeira orientação.</small></div></div>`;
  document.querySelectorAll("[data-remove-knowledge]").forEach((button) => button.addEventListener("click", () => { const next = items.filter((item) => item.id !== button.dataset.removeKnowledge); localStorage.setItem("smartKnowledge", JSON.stringify(next)); renderKnowledge(); }));
}

let toastTimer;
function showToast(message) { const toast = document.getElementById("toast"); toast.textContent = message; toast.classList.add("show"); window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3300); }

renderHomeDemo();
restartDemoTimer();
renderManuals();
renderTechList();
renderUnlock();
updateAdminView();
navigate(location.hash.slice(1) || "inicio", false);
