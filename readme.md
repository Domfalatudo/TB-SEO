# TB-SEO - Tecnologia Sustentável

Landing page sobre Tecnologia Sustentável desenvolvida com HTML5, CSS3 e Bootstrap 5, sem JavaScript. Projeto escolar com foco em boas práticas de SEO e publicação no Google Search Console.

## Estrutura do projeto

```text
/
├── index.html
├── css/
│   └── estilo.css
├── img/
├── robots.txt
├── sitemap.xml
└── README.md
```

## Como visualizar localmente

Abra o arquivo index.html em qualquer navegador. Não é necessário instalar nada, pois o Bootstrap 5 é carregado por CDN.

## Como publicar na Vercel

1. Envie este projeto para um repositório no GitHub.
2. Crie uma conta no site vercel.com, podendo usar o login do GitHub.
3. Na Vercel, clique em Add New e depois em Project.
4. Selecione o repositório do projeto e clique em Import.
5. Mantenha as configurações padrão, pois se trata de um site estático, e clique em Deploy.
6. Após a publicação, configure o domínio https://tb-seo.vercel.app/ em Settings, na seção Domains.

## Como verificar o site no Google Search Console

1. Acesse search.google.com/search-console e faça login com sua conta Google.
2. Clique em Adicionar propriedade.
3. Escolha a opção Prefixo do URL e informe https://tb-seo.vercel.app/.
4. Escolha um método de verificação. As opções mais simples para este projeto são:
   - Arquivo HTML: baixe o arquivo sugerido pelo Google, coloque-o na raiz do projeto, ao lado do index.html, e publique novamente na Vercel.
   - Tag HTML: copie a meta tag fornecida, cole dentro da seção head do index.html e publique novamente.
5. Volte ao Google Search Console e clique em Verificar.

## Como enviar o sitemap

1. No menu lateral do Google Search Console, acesse a opção Sitemaps.
2. Digite sitemap.xml no campo indicado, formando o endereço https://tb-seo.vercel.app/sitemap.xml.
3. Clique em Enviar e acompanhe o status do processamento.

## Como solicitar a indexação da página

1. Na barra superior do Google Search Console, utilize a ferramenta Inspeção de URL.
2. Informe o endereço https://tb-seo.vercel.app/ e pressione Enter.
3. Clique em Solicitar indexação.
4. Divulgue o link do site em outros lugares da internet para ajudar o Google a descobrir o conteúdo.

Importante: o Google não garante a indexação imediata. O processo pode levar dias ou semanas e depende da avaliação do próprio buscador. Acompanhe o resultado na aba Paginas do relatorio de indexacao.
