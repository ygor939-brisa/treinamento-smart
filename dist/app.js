const icon = (name, className = "") => `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const escapeHtml = (value = "") => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));

const manuals = [
  {
    id: "smart-tab", type: "teclado", title: "Teclado Smart TAB", pages: "14 páginas",
    description: "Navegação básica, leitura da tela, mensagens e confirmação no terminal.",
    tags: ["Tela", "Mensagens", "Navegação"], source: "Manual - Teclado Smart TAB.pdf", device: "smart-tab",
    alert: "Ao gerar o código de comando remoto, mantenha a tela aberta até digitar a senha fornecida pela Central.",
    flow: [
      ["Reconhecer a tela inicial", "Confira os atalhos disponíveis antes de iniciar.", "screen"],
      ["Abrir Mensagens", "Toque no bloco Mensagens para consultar ou escrever.", "messages"],
      ["Usar a navegação", "Percorra as opções com os controles indicados na tela.", "nav"],
      ["Confirmar a ação", "Revise as informações e toque em Confirmar uma única vez.", "confirm"],
    ],
  },
  {
    id: "onixsmart", type: "teclado", title: "Teclado OnixSmart", pages: "15 páginas",
    description: "Leitura do visor, texto livre, troca de caracteres e confirmação.",
    tags: ["Texto livre", "Leitura", "Teclas"], source: "Manual Teclado OnixSmart.pdf", device: "onixsmart",
    alert: "Antes de manutenção ou intervenção no veículo, comunique a Central para evitar acionamentos automáticos.",
    flow: [
      ["Ler o visor", "Confira a opção exibida antes de pressionar qualquer tecla.", "screen"],
      ["Iniciar uma mensagem", "Pressione a tecla 1 na tela principal.", "1"],
      ["Alternar caracteres", "Use ALT para alternar letras, números e símbolos.", "alt"],
      ["Confirmar", "Revise o texto e pressione ENTER uma única vez.", "enter"],
    ],
  },
  {
    id: "omnilink", type: "teclado", title: "Terminal Alfanumérico Omnilink", pages: "23 páginas",
    description: "Mensagens, macros, navegação e funções de segurança do terminal multimídia.",
    tags: ["Menu", "Mensagens", "Atalhos"], source: "Teclado Alfanumérico Multimidia Omnilink.pdf", device: "omnilink",
    alert: "Atalhos e permissões podem mudar conforme a configuração embarcada no veículo.",
    flow: [
      ["Abrir o menu", "Pressione MENU no canto superior direito do teclado.", "menu"],
      ["Localizar Mensagem", "Use as setas até encontrar a função MENSAGEM.", "nav"],
      ["Confirmar", "Pressione ENTER para abrir a opção selecionada.", "enter"],
      ["Escrever o texto", "Use o teclado alfanumérico e acompanhe cada caractere no visor.", "letters"],
    ],
  },
  {
    id: "guia-motorista", type: "teclado", title: "Guia do Motorista", pages: "12 páginas",
    description: "Rotina de comunicação, leitura de alertas e operação do teclado embarcado.",
    tags: ["Motorista", "Comunicação", "Rotina"], source: "teclado novo Guia_motorista.pdf", device: "driver-keyboard",
    alert: "Use funções de segurança somente conforme o procedimento da transportadora e da Central.",
    flow: [
      ["Verificar o visor", "Leia o status antes de iniciar qualquer ação.", "screen"],
      ["Abrir a função", "Use MENU ou o atalho indicado pela operação.", "menu"],
      ["Digitar os dados", "Use o teclado e acompanhe o preenchimento no visor.", "letters"],
      ["Confirmar", "Pressione a tecla de confirmação uma única vez.", "enter"],
    ],
  },
  {
    id: "sasmdt", type: "teclado", title: "SasMDT Sascar", pages: "34 páginas",
    description: "Navegação básica do terminal, leitura de status e confirmação de opções.",
    tags: ["Sascar", "Tela", "Navegação"], source: "MANUAL_SASMDT.pdf", device: "sasmdt",
    alert: "A liberação exige autorização e seleção exata dos sensores e atuadores aplicáveis.",
    flow: [
      ["Ler a tela inicial", "Confira o estado do terminal antes de navegar.", "screen"],
      ["Abrir o menu", "Selecione o menu lateral para ver as funções disponíveis.", "menu"],
      ["Navegar pelas opções", "Use os controles de direção para mudar a seleção.", "nav"],
      ["Confirmar", "Revise a opção marcada e confirme uma única vez.", "confirm"],
    ],
  },
  {
    id: "gestao-riscos", type: "tecnologia", title: "Sistema de Gestão de Riscos", pages: "29 páginas",
    description: "Pesquisa de placa, histórico, comandos, mensagens, sensores, atuadores e embarques.",
    tags: ["Placa", "Comandos", "Histórico"], source: "Manual do Sistema de Gestão de Riscos.pdf", device: "system",
    alert: "Comandos de atuação ou inibição devem respeitar a permissão do usuário e o processo de autorização.",
    flow: [
      ["Pesquisar a placa", "Use o campo de busca do grid e informe a placa disponível no seu grupo.", "search"],
      ["Abrir os atalhos", "Clique com o botão direito sobre a linha da placa.", "row"],
      ["Ver sensores", "Abra Entradas para consultar sensores habilitados, desabilitados ou violados.", "inputs"],
      ["Ver atuadores", "Abra Saídas para confirmar bloqueio, sirene e travas instaladas.", "outputs"],
    ],
  },
  {
    id: "site-gsm", type: "tecnologia", title: "Site GSM", pages: "49 páginas",
    description: "Pesquisa, localização, histórico e funções operacionais do portal GSM.",
    tags: ["GSM", "Rastreamento", "Portal"], source: "Manual_Site_GSM_v4.pdf", device: "system",
    alert: "Os nomes dos menus podem variar conforme a versão e as permissões do usuário.",
    flow: [
      ["Localizar o veículo", "Abra a pesquisa do portal e informe a placa ou identificador.", "search"],
      ["Conferir comunicação", "Clique no veículo e valide a última posição e o horário.", "row"],
      ["Abrir detalhes", "Consulte eventos, histórico e status vinculados ao veículo.", "history"],
      ["Revisar antes de agir", "Confirme veículo, estado e autorização antes de qualquer comando.", "review"],
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
  { keys: ["teclado","smart tab"], answer: "No Smart TAB, confira a tela inicial, abra <b>Mensagens</b>, navegue pelas opções e revise antes de confirmar. A sequência de macros da nova operação ainda aguarda validação.", source: "Manual - Teclado Smart TAB" },
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

const deviceTargets = {
  "smart-tab": { screen: [51,30], messages: [69,43], nav: [71,62], confirm: [70,69] },
  onixsmart: { screen: [50,25], "1": [20,52], alt: [80,69], enter: [88,68], letters: [51,62], menu: [18,50] },
  omnilink: { screen: [50,24], menu: [84,43], nav: [82,63], enter: [79,78], letters: [49,61] },
  "driver-keyboard": { screen: [50,25], menu: [18,51], letters: [50,63], enter: [87,66], nav: [82,55] },
  sasmdt: { screen: [49,31], menu: [73,43], nav: [73,58], confirm: [72,68] },
  generic: { screen: [50,28], menu: [20,54], nav: [75,60], confirm: [78,71], enter: [78,71], letters: [49,64] },
  system: { search: [39,29], row: [52,51], inputs: [71,60], outputs: [71,69], history: [72,51], review: [82,78] },
};

function handMarkup() {
  return `<svg class="hold-hand" viewBox="0 0 170 160" aria-hidden="true"><path d="M22 130c14-8 18-26 18-47V51c0-13 18-13 18 0v31-48c0-13 18-13 18 0v45-54c0-13 18-13 18 0v54-42c0-13 18-13 18 0v46c0 41-23 61-61 61H22Z"/></svg><svg class="action-hand" viewBox="0 0 92 108" aria-hidden="true"><path d="M38 76V29c0-8 12-8 12 0v22-11c0-8 12-8 12 0v13-8c0-8 12-8 12 0v15-5c0-7 11-7 11 1v22c0 17-12 27-31 27H43c-9 0-15-4-20-11L9 73c-5-8 6-15 12-8l17 11Z"/><circle cx="44" cy="25" r="12"/></svg>`;
}

function alphaKeys() {
  return ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"].map((key) => `<i>${key}</i>`).join("");
}

function deviceMarkup(model, label) {
  if (model === "system") return `<div class="system-window"><div class="system-top"><span></span><span></span><span></span><b>Central de monitoramento</b></div><aside><i></i><i></i><i></i><i></i></aside><main><div class="system-search" data-control="search">Pesquisar placa <strong>ABC1D23</strong></div><div class="system-grid"><div class="system-row system-head"><span>Placa</span><span>Status</span><span>Comunicação</span></div><div class="system-row" data-control="row"><span>ABC1D23</span><span>Em viagem</span><span>Agora</span></div></div><div class="system-menu"><span data-control="history">Histórico</span><span data-control="inputs">Entradas · sensores</span><span data-control="outputs">Saídas · atuadores</span><span data-control="review">Revisar ação</span></div><div class="mouse-pointer"><i></i></div></main></div>`;
  if (model === "smart-tab" || model === "sasmdt") return `<div class="training-device tablet-device ${model}"><div class="speaker-grid"></div><div class="device-screen" data-control="screen"><div class="screen-status"><b>${label}</b><small>Terminal conectado</small></div><div class="tile-grid"><span>STATUS</span><span data-control="messages">MENSAGENS</span><span data-control="nav">MENU</span><span data-control="confirm">CONFIRMAR</span></div></div></div>${handMarkup()}`;
  const theme = model === "omnilink" ? "omnilink-device" : model === "onixsmart" ? "onix-device" : model === "driver-keyboard" ? "driver-device" : "generic-device";
  return `<div class="training-device keyboard-device ${theme}"><div class="keyboard-screen" data-control="screen"><b>${label}</b><span>Selecione uma opção</span></div><div class="keyboard-controls"><button data-control="menu">MENU</button><button data-control="1">1</button><button>2</button><button>3</button></div><div class="keyboard-main" data-control="letters">${alphaKeys()}</div><div class="keyboard-footer"><button data-control="alt">ALT</button><span></span><button data-control="nav">◀ ▲ ▼ ▶</button><button data-control="enter">ENTER</button><button data-control="confirm">OK</button></div></div>${handMarkup()}`;
}

function renderScene(container, model, target, label) {
  if (!container) return;
  const positions = deviceTargets[model] || deviceTargets.generic;
  const [x, y] = positions[target] || positions.screen || [50,50];
  container.className = `device-scene scene-${model} is-animating`;
  container.style.setProperty("--action-x", `${x}%`);
  container.style.setProperty("--action-y", `${y}%`);
  container.innerHTML = deviceMarkup(model, label);
  container.querySelectorAll("[data-control]").forEach((control) => control.classList.toggle("control-active", control.dataset.control === target));
  void container.offsetWidth;
  container.classList.add("is-tapping");
}

function renderHorizontalSteps(element, steps, activeIndex, dataName) {
  element.innerHTML = steps.map((step, index) => `<li class="${index === activeIndex ? "active" : ""}" data-${dataName}="${index}"><span>ETAPA ${String(index + 1).padStart(2,"0")}</span><div><b>${step[0]}</b><p>${step[1]}</p></div></li>`).join("");
  element.style.transform = `translateX(-${activeIndex * 100}%)`;
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
  document.getElementById("demoDeviceLabel").textContent = device.title.toUpperCase();
  document.getElementById("demoTitle").textContent = "Operação básica do teclado";
  document.getElementById("demoScreenCaption").textContent = step[0];
  renderHorizontalSteps(document.getElementById("demoSteps"), device.flow, demoStep, "demo-step");
  document.getElementById("demoCounter").textContent = `${demoStep + 1} / ${device.flow.length}`;
  renderScene(document.getElementById("demoDeviceScene"), device.device, step[2], device.title);
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
  manualGrid.innerHTML = filtered.map((manual) => `<article class="manual-card"><div class="manual-thumb"><span class="manual-device-mark ${manual.type}">${icon(manual.type === "teclado" ? "keyboard" : "monitor")}<small>GUIA VISUAL</small></span></div><div class="manual-copy"><div class="manual-meta"><span>${manual.type === "teclado" ? "Manual de teclado" : "Manual de tecnologia"}</span><span>${manual.pages}</span></div><h3>${manual.title}</h3><p>${manual.description}</p><div class="manual-tags">${manual.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><button class="manual-open" type="button" data-manual="${manual.id}">Abrir guia ${icon("arrow")}</button></div></article>`).join("");
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
  let currentStep = 0;
  document.getElementById("dialogContent").innerHTML = `<div class="dialog-body"><div class="dialog-head"><span class="section-kicker">${manual.type === "teclado" ? "Guia de teclado" : "Guia de tecnologia"}</span><h2>${manual.title}</h2><p>${manual.description}</p></div><div class="dialog-training"><div class="device-canvas dialog-device-canvas illustrated-canvas"><div id="dialogDeviceScene" class="device-scene"></div><div class="screen-caption" id="dialogCaption"></div></div><div class="dialog-steps"><div class="dialog-step-head"><h3>Passo a passo</h3><span id="dialogCounter"></span></div><div class="step-viewport"><ol class="step-track" id="dialogSteps"></ol></div><div class="training-controls"><button type="button" id="dialogPrev">Anterior</button><button type="button" id="dialogNext">Próxima etapa</button></div></div></div><div class="dialog-alert"><b>Atenção:</b> ${manual.alert}</div>${manual.type === "teclado" ? `<div class="manual-scope"><div><b>Escopo desta versão</b><p>O guia ensina o uso básico do teclado. A sequência de macros da nova operação será incluída somente após validação.</p></div><button class="pdf-button" type="button" id="generateDriverPdf">${icon("book")} Gerar PDF para o motorista</button></div>` : ""}<div class="dialog-source">Fonte de treinamento: ${manual.source}</div></div>`;
  const selectDialogStep = (index) => {
    currentStep = Math.max(0, Math.min(index, manual.flow.length - 1));
    const step = manual.flow[currentStep];
    document.getElementById("dialogCaption").textContent = step[0];
    document.getElementById("dialogCounter").textContent = `${currentStep + 1} / ${manual.flow.length}`;
    renderHorizontalSteps(document.getElementById("dialogSteps"), manual.flow, currentStep, "dialog-step");
    renderScene(document.getElementById("dialogDeviceScene"), manual.device, step[2], manual.title);
    document.getElementById("dialogPrev").disabled = currentStep === 0;
    document.getElementById("dialogNext").textContent = currentStep === manual.flow.length - 1 ? "Recomeçar" : "Próxima etapa";
  };
  document.getElementById("dialogPrev").addEventListener("click", () => selectDialogStep(currentStep - 1));
  document.getElementById("dialogNext").addEventListener("click", () => selectDialogStep(currentStep === manual.flow.length - 1 ? 0 : currentStep + 1));
  document.getElementById("generateDriverPdf")?.addEventListener("click", () => generateDriverPdf(manual));
  selectDialogStep(0);
  manualDialog.showModal();
}
manualDialog.querySelector(".dialog-close").addEventListener("click", () => manualDialog.close());
manualDialog.addEventListener("click", (event) => { if (event.target === manualDialog) manualDialog.close(); });

const techList = document.getElementById("techList");
const technologyModels = { sighra: "smart-tab", ravex: "generic", onixsat: "onixsmart", omnilink: "omnilink", "sascar-aba": "system", "sascar-novo": "smart-tab", "sascar-tablet": "sasmdt", hibrido: "generic", "sascar-teclado": "sasmdt", positron: "generic", autotrac: "driver-keyboard" };
function technologyScene(tech, index) {
  if (technologyModels[tech.id] === "system") return { model: "system", target: ["search","row","inputs","review"][index] };
  if (index === 2) return { model: "system", target: "search" };
  return { model: technologyModels[tech.id] || "generic", target: ["menu","screen","screen","confirm"][index] };
}
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
  const step = selectedTech.steps[unlockStep];
  document.getElementById("unlockCaption").textContent = step[0];
  renderHorizontalSteps(document.getElementById("unlockSteps"), selectedTech.steps, unlockStep, "unlock-step");
  document.getElementById("unlockProgress").innerHTML = selectedTech.steps.map((_, index) => `<span class="${index <= unlockStep ? "active" : ""}"></span>`).join("");
  document.getElementById("prevUnlock").disabled = unlockStep === 0;
  document.getElementById("nextUnlock").innerHTML = unlockStep === selectedTech.steps.length - 1 ? `Concluir guia ${icon("check")}` : `Próxima etapa ${icon("arrow")}`;
  const scene = technologyScene(selectedTech, unlockStep);
  renderScene(document.getElementById("unlockDeviceScene"), scene.model, scene.target, selectedTech.name);
  document.querySelectorAll("[data-unlock-step]").forEach((item) => item.addEventListener("click", () => { unlockStep = Number(item.dataset.unlockStep); renderUnlock(); }));
}
document.getElementById("nextUnlock").addEventListener("click", () => { if (unlockStep < selectedTech.steps.length - 1) { unlockStep += 1; renderUnlock(); } else showToast("Guia concluído. Registre o resultado conforme o procedimento da operação."); });
document.getElementById("prevUnlock").addEventListener("click", () => { if (unlockStep > 0) { unlockStep -= 1; renderUnlock(); } });

function pdfSafe(value) {
  return String(value).replace(/[–—]/g, "-").replace(/•/g, "-").replace(/…/g, "...");
}

function wrapPdfText(text, font, size, maxWidth) {
  const words = pdfSafe(text).split(/\s+/);
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) current = next;
    else { if (current) lines.push(current); current = word; }
  });
  if (current) lines.push(current);
  return lines;
}

function drawPdfDevice(page, manual, activeTarget, colors) {
  const { rgb } = PDFLib;
  const x = 76, y = 230, width = 444, height = 250;
  page.drawRectangle({ x, y, width, height, color: rgb(.94,.96,.97), borderColor: colors.line, borderWidth: 1 });
  if (manual.device === "system") {
    page.drawRectangle({ x: x + 35, y: y + 36, width: width - 70, height: height - 72, color: rgb(1,1,1), borderColor: colors.navy, borderWidth: 2 });
    page.drawRectangle({ x: x + 35, y: y + height - 67, width: width - 70, height: 31, color: colors.navy });
    page.drawRectangle({ x: x + 70, y: y + 132, width: 155, height: 24, color: activeTarget === "search" ? colors.bluePale : rgb(.95,.96,.97), borderColor: colors.line, borderWidth: 1 });
    [0,1,2].forEach((row) => page.drawRectangle({ x: x + 70, y: y + 91 - row * 23, width: 245, height: 18, color: row === 0 && activeTarget === "row" ? colors.bluePale : rgb(1,1,1), borderColor: colors.line, borderWidth: .6 }));
    ["history","inputs","outputs","review"].forEach((target, index) => page.drawRectangle({ x: x + 330, y: y + 126 - index * 25, width: 72, height: 18, color: activeTarget === target ? colors.blue : rgb(.87,.9,.92) }));
    return;
  }
  const tablet = ["smart-tab","sasmdt"].includes(manual.device);
  const bodyX = x + (tablet ? 70 : 28), bodyY = y + (tablet ? 48 : 35), bodyW = width - (tablet ? 140 : 56), bodyH = height - (tablet ? 90 : 70);
  page.drawRectangle({ x: bodyX, y: bodyY, width: bodyW, height: bodyH, color: colors.device, borderColor: rgb(.1,.14,.18), borderWidth: 3 });
  page.drawRectangle({ x: bodyX + 34, y: bodyY + bodyH - (tablet ? 100 : 62), width: bodyW - 68, height: tablet ? 70 : 42, color: rgb(.72,.84,.76), borderColor: rgb(.15,.2,.18), borderWidth: 1 });
  if (tablet) {
    [[0,0],[1,0],[0,1],[1,1]].forEach(([col,row], index) => page.drawRectangle({ x: bodyX + 48 + col * 112, y: bodyY + 24 + row * 36, width: 98, height: 27, color: (activeTarget === ["messages","nav","confirm","screen"][index]) ? colors.blue : rgb(.16 + index*.03,.28,.43) }));
  } else {
    for (let row = 0; row < 3; row += 1) for (let col = 0; col < 10; col += 1) page.drawRectangle({ x: bodyX + 28 + col * 31, y: bodyY + 22 + row * 24, width: 24, height: 16, color: activeTarget === "letters" && row === 1 && col === 4 ? colors.blue : rgb(.18,.21,.25), borderColor: rgb(.5,.55,.6), borderWidth: .5 });
    page.drawRectangle({ x: bodyX + bodyW - 75, y: bodyY + 20, width: 52, height: 22, color: ["enter","confirm"].includes(activeTarget) ? colors.blue : rgb(.22,.26,.3) });
  }
}

async function generateDriverPdf(manual) {
  if (!window.PDFLib) { showToast("Não foi possível carregar o gerador de PDF."); return; }
  const button = document.getElementById("generateDriverPdf");
  const original = button?.innerHTML;
  if (button) { button.disabled = true; button.textContent = "Gerando PDF..."; }
  try {
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    pdfDoc.setTitle(`Guia do motorista - ${manual.title}`);
    pdfDoc.setAuthor("Smart Risk - Treinamento Smart");
    pdfDoc.setSubject("Operação básica do teclado embarcado");
    const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const colors = { navy: rgb(.03,.09,.16), blue: rgb(.03,.47,.86), bluePale: rgb(.82,.91,.98), line: rgb(.75,.8,.84), device: rgb(.18,.21,.25), text: rgb(.15,.2,.26), muted: rgb(.4,.46,.52) };
    let logo;
    try { logo = await pdfDoc.embedPng(await fetch("assets/smart-risk-logo.png").then((response) => response.arrayBuffer())); } catch (_) { logo = null; }
    const addHeader = (page, title, pageNumber) => {
      page.drawRectangle({ x: 0, y: 792, width: 595, height: 50, color: colors.navy });
      if (logo) page.drawImage(logo, { x: 42, y: 805, width: 116, height: 28 });
      page.drawText(pdfSafe(title), { x: 190, y: 811, font: bold, size: 10, color: rgb(.93,.96,.98) });
      page.drawLine({ start: { x: 42, y: 48 }, end: { x: 553, y: 48 }, color: colors.line, thickness: .6 });
      page.drawText(`Treinamento Smart | ${pageNumber}`, { x: 42, y: 30, font: regular, size: 8, color: colors.muted });
    };
    const cover = pdfDoc.addPage([595,842]);
    cover.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: colors.navy });
    if (logo) cover.drawImage(logo, { x: 54, y: 725, width: 205, height: 50 });
    cover.drawText("GUIA DO MOTORISTA", { x: 54, y: 615, font: bold, size: 14, color: colors.blue });
    wrapPdfText(manual.title, bold, 34, 470).forEach((line, index) => cover.drawText(line, { x: 54, y: 566 - index * 42, font: bold, size: 34, color: rgb(.96,.98,1) }));
    cover.drawText("Uso basico do teclado embarcado", { x: 54, y: 425, font: regular, size: 17, color: rgb(.72,.79,.86) });
    cover.drawRectangle({ x: 54, y: 255, width: 487, height: 88, color: rgb(.07,.14,.23), borderColor: rgb(.14,.3,.48), borderWidth: 1 });
    cover.drawText("ESCOPO DESTA VERSAO", { x: 76, y: 313, font: bold, size: 9, color: colors.blue });
    wrapPdfText("Este material apresenta somente a operacao basica do teclado. O sequenciamento de macros sera incluido depois da validacao da nova operacao.", regular, 11, 440).forEach((line, index) => cover.drawText(line, { x: 76, y: 289 - index * 17, font: regular, size: 11, color: rgb(.84,.88,.92) }));
    cover.drawText("Material de apoio. Em caso de divergencia, siga a orientacao vigente da Central.", { x: 54, y: 70, font: regular, size: 9, color: rgb(.56,.64,.72) });
    manual.flow.forEach((step, index) => {
      const page = pdfDoc.addPage([595,842]);
      addHeader(page, manual.title, index + 2);
      page.drawText(`ETAPA ${String(index + 1).padStart(2,"0")}`, { x: 42, y: 735, font: bold, size: 10, color: colors.blue });
      page.drawText(pdfSafe(step[0]), { x: 42, y: 693, font: bold, size: 25, color: colors.text });
      wrapPdfText(step[1], regular, 12, 500).forEach((line, lineIndex) => page.drawText(line, { x: 42, y: 659 - lineIndex * 18, font: regular, size: 12, color: colors.muted }));
      drawPdfDevice(page, manual, step[2], colors);
      page.drawRectangle({ x: 42, y: 103, width: 511, height: 80, color: rgb(.96,.97,.98), borderColor: colors.line, borderWidth: 1 });
      page.drawText("ANTES DE CONFIRMAR", { x: 60, y: 154, font: bold, size: 9, color: colors.navy });
      page.drawText("Leia o visor, confira a opcao selecionada e pressione a tecla somente uma vez.", { x: 60, y: 128, font: regular, size: 10, color: colors.text });
    });
    const bytes = await pdfDoc.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `Guia_Motorista_${manual.title.replace(/[^a-z0-9]+/gi,"_")}.pdf`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToast("PDF do motorista gerado com sucesso.");
  } catch (error) {
    console.error(error);
    showToast("Não foi possível gerar o PDF. Tente novamente.");
  } finally {
    if (button) { button.disabled = false; button.innerHTML = original; }
  }
}

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
