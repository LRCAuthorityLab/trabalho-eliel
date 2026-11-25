import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Layers3,
  Menu,
  MessageCircle,
  MousePointer2,
  Send,
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react';

// CONFIGURAÇÃO: coloque seu WhatsApp com DDI + DDD, somente números.
// Exemplo de formato: 5561999999999. Não use espaços, +, parênteses ou hífens.
const WHATSAPP_NUMBER = '';

const services = [
  {
    number: '01',
    title: 'LRC WEB',
    eyebrow: 'DESENVOLVIMENTO DIGITAL',
    description:
      'Sites institucionais, landing pages e experiências digitais que apresentam sua marca com clareza e transformam visitas em oportunidades.',
    icon: Code2,
    items: ['Sites e landing pages', 'Design responsivo', 'SEO e integrações'],
    className: 'service-blue',
  },
  {
    number: '02',
    title: 'LRC GROWTH',
    eyebrow: 'CONTEÚDO & MARKETING',
    description:
      'Conteúdo visual e estratégia digital para comunicar melhor, construir autoridade e chegar às pessoas certas.',
    icon: MousePointer2,
    items: ['Edição de vídeos', 'Criativos e conteúdo', 'Estratégia de campanhas'],
    className: 'service-light',
  },
  {
    number: '03',
    title: 'LRC INTELLIGENCE',
    eyebrow: 'IA & AUTOMAÇÃO',
    description:
      'Assistentes inteligentes e fluxos automatizados para organizar atendimentos, reduzir tarefas repetitivas e apoiar equipes.',
    icon: Bot,
    items: ['Agentes de IA', 'Automação de processos', 'Integração de ferramentas'],
    className: 'service-lilac',
  },
];

const demoPrompts = [
  {
    label: 'Quero criar um site',
    prompt: 'Quero criar um site',
    answer:
      'Vamos começar pelo objetivo: você precisa apresentar sua empresa, vender um serviço ou captar contatos? Com isso, definimos as páginas, a mensagem e a melhor experiência para seu público.',
  },
  {
    label: 'Quero atrair clientes',
    prompt: 'Quero atrair clientes',
    answer:
      'Podemos mapear seu público, organizar sua presença digital e planejar conteúdo ou campanhas. O ideal é definir primeiro a oferta e como vamos medir os contatos gerados.',
  },
  {
    label: 'Quero automatizar tarefas',
    prompt: 'Quero automatizar tarefas',
    answer:
      'Ótimo começo: liste as tarefas repetitivas, onde elas acontecem e quais ferramentas você usa. A partir daí, avaliamos se uma automação simples ou um agente de IA faz mais sentido.',
  },
];

const projects = [
  {
    tag: 'WEB DESIGN',
    title: 'Nexa Studio',
    description: 'Conceito de site institucional para uma marca criativa.',
    theme: 'nexa',
    type: 'CONCEITO DEMONSTRATIVO',
  },
  {
    tag: 'DIGITAL GROWTH',
    title: 'Aurora Care',
    description: 'Conceito de landing page para serviços de bem-estar.',
    theme: 'aurora',
    type: 'CONCEITO DEMONSTRATIVO',
  },
  {
    tag: 'AI AUTOMATION',
    title: 'LRC Flow',
    description: 'Demonstração visual de um fluxo de atendimento inteligente.',
    theme: 'flow',
    type: 'PROTÓTIPO VISUAL',
  },
];

const radarQuestions = [
  {
    id: 'website',
    eyebrow: 'PRESENÇA DIGITAL',
    question: 'Como está a presença do seu negócio na internet?',
    helper: 'Pense no caminho que uma pessoa faz para conhecer sua empresa.',
    options: [
      { label: 'Ainda não tenho um site profissional', value: 0 },
      { label: 'Tenho, mas precisa melhorar', value: 1 },
      { label: 'Já tenho uma presença bem estruturada', value: 2 },
    ],
  },
  {
    id: 'content',
    eyebrow: 'CONTEÚDO & MARCA',
    question: 'Como você apresenta seu negócio nas redes?',
    helper: 'Considere frequência, identidade visual e clareza da mensagem.',
    options: [
      { label: 'Publico pouco ou sem planejamento', value: 0 },
      { label: 'Tenho alguma consistência, mas falta estratégia', value: 1 },
      { label: 'Tenho uma rotina de conteúdo bem definida', value: 2 },
    ],
  },
  {
    id: 'leads',
    eyebrow: 'CONTATOS & CONVERSÃO',
    question: 'Quando alguém demonstra interesse, o que acontece?',
    helper: 'Pense em como os contatos são recebidos e acompanhados.',
    options: [
      { label: 'Respondo quando consigo, sem um processo definido', value: 0 },
      { label: 'Uso WhatsApp ou planilha para me organizar', value: 1 },
      { label: 'Tenho um processo claro de atendimento e acompanhamento', value: 2 },
    ],
  },
  {
    id: 'automation',
    eyebrow: 'PROCESSOS & IA',
    question: 'Quanto do trabalho repetitivo ainda é manual?',
    helper: 'Exemplos: responder dúvidas, organizar pedidos e registrar informações.',
    options: [
      { label: 'Quase tudo é feito manualmente', value: 0 },
      { label: 'Já automatizei algumas tarefas', value: 1 },
      { label: 'Meus principais processos já estão bem organizados', value: 2 },
    ],
  },
];

