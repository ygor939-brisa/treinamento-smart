# Revisão de design — Treinamento Smart

Data: 23/10/2026  
Alvo: `http://127.0.0.1:4173`  
Escopo: página inicial, biblioteca, manual interativo, desbloqueio e responsividade móvel.

## Resultado

- Design: **C → A-**
- Aparência genérica/“IA”: **C → A-**
- Achados: 4
- Corrigidos e verificados: 4
- Revertidos: 0
- Pendentes: 0

## Sistema visual inferido

- Tipografia: Segoe UI Variable Text / Segoe UI / Arial.
- Cores: azul-marinho institucional, azul de ação, branco e escala fria de cinzas.
- Formas: cantos discretos de 2–4 px; curvas maiores apenas quando pertencem ao formato do equipamento.
- Hierarquia: cabeçalhos editoriais grandes, rótulos técnicos em caixa alta e conteúdo operacional em painéis retos.
- Movimento: transições laterais para as etapas, toque demonstrativo e ponteiro animado; respeita `prefers-reduced-motion`.

## Achados e correções

### FINDING-001 — tipografia genérica

- Impacto: médio
- Categoria: tipografia / aparência genérica
- Observação: Inter aproximava o portal de um template SaaS comum.
- Correção: substituição por uma pilha corporativa nativa do Windows.
- Status: verificado em desktop.
- Commit: `2c8fd7c`
- Arquivos: `styles.css`, `dist/styles.css`

### FINDING-002 — composição móvel centralizada demais

- Impacto: médio
- Categoria: hierarquia / responsividade
- Observação: a página inicial perdia o caráter editorial no celular.
- Correção: título, ações e indicadores passaram a seguir alinhamento à esquerda.
- Status: verificado em 390 × 844.
- Commit: `98e9b78`
- Arquivos: `styles.css`, `dist/styles.css`

### FINDING-003 — mãos pouco legíveis na primeira renderização

- Impacto: alto
- Categoria: movimento / compreensão
- Observação: a altura global dos SVGs comprimira as mãos; o gesto parecia um pequeno ícone.
- Correção: altura proporcional, maior contraste translúcido e posição de apoio junto ao equipamento.
- Status: verificado no Smart TAB e no manual aberto.
- Commit: `0a2f8a2`

### FINDING-004 — controles laterais apertados no celular

- Impacto: médio
- Categoria: responsividade / interação
- Observação: “Próxima etapa” ultrapassava o painel em 390 px.
- Correção: contador em linha própria e botões em duas colunas com largura flexível.
- Status: verificado em 390 × 844.
- Commit: `0a2f8a2`

## Fluxos verificados

1. Página inicial → troca automática de etapa → duas mãos indicam sustentação e toque.
2. Biblioteca → abrir Teclado Smart TAB → avançar horizontalmente → gerar PDF.
3. Biblioteca → abrir Sistema de Gestão de Riscos → ponteiro marca busca e menus.
4. Desbloqueio SIGHRA → terminal ilustrado → transição para tela da plataforma na etapa 3.
5. Layout móvel da biblioteca e da página inicial em 390 × 844.

## PDF

- Geração executada pelo botão do manual.
- Arquivo testado: `Guia_Motorista_Teclado_Smart_TAB.pdf`.
- 5 páginas: capa + 4 etapas.
- Renderização validada com Poppler.
- Conteúdo restrito ao uso básico; sequenciamento de macros explicitamente adiado até validação.

## Evidências

As capturas de desktop, modal, tela de sistema, fluxo de desbloqueio e viewport móvel foram feitas durante a revisão no navegador integrado. O console foi verificado sem erros ou avisos.

## Resumo para PR

Revisão encontrou 4 problemas e corrigiu 4; design C → A- e aparência genérica C → A-.
