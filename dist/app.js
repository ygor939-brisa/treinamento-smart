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

/* ==== tecnologias do desbloqueio — roteiro fiel ao Excel "Treinamento Central Atualizado" ==== */
/* passo = [título, descrição, cena]: cena "d:alvo" usa o equipamento, "s:alvo" usa o sistema e "k:alvo" é digitação */
const technologies = [
  { id: "sighra", name: "SIGHRA", kind: "TABLET", photo: "assets/tech/sighra.png", summary: "Comando Telefônico no tablet e geração da senha no sistema Sighra.", steps: [
    ["Abrir Comando Telefônico", "Peça ao condutor tocar na opção “Comando Telefônico” do tablet.", "d:menu"],
    ["Ler o código e aguardar", "O sistema exibe o código do Comando Remoto e o campo da senha. O condutor NÃO pode sair da tela antes de digitar a senha telefônica — senão ela fica inválida.", "d:screen"],
    ["Pesquisar a placa", "No sistema Sighra, clique na coluna “Placa”, pressione Ctrl + F, pesquise a placa e clique com o botão direito em cima dela.", "s:search"],
    ["Comando Telefônico", "No menu do veículo, clique na opção “Comando Telefônico”. A seguinte tela é aberta.", "s:row"],
    ["Preencher os campos", "“Senha Motorista”: a senha que o condutor informou. “Comando”: a ação que será realizada no veículo. “Senha Telefônica”: a senha para repassar ao condutor.", "s:inputs"],
    ["Digitar a senha", "Repasse a senha gerada ao condutor para digitar no tablet — o veículo será desbloqueado.", "s:review"],
  ] },
  { id: "ravex", name: "RAVEX", kind: "TECLADO", photo: "assets/tech/ravex.png", summary: "ContraSenha no teclado Ravex e geração da resposta no sistema Ravex.", steps: [
    ["Abrir ContraSenha", "Peça ao condutor clicar no botão esquerdo e ir na opção “ContraSenha”.", "d:menu"],
    ["Confirmar com OK", "O condutor aperta OK na opção “ContraSenha”.", "d:screen"],
    ["Repassar a senha", "O teclado gera a senha; o condutor repassa ao operador para colocar no sistema Ravex.", "d:confirm"],
    ["Guia Contra-senha", "Com a senha do condutor, vá no sistema Ravex, na guia “Contra-senha”. Preencha “Veículo” (placa), “Ação” (o que será feito) e “Senha” (gerada no teclado). A senha vem dividida por “ | ” — a segunda metade da senha dá acesso ao status de sensores e atuadores.", "s:search"],
    ["Escolher a ação", "Desalarmar: desbloqueia e desliga a sirene. Destravar Baús: destrava os baús. Desabilitar Completo: inibe todos os sensores, desbloqueia e desliga a sirene.", "s:inputs"],
    ["Digitar a contrassenha", "Clique em “Gerar Contra Senha” e informe a contrassenha ao condutor para digitar no teclado. Estando tudo correto, o veículo será desbloqueado.", "s:review"],
  ] },
  { id: "onixsat", name: "ONIXSAT", kind: "TECLADO", photo: "assets/tech/onixsat.png", summary: "Senha e Contra Senha no teclado Onixsat e geração no sistema.", steps: [
    ["Senha e Contra Senha", "Peça ao condutor ir na opção “Senha e Contra Senha” do teclado.", "d:menu"],
    ["Desbloqueio Manual", "Logo em seguida, o condutor aperta OK na opção “Desbloqueio Manual”.", "d:screen"],
    ["Repassar a senha", "O teclado gera a senha; o condutor repassa ao operador para colocar no sistema Onixsat.", "d:confirm"],
    ["Localizar a placa", "No sistema Onixsat, siga os passos para gerar a contra senha: pesquise o veículo.", "s:search"],
    ["Senha/Contra-Senha", "Clique com o botão direito em cima da placa e escolha a opção “Senha/Contra-Senha”. “Senha”: a senha que o condutor passou. “Motivo”: qualquer motivo serve — não interfere na geração.", "s:row"],
    ["Digitar a contra-senha", "Gere a contra-senha, repasse ao condutor para digitar no teclado e oriente a clicar “OK” até receber “CONTRA-SENHA CORRETA”. O veículo será desbloqueado.", "s:review"],
  ] },
  { id: "omnilink", name: "OMNILINK", kind: "TECLADO", photo: "assets/tech/omnilink.png", summary: "Desbloqueio por ocorrência no terminal e senha no Gestor Web.", steps: [
    ["Menu › Desbloqueio", "Peça ao condutor abrir o Menu e depois a opção “Desbloqueio”.", "d:menu"],
    ["Confirmar com Enter", "O condutor aperta “Enter” na opção “Desbloqueio”.", "d:screen"],
    ["Repassar a senha", "O teclado gera a “senha”, que o condutor repassa ao operador para colocar no Gestor Web.", "d:confirm"],
    ["Digitar a placa", "No Gestor Web, digite a “placa” que receberá o desbloqueio por ocorrência e clique no botão para minimizar o filtro.", "s:search"],
    ["Ocorrência › Senha Desbloqueio", "Clique com o botão direito na placa, selecione “Ocorrência” e depois “Senha Desbloqueio”. Uma tela para gerar a senha será aberta.", "s:row"],
    ["Preencher a geração de senha", "“Ocorrência”: a ocorrência informada pelo condutor. “Data/Hora”: data e hora atuais — sem isso a senha não é gerada. “Motivo”: “Tratado” não pede justificativa, “Outro” pede a descrição. “Operação”: “Desbloqueio” apenas desliga o bloqueio; “Desativar” desativa sensores e atuadores por completo.", "s:inputs"],
    ["Digitar a senha", "Com a “Senha” gerada, repasse ao motorista para digitar no teclado. O condutor aperta “Enter” e o veículo será desbloqueado.", "s:review"],
  ] },
  { id: "sascar", name: "SASCAR · ESCOLHA O MODELO", kind: "MODELOS", photo: "assets/tech/sascar.png", summary: "Sascar tem quatro modelos de equipamento. Escolha o modelo para seguir o passo a passo correto.", choices: ["sascar-novo", "sascar-tablet", "sascar-teclado", "hibrido"], steps: [] },
  { id: "sascar-novo", name: "SASCAR · NOVO TABLET", kind: "TABLET", photo: "assets/tech/sascar-novo.png", summary: "Desbloqueio manual, identificação e desativação do bloqueio no novo tablet.", steps: [
    ["Menu principal", "Peça ao condutor tocar, na barra de status superior, a opção do menu principal.", "d:menu"],
    ["Gerar Senha", "Na tela seguinte, o condutor entra na opção “Gerar Senha”.", "d:screen"],
    ["Escolher e gerar", "O condutor escolhe a opção desejada e clica no botão amarelo “GERAR SENHA”. A tela mostra a senha gerada.", "d:confirm"],
    ["Contra Senha no SASGC", "Com a senha do condutor, coloque-a no software SASGC no seu PC para gerar a “Contra Senha” e informe o resultado. Obs.: quando aparecer o caractere “Ø”, é o número 0.", "s:row"],
    ["Identificação", "Com a contra senha aceita no tablet, o condutor confirma a identificação para realizar o desbloqueio com sucesso.", "s:inputs"],
    ["Atuadores", "Peça ao condutor ir no menu principal e depois na opção “Atuadores”.", "d:menu"],
    ["Desativar o bloqueio", "Solicite “Desativar o bloqueio”. Assim que ele desativar, aparece a tela de login e senha.", "d:confirm"],
    ["Login e senha", "Padrão BR: login 123456 e senha 12345. Operações fora do padrão BR usam o login próprio do condutor. Com o login e a senha corretos, o desbloqueio acontece.", "s:review"],
  ] },
  { id: "sascar-tablet", name: "SASCAR · TABLET", kind: "TABLET", photo: "assets/tech/sascar-tablet.png", summary: "Geração de senha, SASGC e desativação do bloqueio pelo tablet.", steps: [
    ["Sensores e atuadores", "Peça ao condutor ir na opção “Sensores e atuadores”.", "d:menu"],
    ["Gerar senha", "Em seguida, peça ao condutor ir na opção “Gerar senha”.", "d:screen"],
    ["Escolher e gerar", "O condutor escolhe a opção que deseja desativar — atuador ou sensor — e aperta a opção “Gerar Senha”.", "d:confirm"],
    ["Contra Senha no SASGC", "Com a senha do condutor, coloque-a no software SASGC no seu PC para gerar a “Contra Senha”. Obs.: quando aparecer o caractere “Ø”, é o número 0.", "s:row"],
    ["Identificação", "Com a contra senha aceita no tablet, o condutor confirma a identificação para realizar o desbloqueio com sucesso.", "s:inputs"],
    ["Atuar › Bloqueio", "Solicite ao condutor ir em “Sensores e atuadores”, depois “Atuar” e, com o bloqueio ativo, apertar a opção “Bloqueio”.", "d:confirm"],
    ["Login e senha", "Padrão BR: login 123456 e senha 12345. Operações fora do padrão BR usam o login próprio do condutor. Com o login e a senha corretos, o desbloqueio acontece.", "s:review"],
  ] },
  { id: "hibrido", name: "HÍBRIDO", kind: "TECLADO", photo: "assets/tech/hibrido.png", summary: "Modo seguro de sensores e atuadores no teclado híbrido Sascar.", steps: [
    ["Tecla F7", "Peça ao condutor pressionar a tecla F7 para entrar no menu de serviços.", "d:menu"],
    ["Selecionar o item", "F0: modo seguro dos sensores. F1: modo seguro dos atuadores. F2: ligar ou desligar os atuadores.", "d:screen"],
    ["Definir o modo", "Ao entrar no modo do acessório, o condutor usa as setas e pressiona Enter. A tela pede a digitação da contrassenha.", "d:confirm"],
    ["Contra senha no SASGC", "Com a senha do condutor, coloque-a no software SASGC no seu PC para gerar a contra senha. Obs.: quando aparecer o caractere “Ø”, é o número 0.", "s:row"],
    ["Digitar a contrassenha", "O condutor digita a contrassenha e pressiona Enter novamente — o teclado indica o novo status do modo seguro do acessório selecionado.", "s:inputs"],
    ["F7 e F2", "Peça ao condutor clicar na tecla F7 (serviços) e depois em F2, para abrir a tela de login e senha.", "d:menu"],
    ["Login e senha", "Padrão BR: login 123456 e senha 12345. Operações fora do padrão BR usam o login próprio do condutor. Com o login e a senha corretos, o desbloqueio acontece.", "s:review"],
  ] },
  { id: "sascar-teclado", name: "TECLADO SASCAR", kind: "TECLADO", photo: "assets/tech/sascar-teclado.png", summary: "Geração de senha com F7 e F1 e motorista padrão gerado pelo sistema.", steps: [
    ["Tecla F7", "Para gerar a senha do desbloqueio manual, peça para o condutor apertar a tecla F7.", "d:menu"],
    ["Tecla F1", "Depois peça para ele clicar no F1.", "d:screen"],
    ["Selecionar o atuador", "Na tela, selecione o atuador que deseja acionar: use a tecla [TAB] para mover e [X] ou [ESPAÇO] para selecionar.", "d:confirm"],
    ["Senha do teclado", "Aparece a tela contendo a senha. Peça para o condutor te informar a senha que aparece para ele.", "d:screen"],
    ["Contra senha no SASGC", "Com a senha do condutor, coloque-a no software SASGC no seu PC para gerar a contra senha. Obs.: quando aparecer o caractere “Ø”, é o número 0.", "s:row"],
    ["F7 e F0", "Com a contra senha aceita e a identificação confirmada, o condutor aperta F7 (serviços) e depois F0.", "d:menu"],
    ["Login gerado pelo sistema", "Aqui, diferente dos tablets, o login e a senha são gerados pelo sistema, assim como a senha do desbloqueio.", "s:inputs"],
    ["Motorista padrão", "Clique em “GERAR MOTORISTA PADRÃO” e passe o login que aparecer ao condutor. Informe as senhas em sequência até chegar à última, usando sempre o mesmo login — só a senha muda.", "s:review"],
  ] },
  { id: "positron", name: "POSITRON", kind: "TABLET", photo: "assets/tech/positron.png", summary: "Acionar Atuador no tablet e contra-senha gerada no site da Positron.", steps: [
    ["Seta do lado", "Peça ao condutor clicar na seta para o lado, conforme a tela inicial.", "d:menu"],
    ["Avançar até a tela", "O condutor clica na seta de próximo até aparecer a tela inicial do equipamento.", "d:screen"],
    ["Acionar Atuador", "Solicite ao condutor clicar na opção “Acionar Atuador”.", "d:screen"],
    ["Escolher a opção", "Peça para o condutor escolher a opção que deseja — neste caso, “Desbloquear veículo”.", "d:confirm"],
    ["Senha do condutor", "Em seguida aparecerá a senha, que o condutor te passa pelo canal combinado.", "d:screen"],
    ["Site da Positron", "Com a senha do condutor, abra a opção “Comandos” no site da Positron, informe a senha e gere a “contra-senha”.", "s:search"],
    ["Digitar a contra senha", "O motorista clica em cima da linha em branco para abrir a digitação, digita toda a “CONTRA SENHA” e clica em “OK”.", "s:row"],
    ["Confirmar as telas", "Volta à tela anterior e é preciso clicar novamente em “OK”.", "s:row"],
    ["Atuador verde", "O atuador desejado fica sinalizado em VERDE, disponível para uso. O motorista seleciona a ação desejada, como “DESBLOQUEAR VEÍCULO”.", "s:inputs"],
    ["Confirmar ação", "O teclado pede a confirmação da ação: o motorista clica em CONFIRMAR e o veículo será desbloqueado.", "s:review"],
  ] },
  { id: "autotrac", name: "AUTOTRAC", kind: "TECLADO", photo: "assets/tech/autotrac.png", summary: "Desbloqueio no Autotrac Prime com senha gerada no Supervisor Web.", steps: [
    ["Antes de começar", "Confirme que o veículo é Autotrac Prime e está com a luz de sem sinal ligada. A confirmação do Prime aparece na abertura do veículo no Supervisor Web, quando há a opção de senha.", "s:review"],
    ["Ver Status", "Peça ao condutor clicar em VER STATUS e depois na seta para baixo 3 vezes.", "d:menu"],
    ["Escolher a opção", "Depois, ele escolhe a opção desejada: “1. Desbloqueio” ou “2. Destravamento (destravar baú)”.", "d:screen"],
    ["Gerar a senha", "Com a opção escolhida, peça a ele apertar o botão enter — a senha será gerada.", "d:confirm"],
    ["Senhas no Supervisor", "No Supervisor Web, clique na placa do veículo, vá na opção “Senhas”, coloque a sequência de letras e números que o condutor te passou e aperte “Gerar Senha”.", "s:search"],
    ["Digitar a contra senha", "Informe a contrassenha ao condutor. Depois que ele digitar a senha, peça para pressionar o botão “Enviar” — vai aparecer “Senha Válida · veículo desbloqueado”.", "s:inputs"],
    ["Se der erro de senha", "Peça ao condutor reiniciar o teclado: VER STATUS + seta para baixo, digitar o código serial sem os zeros à esquerda (ex.: 000257897 → 257897) e apertar ENTER — em velocidade considerável, sem digitar muito lento. Depois, seta para cima até a tela de reset do teclado.", "d:menu"],
  ] },
];