const radarRecommendations = {
  website: {
    title: 'Organize sua presença digital',
    text: 'Comece por uma página rápida e responsiva que explique sua oferta, transmita confiança e facilite o contato. Depois, acompanhe quais ações as pessoas realizam.',
    service: 'Desenvolvimento de site',
  },
  content: {
    title: 'Crie uma comunicação consistente',
    text: 'Defina os temas centrais da marca, os formatos que consegue produzir e uma rotina sustentável. Cada peça deve ter um objetivo claro, não apenas preencher o feed.',
    service: 'Marketing e conteúdo',
  },
  leads: {
    title: 'Desenhe o caminho do primeiro contato',
    text: 'Organize como um potencial cliente chega, quem responde, quais informações precisam ser coletadas e quando fazer acompanhamento. Um processo simples já pode ajudar bastante.',
    service: 'Solução integrada',
  },
  automation: {
    title: 'Mapeie uma tarefa repetitiva para automatizar',
    text: 'Escolha uma tarefa frequente e com regras claras. Antes de usar IA, padronize o processo; depois, avalie integrações e pontos em que a revisão humana é importante.',
    service: 'Agente de IA ou automação',
  },
};

const faqItems = [
  {
    question: 'Preciso contratar todos os serviços juntos?',
    answer: 'Não. Você pode começar com um site, uma entrega de conteúdo ou uma automação específica. A solução é definida de acordo com o momento, o objetivo e o escopo do projeto.',
  },
  {
    question: 'Como funciona o início de um projeto?',
    answer: 'Começamos entendendo seu negócio, o público e o resultado esperado. Em seguida, alinhamos escopo, entregáveis, prazo e investimento antes de iniciar o desenvolvimento.',
  },
  {
    question: 'A LRC cria agentes de IA personalizados?',
    answer: 'A proposta é construir assistentes e automações para tarefas delimitadas, avaliando quais ferramentas precisam se conectar. Cada integração depende da viabilidade técnica, dos acessos e dos requisitos de segurança.',
  },
  {
    question: 'Vocês atendem empresas de outras cidades?',
    answer: 'Sim. O atendimento pode ser feito digitalmente, com alinhamentos por mensagem ou reunião. A forma de trabalho é combinada conforme as necessidades de cada projeto.',
  },
  {
    question: 'Os projetos mostrados no portfólio são de clientes?',
    answer: 'Os exemplos desta primeira versão são conceitos demonstrativos criados para mostrar direção visual e possibilidades. Eles estão identificados como conceitos, não como trabalhos reais de clientes.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Entender',
    text: 'Conhecemos seu negócio, o público e o problema que precisa ser resolvido.',
  },
  {
    number: '02',
    title: 'Planejar',
    text: 'Definimos o escopo, a mensagem, as prioridades e o caminho mais adequado.',
  },
  {
    number: '03',
    title: 'Construir',
    text: 'Desenvolvemos, testamos e refinamos a solução com atenção aos detalhes.',
  },
  {
    number: '04',
    title: 'Evoluir',
    text: 'Analisamos o que funciona e identificamos oportunidades de melhoria.',
  },
];

function SectionLabel({ children, light = false }) {
  return (
    <div className={`section-label${light ? ' section-label-light' : ''}`}>
      <span className="section-label-dot" />
      {children}
    </div>
  );
}

