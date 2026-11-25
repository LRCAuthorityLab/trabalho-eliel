# LRC AGENCY — versão 2.0

Site institucional responsivo da LRC AGENCY, desenvolvido com React, Vite e Lucide React.

## Requisitos
- Node.js 20.19+ (ou 22.12+). Node 22/24 é recomendado.
- npm

## Como executar
1. Extraia o ZIP.
2. Abra a pasta `LRC-AGENCY` no VS Code.
3. No terminal integrado, execute `npm install`.
4. Execute `npm run dev`.
5. Abra o endereço local exibido pelo Vite (normalmente `http://localhost:5173`).

## Recursos incluídos
- Página inicial com identidade visual própria e layout responsivo.
- Frentes LRC WEB, LRC GROWTH e LRC INTELLIGENCE.
- LRC Radar: autoavaliação local de presença digital, conteúdo, captação e processos.
- LRC Lab: assistente de demonstração com opções rápidas e campo de texto.
- Portfólio conceitual com três protótipos visuais.
- Processo de trabalho, sobre o fundador, FAQ expansível e formulário de briefing.
- CTA flutuante e navegação adaptada para celular.

## Ativar o formulário para WhatsApp
No início de `src/App.jsx`, altere `WHATSAPP_NUMBER = ''` para seu telefone com DDI + DDD, somente números. Exemplo de formato: `5561999999999`. Não publique o site antes de testar o link com seu número correto.

## Limites importantes desta versão
- O LRC Assistant é uma demonstração local baseada em palavras-chave e respostas predefinidas. Não está ligado a um modelo de IA nem envia as conversas para um servidor.
- O LRC Radar é uma autoavaliação orientativa e local, não uma auditoria técnica nem garantia de resultados. As respostas não são salvas nem enviadas.
- Os projetos no portfólio são conceitos demonstrativos, não trabalhos de clientes.
- O formulário prepara uma mensagem para abrir no WhatsApp após configurar `WHATSAPP_NUMBER`. Ele não armazena formulários em banco de dados.
- A fonte Manrope/DM Mono vem do Google Fonts e precisa de internet; há fontes alternativas.

## Próxima etapa recomendada
Após testar no seu computador, configurar WhatsApp e revisar os textos, a próxima evolução pode ser conectar o assistente a uma API de IA com backend seguro, além de adicionar analytics, metadados sociais e publicação em domínio próprio.