/* O roteiro completo e as imagens abaixo vêm diretamente do Excel original
   empacotado em assets/training-library/js/manuals-data.js. */
const trainingLibrary = window.TECH_MANUALS || { items: {} };
const trainingKeyByTechnology = {
  sighra: "sighra", ravex: "ravex", onixsat: "onixsat", omnilink: "omnilink",
  "sascar-novo": "sascar-novo-tablet", "sascar-tablet": "sascar-tablet",
  hibrido: "sascar-hibrido", "sascar-teclado": "sascar-teclado",
  positron: "positron", autotrac: "autotrac",
};
const trainingAsset = (src) => src ? `assets/training-library/${src}` : "";
function splitTrainingObservation(value) {
  const text = String(value || "").trim();
  const match = /\bobs\s*:/i.exec(text);
  if (!match) return { description: text, notice: "" };
  return {
    description: text.slice(0, match.index).trim(),
    notice: text.slice(match.index + match[0].length).trim(),
  };
}
function cleanStepDescription(value) {
  return String(value || "").trim().replace(/^\d+(?:\.\d+)*\.?\s*/, "").trim();
}
function completeStepsFromTraining(key) {
  const content = trainingLibrary.items?.[key]?.content || [];
  const images = content.filter((part) => part.type === "image" && part.src);
  const notices = [];
  const steps = [];
  content.filter((part) => part.type === "text" && String(part.text || "").trim()).forEach((part) => {
    const separated = splitTrainingObservation(part.text);
    if (separated.notice && !notices.includes(separated.notice)) notices.push(separated.notice);
    const description = cleanStepDescription(separated.description);
    if (!description) return;
    const following = images.filter((image) => (image.row || 0) >= (part.row || 0)).sort((a, b) => (a.row || 0) - (b.row || 0));
    const previous = images.filter((image) => (image.row || 0) < (part.row || 0)).sort((a, b) => (b.row || 0) - (a.row || 0));
    const nearest = following[0] || previous[0];
    steps.push([`Etapa ${steps.length + 1}`, description, trainingAsset(nearest?.src), part.row || 0]);
  });
  return { steps, notices };
}
technologies.forEach((tech) => {
  const trainingKey = trainingKeyByTechnology[tech.id];
  const complete = trainingKey ? completeStepsFromTraining(trainingKey) : [];
  if (complete.steps?.length) tech.steps = complete.steps;
  tech.notices = complete.notices || [];
  if (tech.id === "sighra" && !tech.notices.length) {
    tech.notices.push("Caso o veículo não seja desbloqueado mesmo após seguir todo o passo a passo, acione um técnico para verificar um possível problema no veículo. Sempre que possível, realize o procedimento com fotos e vídeos da situação atual para facilitar a análise.");
  }
  tech.trainingKey = trainingKey || "";
  tech.demo = tech.id === "autotrac" ? "assets/demos/autotrac.mp4" : "";
});

const tabletModels = ["smart-tab", "sasmdt", "positron-tablet"];
function resolveTarget(model, target) {
  if (tabletModels.includes(model) && target === "menu") return "nav";
  return target;
}

function stepScene(tech, index) {
  const code = tech.steps[index]?.[2] || "d:screen";
  const [kind, rawTarget] = code.split(":");
  if (kind === "s") return { model: "system", target: rawTarget };
  const model = technologyModels[tech.id] || "generic";
  const title = tech.steps[index]?.[0]?.toLocaleLowerCase("pt-BR") || "";
  let target = rawTarget === "typing" ? "letters" : resolveTarget(model, rawTarget);
  if (/\bf7\b/.test(title)) target = "f7";
  else if (/\bf2\b/.test(title)) target = "f2";
  else if (/\bf1\b/.test(title)) target = "f1";
  else if (/\bf0\b/.test(title)) target = "f0";
  else if (/tab|espaço|digitar|senha do teclado/.test(title) && kind === "d") target = "letters";
  else if (/enter/.test(title)) target = "enter";
  else if (/ok|confirmar|escolher e gerar|gerar a senha/.test(title) && kind === "d") target = "confirm";
  else if (/seta|avançar/.test(title)) target = "nav";
  return { model, target };
}


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
const publicAdminLinks = [...document.querySelectorAll(".admin-entry, .nav-admin-link")];
const publicAdminLoggedIn = localStorage.getItem("smartAdminAuthenticatedV4") === "true";

function finishSplash() { splash?.classList.add("hide"); window.setTimeout(() => splash?.remove(), 600); }
if (publicAdminLoggedIn) finishSplash(); else window.setTimeout(finishSplash, 4500);
if (publicAdminLoggedIn) {
  publicAdminLinks.forEach((link) => {
    const label = link.querySelector("span");
    if (label) label.textContent = "Sair da Área ADM";
    link.setAttribute("href", "#inicio");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("smartAdminAuthenticatedV4");
      window.location.href = "index.html#inicio";
      window.location.reload();
    });
  });
}