function getLocalAssistantReply(rawMessage) {
  const message = rawMessage.toLowerCase();

  if (/\b(site|landing|p[aá]gina|loja virtual|portf[oó]lio|website)\b/.test(message)) {
    return 'Para planejar um site, precisamos entender o objetivo principal, quem vai acessá-lo e qual ação você quer que a pessoa realize. Você imagina um site institucional, uma landing page ou uma loja virtual? Esta é uma resposta demonstrativa local, ainda sem IA conectada.';
  }
  if (/\b(marketing|an[uú]ncio|tr[aá]fego|instagram|conte[uú]do|v[ií]deo|edi[cç][aã]o|redes sociais)\b/.test(message)) {
    return 'Podemos começar definindo público, oferta e objetivo da comunicação. Depois escolhemos os formatos, a frequência e as métricas para acompanhar. O foco é ter intenção por trás de cada conteúdo, e não apenas publicar mais. Esta resposta é uma demonstração local.';
  }
  if (/\b(ia|intelig[eê]ncia artificial|agente|chatbot|bot|automat|whatsapp|integra[cç][aã]o)\b/.test(message)) {
    return 'Uma boa automação começa por uma tarefa clara: responder dúvidas frequentes, organizar novos contatos ou encaminhar solicitações. Para avaliar uma solução, precisamos saber quais ferramentas você usa e quais decisões exigem uma pessoa. Esta resposta é uma demonstração local, não uma IA conectada.';
  }
  if (/\b(pre[cç]o|valor|or[cç]amento|quanto custa|investimento)\b/.test(message)) {
    return 'O investimento depende do escopo, das funcionalidades, do conteúdo e das integrações. O caminho mais seguro é descrever o objetivo e os requisitos para receber uma proposta compatível com a necessidade — sem estimar um preço no escuro.';
  }
  if (/\b(oi|ol[aá]|bom dia|boa tarde|boa noite)\b/.test(message)) {
    return 'Olá! Que bom ter você por aqui. Posso ajudar a organizar a ideia inicial. Você quer desenvolver uma presença digital, melhorar sua comunicação ou automatizar algum processo?';
  }
  return 'Para te orientar melhor, me conte um pouco mais sobre o negócio e o que você gostaria de melhorar. Pode ser um desafio de site, conteúdo, atendimento ou processo interno. Esta é uma demonstração local com respostas por assunto; ainda não usa um modelo de IA.';
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [radarStep, setRadarStep] = useState(0);
  const [radarAnswers, setRadarAnswers] = useState({});
  const [radarResult, setRadarResult] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Ainda estou avaliando',
    details: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const handlePrompt = (item) => {
    setSelectedPrompt(item);
    setChatMessages([]);
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    setSelectedPrompt(null);
    setChatMessages((current) => [
      ...current,
      { role: 'user', text },
      { role: 'assistant', text: getLocalAssistantReply(text) },
    ]);
    setChatInput('');
  };

  const chooseRadarAnswer = (choice) => {
    const question = radarQuestions[radarStep];
    setRadarAnswers((current) => ({ ...current, [question.id]: choice.value }));
    if (radarStep < radarQuestions.length - 1) {
      setRadarStep((current) => current + 1);
    } else {
      setRadarResult(true);
    }
  };

  const resetRadar = () => {
    setRadarAnswers({});
    setRadarStep(0);
    setRadarResult(false);
  };

  const radarTotal = radarQuestions.reduce((sum, question) => sum + (radarAnswers[question.id] ?? 0), 0);
  const radarFocus = radarQuestions.reduce((lowest, question) => {
    if (radarAnswers[question.id] === undefined) return lowest;
    if (!lowest || radarAnswers[question.id] < radarAnswers[lowest.id]) return question;
    return lowest;
  }, null);
  const radarRecommendation = radarFocus ? radarRecommendations[radarFocus.id] : null;

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFormStatus('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = [
      'Olá, LRC AGENCY! Quero conversar sobre um projeto.',
      `Nome: ${formData.name}`,
      `E-mail: ${formData.email}`,
      `Solução: ${formData.service}`,
      `Sobre o projeto: ${formData.details || 'Ainda vou definir.'}`,
    ].join('\n');

    if (!WHATSAPP_NUMBER) {
      setFormStatus(
        'O formulário está pronto. Para ativar o envio, configure seu número na constante WHATSAPP_NUMBER, no início do arquivo src/App.jsx.',
      );
      return;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setFormStatus('Sua mensagem foi preparada no WhatsApp. Confira os dados e envie por lá.');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="LRC Agency, início" onClick={closeMenu}>
            <span className="brand-mark">LRC<span>.</span></span>
            <span className="brand-caption">DIGITAL AGENCY</span>
          </a>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={`main-nav${menuOpen ? ' main-nav-open' : ''}`} aria-label="Navegação principal">
            <a href="#solucoes" onClick={closeMenu}>Soluções</a>
            <a href="#radar" onClick={closeMenu}>Radar</a>
            <a href="#lab" onClick={closeMenu}>LRC Lab</a>
            <a href="#projetos" onClick={closeMenu}>Projetos</a>
            <a href="#sobre" onClick={closeMenu}>Sobre</a>
            <a className="nav-cta" href="#contato" onClick={closeMenu}>
              Vamos conversar <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero dark-section" id="inicio">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow eyebrow-light">
                <span className="status-pulse" /> ESTÚDIO DIGITAL INDEPENDENTE
              </div>
              <h1>
                Tecnologia que move negócios<span className="heading-period">.</span>
                <span className="hero-title-accent">Ideias que viram ação.</span>
              </h1>
              <p className="hero-description">
                Desenvolvemos experiências digitais, conteúdo e automações inteligentes para marcas que querem crescer com intenção.
              </p>
              <div className="hero-actions">
                <a className="button button-blue" href="#solucoes">
                  Explorar soluções <ArrowUpRight size={17} />
                </a>
                <a className="text-link text-link-light" href="#lab">
                  Conhecer o LRC Lab <ArrowDownRight size={17} />
                </a>
              </div>
              <div className="hero-footnote">
                <div className="avatar-stack" aria-hidden="true">
                  <span>L</span><span>R</span><span>C</span>
                </div>
                <p>Estratégia, design e tecnologia<br /><strong>trabalhando na mesma direção.</strong></p>
              </div>
            </div>

            <div className="hero-art" aria-label="Ilustração visual dos pilares de atuação da LRC Agency">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-orbit orbit-three" />
              <div className="art-crosshair crosshair-one" />
              <div className="art-crosshair crosshair-two" />

              <div className="floating-tag floating-tag-top"><span className="tag-icon"><Sparkles size={14} /></span> Design com intenção</div>
              <div className="floating-tag floating-tag-bottom"><span className="tag-dot" /> Sistemas conectados</div>

              <div className="studio-window">
                <div className="window-topbar">
                  <div className="window-dots"><i /><i /><i /></div>
                  <span className="window-title">LRC / DIGITAL SYSTEMS</span>
                  <span className="window-index">001 — 026</span>
                </div>
                <div className="window-content">
                  <div className="window-overline">ONE STUDIO. MORE POSSIBILITIES.</div>
                  <h2>Uma marca.<br /><span>Múltiplas possibilidades.</span></h2>
                  <div className="system-list">
                    <div className="system-row">
                      <span className="system-number">01</span>
                      <span className="system-icon"><Code2 size={18} /></span>
                      <span className="system-label"><strong>WEB EXPERIENCE</strong><small>Estratégia + interface</small></span>
                      <ArrowUpRight size={16} />
                    </div>
                    <div className="system-row">
                      <span className="system-number">02</span>
                      <span className="system-icon"><Zap size={18} /></span>
                      <span className="system-label"><strong>DIGITAL GROWTH</strong><small>Conteúdo + aquisição</small></span>
                      <ArrowUpRight size={16} />
                    </div>
                    <div className="system-row">
                      <span className="system-number">03</span>
                      <span className="system-icon"><Bot size={18} /></span>
                      <span className="system-label"><strong>AI INTELLIGENCE</strong><small>Automação + agentes</small></span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <div className="window-bottom"><span>BUILT AROUND YOUR NEXT MOVE</span><span className="window-bottom-mark">LRC<span>.</span></span></div>
                </div>
              </div>
              <div className="art-caption"><span>FIG. 001</span> Tecnologia aplicada a objetivos reais</div>
            </div>
          </div>
          <div className="hero-bottom-line" />
          <div className="container hero-bottom-note">
            <span>BRASÍLIA, BRASIL · ATENDIMENTO DIGITAL</span>
            <a href="#solucoes">ROLE PARA EXPLORAR <ArrowDownRight size={14} /></a>
          </div>
        </section>

        <section className="principles-strip" aria-label="Princípios da LRC Agency">
          <div className="container principles-inner">
            <div><span className="principle-symbol">✳</span><span>Estratégia antes do código</span></div>
            <div><span className="principle-symbol">↗</span><span>Design com propósito</span></div>
            <div><span className="principle-symbol">⌘</span><span>IA aplicada com critério</span></div>
            <div><span className="principle-symbol">◎</span><span>Foco em evolução contínua</span></div>
          </div>
        </section>

        <section className="section services-section" id="solucoes">
          <div className="container">
            <div className="section-heading services-heading">
              <div>
                <SectionLabel>O QUE FAZEMOS</SectionLabel>
                <h2>Três frentes.<br /><span className="heading-muted">Um objetivo em comum.</span></h2>
              </div>
              <p className="section-intro">Seu negócio não precisa de mais ferramentas desconectadas. Precisa das soluções certas, trabalhando juntas.</p>
            </div>

            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article className={`service-card ${service.className}`} key={service.number}>
                    <div className="service-top"><span>{service.number} / 03</span><Icon size={23} strokeWidth={1.7} /></div>
                    <div className="service-content">
                      <span className="service-eyebrow">{service.eyebrow}</span>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <ul>
                        {service.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}
                      </ul>
                    </div>
                    <a className="service-link" href="#contato" aria-label={`Conversar sobre ${service.title}`}>
                      Vamos conversar <ArrowUpRight size={17} />
                    </a>
                  </article>
                );
              })}
            </div>
            <div className="services-bottom-note"><span>01—03</span><p>Começamos pelo que seu negócio realmente precisa. O escopo é definido em conjunto, sem soluções desnecessárias.</p></div>
          </div>
        </section>

        <section className="section radar-section" id="radar">
          <div className="container radar-layout">
            <div className="radar-copy">
              <SectionLabel>DIAGNÓSTICO INICIAL</SectionLabel>
              <h2>Encontre seu próximo movimento<span className="heading-period">.</span></h2>
              <p>Responda quatro perguntas rápidas e receba um mapa inicial de oportunidades para sua presença digital, comunicação, atendimento e processos.</p>
              <div className="radar-points">
                <div><span>01</span><div><strong>Rápido e objetivo</strong><small>Quatro perguntas para organizar prioridades.</small></div></div>
                <div><span>02</span><div><strong>Sem cadastro</strong><small>As respostas ficam somente nesta página.</small></div></div>
                <div><span>03</span><div><strong>Recomendação prática</strong><small>Um próximo passo para começar a evoluir.</small></div></div>
              </div>
            </div>

            <div className="radar-card">
              {!radarResult ? (
                <>
                  <div className="radar-card-top">
                    <div><span className="radar-kicker">LRC / RADAR</span><strong>Mapa de oportunidades</strong></div>
                    <span className="radar-count">0{radarStep + 1} <i>/ 04</i></span>
                  </div>
                  <div className="radar-progress"><span style={{ width: `${((radarStep + 1) / radarQuestions.length) * 100}%` }} /></div>
                  <div className="radar-question">
                    <span>{radarQuestions[radarStep].eyebrow}</span>
                    <h3>{radarQuestions[radarStep].question}</h3>
                    <p>{radarQuestions[radarStep].helper}</p>
                  </div>
                  <div className="radar-options">
                    {radarQuestions[radarStep].options.map((choice) => (
                      <button className="radar-option" type="button" key={choice.label} onClick={() => chooseRadarAnswer(choice)}>
                        <span>{choice.label}</span><ArrowUpRight size={17} />
                      </button>
                    ))}
                  </div>
                  <div className="radar-card-bottom"><span>SUAS RESPOSTAS NÃO SÃO ENVIADAS</span>{radarStep > 0 && <button type="button" onClick={() => setRadarStep((current) => current - 1)}>Voltar</button>}</div>
                </>
              ) : (
                <div className="radar-result">
                  <div className="radar-result-icon"><Sparkles size={23} /></div>
                  <span className="radar-kicker">SEU MAPA INICIAL</span>
                  <h3>{radarTotal >= 7 ? 'Você já tem uma boa base.' : radarTotal >= 4 ? 'Há oportunidades para organizar.' : 'Comece pelo essencial.'}</h3>
                  <p className="radar-result-intro">Pelas suas respostas, este pode ser um bom próximo passo:</p>
                  <div className="radar-recommendation"><span>PRIORIDADE SUGERIDA</span><strong>{radarTotal >= 7 ? 'Otimizar e conectar' : radarRecommendation?.title}</strong><p>{radarTotal >= 7 ? 'Sua base parece relativamente estruturada. O próximo movimento pode ser conectar dados, melhorar a conversão e identificar tarefas que valem ser automatizadas.' : radarRecommendation?.text}</p></div>
                  <div className="radar-mini-bars">
                    {radarQuestions.map((question) => <div className="radar-mini-bar" key={question.id}><span>{question.eyebrow}</span><div><i style={{ width: `${((radarAnswers[question.id] ?? 0) / 2) * 100}%` }} /></div></div>)}
                  </div>
                  <div className="radar-result-actions"><a href="#contato" className="button button-blue" onClick={() => { setFormData((current) => ({ ...current, service: radarTotal >= 7 ? 'Solução integrada' : radarRecommendation.service, details: `Quero conversar sobre o Radar LRC. Minha prioridade sugerida: ${radarTotal >= 7 ? 'otimizar e conectar meus canais' : radarRecommendation.title}.` })); }}>Conversar sobre esse plano <ArrowUpRight size={16} /></a><button type="button" className="radar-reset" onClick={resetRadar}>Refazer diagnóstico</button></div>
                  <p className="radar-disclaimer">Este resultado é uma autoavaliação orientativa, não uma auditoria técnica nem garantia de resultados.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="lab-section dark-section" id="lab">
          <div className="lab-glow" aria-hidden="true" />
          <div className="container lab-layout">
            <div className="lab-copy">
              <SectionLabel light>EXPERIMENTAÇÃO APLICADA</SectionLabel>
              <div className="lab-title-line"><span className="lab-mark"><Sparkles size={22} /></span><span>LRC / LAB</span><span className="lab-version">BETA 01</span></div>
              <h2>Não precisa imaginar.<br /><span>Experimente.</span></h2>
              <p>Um espaço para demonstrar ideias em funcionamento: interfaces, automações e agentes de IA que tornam a tecnologia mais fácil de entender.</p>
              <div className="lab-feature-list">
                <div><span>01</span><div><strong>Protótipos funcionais</strong><small>Veja a ideia além da apresentação.</small></div></div>
                <div><span>02</span><div><strong>IA com propósito</strong><small>Aplicações conectadas a problemas reais.</small></div></div>
                <div><span>03</span><div><strong>Construção transparente</strong><small>Entenda o que é demonstração e o que está pronto.</small></div></div>
              </div>
            </div>

            <div className="agent-demo-card">
              <div className="agent-header">
                <div className="agent-avatar"><Bot size={21} /></div>
                <div className="agent-heading"><strong>LRC Assistant</strong><span><i /> DEMONSTRAÇÃO INTERATIVA</span></div>
                <span className="agent-menu-dots">•••</span>
              </div>
              <div className="agent-context"><span className="context-icon"><Sparkles size={14} /></span><span>Assistente de descoberta de projeto</span><span className="context-live">DEMO</span></div>
              <div className="agent-chat" aria-live="polite">
                <div className="chat-avatar"><Bot size={15} /></div>
                <div className="chat-bubble assistant-bubble">Olá! Sou uma demonstração do assistente da LRC. O que você quer melhorar no seu negócio?</div>
                {selectedPrompt && chatMessages.length === 0 && (
                  <>
                    <div className="chat-bubble user-bubble">{selectedPrompt.prompt}</div>
                    <div className="chat-avatar"><Bot size={15} /></div>
                    <div className="chat-bubble assistant-bubble answer-bubble">{selectedPrompt.answer}</div>
                  </>
                )}
                {chatMessages.map((message, index) => (
                  <div className={`chat-message-row ${message.role === 'user' ? 'chat-message-user' : ''}`} key={`${message.role}-${index}`}>
                    {message.role === 'assistant' && <div className="chat-avatar"><Bot size={15} /></div>}
                    <div className={`chat-bubble ${message.role === 'user' ? 'user-bubble' : 'assistant-bubble answer-bubble'}`}>{message.text}</div>
                  </div>
                ))}
              </div>
              <form className="agent-input-form" onSubmit={handleChatSubmit}>
                <label className="sr-only" htmlFor="agent-question">Escreva sua pergunta para a demonstração</label>
                <input id="agent-question" value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Escreva sua ideia..." maxLength={500} />
                <button type="submit" aria-label="Enviar pergunta" disabled={!chatInput.trim()}><Send size={16} /></button>
              </form>
              <div className="agent-quick-prompts">
                <span>ESCOLHA UM CAMINHO</span>
                {demoPrompts.map((item) => (
                  <button key={item.prompt} type="button" className={selectedPrompt?.prompt === item.prompt ? 'prompt-chip prompt-chip-active' : 'prompt-chip'} onClick={() => handlePrompt(item)}>
                    {item.label}<ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
              <div className="agent-footnote"><span className="agent-demo-dot" /> Exemplo local de interação — ainda não conectado a um modelo de IA.</div>
            </div>
          </div>
          <div className="container lab-bottom"><span>RESEARCH / BUILD / REFINE</span><span>LRC LAB — 2026</span></div>
        </section>

        <section className="section projects-section" id="projetos">
          <div className="container">
            <div className="section-heading projects-heading">
              <div>
                <SectionLabel>IDEIAS EM FORMA DE PROJETO</SectionLabel>
                <h2>Design que chama.<br /><span className="heading-muted">Soluções que fazem sentido.</span></h2>
              </div>
              <p className="section-intro">Uma prévia da direção criativa da LRC. Estes exemplos são conceitos demonstrativos, criados para mostrar possibilidades — não são trabalhos de clientes.</p>
            </div>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card" key={project.title}>
                  <div className={`project-visual project-visual-${project.theme}`}>
                    <div className="project-browser-bar"><span /><span /><span /><small>{project.theme}.lrc / preview</small></div>
                    {project.theme === 'nexa' && (
                      <div className="nexa-preview">
                        <div className="nexa-mini-nav"><b>nexa<span>®</span></b><span>STUDIO&nbsp;&nbsp; ABOUT&nbsp;&nbsp; CONTACT</span></div>
                        <div className="nexa-big-type">Make<br /><em>meaning.</em></div>
                        <div className="nexa-bottom"><span>INDEPENDENT CREATIVE STUDIO</span><span>↗</span></div>
                        <div className="nexa-orb" />
                      </div>
                    )}
                    {project.theme === 'aurora' && (
                      <div className="aurora-preview">
                        <div className="aurora-nav"><b>aurora<span>.</span></b><span>HOME&nbsp;&nbsp; SERVICES&nbsp;&nbsp; CONTACT</span></div>
                        <div className="aurora-copy"><small>YOUR MOMENT, YOUR CARE</small><strong>Cuide de<br />você por inteiro.</strong><span>Conheça uma nova forma de cuidar.</span><i>Agende seu horário ↗</i></div>
                        <div className="aurora-shape aurora-shape-one" /><div className="aurora-shape aurora-shape-two" />
                      </div>
                    )}
                    {project.theme === 'flow' && (
                      <div className="flow-preview">
                        <div className="flow-heading"><span className="flow-logo"><Workflow size={14} /></span><b>lrc.flow</b><span className="flow-status">WORKFLOW PREVIEW</span></div>
                        <div className="flow-node flow-node-start"><MessageCircle size={15} /><span><b>Novo contato</b><small>Formulário recebido</small></span></div>
                        <div className="flow-connector" />
                        <div className="flow-node flow-node-ai"><Bot size={16} /><span><b>Agente inteligente</b><small>Entende a solicitação</small></span></div>
                        <div className="flow-branches"><i /><i /></div>
                        <div className="flow-end-nodes"><span><Check size={12} /> CRM</span><span><Send size={12} /> Atendimento</span></div>
                      </div>
                    )}
                    <span className="project-type">{project.type}</span>
                  </div>
                  <div className="project-details">
                    <div className="project-text"><span className="project-tag">{project.tag}</span><h3>{project.title}</h3><p>{project.description}</p></div>
                    <a href="#contato" className="project-arrow" aria-label={`Criar um projeto como ${project.title}`}><ArrowUpRight size={20} /></a>
                  </div>
                </article>
              ))}
            </div>
            <div className="projects-cta"><span>SEU PROJETO PODE SER O PRÓXIMO</span><a href="#contato" className="text-link">Vamos tirar a ideia do papel <ArrowUpRight size={17} /></a></div>
          </div>
        </section>

        <section className="process-section dark-section" id="processo">
          <div className="container">
            <div className="section-heading process-heading">
              <div><SectionLabel light>DO PRIMEIRO PAPO À ENTREGA</SectionLabel><h2>Um processo claro.<br /><span>Sem complicação.</span></h2></div>
              <p className="section-intro section-intro-light">Boas soluções não começam escolhendo uma ferramenta. Começam entendendo o que precisa mudar.</p>
            </div>
            <div className="process-grid">
              {steps.map((step, index) => (
                <article className="process-step" key={step.number}>
                  <div className="process-step-top"><span>{step.number}</span>{index < steps.length - 1 && <div className="process-line" />}</div>
                  <h3>{step.title}</h3><p>{step.text}</p>
                </article>
              ))}
            </div>
            <div className="process-bottom"><span><Layers3 size={16} /> MÉTODO ADAPTADO A CADA PROJETO</span><span>CLAREZA EM CADA ETAPA <ArrowUpRight size={14} /></span></div>
          </div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="container about-layout">
            <div className="about-art">
              <div className="about-art-grid" />
              <div className="about-monogram">LRC<span>.</span></div>
              <div className="about-art-note"><span>INDEPENDENT BY DESIGN</span><span>EST. 2026</span></div>
              <div className="about-orbit" />
            </div>
            <div className="about-copy">
              <SectionLabel>POR TRÁS DA LRC</SectionLabel>
              <h2>Tecnologia é ferramenta.<br /><span className="heading-muted">Entender pessoas é o começo.</span></h2>
              <p>Sou <strong>Lucas Ribeiro de Carvalho</strong>, formado em Análise e Desenvolvimento de Sistemas e fundador da LRC AGENCY.</p>
              <p>Uno desenvolvimento, visão criativa e inteligência artificial para construir soluções digitais com intenção. Cada projeto precisa fazer sentido para quem usa e para o negócio que investe nele.</p>
              <div className="about-values"><div><span>01</span><strong>Curiosidade técnica</strong></div><div><span>02</span><strong>Comunicação direta</strong></div><div><span>03</span><strong>Entrega com propósito</strong></div></div>
              <a className="text-link" href="#contato">Vamos conversar sobre sua ideia <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="duvidas">
          <div className="container faq-layout">
            <div className="faq-intro">
              <SectionLabel>PERGUNTAS FREQUENTES</SectionLabel>
              <h2>Clareza antes de começar<span className="heading-period">.</span></h2>
              <p>Uma boa parceria começa com expectativas claras. Aqui estão algumas respostas para as dúvidas mais comuns.</p>
              <a href="#contato" className="text-link">Ainda tem uma pergunta? Fale comigo <ArrowUpRight size={16} /></a>
            </div>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <article className={`faq-item ${openFaq === index ? 'faq-item-open' : ''}`} key={item.question}>
                  <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq((current) => current === index ? -1 : index)}>
                    <span><i>0{index + 1}</i>{item.question}</span><span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && <p>{item.answer}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section dark-section" id="contato">
          <div className="contact-glow" aria-hidden="true" />
          <div className="container contact-layout">
            <div className="contact-copy">
              <SectionLabel light>PRÓXIMO PASSO</SectionLabel>
              <h2>Tem uma ideia?<br /><span>Vamos construir.</span></h2>
              <p>Conte um pouco sobre seu negócio e o que você quer melhorar. A conversa começa com entender o desafio — não com empurrar uma solução.</p>
              <div className="contact-direct"><div className="contact-direct-icon"><MessageCircle size={19} /></div><div><span>PRIMEIRO CONTATO</span><strong>Uma conversa, sem compromisso.</strong></div></div>
              <div className="contact-note"><span className="contact-note-line" /> Normalmente, o melhor projeto começa com uma boa pergunta.</div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-header"><span>BRIEFING INICIAL</span><span>01 / 04</span></div>
              <div className="form-row">
                <label>Seu nome<input name="name" value={formData.name} onChange={handleFormChange} placeholder="Como podemos te chamar?" required /></label>
                <label>Seu e-mail<input name="email" type="email" value={formData.email} onChange={handleFormChange} placeholder="voce@empresa.com" required /></label>
              </div>
              <label>O que você está buscando?
                <select name="service" value={formData.service} onChange={handleFormChange}>
                  <option>Desenvolvimento de site</option>
                  <option>Marketing e conteúdo</option>
                  <option>Agente de IA ou automação</option>
                  <option>Solução integrada</option>
                  <option>Ainda estou avaliando</option>
                </select>
              </label>
              <label>Conte um pouco sobre a ideia<textarea name="details" value={formData.details} onChange={handleFormChange} placeholder="Qual desafio você quer resolver?" rows="4" /></label>
              <button className="button button-blue form-submit" type="submit">Preparar mensagem <ArrowUpRight size={17} /></button>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
              <p className="form-privacy">Ao enviar, seus dados serão usados apenas para dar continuidade ao contato sobre este projeto.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand footer-brand" href="#inicio" aria-label="LRC Agency, voltar ao início"><span className="brand-mark">LRC<span>.</span></span><span className="brand-caption">DIGITAL AGENCY</span></a>
          <p>Tecnologia que move negócios.<br />Ideias que viram ação.</p>
          <a href="#inicio" className="back-top">VOLTAR AO TOPO <ArrowUpRight size={15} /></a>
        </div>
        <div className="container footer-bottom"><span>© 2026 LRC AGENCY · LUCAS RIBEIRO DE CARVALHO</span><span>DESIGN · CODE · INTELLIGENCE</span></div>
      </footer>

      <a className="floating-contact" href="#contato" aria-label="Conversar com a LRC Agency">
        <MessageCircle size={19} /><span>Vamos conversar</span><ArrowUpRight size={14} />
      </a>
    </>
  );
}

export default App;
