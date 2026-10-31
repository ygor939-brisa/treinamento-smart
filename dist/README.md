# Treinamento Smart

Portal estático de apoio à operação Smart Risk. A primeira versão inclui:

- abertura animada com o robô Cosmo;
- páginas separadas para manuais de teclado e manuais de tecnologia, organizadas por tecnologia;
- fluxo visual de desbloqueio sem sinal por tecnologia, com telas baseadas nos manuais;
- equipamentos animados em HTML/CSS, com mãos, teclas e visores atualizados por etapa;
- telas de software ampliadas e focadas no controle usado em cada passo;
- leitor interno de manuais, com navegação página a página;
- procedimentos completos importados do treinamento central, com as imagens originais de cada etapa;
- demonstração em vídeo separada do passo a passo, incluindo o vídeo Autotrac fornecido;
- biblioteca organizada por tecnologia: manual completo, assuntos principais e manual do teclado;
- Área ADM para cadastrar orientações, conversas simuladas, arquivos e manuais;
- filtro de segurança do Cosmo contra solicitações relacionadas a roubo, desvio de carga e evasão do rastreamento;
- busca conversacional local baseada no conteúdo cadastrado;
- área administrativa de protótipo com acesso visível no cabeçalho e no menu responsivo;
- login local de demonstração: `admin@smartrisk.com.br` / `SmartRisk@2026`;
- ampliação das imagens do desbloqueio ao clicar ou pressionar Enter.
- etapas do desbloqueio nomeadas apenas como “Etapa 1”, “Etapa 2” e assim por diante;
- observações do treinamento retiradas da sequência e reunidas no botão de exclamação;
- imagens do procedimento exibidas sem legendas sobrepostas.
- manuais de teclado e manuais de tecnologia como abas próprias no menu principal, sem seletor duplicado dentro da página;
- seleção por tecnologia nas duas bibliotecas;
- login administrativo em `admin-login.html`, sem credenciais exibidas na tela;
- painel administrativo separado em `admin.html`, com acesso ao portal normal e área do Cosmo em formato de chat;
- engrenagem compacta do Cosmo para abrir Orientações, Arquivos e Manuais.
- biblioteca de tecnologia limitada aos softwares SIGHRA, RAVEX, ONIXSAT, OMNILINK, SASCAR, POSITRON e AUTOTRAC, com uma única entrada SASCAR;
- logos oficiais fornecidas para SIGHRA, RAVEX, ONIXSAT, OMNILINK, SASCAR, POSITRON e AUTOTRAC na seleção de manuais de tecnologia;
- arquivos de manuais armazenados em IndexedDB e publicados automaticamente na biblioteca escolhida;
- sessão ADM persistente: exibe “Sair da Área ADM” no portal e pula a abertura animada;
- imagem real do teclado RAVEX na biblioteca de teclados.
- treinamento do Cosmo em formato de conversa: o administrador envia a pergunta, informa a resposta correta e o par é salvo na base local;
- aba administrativa “Configuração” reunindo treinamento do Cosmo, arquivos e inclusão de manuais;
- player de demonstração retirado temporariamente da página de desbloqueio;
- imagem da etapa 1 da RAVEX associada à captura correta do botão esquerdo e da opção ContraSenha;
- leitor ampliado com navegação entre páginas, busca textual por palavra-chave e imagens renderizadas em maior resolução;
- manuais atualizados incorporados: software Sascar, software Sighra, teclado Autotrac, teclado Híbrido Sascar, teclado Onixsat, novo tablet Sascar e TD50/teclado Sascar.
- índice OCR para páginas digitalizadas, permitindo pesquisar palavras mesmo quando o PDF contém apenas imagens;
- pesquisa tolerante a acentos, hífens, espaços e pequenas variações de escrita;
- após o login administrativo, abertura direta em `admin.html#settings`;
- item “Configurações” no menu normal do portal enquanto a sessão ADM estiver ativa, preservando também a opção “Sair da Área ADM”.
- tutoriais em vídeo de desbloqueio para Autotrac, Omnilink, Onixsat e Positron, abertos por um player compacto na tecnologia correspondente;
- biblioteca administrativa com os ícones fornecidos para manuais, Cosmo e desbloqueio;
- categoria administrativa “PDF para o motorista”, publicada no cartão da tecnologia e removível pela configuração;
- exclusão de manuais, PDFs do motorista, arquivos do Cosmo e contextos salvos;
- conversas do Cosmo podem ser salvas pelo administrador e passam a compor a base local de respostas;
- base leve incorporada sobre logística, transporte rodoviário, caminhões e rastreabilidade de carga.
- envio das mensagens do Cosmo com Enter; Shift+Enter permanece disponível para uma quebra de linha intencional;
- treinamento duplicado removido da Configuração: o administrador ensina pelo próprio chat do Cosmo e salva a conversa como contexto;
- base padrão ampliada com definições de caminhão, carreta, cavalo mecânico, rota, carga, logística e rastreamento.

## Pré-visualização local

Abra um servidor HTTP na pasta do projeto e navegue para `index.html`.

> A autenticação e o cadastro da área ADM são locais ao navegador. Para produção corporativa,
> substitua por autenticação e armazenamento centralizados.