function navigate(route, updateHash = true) {
  const page = document.querySelector(`[data-page="${route}"]`);
  if (!page) return;
  pages.forEach((item) => item.classList.toggle("active", item === page));
  navLinks.forEach((link) => link.classList.toggle("active", link.dataset.route === route));
  menu.classList.remove("mobile-open");
  menuToggle.setAttribute("aria-expanded", "false");
  if (updateHash) history.replaceState(null, "", `#${route}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  const titles = { inicio: "Treinamento Smart", manuais: "Manuais de teclado", "manuais-tecnologia": "Manuais de tecnologia", desbloqueio: "Desbloqueio sem sinal", analista: "Cosmo", admin: "Área ADM" };
  document.title = `${titles[route] || "Treinamento Smart"} | Smart Risk`;
  window.requestAnimationFrame(refreshScenes);
}
routeControls.forEach((control) => control.addEventListener("click", (event) => { event.preventDefault(); navigate(control.dataset.route); }));
menuToggle?.addEventListener("click", () => { const open = menu.classList.toggle("mobile-open"); menuToggle.setAttribute("aria-expanded", String(open)); });
window.addEventListener("hashchange", () => navigate(location.hash.slice(1) || "inicio", false));

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }), { threshold: .1 });
document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const armsArt = {
  type: `<g class="arm-inner"><g class="arm-press">
      <path d="M120 157 L400 108 L400 196 Q214 209 128 207 Q106 205 108 186 Q109 166 120 157 Z" fill="url(#armSkinT)"/>
      <path d="M132 196 Q280 189 398 182 L400 196 Q260 206 132 207 Z" fill="#b97f52" opacity=".16"/>
      <path d="M198 128 L400 106 L400 202 Q290 210 196 212 Q192 170 198 128 Z" fill="url(#armSleeveT)"/>
      <path d="M330 116 L1700 -118 L1700 -16 L340 212 Z" fill="url(#armSleeveT)"/>
      <rect x="-5" y="-32" width="10" height="64" rx="5" transform="translate(207 170) rotate(78)" fill="#e8ecf3"/>
      <rect x="-1" y="-29" width="2" height="58" transform="translate(203.5 170) rotate(78)" fill="#141d62" opacity=".25"/>
      <path d="M112 158 Q132 152 148 150 L146 206 Q118 208 112 202 Z" fill="url(#armSkinT)"/>
      <path d="M54 182 Q52 156 84 152 Q114 154 118 180 Q120 202 100 208 Q68 214 54 182 Z" fill="url(#armSkinT)"/>
      <rect x="4" y="182" width="58" height="20" rx="10" fill="url(#armSkinT)"/>
      <path d="M14 186 Q23 183 29 185" stroke="#fff" opacity=".4" stroke-width="2" fill="none" stroke-linecap="round"/>
      <g fill="url(#armSkinT)">
        <rect x="106" y="150" width="27" height="21" rx="10" transform="rotate(-12 119 160)"/>
        <rect x="126" y="146" width="24" height="19" rx="9" transform="rotate(-8 138 155)"/>
        <rect x="145" y="146" width="20" height="16" rx="8" transform="rotate(-4 155 155)"/>
      </g>
      <g stroke="#c78a58" opacity=".4" stroke-width="1.3" fill="none" stroke-linecap="round">
        <path d="M110 158 q3 4 9 5"/>
        <path d="M129 153 q3 3 8 4"/>
        <path d="M147 152 q3 3 7 3"/>
      </g>
      <rect x="-9" y="-16" width="18" height="32" rx="9" transform="translate(99 218) rotate(32)" fill="url(#armSkinT)"/>
      <circle class="tap-ring" cx="16" cy="192" r="15"/>
    </g></g>`,
  hold: `<g class="arm-inner">
      <rect x="-186" y="-26" width="192" height="52" rx="26" transform="translate(166 168) rotate(-33.6)" fill="url(#armSkinH2)"/>
      <rect x="-186" y="-36" width="122" height="72" rx="12" transform="translate(166 168) rotate(-33.6)" fill="url(#armSleeveH)"/>
      <rect x="-72" y="-38" width="9" height="76" rx="4" transform="translate(166 168) rotate(-33.6)" fill="#e8ecf3"/>
      <rect x="-69" y="-34" width="2" height="68" transform="translate(166 168) rotate(-33.6)" fill="#141d62" opacity=".25"/>
      <path d="M146 128 Q148 96 190 92 Q232 92 244 120 Q254 150 238 178 Q216 200 184 198 Q150 194 146 160 Q144 144 146 128 Z" fill="url(#armSkinH)"/>
      <g fill="url(#armSkinH)">
        <rect x="212" y="96" width="34" height="20" rx="10" transform="rotate(-6 229 106)"/>
        <rect x="218" y="116" width="32" height="19" rx="9.5" transform="rotate(-2 234 125)"/>
        <rect x="220" y="136" width="30" height="18" rx="9" transform="rotate(2 235 145)"/>
        <rect x="218" y="155" width="27" height="17" rx="8.5" transform="rotate(6 231 163)"/>
      </g>
      <g stroke="#c78a58" opacity=".4" stroke-width="1.3" fill="none" stroke-linecap="round">
        <path d="M216 104 l26 2"/>
        <path d="M222 124 l24 1"/>
        <path d="M224 144 l22 1"/>
        <path d="M222 163 l20 1"/>
      </g>
      <rect x="-11" y="-39" width="22" height="78" rx="11" transform="translate(160 158) rotate(14)" fill="url(#armSkinH)"/>
      <path d="M156 124 q7 6 8 13" stroke="#c78a58" opacity=".35" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M152 182 Q188 198 236 182 Q220 198 186 196 Q162 192 152 182 Z" fill="#b97f52" opacity=".16"/>
    </g>`,
};

function armMarkup() {
  return `<svg class="arm arm-hold" viewBox="0 0 300 260" aria-hidden="true">${armsArt.hold}</svg><svg class="arm arm-type" viewBox="0 0 320 220" aria-hidden="true">${armsArt.type}</svg>`;
}

function alphaKeys(withDigits) {
  const letters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
  const digits = { Q:"1",W:"2",E:"3",R:"4",T:"5",Y:"6",U:"7",I:"8",O:"9",P:"0" };
  return letters.map((letter) => `<i data-key="${letter}">${letter}${withDigits && digits[letter] ? `<sup>${digits[letter]}</sup>` : ""}</i>`).join("");
}

function systemWindowMarkup(label) {
  return `<div class="system-window"><div class="system-top"><span></span><span></span><span></span><b>Sistema de Gestão de Riscos</b><nav class="sys-tabs"><em class="on">Serviços do veículo</em><em>Fluxo de comandos</em><em class="sys-logout">Sair</em></nav></div><aside class="sys-side"><i></i><i></i><i></i><i></i><i></i></aside><main><div class="sys-brand">${label}</div><div class="system-search" data-control="search">Pesquisar placa <strong>ABC1D23</strong></div><div class="system-grid"><div class="system-row system-head"><span>Placa</span><span>Status</span><span>Comunicação</span></div><div class="system-row" data-control="row"><span>ABC1D23</span><span>Em viagem</span><span>Agora</span></div></div><div class="system-menu"><span class="system-menu-title">Opções da linha</span><span data-control="history">Histórico</span><span data-control="inputs">Entradas · sensores</span><span data-control="outputs">Saídas · atuadores</span><span data-control="review">Revisar ação</span></div><div class="sys-tiles"><div><small>Rápidos</small></div><span>Histórico</span><span>Monitoramento</span><span>Mensagens</span><span>Fluxo de comandos</span><span>Contra-senha</span></div><div class="mouse-pointer"><i></i></div></main></div>`;
}

function deviceMarkup(model, label) {
  if (model === "system") return systemWindowMarkup(label);
  if (model === "smart-tab" || model === "sasmdt") return `<div class="training-device tablet-device ${model}"><div class="speaker-grid"></div><div class="device-screen" data-control="screen"><div class="screen-status"><b>${label}</b><small>Terminal conectado</small></div><div class="tile-grid"><span>STATUS</span><span data-control="messages">MENSAGENS</span><span data-control="nav">MENU</span><span data-control="confirm">CONFIRMAR</span></div></div></div>${armMarkup()}`;
  if (model === "onixsmart") return `<div class="training-device keyboard-device kb-onixsmart"><div class="keyboard-screen onix-lcd" data-control="screen"><b>${label}</b><span>Selecione uma opção</span></div><div class="onix-deck"><div class="onix-side"><button data-control="menu">SETUP</button><button data-control="alt">ALT</button><button>SHIFT</button></div><div class="keyboard-main onix-keys" data-control="letters">${alphaKeys(true).replace('data-key="Q">', 'data-key="Q" data-control="1">')}</div><div class="onix-right"><button>ESC</button><button data-control="enter">ENTER</button></div></div><div class="keyboard-footer onix-bottom"><button data-control="nav">◀ ▲ ▼ ▶</button><span class="onix-space"></span><button data-control="confirm">OK</button></div><small class="kb-brand onix-brand">Onix</small></div>${armMarkup()}`;
  if (model === "omnilink") return `<div class="training-device keyboard-device kb-omnilink"><div class="omni-bar"><span class="kb-brand omni-brand">Omni<b>Link</b></span><div class="keyboard-screen omni-lcd" data-control="screen"><span>Selecione uma opção</span></div><div class="omni-fkeys"><button>M1</button><button>M2</button></div></div><div class="omni-deck"><div class="keyboard-main omni-round" data-control="letters">${alphaKeys(true)}</div><aside class="omni-side"><button class="omni-pill" data-control="menu">MENU</button><button class="omni-pill">ALT</button><button class="omni-pill">F</button><div class="omni-arrows" data-control="nav"><i>◀</i><i>▲</i><i>▼</i><i>▶</i></div></aside></div><div class="keyboard-footer omni-footer"><button class="omni-pill" data-control="alt">ALT</button><span class="omni-space"></span><button data-control="enter">ENTER</button><button data-control="confirm">OK</button></div></div>${armMarkup()}`;
  if (model === "driver-keyboard") return `<div class="training-device keyboard-device kb-driver"><div class="driver-top"><div class="keyboard-screen driver-lcd" data-control="screen"><b>${label}</b><span>Status ok · aguardando</span></div><div class="speaker-grid driver-grille"></div></div><div class="driver-frow"><i>F1</i><i>F2</i><i>F3</i><i>F4</i><i>F5</i><i>F6</i></div><div class="driver-deck"><div class="keyboard-main driver-oval" data-control="letters">${alphaKeys(false)}</div><aside class="driver-side"><button data-control="menu">MENU</button><button data-control="alt">2nd</button><button>DEL</button><div class="driver-arrows" data-control="nav"><i>◀</i><i>▲</i><i>▼</i><i>▶</i></div></aside></div><div class="keyboard-footer driver-footer"><button data-control="confirm">OK</button><span class="driver-space">ESPAÇO</span><button data-control="enter">ENTER</button></div></div>${armMarkup()}`;
  if (model === "ravex") return `<div class="training-device kb-ravex"><div class="ravex-head"><div class="ravex-volume" data-control="menu"><i>−</i><i>+</i></div><div class="keyboard-screen ravex-lcd" data-control="screen"><b>${label}</b><span>Selecione uma opção</span></div><div class="ravex-arrows" data-control="nav"><i>▲</i><i>◀</i><i>▶</i><i>▼</i></div></div><div class="ravex-status"><span>Veículo em viagem</span><span>Veículo bloqueado</span><span>MSG recebida</span><span>Sem sinal</span></div><div class="ravex-actions"><button data-control="menu">INÍCIO<br>VIAGEM</button><button>COLETA</button><button>REFEIÇÕES</button><button>PERNOITE</button><button>CRIAR MSG</button><button>FIM<br>VIAGEM</button><button>CANCELAR</button><button>OUTRAS</button><button>REINÍCIO</button><button data-control="confirm">OK</button></div><div class="ravex-numpad" data-control="letters">${[1,2,3,4,5,6,7,8,9,0].map((key)=>`<i data-key="${key}">${key}</i>`).join("")}<button data-control="enter">ENTER</button></div></div>${armMarkup()}`;
  if (model === "positron") return `<div class="training-device positron-device"><div class="keyboard-screen positron-screen" data-control="screen"><div class="positron-bar"><b>POSITRON</b><small>22:31</small></div><div class="positron-tiles"><button data-control="menu">Macros</button><button>Caixa de entrada</button><button>Mensagens</button><button data-control="confirm">Entregas</button><button>Sair</button><button data-control="nav">Próximo</button></div><span>Aguardando comando</span></div></div>${armMarkup()}`;
  if (model === "autotrac") return `<div class="training-device kb-autotrac"><div class="autotrac-wing left"></div><div class="autotrac-wing right"></div><div class="keyboard-screen autotrac-lcd" data-control="screen"><b>${label}</b><span>Mensagem da central</span></div><div class="autotrac-deck"><div class="autotrac-col"><em>M1</em><em>M2</em><em data-control="menu">MENU</em></div><div class="keyboard-main autotrac-keys" data-control="letters">${alphaKeys(false)}</div><div class="autotrac-col"><em class="at-green" data-control="enter">ENTER</em><em class="at-red" data-control="confirm">SOC</em><div class="at-arrows" data-control="nav"><i>◀</i><i>▲</i><i>▼</i><i>▶</i></div></div></div><small class="kb-brand autotrac-brand">SATEL</small></div>${armMarkup()}`;
  if (model === "sascar-keyboard") return `<div class="training-device keyboard-device kb-sascar"><div class="keyboard-screen sascar-lcd" data-control="screen"><b>${label}</b><span>SASCAR TECNOLOG · SEQ | SRV | MSG | TXT</span></div><div class="sascar-frow"><i data-control="f0">F0</i><i data-control="f1">F1</i><i data-control="f2">F2</i><i>F3</i><i>F4</i><i>F5</i><i>F6</i><i data-control="f7">F7</i><i>F8</i><i>F9</i></div><div class="sascar-deck"><div class="keyboard-main sascar-keys" data-control="letters">${alphaKeys(true)}</div><aside class="sascar-side"><button data-control="menu">MENU</button><button>DEL</button><div class="sascar-arrows" data-control="nav"><i>◀</i><i>▲</i><i>▼</i><i>▶</i></div><button data-control="enter">Enter</button></aside></div><div class="keyboard-footer sascar-footer"><button data-control="alt">TAB</button><span class="sascar-space">ESPAÇO</span><button data-control="confirm">OK</button></div><small class="kb-brand sascar-brand">SASCAR</small></div>${armMarkup()}`;
  return `<div class="training-device keyboard-device kb-generic"><div class="keyboard-screen" data-control="screen"><b>${label}</b><span>Selecione uma opção</span></div><div class="keyboard-controls"><button data-control="menu">MENU</button><button data-control="1">1</button><button>2</button><button>3</button></div><div class="keyboard-main" data-control="letters">${alphaKeys(false)}</div><div class="keyboard-footer"><button data-control="alt">ALT</button><span></span><button data-control="nav">◀ ▲ ▼ ▶</button><button data-control="enter">ENTER</button><button data-control="confirm">OK</button></div></div>${armMarkup()}`;
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function stopTypingScene(scene) {
  if (scene?._typingTimer) { window.clearInterval(scene._typingTimer); scene._typingTimer = null; }
}

function scenePoint(scene, element) {
  const sceneRect = scene.getBoundingClientRect();
  const rect = element?.getBoundingClientRect();
  if (!sceneRect.width || !rect?.width) return null;
  return {
    x: ((rect.left + rect.width / 2 - sceneRect.left) / sceneRect.width) * 100,
    y: ((rect.top + rect.height / 2 - sceneRect.top) / sceneRect.height) * 100,
  };
}

function aimArm(scene, element) {
  const point = scenePoint(scene, element);
  if (!point) return false;
  scene.style.setProperty("--action-x", `${point.x.toFixed(2)}%`);
  scene.style.setProperty("--action-y", `${point.y.toFixed(2)}%`);
  return true;
}

function aimArmAtControl(scene, target) {
  const control = scene.querySelector(`[data-control="${CSS.escape(target)}"]`);
  aimArm(scene, control || scene.querySelector(".device-screen, .keyboard-screen"));
}

function gripArmToScene(scene, model) {
  const device = scene.querySelector(".training-device");
  if (!device) return;
  const sceneRect = scene.getBoundingClientRect();
  const deviceRect = device.getBoundingClientRect();
  if (!sceneRect.width || !deviceRect.width) return;
  const holdX = ((deviceRect.left - sceneRect.left) / sceneRect.width) * 100;
  const holdY = ((deviceRect.top + deviceRect.height * .74 - sceneRect.top) / sceneRect.height) * 100;
  scene.style.setProperty("--hold-x", `${holdX.toFixed(2)}%`);
  scene.style.setProperty("--hold-y", `${holdY.toFixed(2)}%`);
}

function refreshScene(scene) {
  if (!scene.offsetParent) return false;
  if (scene.classList.contains("scene-system")) {
    aimArmAtControl(scene, scene.dataset.target || "search");
    return true;
  }
  gripArmToScene(scene, scene.dataset.model);
  aimArmAtControl(scene, scene.dataset.target || "screen");
  return true;
}

function refreshScenes() {
  document.querySelectorAll(".device-scene[data-target]").forEach((scene) => refreshScene(scene));
}

function runTypingScene(scene) {
  stopTypingScene(scene);
  scene.classList.remove("is-tapping", "is-pointing");
  if (reducedMotion.matches) return;
  const keys = [...scene.querySelectorAll("[data-key]")];
  const screen = scene.querySelector(".keyboard-screen span");
  const typingWord = scene.dataset.model === "ravex" ? "2580" : "PLACA";
  let typed = "";
  let index = 0;
  const typeNext = () => {
    const letter = typingWord[index];
    const key = keys.find((item) => item.dataset.key === letter);
    if (key) {
      aimArm(scene, key);
      key.classList.add("key-hit");
      window.setTimeout(() => key.classList.remove("key-hit"), 320);
      typed += letter;
      if (screen) screen.textContent = `${typed}▌`;
    }
    index += 1;
    if (index >= typingWord.length) {
      scene._typingTimer = null;
      if (screen) screen.textContent = typed;
      scene.classList.remove("is-tapping");
      return;
    }
    scene.classList.remove("is-tapping");
    void scene.offsetWidth;
    scene.classList.add("is-tapping");
  };
  typeNext();
  scene._typingTimer = window.setInterval(typeNext, 430);
}

function applySceneState(container, state = {}) {
  const title = state.title || "Procedimento em andamento";
  const rawDetail = state.detail || "Acompanhe a opção indicada";
  const detail = rawDetail.length > 74 ? `${rawDetail.slice(0, 71).trim()}…` : rawDetail;
  const tabletTitle = container.querySelector(".device-screen .screen-status b");
  const tabletDetail = container.querySelector(".device-screen .screen-status small");
  const keyboardTitle = container.querySelector(".keyboard-screen b");
  const keyboardDetail = container.querySelector(".keyboard-screen span");
  if (tabletTitle) tabletTitle.textContent = title;
  if (tabletDetail) tabletDetail.textContent = detail;
  if (keyboardTitle) keyboardTitle.textContent = title;
  if (keyboardDetail) keyboardDetail.textContent = detail;
  const systemBrand = container.querySelector(".sys-brand");
  if (systemBrand) systemBrand.textContent = title;
  const focused = container.querySelector(`[data-control="${CSS.escape(container.dataset.target || "search")}"]`);
  if (focused && container.classList.contains("scene-system")) {
    focused.setAttribute("data-step-label", title);
    focused.classList.add("system-focus");
  }
}

function renderScene(container, model, target, label, state = {}) {
  if (!container) return;
  stopTypingScene(container);
  container.className = `device-scene scene-${model}`;
  container.dataset.target = target;
  container.dataset.model = model;
  container.innerHTML = deviceMarkup(model, label);
  applySceneState(container, state);
  container.querySelectorAll("[data-control]").forEach((control) => control.classList.toggle("control-active", control.dataset.control === target));
  window.requestAnimationFrame(() => {
    refreshScene(container);
    if (!container.offsetParent) return;
    if (target === "letters" && model !== "system") { runTypingScene(container); return; }
    container.classList.toggle("is-pointing", target === "screen" && model === "system");
    container.classList.remove("is-tapping");
    void container.offsetWidth;
    container.classList.add("is-tapping");
  });
}

function renderHorizontalSteps(element, steps, activeIndex, dataName) {
  element.innerHTML = steps.map((step, index) => `<li class="${index === activeIndex ? "active" : ""}" data-num="${String(index + 1).padStart(2, "0")}" data-${dataName}="${index}" aria-hidden="${index === activeIndex ? "false" : "true"}"><div><b>Etapa ${index + 1}</b><p>${escapeHtml(step[1])}</p></div></li>`).join("");
  element.style.transform = `translateX(-${activeIndex * 100}%)`;
}

const manualGrid = document.getElementById("manualGrid");
const keyboardManualMap = { sighra: "smart-tab", onixsat: "onixsmart", omnilink: "omnilink", "sascar-novo": "sasmdt", "sascar-tablet": "sasmdt", hibrido: "sasmdt", "sascar-teclado": "sasmdt" };
const keyboardImageMap = { ravex: "assets/keyboards/ravex.webp" };
const importedManuals = window.IMPORTED_MANUALS || [];
const importedKeyboardManual = (techId) => importedManuals.find((item) => item.category === "keyboard" && item.technology === techId);
const importedTechnologyManual = (techId) => importedManuals.find((item) => item.category === "technology" && item.technology === techId);
const softwareTechnologies = [
  { id: "sighra", name: "SIGHRA", logo: "assets/systems/sighra.png" },
  { id: "ravex", name: "RAVEX", logo: "assets/systems/ravex.png" },
  { id: "onixsat", name: "ONIXSAT", logo: "assets/systems/onixsat.png" },
  { id: "omnilink", name: "OMNILINK", logo: "assets/systems/omnilink.png" },
  { id: "sascar", name: "SASCAR", logo: "assets/systems/sascar.png" },
  { id: "positron", name: "POSITRON", logo: "assets/systems/positron.png" },
  { id: "autotrac", name: "AUTOTRAC", logo: "assets/systems/autotrac.png" },
];
function storedManualButtons(items) {
  return items.map((item) => `<button class="stored-manual-link" type="button" data-stored-manual="${item.id}">${escapeHtml(item.title)} ${icon("arrow")}</button>`).join("");
}
async function renderManuals() {
  const term = document.getElementById("manualSearch").value.trim().toLocaleLowerCase("pt-BR");
  let stored = [];
  try { stored = window.ManualStore ? await window.ManualStore.list() : []; } catch (_) { stored = []; }
  const catalog = technologies.filter((tech) => !Array.isArray(tech.choices));
  const filtered = catalog.filter((tech) => [tech.name, tech.kind, tech.summary].join(" ").toLocaleLowerCase("pt-BR").includes(term));
  manualGrid.innerHTML = filtered.map((tech) => {
    const imported = importedKeyboardManual(tech.id);
    const manual = imported ? null : manuals.find((item) => item.id === keyboardManualMap[tech.id]);
    const uploaded = stored.filter((item) => item.category === "keyboard" && (item.technology === tech.id || (item.technology === "sascar" && tech.id.startsWith("sascar"))));
    const available = Boolean(imported || manual || uploaded.length);
    return `<article class="manual-card technology-manual-card"><div class="manual-thumb"><img loading="lazy" src="${keyboardImageMap[tech.id] || tech.photo}" alt="Teclado ${escapeHtml(tech.name)}" /></div><div class="manual-copy"><div class="manual-meta"><span>Manual de teclado</span><span>${available ? `${uploaded.length + (imported || manual ? 1 : 0)} arquivo(s)` : "Aguardando arquivo"}</span></div><h3>${escapeHtml(tech.name)}</h3><p>${imported ? escapeHtml(imported.title) : manual ? escapeHtml(manual.description) : "Manuais e orientações do teclado desta tecnologia."}</p><div class="manual-tags"><span>${escapeHtml(tech.kind)}</span><span>${available ? "Disponível" : "Sem manual cadastrado"}</span></div>${imported ? `<button class="manual-open" type="button" data-imported-manual="${imported.id}">Abrir manual atualizado ${icon("arrow")}</button>` : manual ? `<button class="manual-open" type="button" data-keyboard-manual="${manual.id}">Abrir manual original ${icon("arrow")}</button>` : ""}${storedManualButtons(uploaded)}</div></article>`;
  }).join("");
  document.getElementById("manualEmpty").hidden = filtered.length > 0;
  manualGrid.querySelectorAll("[data-keyboard-manual]").forEach((button) => button.addEventListener("click", () => openManual(button.dataset.keyboardManual)));
  manualGrid.querySelectorAll("[data-imported-manual]").forEach((button) => button.addEventListener("click", () => openImportedManual(button.dataset.importedManual)));
  manualGrid.querySelectorAll("[data-stored-manual]").forEach((button) => button.addEventListener("click", () => openStoredManual(button.dataset.storedManual)));
}

const technologyManualGrid = document.getElementById("technologyManualGrid");
async function renderTechnologyManuals() {
  const term = document.getElementById("technologyManualSearch").value.trim().toLocaleLowerCase("pt-BR");
  let stored = [];
  try { stored = window.ManualStore ? await window.ManualStore.list() : []; } catch (_) { stored = []; }
  const filtered = softwareTechnologies.filter((tech) => tech.name.toLocaleLowerCase("pt-BR").includes(term));
  technologyManualGrid.innerHTML = filtered.map((tech) => {
    const imported = importedTechnologyManual(tech.id);
    const uploaded = stored.filter((item) => item.category === "technology" && item.technology === tech.id);
    const count = uploaded.length + (imported ? 1 : 0);
    return `<article class="manual-card software-manual-card"><div class="manual-thumb"><img class="system-logo" loading="lazy" src="${tech.logo}" alt="Logo ${escapeHtml(tech.name)}" /></div><div class="manual-copy"><div class="manual-meta"><span>Software da tecnologia</span><span>${count ? `${count} arquivo(s)` : "Nenhum manual cadastrado"}</span></div><h3>${escapeHtml(tech.name)}</h3><p>${count ? "Selecione abaixo o manual que deseja consultar." : "Esta área está pronta para receber os manuais do software pela Área ADM."}</p>${imported ? `<button class="manual-open" type="button" data-imported-manual="${imported.id}">Abrir manual atualizado ${icon("arrow")}</button>` : ""}${uploaded.length ? storedManualButtons(uploaded) : !imported ? `<div class="manual-awaiting-label">Aguardando inclusão pelo administrador</div>` : ""}</div></article>`;
  }).join("");
  document.getElementById("technologyManualEmpty").hidden = filtered.length > 0;
  technologyManualGrid.querySelectorAll("[data-stored-manual]").forEach((button) => button.addEventListener("click", () => openStoredManual(button.dataset.storedManual)));
  technologyManualGrid.querySelectorAll("[data-imported-manual]").forEach((button) => button.addEventListener("click", () => openImportedManual(button.dataset.importedManual)));
}

function openTechnologyManual(techId) {
  const tech = technologies.find((item) => item.id === techId);
  if (!tech) return;
  let mode = "complete";
  let page = 0;
  const draw = () => {
    const current = tech.steps[page] || tech.steps[0];
    const keyboardManual = manuals.find((manual) => manual.id === keyboardManualMap[tech.id]);
    let body = "";
    if (mode === "complete") body = `<div class="tech-manual-reader"><div class="tech-manual-image">${current?.[2] ? `<img src="${current[2]}" alt="Imagem real da etapa ${page + 1}" />` : `<span>Sem imagem nesta etapa</span>`}</div><article><h3>Etapa ${page + 1}</h3><p>${escapeHtml(current?.[1] || "")}</p><div class="manual-reader-controls"><button type="button" id="techManualPrev" ${page === 0 ? "disabled" : ""}>← Anterior</button><strong>${page + 1} / ${tech.steps.length}</strong><button type="button" id="techManualNext" ${page === tech.steps.length - 1 ? "disabled" : ""}>Próxima →</button></div></article></div>`;
    if (mode === "essential") body = `<div class="essential-list">${tech.steps.slice(0,8).map((step, index) => `<article><span>${String(index + 1).padStart(2,"0")}</span><div><b>${escapeHtml(step[0])}</b><p>${escapeHtml(step[1])}</p></div></article>`).join("")}</div>`;
    if (mode === "keyboard") body = keyboardManual ? `<div class="keyboard-manual-entry"><img src="assets/manuals/${keyboardManual.id}/page-01.png" alt="Capa do ${escapeHtml(keyboardManual.title)}" /><div><span class="section-kicker">Manual do teclado</span><h3>${escapeHtml(keyboardManual.title)}</h3><p>${escapeHtml(keyboardManual.description)}</p><div class="keyboard-manual-actions"><button class="primary-button" id="openKeyboardManual" type="button">Abrir manual original</button><button type="button" id="generateTechnologyPdf">Gerar PDF para o motorista</button></div></div></div>` : `<div class="manual-awaiting"><b>Manual do teclado aguardando inclusão</b><p>A separação já está pronta. Enquanto o manual original não é incluído, o procedimento do motorista pode ser gerado a partir do treinamento vigente.</p><button class="primary-button" type="button" id="generateTechnologyPdf">Gerar PDF para o motorista</button></div>`;
    document.getElementById("dialogContent").innerHTML = `<div class="dialog-body"><div class="dialog-head"><span class="section-kicker">Biblioteca por tecnologia</span><h2>${escapeHtml(tech.name)}</h2><p>${escapeHtml(tech.summary)}</p></div><nav class="technology-manual-tabs"><button class="${mode === "complete" ? "active" : ""}" data-tech-mode="complete">Manual completo</button><button class="${mode === "essential" ? "active" : ""}" data-tech-mode="essential">Assuntos principais</button><button class="${mode === "keyboard" ? "active" : ""}" data-tech-mode="keyboard">Manual do teclado</button></nav>${body}</div>`;
    document.querySelectorAll("[data-tech-mode]").forEach((button) => button.addEventListener("click", () => { mode = button.dataset.techMode; draw(); }));
    document.getElementById("techManualPrev")?.addEventListener("click", () => { page -= 1; draw(); });
    document.getElementById("techManualNext")?.addEventListener("click", () => { page += 1; draw(); });
    document.getElementById("openKeyboardManual")?.addEventListener("click", () => openManual(keyboardManual.id));
    document.getElementById("generateTechnologyPdf")?.addEventListener("click", () => generateTechnologyDriverPdf(tech));
  };
  draw();
  manualDialog.showModal();
}
document.getElementById("manualSearch").addEventListener("input", renderManuals);
document.getElementById("technologyManualSearch").addEventListener("input", renderTechnologyManuals);

const manualDialog = document.getElementById("manualDialog");
async function openStoredManual(id) {
  const item = await window.ManualStore.get(id);
  if (!item) return;
  const objectUrl = URL.createObjectURL(item.file);
  const isPdf = item.mime === "application/pdf" || /\.pdf$/i.test(item.fileName || "");
  document.getElementById("dialogContent").innerHTML = `<div class="dialog-body stored-manual-dialog"><div class="dialog-head"><span class="section-kicker">${item.category === "keyboard" ? "Manual de teclado" : "Manual de tecnologia"}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.technologyName || item.technology)}</p></div>${isPdf ? `<iframe src="${objectUrl}" title="${escapeHtml(item.title)}"></iframe>` : `<div class="stored-file-message"><b>Arquivo cadastrado</b><p>Use o botão abaixo para abrir ou baixar o documento.</p></div>`}<a class="primary-button" href="${objectUrl}" download="${escapeHtml(item.fileName || item.title)}">Baixar arquivo</a></div>`;
  manualDialog.showModal();
  manualDialog.addEventListener("close", () => URL.revokeObjectURL(objectUrl), { once: true });
}
const normalizeSearchText = (value = "") => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
let activePageManual = null;
let activeManualPage = 1;
const manualZoomDialog = document.getElementById("manualZoomDialog");

function pageManualImage(source, page) {
  return source.imported ? `${source.base}/page-${String(page).padStart(3, "0")}.jpg` : `assets/manuals/${source.id}/page-${String(page).padStart(2, "0")}.png`;
}
function setPageManualPage(page) {
  if (!activePageManual) return;
  activeManualPage = Math.max(1, Math.min(page, activePageManual.pages));
  const path = pageManualImage(activePageManual, activeManualPage);
  const mainImage = document.getElementById("manualPageImage");
  if (mainImage) {
    mainImage.src = path;
    mainImage.alt = `${activePageManual.title}, página ${activeManualPage}`;
  }
  const counter = document.getElementById("dialogCounter");
  if (counter) counter.textContent = `${activeManualPage} / ${activePageManual.pages}`;
  const previous = document.getElementById("dialogPrev");
  const next = document.getElementById("dialogNext");
  if (previous) previous.disabled = activeManualPage === 1;
  if (next) next.disabled = activeManualPage === activePageManual.pages;
  if (manualZoomDialog.open) updateManualZoom();
}
function searchPageManual(term) {
  if (!activePageManual) return;
  const query = normalizeSearchText(term);
  const status = document.getElementById("manualSearchStatus");
  if (!query) { if (status) status.textContent = "Digite uma palavra para pesquisar."; return; }
  const texts = activePageManual.pageText || [];
  let match = -1;
  for (let offset = 1; offset <= texts.length; offset += 1) {
    const index = (activeManualPage - 1 + offset) % texts.length;
    if (normalizeSearchText(texts[index]).includes(query)) { match = index; break; }
  }
  if (match < 0) {
    if (status) status.textContent = `“${term}” não foi encontrado neste manual.`;
    document.getElementById("manualZoomSearchStatus").textContent = `“${term}” não foi encontrado neste manual.`;
    return;
  }
  setPageManualPage(match + 1);
  const message = `Resultado encontrado na página ${match + 1}.`;
  if (status) status.textContent = message;
  document.getElementById("manualZoomSearchStatus").textContent = message;
}
function updateManualZoom() {
  if (!activePageManual) return;
  document.getElementById("manualZoomTitle").textContent = activePageManual.title;
  const image = document.getElementById("manualZoomImage");
  image.src = pageManualImage(activePageManual, activeManualPage);
  image.alt = `${activePageManual.title}, página ${activeManualPage}`;
  document.getElementById("manualZoomCounter").textContent = `${activeManualPage} / ${activePageManual.pages}`;
  document.getElementById("manualZoomPrev").disabled = activeManualPage === 1;
  document.getElementById("manualZoomNext").disabled = activeManualPage === activePageManual.pages;
}
function openManualZoom() {
  updateManualZoom();
  if (!manualZoomDialog.open) manualZoomDialog.showModal();
}
function openPageManual(source, legacyManual = null) {
  activePageManual = source;
  activeManualPage = 1;
  document.getElementById("dialogContent").innerHTML = `<div class="dialog-body"><div class="dialog-head manual-dialog-head"><div><span class="section-kicker">${source.category === "technology" || legacyManual?.type === "tecnologia" ? "Manual de tecnologia" : "Manual de teclado"}</span><h2>${escapeHtml(source.title)}</h2><p>${escapeHtml(source.description || "Consulte o documento página por página.")}</p></div><button class="manual-search-toggle" id="manualSearchToggle" type="button" aria-label="Pesquisar no manual" title="Pesquisar no manual">${icon("search")}</button></div><form class="manual-inline-search" id="manualInlineSearch" hidden><label>${icon("search")}<input id="manualInlineSearchInput" type="search" placeholder="Procurar palavra ou assunto" /></label><button type="submit">Buscar</button></form><p class="manual-search-status" id="manualSearchStatus"></p><div class="manual-reader"><div class="manual-page-viewport"><figure class="manual-single-page"><img id="manualPageImage" src="${pageManualImage(source, 1)}" alt="${escapeHtml(source.title)}, página 1" title="Clique para ampliar" /></figure></div><div class="manual-reader-controls"><button type="button" id="dialogPrev" aria-label="Página anterior">← <span>Anterior</span></button><strong id="dialogCounter"></strong><button type="button" id="dialogNext" aria-label="Próxima página"><span>Próxima</span> →</button></div></div>${legacyManual?.alert ? `<div class="dialog-alert"><b>Atenção:</b> ${escapeHtml(legacyManual.alert)}</div>` : ""}${legacyManual?.type === "teclado" ? `<div class="manual-actions"><button class="pdf-button" type="button" id="generateDriverPdf">${icon("book")} Gerar PDF para o motorista</button></div>` : ""}<div class="dialog-source">${source.source ? `Fonte de treinamento: ${escapeHtml(source.source)}` : "Manual atualizado da biblioteca Smart Risk"}</div></div>`;
  document.getElementById("dialogPrev").addEventListener("click", () => setPageManualPage(activeManualPage - 1));
  document.getElementById("dialogNext").addEventListener("click", () => setPageManualPage(activeManualPage + 1));
  document.getElementById("manualPageImage").addEventListener("click", openManualZoom);
  document.getElementById("manualSearchToggle").addEventListener("click", () => {
    const form = document.getElementById("manualInlineSearch");
    form.hidden = !form.hidden;
    if (!form.hidden) document.getElementById("manualInlineSearchInput").focus();
  });
  document.getElementById("manualInlineSearch").addEventListener("submit", (event) => { event.preventDefault(); searchPageManual(document.getElementById("manualInlineSearchInput").value.trim()); });
  document.getElementById("generateDriverPdf")?.addEventListener("click", () => generateDriverPdf(legacyManual));
  manualDialog.showModal();
  setPageManualPage(1);
}
function openImportedManual(id) {
  const manual = importedManuals.find((item) => item.id === id);
  if (!manual) return;
  openPageManual({ ...manual, imported: true });
}
function openManual(id) {
  const manual = manuals.find((item) => item.id === id);
  if (!manual) return;
  openPageManual({ id: manual.id, title: manual.title, description: manual.description, category: manual.type === "tecnologia" ? "technology" : "keyboard", pages: Number.parseInt(manual.pages, 10), pageText: window.LEGACY_MANUAL_TEXT?.[manual.id] || [], source: manual.source, imported: false }, manual);
}
manualDialog.querySelector(".dialog-close").addEventListener("click", () => manualDialog.close());
manualDialog.addEventListener("click", (event) => { if (event.target === manualDialog) manualDialog.close(); });
document.getElementById("closeManualZoom").addEventListener("click", () => manualZoomDialog.close());
document.getElementById("manualZoomPrev").addEventListener("click", () => setPageManualPage(activeManualPage - 1));
document.getElementById("manualZoomNext").addEventListener("click", () => setPageManualPage(activeManualPage + 1));
document.getElementById("manualZoomSearchForm").addEventListener("submit", (event) => { event.preventDefault(); searchPageManual(document.getElementById("manualZoomSearch").value.trim()); });
manualZoomDialog.addEventListener("click", (event) => { if (event.target === manualZoomDialog) manualZoomDialog.close(); });

const techList = document.getElementById("techList");
let techTerm = "";
document.getElementById("techSearch").addEventListener("input", (event) => { techTerm = event.target.value.trim().toLocaleLowerCase("pt-BR"); renderTechList(); });
const technologyModels = { sighra: "smart-tab", ravex: "ravex", onixsat: "onixsmart", omnilink: "omnilink", sascar: "system", "sascar-novo": "smart-tab", "sascar-tablet": "sasmdt", hibrido: "sascar-keyboard", "sascar-teclado": "sascar-keyboard", positron: "positron", autotrac: "autotrac" };
let selectedTech = technologies[0];
let unlockStep = 0;
function renderTechList() {
  const matches = (tech) => !techTerm || [tech.name, tech.summary, ...tech.steps.map((step) => `${step[0]} ${step[1]}`)].join(" ").toLocaleLowerCase("pt-BR").includes(techTerm);
  techList.innerHTML = technologies.filter(matches).map((tech) => `<button type="button" class="${tech === selectedTech ? "active" : ""}" data-tech="${tech.id}"><img class="tech-thumb" src="${tech.photo}" alt="" /><span><b>${tech.name}</b><small>${tech.kind}</small></span>${icon("arrow")}</button>`).join("") || `<div class="tech-empty">Nenhuma tecnologia encontrada.</div>`;
  techList.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => { selectedTech = technologies.find((tech) => tech.id === button.dataset.tech); unlockStep = 0; renderUnlock(); renderTechList(); }));
}
function renderChooser() {
  const chooser = document.getElementById("techChooser");
  const player = document.getElementById("unlockPlayer");
  const isChooser = Array.isArray(selectedTech.choices);
  chooser.hidden = !isChooser;
  player.hidden = isChooser;
  if (!isChooser) return;
  chooser.innerHTML = selectedTech.choices.map((id) => { const model = technologies.find((tech) => tech.id === id); return `<button type="button" data-choose-tech="${id}"><img src="${model.photo}" alt="" /><span><b>${model.name.replace("SASCAR · ", "")}</b><small>${model.kind}</small></span></button>`; }).join("");
  chooser.querySelectorAll("[data-choose-tech]").forEach((button) => button.addEventListener("click", () => { selectedTech = technologies.find((tech) => tech.id === button.dataset.chooseTech); unlockStep = 0; renderUnlock(); renderTechList(); }));
}
function renderUnlock() {
  const isChooser = Array.isArray(selectedTech.choices);
  document.getElementById("techBadge").textContent = selectedTech.name;
  document.getElementById("techTitle").textContent = isChooser ? "Escolha o Modelo" : `Desbloqueio ${selectedTech.name}`;
  document.getElementById("techSummary").textContent = selectedTech.summary;
  const photo = document.getElementById("techPhoto");
  photo.hidden = !selectedTech.photo;
  if (selectedTech.photo) photo.src = selectedTech.photo;
  renderChooser();
  if (isChooser) return;
  const step = selectedTech.steps[unlockStep];
  renderHorizontalSteps(document.getElementById("unlockSteps"), selectedTech.steps, unlockStep, "unlock-step");
  document.getElementById("unlockProgress").innerHTML = selectedTech.steps.map((_, index) => `<span class="${index <= unlockStep ? "active" : ""}"></span>`).join("");
  document.getElementById("prevUnlock").disabled = unlockStep === 0;
  document.getElementById("nextUnlock").innerHTML = unlockStep === selectedTech.steps.length - 1 ? `Concluir guia ${icon("check")}` : `Próximo passo ${icon("arrow")}`;
  const image = document.getElementById("unlockStepImage");
  const placeholder = document.getElementById("unlockImagePlaceholder");
  image.hidden = !step[2];
  placeholder.hidden = Boolean(step[2]);
  if (step[2]) {
    image.src = step[2];
    image.alt = `${selectedTech.name}: ${step[0]}`;
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.title = "Clique para ampliar";
  }
  const noticeButton = document.getElementById("unlockNoticeButton");
  noticeButton.hidden = !selectedTech.notices?.length;
  document.querySelectorAll("[data-unlock-step]").forEach((item) => item.addEventListener("click", () => { unlockStep = Number(item.dataset.unlockStep); renderUnlock(); }));
}
document.getElementById("nextUnlock").addEventListener("click", () => { if (unlockStep < selectedTech.steps.length - 1) { unlockStep += 1; renderUnlock(); } else showToast("Guia concluído. Registre o resultado conforme o procedimento da operação."); });
document.getElementById("prevUnlock").addEventListener("click", () => { if (unlockStep > 0) { unlockStep -= 1; renderUnlock(); } });

const unlockNoticeDialog = document.getElementById("unlockNoticeDialog");
document.getElementById("unlockNoticeButton").addEventListener("click", () => {
  document.getElementById("unlockNoticeTitle").textContent = selectedTech.name;
  document.getElementById("unlockNoticeList").innerHTML = (selectedTech.notices || []).map((notice) => `<p>${escapeHtml(notice).replace(/\n/g, "<br>")}</p>`).join("");
  unlockNoticeDialog.showModal();
});
document.getElementById("closeUnlockNotice").addEventListener("click", () => unlockNoticeDialog.close());
unlockNoticeDialog.addEventListener("click", (event) => { if (event.target === unlockNoticeDialog) unlockNoticeDialog.close(); });

const stepImageDialog = document.getElementById("stepImageDialog");
function openUnlockImageZoom() {
  const image = document.getElementById("unlockStepImage");
  if (image.hidden || !image.src) return;
  document.getElementById("stepImageTitle").textContent = `${selectedTech.name} — ${selectedTech.steps[unlockStep][0]}`;
  const zoom = document.getElementById("stepImageZoom");
  zoom.src = image.src;
  zoom.alt = image.alt;
  document.getElementById("stepZoomCounter").textContent = `${unlockStep + 1} / ${selectedTech.steps.length}`;
  document.getElementById("stepZoomPrev").disabled = unlockStep === 0;
  document.getElementById("stepZoomNext").disabled = unlockStep === selectedTech.steps.length - 1;
  stepImageDialog.showModal();
}
document.getElementById("unlockStepImage").addEventListener("click", openUnlockImageZoom);
document.getElementById("unlockStepImage").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openUnlockImageZoom(); }
});
document.getElementById("closeStepImage").addEventListener("click", () => stepImageDialog.close());
document.getElementById("stepZoomPrev").addEventListener("click", () => {
  if (unlockStep > 0) unlockStep -= 1;
  renderUnlock();
  const source = document.getElementById("unlockStepImage");
  document.getElementById("stepImageZoom").src = source.src;
  document.getElementById("stepImageZoom").alt = source.alt;
  document.getElementById("stepImageTitle").textContent = `${selectedTech.name} — ${selectedTech.steps[unlockStep][0]}`;
  document.getElementById("stepZoomCounter").textContent = `${unlockStep + 1} / ${selectedTech.steps.length}`;
  document.getElementById("stepZoomPrev").disabled = unlockStep === 0;
  document.getElementById("stepZoomNext").disabled = unlockStep === selectedTech.steps.length - 1;
});
document.getElementById("stepZoomNext").addEventListener("click", () => {
  if (unlockStep < selectedTech.steps.length - 1) unlockStep += 1;
  renderUnlock();
  const source = document.getElementById("unlockStepImage");
  document.getElementById("stepImageZoom").src = source.src;
  document.getElementById("stepImageZoom").alt = source.alt;
  document.getElementById("stepImageTitle").textContent = `${selectedTech.name} — ${selectedTech.steps[unlockStep][0]}`;
  document.getElementById("stepZoomCounter").textContent = `${unlockStep + 1} / ${selectedTech.steps.length}`;
  document.getElementById("stepZoomPrev").disabled = unlockStep === 0;
  document.getElementById("stepZoomNext").disabled = unlockStep === selectedTech.steps.length - 1;
});
stepImageDialog.addEventListener("click", (event) => { if (event.target === stepImageDialog) stepImageDialog.close(); });

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

async function generateTechnologyDriverPdf(tech) {
  if (!window.PDFLib) { showToast("Não foi possível carregar o gerador de PDF."); return; }
  try {
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const pdf = await PDFDocument.create();
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const navy = rgb(.03,.09,.16), blue = rgb(.03,.47,.86), text = rgb(.14,.19,.25), muted = rgb(.38,.44,.51);
    const cover = pdf.addPage([595,842]);
    cover.drawRectangle({ x:0,y:0,width:595,height:842,color:navy });
    cover.drawText("GUIA DO MOTORISTA", { x:48,y:710,font:bold,size:13,color:blue });
    wrapPdfText(tech.name, bold, 34, 490).forEach((line,index) => cover.drawText(pdfSafe(line), { x:48,y:650-index*42,font:bold,size:34,color:rgb(.97,.98,1) }));
    cover.drawText("Procedimento visual do equipamento", { x:48,y:510,font:regular,size:16,color:rgb(.7,.77,.84) });
    cover.drawText(`Fonte: Treinamento Central Atualizado | ${tech.steps.length} etapas`, { x:48,y:72,font:regular,size:9,color:rgb(.55,.63,.72) });
    for (let index = 0; index < tech.steps.length; index += 1) {
      const step = tech.steps[index];
      const page = pdf.addPage([595,842]);
      page.drawRectangle({ x:0,y:792,width:595,height:50,color:navy });
      page.drawText(pdfSafe(tech.name), { x:42,y:810,font:bold,size:11,color:rgb(.96,.98,1) });
      page.drawText(`ETAPA ${String(index+1).padStart(2,"0")} DE ${tech.steps.length}`, { x:42,y:742,font:bold,size:10,color:blue });
      wrapPdfText(step[0], bold, 22, 505).slice(0,2).forEach((line,lineIndex) => page.drawText(line, { x:42,y:704-lineIndex*28,font:bold,size:22,color:text }));
      let textY = 642;
      if (step[2]) {
        try {
          const bytes = await fetch(step[2]).then((response) => response.arrayBuffer());
          const embedded = /\.jpe?g$/i.test(step[2]) ? await pdf.embedJpg(bytes) : await pdf.embedPng(bytes);
          const natural = embedded.scale(1);
          const scale = Math.min(500/natural.width,330/natural.height,1);
          page.drawImage(embedded, { x:(595-natural.width*scale)/2,y:286,width:natural.width*scale,height:natural.height*scale });
          textY = 650;
        } catch (_) {}
      }
      wrapPdfText(step[1], regular, 10.5, 505).slice(0,11).forEach((line,lineIndex) => page.drawText(line, { x:42,y:textY-lineIndex*15,font:regular,size:10.5,color:muted }));
      page.drawText(`Treinamento Smart | ${index+2}`, { x:42,y:30,font:regular,size:8,color:muted });
    }
    const bytes = await pdf.save();
    const url = URL.createObjectURL(new Blob([bytes], { type:"application/pdf" }));
    const link = document.createElement("a");
    link.href = url; link.download = `Guia_Motorista_${tech.name.replace(/[^a-z0-9]+/gi,"_")}.pdf`; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToast("PDF do motorista gerado com o procedimento completo.");
  } catch (error) { console.error(error); showToast("Não foi possível gerar o PDF desta tecnologia."); }
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
  const unsafeRequest = /(roubar|furtar|desviar|interceptar|sumir com|vender).{0,45}(carga|ve[ií]culo|rastreador|caminh[aã]o)|(?:burlar|desativar|enganar|bloquear).{0,40}(rastreador|monitoramento|central|sensor)|como.{0,35}(roubo|furto|desvio de carga)/i;
  if (unsafeRequest.test(normalized)) return { answer: "Não posso orientar ações que facilitem roubo, desvio de carga, fraude ou evasão do monitoramento. Se houver uma ocorrência real, acione imediatamente a liderança e siga o protocolo de segurança da operação.", source: "Política de segurança do Cosmo" };
  const custom = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
  const choices = [...builtInKnowledge, ...custom.map((item) => ({ keys: item.keywords, answer: escapeHtml(item.answer).replace(/\n/g,"<br>"), source: `Base ADM · ${item.title}` }))];
  const ranked = choices.map((item) => ({ item, score: item.keys.reduce((total, key) => total + (normalized.includes(key.toLocaleLowerCase("pt-BR")) ? 1 : 0), 0) })).sort((a,b) => b.score - a.score);
  return ranked[0]?.score ? ranked[0].item : { answer: "Ainda não encontrei essa orientação na base. Tente citar o equipamento e a função desejada ou peça ao administrador para cadastrar o procedimento.", source: "Base de treinamento" };
}
document.getElementById("chatForm").addEventListener("submit", (event) => { event.preventDefault(); const input = document.getElementById("chatInput"); const question = input.value.trim(); if (!question) return; appendMessage(question,"user"); input.value = ""; const result = findAnswer(question); window.setTimeout(() => appendMessage(result.answer,"bot",result.source), 350); });
document.querySelectorAll(".suggestions button").forEach((button) => button.addEventListener("click", () => { document.getElementById("chatInput").value = button.textContent; document.getElementById("chatForm").requestSubmit(); }));
document.getElementById("clearChat").addEventListener("click", () => { document.getElementById("chatMessages").innerHTML = `<div class="message bot-message"><span class="message-avatar">${icon("bot")}</span><div><p>Conversa limpa. Como posso ajudar?</p><small>Agora</small></div></div>`; });

const credentialKey = "smartAdminCredentialV3";
const sessionKey = "smartAdminSessionV3";
const defaultAdminEmail = "admin@smartrisk.com.br";
const defaultAdminPassword = "SmartRisk@2026";
async function hashText(value) { const data = new TextEncoder().encode(value); const digest = await crypto.subtle.digest("SHA-256", data); return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2,"0")).join(""); }
function updateAdminView() {
  const loggedIn = sessionStorage.getItem(sessionKey) === "true";
  document.getElementById("adminLogin").hidden = loggedIn;
  document.getElementById("adminDashboard").hidden = !loggedIn;
  if (!loggedIn) {
    document.getElementById("adminHeading").textContent = "Entrar na Área ADM";
    document.getElementById("adminIntro").textContent = "Use o login e a senha administrativos para gerenciar os conteúdos.";
    document.getElementById("adminSubmitText").textContent = "Entrar";
  }
  renderKnowledge();
}
document.getElementById("adminLoginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("adminEmail").value.trim().toLowerCase();
  const password = document.getElementById("adminPassword").value;
  const hash = await hashText(`${email}:${password}`);
  const saved = JSON.parse(localStorage.getItem(credentialKey) || "null");
  const defaultMatch = email === defaultAdminEmail && password === defaultAdminPassword;
  if (defaultMatch) { localStorage.setItem(credentialKey, JSON.stringify({ email, hash })); sessionStorage.setItem(sessionKey,"true"); showToast("Acesso autorizado."); }
  else if (saved?.email === email && saved?.hash === hash) { sessionStorage.setItem(sessionKey,"true"); showToast("Acesso autorizado."); }
  else { showToast("E-mail ou senha não conferem."); return; }
  document.getElementById("adminPassword").value = ""; updateAdminView();
});
document.getElementById("adminLogout").addEventListener("click", () => { sessionStorage.removeItem(sessionKey); updateAdminView(); });
document.querySelectorAll("[data-admin-tab]").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll("[data-admin-tab]").forEach((item) => item.classList.toggle("active", item === button));
  document.querySelectorAll("[data-admin-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.adminPanel === button.dataset.adminTab));
}));
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

document.getElementById("saveConversation").addEventListener("click", () => {
  const question = document.getElementById("trainingQuestion").value.trim();
  const answer = document.getElementById("trainingResponse").value.trim();
  if (!question || !answer) { showToast("Preencha a pergunta e a resposta correta."); return; }
  const items = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
  const keywords = question.toLocaleLowerCase("pt-BR").split(/[^a-záàâãéêíóôõúç0-9]+/i).filter((word) => word.length > 3).slice(0,12);
  items.unshift({ id: crypto.randomUUID(), title: `Conversa: ${question.slice(0,55)}`, category: "Conversa simulada", answer, keywords });
  localStorage.setItem("smartKnowledge", JSON.stringify(items));
  document.getElementById("trainingQuestion").value = "";
  document.getElementById("trainingResponse").value = "";
  renderKnowledge(); showToast("Conversa adicionada ao treinamento do Cosmo.");
});

document.getElementById("trainingAudio").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const pending = JSON.parse(localStorage.getItem("smartPendingFiles") || "[]");
  pending.unshift({ id: crypto.randomUUID(), name: file.name, type: "Áudio", size: file.size, status: "Aguardando transcrição no servidor" });
  localStorage.setItem("smartPendingFiles", JSON.stringify(pending));
  renderImportedFiles(); showToast("Áudio registrado para transcrição e revisão.");
});

function renderImportedFiles() {
  const items = JSON.parse(localStorage.getItem("smartPendingFiles") || "[]");
  const target = document.getElementById("fileKnowledgeList");
  if (!target) return;
  target.innerHTML = items.length ? items.map((item) => `<div class="knowledge-item"><div><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.type)} · ${escapeHtml(item.status)}</small></div></div>`).join("") : `<div class="knowledge-item"><div><b>Nenhum arquivo importado</b><small>Os arquivos processados e pendentes aparecerão aqui.</small></div></div>`;
}

document.getElementById("processKnowledgeFiles").addEventListener("click", async () => {
  const files = [...(document.getElementById("knowledgeFiles").files || [])];
  if (!files.length) { showToast("Selecione ao menos um arquivo."); return; }
  const knowledge = JSON.parse(localStorage.getItem("smartKnowledge") || "[]");
  const pending = JSON.parse(localStorage.getItem("smartPendingFiles") || "[]");
  let processed = 0;
  for (const file of files) {
    const extension = file.name.split(".").pop().toLocaleLowerCase("pt-BR");
    if (["txt","csv","json","md"].includes(extension)) {
      const text = (await file.text()).trim();
      if (text) {
        const keywords = file.name.replace(/\.[^.]+$/, "").toLocaleLowerCase("pt-BR").split(/[^a-záàâãéêíóôõúç0-9]+/i).filter((word) => word.length > 2);
        knowledge.unshift({ id: crypto.randomUUID(), title: file.name, category: `Arquivo ${extension.toUpperCase()}`, answer: text.slice(0,12000), keywords });
        processed += 1;
      }
    } else {
      pending.unshift({ id: crypto.randomUUID(), name: file.name, type: extension.toUpperCase(), size: file.size, status: "Aguardando processamento no servidor" });
    }
  }
  localStorage.setItem("smartKnowledge", JSON.stringify(knowledge));
  localStorage.setItem("smartPendingFiles", JSON.stringify(pending));
  document.getElementById("importStatus").textContent = `${processed} arquivo(s) lido(s) localmente; ${files.length - processed} registrado(s) para processamento no servidor.`;
  document.getElementById("knowledgeFiles").value = "";
  renderKnowledge(); renderImportedFiles(); showToast("Importação concluída.");
});

function renderAdminManuals() {
  const items = JSON.parse(localStorage.getItem("smartAdminManuals") || "[]");
  const target = document.getElementById("adminManualList");
  if (!target) return;
  target.innerHTML = items.length ? items.map((item) => `<div class="knowledge-item"><div><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.technology)} · ${escapeHtml(item.kind)} · ${escapeHtml(item.fileName)}</small></div></div>`).join("") : `<div class="knowledge-item"><div><b>Nenhum manual adicional</b><small>Use o formulário para registrar materiais por tecnologia.</small></div></div>`;
}
const manualTechnology = document.getElementById("manualTechnology");
manualTechnology.innerHTML = technologies.filter((tech) => !Array.isArray(tech.choices)).map((tech) => `<option value="${tech.id}">${escapeHtml(tech.name)}</option>`).join("");
document.getElementById("manualAdminForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const file = document.getElementById("manualAdminFile").files?.[0];
  if (!file) return;
  const items = JSON.parse(localStorage.getItem("smartAdminManuals") || "[]");
  const tech = technologies.find((item) => item.id === manualTechnology.value);
  items.unshift({ id: crypto.randomUUID(), technology: tech?.name || manualTechnology.value, techId: manualTechnology.value, kind: document.getElementById("manualKind").value, title: document.getElementById("manualAdminTitle").value.trim(), fileName: file.name, status: "Registrado localmente" });
  localStorage.setItem("smartAdminManuals", JSON.stringify(items));
  event.target.reset(); renderAdminManuals(); showToast("Manual registrado na tecnologia selecionada.");
});

let toastTimer;
function showToast(message) { const toast = document.getElementById("toast"); toast.textContent = message; toast.classList.add("show"); window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3300); }

let resizeFrame;
window.addEventListener("resize", () => { window.cancelAnimationFrame(resizeFrame); resizeFrame = window.requestAnimationFrame(refreshScenes); });
document.fonts?.ready.then(() => window.requestAnimationFrame(refreshScenes));

const qaParams = new URLSearchParams(location.search);
const qaTech = qaParams.get("tech");
if (qaTech) { selectedTech = technologies.find((tech) => tech.id === qaTech) || selectedTech; unlockStep = Number(qaParams.get("qaStep")) || 0; }
if (qaParams.has("diag")) window.setTimeout(() => {
  document.documentElement.style.overflowX = "visible";
  document.body.style.overflowX = "visible";
  const vw = window.innerWidth;
  const banner = document.createElement("div");
  banner.style.cssText = "position:fixed;left:0;top:0;z-index:9999;background:#fff;color:#c00;font:12px monospace;padding:4px 8px";
  let count = 0;
  document.querySelectorAll("#conteudo *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > vw + 1 && r.left < vw - 20) { count++; el.style.outline = "2px solid red"; el.setAttribute("data-diag", String(Math.round(r.width))); }
  });
  banner.textContent = "DIAG vw=" + vw + " scrollW=" + document.documentElement.scrollWidth + " offenders=" + count + " :: " + [...document.querySelectorAll("#conteudo [data-diag]")].slice(0, 8).map((el) => el.tagName.toLowerCase() + "." + String(el.className).split(" ").filter(Boolean).join(".").slice(0, 40) + " w" + el.getAttribute("data-diag")).join(" | ");
  document.body.appendChild(banner);
}, 700);

renderManuals();
renderTechnologyManuals();
renderTechList();
renderUnlock();
updateAdminView();
renderImportedFiles();
renderAdminManuals();
const qaScene = qaParams.get("scene");
if (qaScene) renderScene(document.getElementById("unlockDeviceScene"), qaScene, qaParams.get("target") || "screen", qaParams.get("label") || qaScene.toUpperCase());
navigate(location.hash.slice(1) || "inicio", false);
