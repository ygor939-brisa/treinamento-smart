# Biblioteca de Manuais do Smart Risk

Pacote estático e independente contendo apenas a biblioteca de manuais de tecnologias.

## Conteúdo

- `index.html`: página pronta para abrir ou publicar.
- `css/manuals.css`: estilos exclusivos da biblioteca.
- `js/manuals-data.js`: textos, estrutura e referências das imagens.
- `js/manuals-app.js`: busca, navegação, procedimentos e ampliação das imagens.
- `images/embedded/`: 102 imagens utilizadas pelos manuais.

## Testar localmente

Abra `index.html` no navegador. Para testar usando um servidor local:

```powershell
npx serve .
```

## Publicar como site separado

Envie todo o conteúdo desta pasta para o novo repositório. O `index.html` já usa caminhos relativos e funciona em uma subpasta do GitHub Pages.

## Integrar em um site existente

1. Copie as pastas `css`, `js` e `images` mantendo a mesma estrutura.
2. Inclua `css/manuals.css` no `<head>`.
3. Adicione um elemento `<main id="manuals-app"></main>` na página desejada.
4. Inclua os scripts nesta ordem, antes de fechar o `body`:

```html
<script src="js/manuals-data.js"></script>
<script src="js/manuals-app.js"></script>
```

O pacote não utiliza Supabase, chave de API, PWA ou armazenamento local.
