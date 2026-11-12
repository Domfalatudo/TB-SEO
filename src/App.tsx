import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Accessibility,
  Archive,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Bus,
  CalendarCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Contrast,
  Download,
  Eye,
  FileBadge,
  FileText,
  GraduationCap,
  Heart,
  History,
  Home,
  Landmark,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  MessageCircleQuestion,
  Minus,
  MonitorCog,
  Plus,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  User,
  Users,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react"

type Page =
  | "home"
  | "catalog"
  | "service"
  | "login"
  | "recover"
  | "dashboard"
  | "protocols"
  | "scheduling"
  | "help"
  | "area"
  | "documents"
  | "benefits"
  | "jobs"
  | "notifications"
  | "messages"
  | "favorites"
  | "history"
  | "calendar"
  | "proposals"
  | "proposal"

type Service = {
  id: number
  title: string
  category: string
  description: string
  time: string
  online: boolean
  popular?: boolean
  icon: LucideIcon
}

type Proposal = {
  id: number
  title: string
  category: string
  summary: string
  deadline: string
  status: string
  amount: string
  icon: LucideIcon
}

type CitizenNotification = {
  id: number
  icon: LucideIcon
  title: string
  text: string
  time: string
  type: string
}

const categories = [
  { name: "Documentos", icon: FileBadge, color: "#002776" },
  { name: "Educação", icon: GraduationCap, color: "#002776" },
  { name: "Saúde", icon: Stethoscope, color: "#009B3A" },
  { name: "Trabalho", icon: BriefcaseBusiness, color: "#002776" },
  { name: "Assistência Social", icon: Users, color: "#009B3A" },
  { name: "Transporte", icon: Bus, color: "#009B3A" },
  { name: "Empreendedorismo", icon: Building2, color: "#002776" },
  { name: "Atendimento", icon: MessageCircleQuestion, color: "#002776" },
]

const portalAreas = [
  {
    name: "Documentos digitais",
    shortName: "Documentos",
    description:
      "Identidade, certidões, comprovantes e documentos para usar pelo celular.",
    icon: WalletCards,
    color: "#002776",
    category: "Documentos",
    highlight: "3 documentos disponíveis",
  },
  {
    name: "Benefícios sociais",
    shortName: "Benefícios",
    description:
      "Consulte seus benefícios, critérios de acesso e datas importantes.",
    icon: Users,
    color: "#009B3A",
    category: "Assistência Social",
    highlight: "Consulta rápida",
  },
  {
    name: "Trabalho e emprego",
    shortName: "Empregos",
    description:
      "Vagas, qualificação profissional, carteira de trabalho e seguro-desemprego.",
    icon: BriefcaseBusiness,
    color: "#002776",
    category: "Trabalho",
    highlight: "148 vagas abertas",
  },
  {
    name: "Educação",
    shortName: "Educação",
    description: "Matrículas, certificados, bolsas, cursos e vida escolar.",
    icon: GraduationCap,
    color: "#002776",
    category: "Educação",
    highlight: "12 cursos gratuitos",
  },
  {
    name: "Saúde",
    shortName: "Saúde",
    description:
      "Vacinação, consultas, exames, medicamentos e orientações de saúde.",
    icon: Stethoscope,
    color: "#009B3A",
    category: "Saúde",
    highlight: "Cartão de vacinação",
  },
  {
    name: "Mobilidade",
    shortName: "Mobilidade",
    description:
      "Transporte público, passe estudantil, trânsito e acessibilidade.",
    icon: Bus,
    color: "#009B3A",
    category: "Transporte",
    highlight: "Bilhete digital",
  },
  {
    name: "Direitos do cidadão",
    shortName: "Direitos",
    description:
      "Orientações, defesa do consumidor, participação social e assistência jurídica.",
    icon: ShieldCheck,
    color: "#002776",
    category: "Atendimento",
    highlight: "Conheça seus direitos",
  },
  {
    name: "Serviços municipais",
    shortName: "Município",
    description:
      "Tributos, zeladoria, iluminação, licenças e atendimento da sua cidade.",
    icon: Landmark,
    color: "#002776",
    category: "Atendimento",
    highlight: "42 serviços locais",
  },
]

const services: Service[] = [
  {
    id: 1,
    title: "Emitir Carteira de Identidade",
    category: "Documentos",
    description:
      "Solicite a primeira ou segunda via da sua Carteira de Identidade Nacional.",
    time: "15 min",
    online: true,
    popular: true,
    icon: FileBadge,
  },
  {
    id: 2,
    title: "Consultar Cartão de Vacinação",
    category: "Saúde",
    description:
      "Acesse seu histórico de vacinas e emita o comprovante digital.",
    time: "Imediato",
    online: true,
    popular: true,
    icon: Stethoscope,
  },
  {
    id: 3,
    title: "Solicitar Seguro-Desemprego",
    category: "Trabalho",
    description: "Envie seu requerimento e acompanhe a análise do benefício.",
    time: "20 min",
    online: true,
    popular: true,
    icon: BriefcaseBusiness,
  },
  {
    id: 4,
    title: "Emitir Certificado Escolar",
    category: "Educação",
    description: "Peça certificados e declarações da rede pública de ensino.",
    time: "10 min",
    online: true,
    popular: true,
    icon: GraduationCap,
  },
  {
    id: 5,
    title: "Cadastrar Bilhete de Transporte",
    category: "Transporte",
    description: "Solicite ou atualize seu cartão de transporte público.",
    time: "15 min",
    online: true,
    icon: Bus,
  },
  {
    id: 6,
    title: "Inscrição em Programas Sociais",
    category: "Assistência Social",
    description:
      "Consulte os critérios e faça seu pré-cadastro em programas de assistência.",
    time: "25 min",
    online: true,
    icon: Users,
  },
  {
    id: 7,
    title: "Abrir Microempresa",
    category: "Empreendedorismo",
    description: "Acesse orientações para formalizar seu pequeno negócio.",
    time: "30 min",
    online: true,
    icon: Building2,
  },
  {
    id: 8,
    title: "Agendar Atendimento Presencial",
    category: "Atendimento",
    description: "Escolha unidade, data e horário para seu atendimento.",
    time: "5 min",
    online: false,
    icon: CalendarDays,
  },
  {
    id: 9,
    title: "Solicitar Passe Estudantil",
    category: "Transporte",
    description:
      "Solicite o benefício de transporte para estudantes matriculados.",
    time: "15 min",
    online: true,
    icon: Bus,
  },
  {
    id: 10,
    title: "Consultar Benefícios Disponíveis",
    category: "Assistência Social",
    description:
      "Veja programas sociais compatíveis com o seu perfil demonstrativo.",
    time: "Imediato",
    online: true,
    icon: Users,
  },
  {
    id: 11,
    title: "Buscar Vagas de Emprego",
    category: "Trabalho",
    description:
      "Encontre oportunidades por área, localidade e modalidade de trabalho.",
    time: "Imediato",
    online: true,
    icon: BriefcaseBusiness,
  },
  {
    id: 12,
    title: "Inscrição em Cursos Gratuitos",
    category: "Educação",
    description: "Consulte cursos presenciais e online com inscrições abertas.",
    time: "10 min",
    online: true,
    icon: BookOpen,
  },
  {
    id: 13,
    title: "Agendar Consulta na Rede Pública",
    category: "Saúde",
    description: "Consulte unidades e solicite atendimento básico de saúde.",
    time: "10 min",
    online: true,
    icon: CalendarCheck,
  },
  {
    id: 14,
    title: "Solicitar Reparo de Iluminação",
    category: "Atendimento",
    description:
      "Informe um ponto de iluminação pública que precisa de manutenção.",
    time: "8 min",
    online: true,
    icon: Landmark,
  },
  {
    id: 15,
    title: "Orientação sobre Direitos do Consumidor",
    category: "Atendimento",
    description: "Saiba como registrar uma reclamação e buscar uma solução.",
    time: "Imediato",
    online: true,
    icon: ShieldCheck,
  },
  {
    id: 16,
    title: "Emitir Certidão de Nascimento Digital",
    category: "Documentos",
    description: "Solicite uma via digital demonstrativa da sua certidão.",
    time: "15 min",
    online: true,
    icon: FileBadge,
  },
]

const proposalList: Proposal[] = [
  {
    id: 1,
    title: "Expansão da rede municipal de atendimento",
    category: "Atendimento",
    summary:
      "Ampliação de pontos de atendimento para reduzir filas e melhorar o acesso à população.",
    deadline: "Prazo: 2026",
    status: "Em execução",
    amount: "R$ 8,4 milhões",
    icon: Landmark,
  },
  {
    id: 2,
    title: "Programa Cidade + Digital",
    category: "Tecnologia",
    summary:
      "Investimento em canais digitais para facilitar o acesso a serviços e documentos.",
    deadline: "Prazo: 2026/2027",
    status: "Em execução",
    amount: "R$ 12,1 milhões",
    icon: MonitorCog,
  },
  {
    id: 3,
    title: "Bolsa de formação profissional",
    category: "Educação",
    summary:
      "Ações para qualificação de jovens e adultos com cursos gratuitos e certificação.",
    deadline: "Prazo: 2026",
    status: "Em análise",
    amount: "R$ 5,7 milhões",
    icon: GraduationCap,
  },
]

const initialProtocols = [
  {
    code: "CD-2025-008271",
    title: "Carteira de Identidade Nacional",
    date: "18 jun 2025",
    status: "Em análise",
    step: 2,
  },
  {
    code: "CD-2025-006492",
    title: "Certificado Escolar",
    date: "03 jun 2025",
    status: "Concluído",
    step: 3,
  },
  {
    code: "CD-2025-004113",
    title: "Atualização do Bilhete de Transporte",
    date: "14 mai 2025",
    status: "Aguardando documento",
    step: 1,
  },
]

const initialNotifications: CitizenNotification[] = [
  {
    id: 1,
    icon: FileText,
    title: "Sua solicitação avançou",
    text: "O protocolo CD-2025-008271 está agora em análise.",
    time: "Há 20 minutos",
    type: "Solicitações",
  },
  {
    id: 2,
    icon: CalendarDays,
    title: "Lembrete de atendimento",
    text: "Seu atendimento está agendado para amanhã às 10:30.",
    time: "Hoje, 09:15",
    type: "Agenda",
  },
  {
    id: 3,
    icon: WalletCards,
    title: "Documento disponível",
    text: "Seu certificado escolar digital está pronto para consulta.",
    time: "Ontem, 16:42",
    type: "Documentos",
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Novo serviço recomendado",
    text: "Encontramos um curso gratuito que pode interessar a você.",
    time: "22 jun",
    type: "Recomendações",
  },
]
const notificationsClearedStorageKey = "portal-cidadania-notifications-cleared"

const citizenDocuments = [
  {
    title: "Carteira de Identidade Nacional",
    number: "Final 4821",
    valid: "Válida até 18/06/2035",
    icon: FileBadge,
    color: "blue",
  },
  {
    title: "Cartão de Vacinação",
    number: "Atualizado em 12/06/2025",
    valid: "Vacinação em dia",
    icon: Stethoscope,
    color: "green",
  },
  {
    title: "Certificado Escolar",
    number: "Ensino Médio · 2022",
    valid: "Documento verificado",
    icon: GraduationCap,
    color: "purple",
  },
]

type NavItem = {
  label: string
  page: Page
}

const navItems: NavItem[] = [
  { label: "Início", page: "home" },
  { label: "Serviços", page: "catalog" },
  { label: "Áreas", page: "area" },
  { label: "Propostas", page: "proposals" },
  { label: "Acompanhar protocolo", page: "protocols" },
  { label: "Agendamento", page: "scheduling" },
  { label: "Ajuda", page: "help" },
]

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="logo"
      onClick={onClick}
      aria-label="Ir para a página inicial"
    >
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>
        <strong>Cidadania</strong>
        <small>Digital</small>
      </span>
    </button>
  )
}

function IconButton({
  label,
  children,
  onClick,
  className = "",
}: {
  label: string
  children: ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      className={`icon-button ${className}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Header({
  page,
  navigate,
  loggedIn,
  notifications,
  unreadNotifications,
  logout,
  fontScale,
  setFontScale,
  highContrast,
  setHighContrast,
  reducedMotion,
  setReducedMotion,
}: {
  page: Page
  navigate: (page: Page) => void
  loggedIn: boolean
  notifications: CitizenNotification[]
  unreadNotifications: number
  logout: () => void
  fontScale: number
  setFontScale: (size: number) => void
  highContrast: boolean
  setHighContrast: (value: boolean) => void
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accessOpen, setAccessOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const go = (target: Page) => {
    navigate(target)
    setMobileOpen(false)
  }

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Portal oficial de serviços ao cidadão</span>
          <div className="utility-actions">
            <button onClick={() => setAccessOpen(!accessOpen)}>
              <Accessibility size={15} /> Acessibilidade{" "}
              <ChevronDown size={14} />
            </button>
            <span className="utility-divider" />
            <button onClick={() => go("help")}>
              <CircleHelp size={15} /> Precisa de ajuda?
            </button>
          </div>
          {accessOpen && (
            <div className="access-popover">
              <div className="access-title">
                <strong>Acessibilidade</strong>
                <button
                  aria-label="Fechar opções de acessibilidade"
                  onClick={() => setAccessOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <span className="access-label">Tamanho do texto</span>
              <div className="font-controls">
                <IconButton
                  label="Diminuir texto"
                  onClick={() => setFontScale(Math.max(90, fontScale - 10))}
                >
                  <Minus size={18} />
                </IconButton>
                <span>{fontScale}%</span>
                <IconButton
                  label="Aumentar texto"
                  onClick={() => setFontScale(Math.min(120, fontScale + 10))}
                >
                  <Plus size={18} />
                </IconButton>
              </div>
              <button
                className={`access-toggle ${highContrast ? "active" : ""}`}
                onClick={() => setHighContrast(!highContrast)}
                aria-pressed={highContrast}
              >
                <Contrast size={18} />
                <span>
                  <strong>Alto contraste</strong>
                  <small>{highContrast ? "Ativado" : "Desativado"}</small>
                </span>
              </button>
              <button
                className={`access-toggle ${reducedMotion ? "active" : ""}`}
                onClick={() => setReducedMotion(!reducedMotion)}
                aria-pressed={reducedMotion}
              >
                <MonitorCog size={18} />
                <span>
                  <strong>Reduzir animações</strong>
                  <small>{reducedMotion ? "Ativado" : "Desativado"}</small>
                </span>
              </button>
              <button
                className="reset-access"
                onClick={() => {
                  setFontScale(100)
                  setHighContrast(false)
                  setReducedMotion(false)
                }}
              >
                <RotateCcw size={15} /> Restaurar preferências
              </button>
            </div>
          )}
        </div>
      </div>
      <header className="main-header">
        <div className="container header-inner">
          <Logo onClick={() => go("home")} />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navItems.map((item) => (
              <button
                key={item.page}
                className={
                  page === item.page ||
                  (page === "service" && item.page === "catalog")
                    ? "active"
                    : ""
                }
                onClick={() => go(item.page)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="header-actions">
            {loggedIn && (
              <IconButton
                label="Mensagens"
                onClick={() => go("messages")}
                className="desktop-message"
              >
                <MessageSquare size={20} />
              </IconButton>
            )}
            {loggedIn && (
              <div className="notification-wrap">
                <IconButton
                  label={`Notificações${unreadNotifications ? ` (${unreadNotifications})` : ""}`}
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="notification-dot" />
                  )}
                </IconButton>
                {notificationsOpen && (
                  <div className="notification-popover">
                    <div className="popover-title">
                      <strong>Notificações</strong>
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        aria-label="Fechar notificações"
                      >
                        <X size={17} />
                      </button>
                    </div>
                    {notifications.length ? (
                      notifications.slice(0, 3).map(({ id, icon: Icon, title, text }) => (
                        <p key={id}>
                          <span className="notice-icon">
                            <Icon size={16} />
                          </span>
                          <span>
                            <strong>{title}</strong>
                            <br />
                            {text}
                          </span>
                        </p>
                      ))
                    ) : (
                      <p>Nenhuma notificação por enquanto.</p>
                    )}
                    <button
                      className="popover-link"
                      onClick={() => {
                        setNotificationsOpen(false)
                        go("notifications")
                      }}
                    >
                      Ver todas as notificações <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            )}
            {loggedIn ? (
              <>
                <button
                  className="account-button"
                  onClick={() => go("dashboard")}
                >
                  <span className="avatar">MC</span>
                  <span className="account-copy">
                    <small>Olá,</small>
                    <strong>Marina</strong>
                  </span>
                  <ChevronDown size={16} />
                </button>
                <IconButton
                  label="Sair da conta"
                  className="desktop-logout"
                  onClick={logout}
                >
                  <LogOut size={19} />
                </IconButton>
              </>
            ) : (
              <button
                className="button button-primary button-compact"
                onClick={() => go("login")}
              >
                <User size={17} /> Entrar
              </button>
            )}
            <IconButton
              label="Abrir menu"
              className="mobile-menu-button"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </IconButton>
          </div>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Navegação móvel">
            {navItems.map((item) => (
              <button key={item.page} onClick={() => go(item.page)}>
                {item.label}
                <ChevronRight size={18} />
              </button>
            ))}
            {loggedIn && (
              <button onClick={logout}>
                Sair da conta <LogOut size={18} />
              </button>
            )}
          </nav>
        )}
      </header>
    </>
  )
}

function SearchBox({
  value,
  setValue,
  onSearch,
  placeholder = "Qual serviço você procura?",
  compact = false,
}: {
  value: string
  setValue: (value: string) => void
  onSearch: () => void
  placeholder?: string
  compact?: boolean
}) {
  return (
    <form
      className={`search-box ${compact ? "compact" : ""}`}
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
    >
      <Search size={compact ? 20 : 23} aria-hidden="true" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        list="service-suggestions"
        autoComplete="off"
      />
      <datalist id="service-suggestions">
        {services.map((service) => (
          <option key={service.id} value={service.title} />
        ))}
      </datalist>
      <button type="submit">
        {compact ? (
          "Buscar"
        ) : (
          <>
            <span>Buscar serviço</span>
            <ArrowRight size={19} />
          </>
        )}
      </button>
    </form>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}

function ServiceCard({
  service,
  favorite,
  toggleFavorite,
  onOpen,
}: {
  service: Service
  favorite: boolean
  toggleFavorite: (id: number) => void
  onOpen: (service: Service) => void
}) {
  const Icon = service.icon
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon">
          <Icon size={22} />
        </span>
        <IconButton
          label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={() => toggleFavorite(service.id)}
        >
          <Heart
            size={20}
            fill={favorite ? "currentColor" : "none"}
            className={favorite ? "favorite" : ""}
          />
        </IconButton>
      </div>
      <span className="service-category">{service.category}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="service-meta">
        <span>
          <Clock3 size={15} /> {service.time}
        </span>
        <span className={service.online ? "online" : "presential"}>
          {service.online ? "100% digital" : "Presencial"}
        </span>
      </div>
      <button className="text-link stretched" onClick={() => onOpen(service)}>
        Acessar serviço <ArrowRight size={17} />
      </button>
    </article>
  )
}

function HomePage({
  navigate,
  search,
  setSearch,
  selectService,
  selectArea,
  favorites,
  toggleFavorite,
}: {
  navigate: (page: Page) => void
  search: string
  setSearch: (text: string) => void
  selectService: (service: Service) => void
  selectArea: (area: typeof portalAreas[number]) => void
  favorites: number[]
  toggleFavorite: (id: number) => void
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-decoration hero-dots" />
        <div className="hero-decoration hero-ring" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-badge">
              <ShieldCheck size={16} /> Serviços públicos em um só lugar
            </span>
            <h1>Mais facilidade para cuidar do que importa.</h1>
            <p>
              Encontre serviços, acompanhe solicitações e resolva tudo de forma
              simples, segura e digital.
            </p>
            <SearchBox
              value={search}
              setValue={setSearch}
              onSearch={() => navigate("catalog")}
            />
            <div className="quick-searches">
              <span>Mais buscados:</span>
              {["Identidade", "Vacinação", "Seguro-desemprego"].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearch(term)
                    navigate("catalog")
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-card main">
              <div className="visual-head">
                <span>
                  <CheckCircle2 size={18} />
                </span>
                <div>
                  <strong>Solicitação enviada</strong>
                  <small>Protocolo CD-2025-008271</small>
                </div>
              </div>
              <div className="progress-line">
                <i />
                <i />
                <i />
              </div>
              <div className="visual-status">
                <span>Etapa atual</span>
                <strong>Em análise</strong>
              </div>
            </div>
            <div className="visual-card floating top">
              <CalendarDays size={21} />
              <div>
                <small>Próximo atendimento</small>
                <strong>Amanhã, 10:30</strong>
              </div>
            </div>
            <div className="visual-card floating bottom">
              <ShieldCheck size={21} />
              <div>
                <small>Ambiente</small>
                <strong>Seguro e protegido</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Serviços para cada momento"
            title="Explore as áreas do governo"
            description="Informações e serviços organizados em linguagem simples."
            action={
              <button className="text-link" onClick={() => navigate("area")}>
                Conhecer todas as áreas <ArrowRight size={17} />
              </button>
            }
          />
          <div className="category-grid area-preview-grid">
            {portalAreas.map((area) => {
              const Icon = area.icon
              return (
                <button
                  className="category-card"
                  key={area.name}
                  onClick={() => selectArea(area)}
                >
                  <span
                    className="category-icon"
                    style={
                      { "--category-color": area.color } as React.CSSProperties
                    }
                  >
                    <Icon size={23} />
                  </span>
                  <span>
                    {area.name}
                    <small>{area.highlight}</small>
                  </span>
                  <ChevronRight size={18} />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Acesso rápido"
            title="Serviços mais procurados"
            description="Os serviços mais utilizados pelos cidadãos."
          />
          <div className="service-grid">
            {services
              .filter((service) => service.popular)
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  favorite={favorites.includes(service.id)}
                  toggleFavorite={toggleFavorite}
                  onOpen={selectService}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container trust-grid">
          <div className="trust-copy">
            <span className="eyebrow">Simples, seguro e transparente</span>
            <h2>Seu acesso aos serviços públicos, do seu jeito.</h2>
            <p>
              Uma experiência digital pensada para facilitar sua rotina e manter
              você sempre informado.
            </p>
          </div>
          <div className="trust-items">
            <div>
              <span>
                <ShieldCheck />
              </span>
              <div>
                <h3>Seus dados protegidos</h3>
                <p>Ambiente seguro com boas práticas de privacidade.</p>
              </div>
            </div>
            <div>
              <span>
                <Clock3 />
              </span>
              <div>
                <h3>Disponível a qualquer hora</h3>
                <p>Acesse os serviços digitais quando precisar.</p>
              </div>
            </div>
            <div>
              <span>
                <CheckCircle2 />
              </span>
              <div>
                <h3>Acompanhe cada etapa</h3>
                <p>Consulte atualizações de forma clara e simples.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function CatalogPage({
  navigate,
  search,
  setSearch,
  favorites,
  toggleFavorite,
  selectService,
}: {
  navigate: (page: Page) => void
  search: string
  setSearch: (text: string) => void
  favorites: number[]
  toggleFavorite: (id: number) => void
  selectService: (service: Service) => void
}) {
  const [category, setCategory] = useState("Todos")
  const [onlyOnline, setOnlyOnline] = useState(false)
  const [sort, setSort] = useState("Relevância")
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    if (
      categories.some(
        (item) => item.name.toLowerCase() === search.toLowerCase(),
      )
    ) {
      setCategory(search)
      setSearch("")
    }
  }, [])

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    const list = services.filter((service) => {
      const matchesText =
        !term ||
        `${service.title} ${service.description} ${service.category}`
          .toLowerCase()
          .includes(term)
      const matchesCategory =
        category === "Todos" || service.category === category
      return matchesText && matchesCategory && (!onlyOnline || service.online)
    })
    return sort === "A–Z"
      ? [...list].sort((a, b) => a.title.localeCompare(b.title))
      : list
  }, [search, category, onlyOnline, sort])

  const filters = (
    <aside className={`filters ${filtersOpen ? "open" : ""}`}>
      <div className="filters-title">
        <strong>Filtrar por</strong>
        <button
          onClick={() => {
            setCategory("Todos")
            setOnlyOnline(false)
            setSearch("")
          }}
        >
          Limpar filtros
        </button>
      </div>
      <fieldset>
        <legend>Categoria</legend>
        {["Todos", ...categories.map((item) => item.name)].map((item) => (
          <label key={item} className="radio-row">
            <input
              type="radio"
              checked={category === item}
              onChange={() => setCategory(item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Forma de atendimento</legend>
        <label className="check-row">
          <input
            type="checkbox"
            checked={onlyOnline}
            onChange={(e) => setOnlyOnline(e.target.checked)}
          />
          <span>Somente serviços digitais</span>
        </label>
      </fieldset>
      <button
        className="button button-primary mobile-filter-apply"
        onClick={() => setFiltersOpen(false)}
      >
        Ver resultados
      </button>
    </aside>
  )

  return (
    <main>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <button onClick={() => navigate("home")}>Início</button>
            <ChevronRight size={14} />
            <span>Serviços</span>
          </div>
          <h1>Catálogo de serviços</h1>
          <p>Encontre os serviços públicos disponíveis para você.</p>
          <SearchBox
            value={search}
            setValue={setSearch}
            onSearch={() => undefined}
            compact
          />
        </div>
      </div>
      <div className="container catalog-layout">
        <button
          className="button button-outline filter-toggle"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <span>Filtros</span>
          <ChevronDown size={18} />
        </button>
        {filters}
        <div className="catalog-results">
          <div className="results-bar">
            <p>
              <strong>{filtered.length}</strong> serviços encontrados
            </p>
            <label>
              Ordenar por:
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option>Relevância</option>
                <option>A–Z</option>
              </select>
            </label>
          </div>
          {filtered.length ? (
            <div className="service-grid catalog-grid">
              {filtered.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  favorite={favorites.includes(service.id)}
                  toggleFavorite={toggleFavorite}
                  onOpen={selectService}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={38} />
              <h2>Nenhum serviço encontrado</h2>
              <p>Tente buscar outro termo ou limpar os filtros.</p>
              <button
                className="button button-primary"
                onClick={() => {
                  setSearch("")
                  setCategory("Todos")
                }}
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function ServicePage({
  service,
  navigate,
  favorite,
  toggleFavorite,
  startService,
}: {
  service: Service
  navigate: (page: Page) => void
  favorite: boolean
  toggleFavorite: (id: number) => void
  startService: () => void
}) {
  const Icon = service.icon
  return (
    <main>
      <div className="service-detail-hero">
        <div className="container">
          <div className="breadcrumbs light">
            <button onClick={() => navigate("home")}>Início</button>
            <ChevronRight size={14} />
            <button onClick={() => navigate("catalog")}>Serviços</button>
            <ChevronRight size={14} />
            <span>{service.category}</span>
          </div>
          <div className="detail-hero-grid">
            <div>
              <span className="detail-category">
                <Icon size={18} /> {service.category}
              </span>
              <h1>{service.title}</h1>
              <p>{service.description}</p>
              <div className="detail-tags">
                <span>
                  <Clock3 size={17} /> Tempo estimado: {service.time}
                </span>
                <span>
                  <CheckCircle2 size={17} />{" "}
                  {service.online
                    ? "Serviço digital"
                    : "Atendimento presencial"}
                </span>
              </div>
            </div>
            <button
              className="favorite-detail"
              onClick={() => toggleFavorite(service.id)}
            >
              <Heart size={19} fill={favorite ? "currentColor" : "none"} />{" "}
              {favorite ? "Salvo nos favoritos" : "Adicionar aos favoritos"}
            </button>
          </div>
        </div>
      </div>
      <div className="container detail-layout">
        <article className="detail-content">
          <section>
            <h2>Sobre este serviço</h2>
            <p>
              Este serviço permite que você realize a solicitação de forma
              segura e acompanhe todas as etapas pelo portal Cidadania Digital.
              As informações fornecidas serão usadas exclusivamente para
              analisar o seu pedido.
            </p>
          </section>
          <section>
            <h2>Quem pode utilizar</h2>
            <p>
              Qualquer cidadão brasileiro que possua CPF regular e os documentos
              necessários para a solicitação.
            </p>
          </section>
          <section>
            <h2>O que você precisa</h2>
            <ul className="document-list">
              <li>
                <Check size={17} /> Documento oficial com foto
              </li>
              <li>
                <Check size={17} /> Número do CPF
              </li>
              <li>
                <Check size={17} /> Comprovante de residência atualizado
              </li>
            </ul>
          </section>
          <section>
            <h2>Etapas do serviço</h2>
            <ol className="steps-list">
              <li>
                <span>1</span>
                <div>
                  <strong>Preencha a solicitação</strong>
                  <p>Informe seus dados e confira antes de enviar.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Acompanhe a análise</strong>
                  <p>Você receberá atualizações pelo portal.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Receba o resultado</strong>
                  <p>Acesse o documento ou orientação final.</p>
                </div>
              </li>
            </ol>
          </section>
        </article>
        <aside className="start-card">
          <span className="secure-label">
            <ShieldCheck size={18} /> Ambiente seguro
          </span>
          <h2>Pronto para começar?</h2>
          <p>Você precisará entrar na sua conta para iniciar a solicitação.</p>
          <button
            className="button button-primary button-full"
            onClick={startService}
          >
            Iniciar serviço <ArrowRight size={18} />
          </button>
          {!service.online && (
            <button
              className="button button-outline button-full"
              onClick={() => navigate("scheduling")}
            >
              Agendar atendimento
            </button>
          )}
          <small>
            Seus dados são protegidos conforme a legislação vigente.
          </small>
        </aside>
      </div>
    </main>
  )
}

function LoginPage({
  login,
  navigate,
}: {
  login: () => void
  navigate: (page: Page) => void
}) {
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  type LoginErrors = {
    cpf?: string
    password?: string
  }
  const [errors, setErrors] = useState<LoginErrors>({})

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next: typeof errors = {}
    if (cpf.replace(/\D/g, "").length !== 11)
      next.cpf = "Digite um CPF com 11 números."
    if (password.length < 4)
      next.password = "A senha deve ter pelo menos 4 caracteres."
    setErrors(next)
    if (!Object.keys(next).length) login()
  }

  return (
    <main className="auth-page">
      <section className="auth-brand">
        <Logo onClick={() => navigate("home")} />
        <div className="auth-message">
          <span className="hero-badge">
            <ShieldCheck size={16} /> Acesso protegido
          </span>
          <h1>Sua cidadania, mais simples e mais próxima.</h1>
          <p>
            Acesse serviços, acompanhe solicitações e mantenha seus dados em um
            só lugar.
          </p>
          <div className="auth-benefits">
            <span>
              <CheckCircle2 /> Acesso seguro
            </span>
            <span>
              <Clock3 /> Disponível 24 horas
            </span>
          </div>
        </div>
        <small>Ambiente demonstrativo. Nenhum dado real é armazenado.</small>
      </section>
      <section className="auth-form-wrap">
        <button className="back-link" onClick={() => navigate("home")}>
          <ArrowLeft size={18} /> Voltar para o início
        </button>
        <form className="auth-form" onSubmit={submit} noValidate>
          <span className="form-icon">
            <User size={25} />
          </span>
          <h2>Entre na sua conta</h2>
          <p>Use qualquer CPF fictício e uma senha de 4 caracteres.</p>
          <label>
            CPF
            <div className={`input-wrap ${errors.cpf ? "invalid" : ""}`}>
              <User size={18} />
              <input
                value={cpf}
                onChange={(e) =>
                  setCpf(e.target.value.replace(/\D/g, "").slice(0, 11))
                }
                inputMode="numeric"
                placeholder="000.000.000-00"
                aria-describedby="cpf-error"
              />
            </div>
            {errors.cpf && (
              <span className="field-error" id="cpf-error">
                {errors.cpf}
              </span>
            )}
          </label>
          <label>
            Senha
            <div className={`input-wrap ${errors.password ? "invalid" : ""}`}>
              <LockKeyhole size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                aria-describedby="password-error"
              />
            </div>
            {errors.password && (
              <span className="field-error" id="password-error">
                {errors.password}
              </span>
            )}
          </label>
          <div className="form-options">
            <label className="check-row">
              <input type="checkbox" />
              <span>Lembrar de mim</span>
            </label>
            <button type="button" onClick={() => navigate("recover")}>
              Esqueci minha senha
            </button>
          </div>
          <button className="button button-primary button-full" type="submit">
            Entrar <ArrowRight size={18} />
          </button>
          <div className="demo-hint">
            <strong>Acesso demonstrativo</strong>
            <span>CPF: qualquer 11 números · Senha: mínimo 4 caracteres</span>
          </div>
        </form>
      </section>
    </main>
  )
}

function RecoverPage({
  navigate,
  notify,
}: {
  navigate: (page: Page) => void
  notify: (message: string) => void
}) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) return
    setSent(true)
    notify("Instruções de recuperação enviadas.")
  }
  return (
    <main className="simple-auth">
      <Logo onClick={() => navigate("home")} />
      <div className="simple-auth-card">
        <span className="form-icon">
          <Mail size={24} />
        </span>
        {sent ? (
          <>
            <h1>Confira seu e-mail</h1>
            <p>
              Enviamos instruções de recuperação para <strong>{email}</strong>.
            </p>
            <button
              className="button button-primary button-full"
              onClick={() => navigate("login")}
            >
              Voltar para o login
            </button>
          </>
        ) : (
          <form onSubmit={submit}>
            <h1>Recuperar acesso</h1>
            <p>Informe seu e-mail cadastrado para receber as instruções.</p>
            <label>
              E-mail
              <div className="input-wrap">
                <Mail size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                />
              </div>
            </label>
            <button className="button button-primary button-full">
              Enviar instruções
            </button>
          </form>
        )}
        <button className="back-link center" onClick={() => navigate("login")}>
          <ArrowLeft size={17} /> Voltar
        </button>
      </div>
    </main>
  )
}

function AreaPage({
  area,
  selectArea,
  favorites,
  toggleFavorite,
  selectService,
}: {
  area: typeof portalAreas[number]
  selectArea: (area: typeof portalAreas[number]) => void
  favorites: number[]
  toggleFavorite: (id: number) => void
  selectService: (service: Service) => void
}) {
  const [query, setQuery] = useState("")
  const [digitalOnly, setDigitalOnly] = useState(false)
  const [showGuide, setShowGuide] = useState(true)
  const Icon = area.icon
  const related = services.filter((service) => {
    const matchesArea = service.category === area.category
    const matchesQuery = `${service.title} ${service.description}`
      .toLowerCase()
      .includes(query.toLowerCase())
    return matchesArea && matchesQuery && (!digitalOnly || service.online)
  })

  return (
    <main className="area-page">
      <section
        className="area-hero"
        style={{ "--area-accent": area.color } as React.CSSProperties}
      >
        <div className="container area-hero-inner">
          <div>
            <div className="breadcrumbs light">
              <span>Início</span>
              <ChevronRight size={14} />
              <span>Áreas do governo</span>
            </div>
            <span className="area-kicker">
              <Icon size={18} /> Área de serviços
            </span>
            <h1>{area.name}</h1>
            <p>{area.description}</p>
          </div>
          <div className="area-summary-card">
            <Sparkles size={22} />
            <span>Em destaque</span>
            <strong>{area.highlight}</strong>
            <small>Conteúdo demonstrativo atualizado hoje</small>
          </div>
        </div>
      </section>

      <div className="container area-layout">
        <aside className="area-sidebar">
          <strong>Áreas do governo</strong>
          <nav aria-label="Áreas de serviços">
            {portalAreas.map((item) => {
              const ItemIcon = item.icon
              return (
                <button
                  key={item.name}
                  className={item.name === area.name ? "active" : ""}
                  onClick={() => selectArea(item)}
                >
                  <ItemIcon size={18} />
                  <span>{item.shortName}</span>
                  <ChevronRight size={16} />
                </button>
              )
            })}
          </nav>
          <div className="context-help">
            <CircleHelp size={20} />
            <strong>Não encontrou?</strong>
            <p>Use a busca ou consulte o catálogo completo de serviços.</p>
          </div>
        </aside>

        <div className="area-main">
          {showGuide && (
            <div className="orientation-banner">
              <div>
                <ShieldCheck size={22} />
                <span>
                  <strong>Antes de começar</strong>
                  <p>
                    Tenha seus documentos em mãos. Você poderá salvar e
                    continuar depois.
                  </p>
                </span>
              </div>
              <button onClick={() => setShowGuide(false)}>Entendi</button>
            </div>
          )}
          <div className="area-tools">
            <div className="inline-search">
              <Search size={19} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Buscar em ${area.shortName}`}
                aria-label={`Buscar serviços em ${area.shortName}`}
              />
            </div>
            <label className="switch-row">
              <input
                type="checkbox"
                checked={digitalOnly}
                onChange={(e) => setDigitalOnly(e.target.checked)}
              />
              <span>Somente digitais</span>
            </label>
          </div>
          <SectionHeading
            eyebrow={`${related.length} serviços encontrados`}
            title={`Serviços de ${area.shortName}`}
            description="Escolha um serviço para ver documentos, etapas e prazo."
          />
          {related.length ? (
            <div className="service-grid catalog-grid">
              {related.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  favorite={favorites.includes(service.id)}
                  toggleFavorite={toggleFavorite}
                  onOpen={selectService}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state compact-empty">
              <Search size={32} />
              <h2>Nenhum serviço com esses filtros</h2>
              <p>Limpe a busca ou desative o filtro de serviços digitais.</p>
              <button
                className="button button-primary"
                onClick={() => {
                  setQuery("")
                  setDigitalOnly(false)
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

type CenterNavItem = {
  page: Page
  label: string
  icon: LucideIcon
}

const centerNav: CenterNavItem[] = [
  { page: "dashboard", label: "Visão geral", icon: Home },
  { page: "documents", label: "Documentos", icon: WalletCards },
  { page: "benefits", label: "Benefícios", icon: Users },
  { page: "jobs", label: "Empregos", icon: BriefcaseBusiness },
  { page: "notifications", label: "Notificações", icon: Bell },
  { page: "messages", label: "Mensagens", icon: MessageSquare },
  { page: "favorites", label: "Favoritos", icon: Heart },
  { page: "history", label: "Histórico", icon: History },
  { page: "calendar", label: "Calendário", icon: CalendarDays },
]

function CitizenCenterNav({
  current,
  navigate,
  notificationCount,
}: {
  current: Page
  navigate: (page: Page) => void
  notificationCount: number
}) {
  return (
    <nav className="citizen-center-nav" aria-label="Central do cidadão">
      {centerNav.map(({ page, label, icon: Icon }) => (
        <button
          key={page}
          className={page === current ? "active" : ""}
          onClick={() => navigate(page)}
        >
          <Icon size={18} />
          <span>{label}</span>
          {page === "notifications" && notificationCount > 0 && (
            <i>{notificationCount}</i>
          )}
        </button>
      ))}
    </nav>
  )
}

function CitizenCenterPage({
  mode,
  navigate,
  favorites,
  toggleFavorite,
  selectService,
  notify,
  notifications,
  readNotificationIds,
  notificationCount,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
}: {
  mode: Page
  navigate: (page: Page) => void
  favorites: number[]
  toggleFavorite: (id: number) => void
  selectService: (service: Service) => void
  notify: (message: string) => void
  notifications: CitizenNotification[]
  readNotificationIds: number[]
  notificationCount: number
  markNotificationRead: (id: number) => void
  markAllNotificationsRead: () => void
  clearNotifications: () => void
}) {
  const [notificationFilter, setNotificationFilter] = useState("Todas")
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [message, setMessage] = useState("")
  const [sentMessages, setSentMessages] = useState<string[]>([])
  const [jobQuery, setJobQuery] = useState("")
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(5)

  const pageTitles: Record<string, [string, string]> = {
    documents: [
      "Meus documentos",
      "Consulte documentos digitais e comprovantes em um só lugar.",
    ],
    benefits: [
      "Benefícios sociais",
      "Acompanhe benefícios e descubra programas disponíveis.",
    ],
    jobs: [
      "Oportunidades de emprego",
      "Encontre vagas e caminhos para sua carreira.",
    ],
    notifications: [
      "Central de notificações",
      "Atualizações importantes sobre seus serviços e documentos.",
    ],
    messages: [
      "Mensagens",
      "Converse com as equipes responsáveis pelos seus atendimentos.",
    ],
    favorites: [
      "Serviços favoritos",
      "Acesse rapidamente tudo que você salvou.",
    ],
    history: [
      "Histórico de atividades",
      "Veja acessos, solicitações e ações realizadas na plataforma.",
    ],
    calendar: [
      "Meu calendário",
      "Organize atendimentos, prazos e compromissos importantes.",
    ],
  }
  const [title, description] = pageTitles[mode] || pageTitles.documents

  const documents = citizenDocuments

  const jobs = [
    {
      title: "Assistente administrativo",
      company: "Empresa Cidadã",
      location: "Centro · Presencial",
      type: "CLT",
    },
    {
      title: "Atendente de serviços",
      company: "Rede Municipal",
      location: "Remoto",
      type: "Temporário",
    },
    {
      title: "Auxiliar de logística",
      company: "Cooperativa Horizonte",
      location: "Zona Norte · Presencial",
      type: "CLT",
    },
  ].filter(
    (job) =>
      `${job.title} ${job.company}`
        .toLowerCase()
        .includes(jobQuery.toLowerCase()) &&
      (!remoteOnly || job.location === "Remoto"),
  )

  let body: ReactNode
  if (mode === "documents") {
    body = (
      <>
        <div className="document-overview">
          <div>
            <BadgeCheck size={23} />
            <span>
              <strong>{documents.length} documentos verificados</strong>
              <p>Todos estão disponíveis para consulta.</p>
            </span>
          </div>
          <button
            className="button button-outline"
            onClick={() => notify("Verificação atualizada com sucesso.")}
          >
            <RotateCcw size={16} /> Atualizar
          </button>
        </div>
        <div className="digital-documents-grid">
          {documents.map(({ title, number, valid, icon: Icon, color }) => (
            <article className="digital-document" key={title}>
              <div className={`document-cover ${color}`}>
                <span>Cidadania Digital</span>
                <Icon size={34} />
                <strong>{title}</strong>
                <small>Documento demonstrativo</small>
              </div>
              <div className="document-info">
                <strong>{title}</strong>
                <span>{number}</span>
                <small>
                  <CheckCircle2 size={14} /> {valid}
                </small>
                <div>
                  <button
                    onClick={() => notify(`${title} aberto para visualização.`)}
                  >
                    <Eye size={16} /> Visualizar
                  </button>
                  <button
                    onClick={() => notify("Download demonstrativo preparado.")}
                  >
                    <Download size={16} /> Baixar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </>
    )
  } else if (mode === "benefits") {
    body = (
      <>
        <div className="benefit-summary">
          <div>
            <WalletCards />
            <span>
              <small>Benefício ativo</small>
              <strong>Auxílio Cidadão</strong>
              <p>Próximo pagamento demonstrativo: 08 de julho</p>
            </span>
          </div>
          <span className="status success">Cadastro regular</span>
        </div>
        <div className="content-card-grid">
          {[
            [
              "Tarifa Social de Energia",
              "Você pode atender aos critérios",
              "Verificar elegibilidade",
            ],
            [
              "Programa de Renda Municipal",
              "Cadastro disponível até 30/07",
              "Conhecer programa",
            ],
            [
              "Isenção de taxa em concursos",
              "Benefício sujeito à análise",
              "Ver orientações",
            ],
          ].map(([name, detail, action]) => (
            <article key={name}>
              <span className="content-icon">
                <Users size={21} />
              </span>
              <h3>{name}</h3>
              <p>{detail}</p>
              <button
                className="text-link"
                onClick={() => notify(`Informações de ${name} abertas.`)}
              >
                {action} <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </>
    )
  } else if (mode === "jobs") {
    body = (
      <>
        <div className="area-tools jobs-tools">
          <div className="inline-search">
            <Search size={19} />
            <input
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              placeholder="Cargo, área ou empresa"
            />
          </div>
          <label className="switch-row">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
            />
            <span>Somente remoto</span>
          </label>
        </div>
        <div className="jobs-list">
          {jobs.map((job) => (
            <article key={job.title}>
              <span>
                <BriefcaseBusiness size={22} />
              </span>
              <div>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <small>
                  <MapPin size={14} /> {job.location} · {job.type}
                </small>
              </div>
              <button
                className="button button-outline"
                onClick={() => notify(`Vaga “${job.title}” salva.`)}
              >
                Salvar vaga
              </button>
            </article>
          ))}
        </div>
      </>
    )
  } else if (mode === "notifications") {
    const shown = notifications.filter(
      (item) =>
        notificationFilter === "Todas" || item.type === notificationFilter,
    )
    body = (
      <>
        <div className="center-toolbar">
          <div className="filter-pills">
            {["Todas", "Solicitações", "Agenda", "Documentos"].map((filter) => (
              <button
                className={filter === notificationFilter ? "active" : ""}
                key={filter}
                onClick={() => setNotificationFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="notification-actions">
            <button
              className="text-link"
              onClick={markAllNotificationsRead}
              disabled={notificationCount === 0}
            >
              <CheckCheckIcon /> Marcar todas como lidas
            </button>
            <button
              className="notification-clear"
              onClick={clearNotifications}
              disabled={notifications.length === 0}
            >
              <Trash2 size={16} /> Limpar notificações
            </button>
          </div>
        </div>
        {shown.length ? (
          <div className="notification-list">
            {shown.map(({ id, icon: Icon, title: itemTitle, text, time }) => (
              <button
                key={id}
                className={readNotificationIds.includes(id) ? "read" : "unread"}
                onClick={() => markNotificationRead(id)}
              >
                <span className="notification-list-icon">
                  <Icon size={20} />
                </span>
                <span>
                  <strong>{itemTitle}</strong>
                  <p>{text}</p>
                  <small>{time}</small>
                </span>
                {!readNotificationIds.includes(id) && <i />}
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-state notification-empty">
            <Bell size={32} />
            <h2>
              {notifications.length
                ? "Nenhuma notificação nesta categoria"
                : "Todas as notificações foram limpas"}
            </h2>
            <p>
              {notifications.length
                ? "Escolha outra categoria para ver as notificações."
                : "Quando houver novidades sobre seus serviços, elas aparecerão aqui."}
            </p>
          </div>
        )}
      </>
    )
  } else if (mode === "messages") {
    const conversations = [
      ["Central de Identificação", "Recebemos seus documentos.", "10:24"],
      ["Atendimento Municipal", "Como podemos ajudar?", "Ontem"],
      ["Suporte Cidadania Digital", "Seu chamado foi atualizado.", "20 jun"],
    ]
    body = (
      <div className="messages-layout">
        <div className="conversation-list">
          {conversations.map(([name, preview, time], index) => (
            <button
              className={selectedConversation === index ? "active" : ""}
              key={name}
              onClick={() => setSelectedConversation(index)}
            >
              <span>{name.slice(0, 2).toUpperCase()}</span>
              <div>
                <strong>{name}</strong>
                <p>{preview}</p>
              </div>
              <small>{time}</small>
            </button>
          ))}
        </div>
        <div className="conversation-panel">
          <header>
            <span>
              {conversations[selectedConversation][0].slice(0, 2).toUpperCase()}
            </span>
            <div>
              <strong>{conversations[selectedConversation][0]}</strong>
              <small>Atendimento demonstrativo</small>
            </div>
          </header>
          <div className="message-thread">
            <div className="received">
              Olá, Marina. Recebemos seus documentos e a análise já foi
              iniciada.<small>10:22</small>
            </div>
            <div className="sent">
              Obrigada! Preciso enviar mais alguma informação?
              <small>10:23</small>
            </div>
            <div className="received">
              No momento, não. Avisaremos por aqui se algo for necessário.
              <small>10:24</small>
            </div>
            {sentMessages.map((sent, index) => (
              <div className="sent" key={`${sent}-${index}`}>
                {sent}
                <small>Agora</small>
              </div>
            ))}
          </div>
          <form
            className="message-composer"
            onSubmit={(e) => {
              e.preventDefault()
              if (!message.trim()) return
              setSentMessages([...sentMessages, message])
              setMessage("")
              notify("Mensagem enviada.")
            }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem"
              aria-label="Digite sua mensagem"
            />
            <button aria-label="Enviar mensagem">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    )
  } else if (mode === "favorites") {
    const favoriteServices = services.filter((service) =>
      favorites.includes(service.id),
    )
    body = favoriteServices.length ? (
      <div className="service-grid catalog-grid">
        {favoriteServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            favorite
            toggleFavorite={toggleFavorite}
            onOpen={selectService}
          />
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <Heart size={36} />
        <h2>Nenhum favorito ainda</h2>
        <p>Salve serviços para encontrá-los rapidamente aqui.</p>
        <button
          className="button button-primary"
          onClick={() => navigate("catalog")}
        >
          Explorar serviços
        </button>
      </div>
    )
  } else if (mode === "history") {
    body = (
      <div className="activity-history">
        {[
          [
            "Hoje, 10:24",
            "Mensagem recebida",
            "Central de Identificação respondeu sua dúvida.",
            MessageSquare,
          ],
          [
            "Hoje, 09:15",
            "Protocolo atualizado",
            "Sua solicitação avançou para a etapa de análise.",
            FileText,
          ],
          [
            "24 jun, 15:40",
            "Serviço favoritado",
            "Você salvou Consultar Cartão de Vacinação.",
            Heart,
          ],
          [
            "22 jun, 11:08",
            "Documento acessado",
            "Certificado Escolar foi visualizado.",
            Eye,
          ],
          [
            "18 jun, 14:32",
            "Solicitação criada",
            "Carteira de Identidade Nacional.",
            CheckCircle2,
          ],
        ].map(([date, itemTitle, detail, ItemIcon]) => {
          const ActivityIcon = ItemIcon as LucideIcon
          return (
            <article key={`${date}-${itemTitle}`}>
              <span>
                <ActivityIcon size={18} />
              </span>
              <div>
                <small>{date as string}</small>
                <strong>{itemTitle as string}</strong>
                <p>{detail as string}</p>
              </div>
              <button
                aria-label={`Ver ${itemTitle}`}
                onClick={() => notify("Detalhes da atividade abertos.")}
              >
                <ChevronRight size={18} />
              </button>
            </article>
          )
        })}
      </div>
    )
  } else {
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]
    body = (
      <div className="calendar-layout">
        <div className="mini-calendar">
          <header>
            <button
              aria-label="Mês anterior"
              onClick={() => setCalendarMonth((current) => (current + 11) % 12)}
            >
              <ArrowLeft size={17} />
            </button>
            <strong>{monthNames[calendarMonth]} de 2025</strong>
            <button
              aria-label="Próximo mês"
              onClick={() => setCalendarMonth((current) => (current + 1) % 12)}
            >
              <ArrowRight size={17} />
            </button>
          </header>
          <div className="weekdays">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
              <span key={`${day}-${i}`}>{day}</span>
            ))}
          </div>
          <div className="calendar-days">
            {Array.from({ length: 35 }, (_, index) => {
              const day = index - 1
              return (
                <button
                  key={index}
                  disabled={day < 1 || day > 30}
                  className={
                    calendarMonth === 5 && day === 26
                      ? "selected"
                      : calendarMonth === 5 && day === 30
                        ? "has-event"
                        : ""
                  }
                  onClick={() =>
                    day > 0 &&
                    day <= 30 &&
                    notify(
                      `Dia ${day} de ${monthNames[calendarMonth]} selecionado.`,
                    )
                  }
                >
                  {day > 0 && day <= 30 ? day : ""}
                </button>
              )
            })}
          </div>
        </div>
        <div className="calendar-agenda">
          <div className="panel-heading">
            <h2>Próximos compromissos</h2>
            <button
              className="text-link"
              onClick={() => navigate("scheduling")}
            >
              Novo agendamento <Plus size={16} />
            </button>
          </div>
          <article>
            <span className="calendar-date-box">
              <strong>26</strong>JUN
            </span>
            <div>
              <span className="status warning">Atendimento</span>
              <h3>Posto Central de Atendimento</h3>
              <p>
                <Clock3 size={15} /> 10:30 · <MapPin size={15} /> Centro
              </p>
            </div>
            <button onClick={() => notify("Lembrete configurado.")}>
              Criar lembrete
            </button>
          </article>
          <article>
            <span className="calendar-date-box">
              <strong>30</strong>JUN
            </span>
            <div>
              <span className="status danger">Prazo</span>
              <h3>Enviar comprovante de residência</h3>
              <p>
                <FileText size={15} /> Protocolo CD-2025-004113
              </p>
            </div>
            <button onClick={() => navigate("protocols")}>Ver protocolo</button>
          </article>
        </div>
      </div>
    )
  }

  return (
    <main className="center-page">
      <div className="center-top">
        <div className="container">
          <span className="eyebrow">Central do cidadão</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="container center-layout">
        <CitizenCenterNav
          current={mode}
          navigate={navigate}
          notificationCount={notificationCount}
        />
        <section className="center-content">{body}</section>
      </div>
    </main>
  )
}

function CheckCheckIcon() {
  return (
    <span className="double-check" aria-hidden="true">
      <Check size={14} />
      <Check size={14} />
    </span>
  )
}

function DashboardPage({
  navigate,
  favorites,
  selectService,
  notify,
  notificationCount,
}: {
  navigate: (page: Page) => void
  favorites: number[]
  selectService: (service: Service) => void
  notify: (message: string) => void
  notificationCount: number
}) {
  const dashboardSignals = {
    activeProtocols: initialProtocols.filter(
      (item) => item.status !== "Concluído",
    ).length,
    nextAppointment: "26 jun · 10:30",
    favorites: favorites.length,
    documents: citizenDocuments.length,
  }

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-welcome">
          <div className="dashboard-welcome-main">
            <span className="profile-avatar-large" aria-hidden="true">
              MC
            </span>
            <div className="dashboard-welcome-copy">
              <span className="dashboard-eyebrow">Área do cidadão</span>
              <h1>Olá, Marina!</h1>
              <p>Acompanhe seus serviços e acesse o que precisa.</p>
              <div className="profile-account-details">
                <span>
                  <BadgeCheck size={15} /> Perfil verificado
                </span>
                <span>
                  <User size={15} /> CPF final 4821
                </span>
              </div>
            </div>
          </div>
          <div className="dashboard-welcome-actions">
            <span className="dashboard-date-card">
              <CalendarDays size={18} />
              <span>
                <small>Data de referência</small>
                <strong>Quarta, 25 de junho</strong>
              </span>
            </span>
            <button
              className="profile-edit-button"
              onClick={() =>
                notify("Atualização de perfil disponível em modo demonstrativo.")
              }
            >
              Atualizar perfil <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <CitizenCenterNav
          current="dashboard"
          navigate={navigate}
          notificationCount={notificationCount}
        />
        <section className="pending-banner">
          <span className="pending-icon">
            <Archive size={22} />
          </span>
          <div>
            <span className="status danger">Ação necessária</span>
            <h2>Envie um comprovante para continuar</h2>
            <p>
              O protocolo CD-2025-004113 aguarda um comprovante de residência.
            </p>
          </div>
          <button
            className="button button-primary"
            onClick={() =>
              notify("Envio de documento aberto em modo demonstrativo.")
            }
          >
            Enviar documento <ArrowRight size={17} />
          </button>
        </section>
        <div className="metric-grid">
          <button onClick={() => navigate("protocols")}>
            <span className="metric-icon blue">
              <FileText />
            </span>
            <span>
              <small>Solicitações em andamento</small>
              <strong>{dashboardSignals.activeProtocols}</strong>
              <em>
                Ver solicitações <ArrowRight size={15} />
              </em>
            </span>
          </button>
          <button onClick={() => navigate("scheduling")}>
            <span className="metric-icon purple">
              <CalendarDays />
            </span>
            <span>
              <small>Próximo agendamento</small>
              <strong className="metric-date">{dashboardSignals.nextAppointment}</strong>
              <em>
                Ver detalhes <ArrowRight size={15} />
              </em>
            </span>
          </button>
          <button onClick={() => navigate("favorites")}>
            <span className="metric-icon red">
              <Heart />
            </span>
            <span>
              <small>Serviços favoritos</small>
              <strong>{dashboardSignals.favorites}</strong>
              <em>
                Ver favoritos <ArrowRight size={15} />
              </em>
            </span>
          </button>
          <button onClick={() => navigate("documents")}>
            <span className="metric-icon green">
              <WalletCards />
            </span>
            <span>
              <small>Documentos digitais</small>
              <strong>{dashboardSignals.documents}</strong>
              <em>
                Ver documentos <ArrowRight size={15} />
              </em>
            </span>
          </button>
        </div>
        <div className="dashboard-grid">
          <section className="dashboard-panel protocols-preview">
            <SectionHeading
              title="Solicitações recentes"
              action={
                <button
                  className="text-link"
                  onClick={() => navigate("protocols")}
                >
                  Ver todas <ArrowRight size={16} />
                </button>
              }
            />
            {initialProtocols.slice(0, 2).map((protocol) => (
              <button
                className="protocol-row"
                key={protocol.code}
                onClick={() => navigate("protocols")}
              >
                <span className="protocol-doc">
                  <FileText size={20} />
                </span>
                <span className="protocol-info">
                  <strong>{protocol.title}</strong>
                  <small>
                    {protocol.code} · {protocol.date}
                  </small>
                </span>
                <span
                  className={`status ${
                    protocol.status === "Concluído" ? "success" : "warning"
                  }`}
                >
                  {protocol.status}
                </span>
                <ChevronRight size={18} />
              </button>
            ))}
          </section>
          <aside className="dashboard-panel next-appointment">
            <div className="panel-label">
              <CalendarDays size={18} /> Próximo atendimento
            </div>
            <div className="appointment-date">
              <strong>26</strong>
              <span>
                JUN<small>Quinta-feira</small>
              </span>
            </div>
            <h3>Posto Central de Atendimento</h3>
            <p>
              <Clock3 size={16} /> 10:30
            </p>
            <p>
              <MapPin size={16} /> Av. Cidadania, 100 · Centro
            </p>
            <button
              className="button button-outline button-full"
              onClick={() => navigate("scheduling")}
            >
              Ver agendamento
            </button>
          </aside>
        </div>
        <section className="dashboard-panel">
          <SectionHeading title="Acesso rápido" />
          <div className="quick-actions">
            <button onClick={() => navigate("catalog")}>
              <span>
                <Search />
              </span>
              Encontrar serviço
              <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate("protocols")}>
              <span>
                <FileText />
              </span>
              Consultar protocolo
              <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate("scheduling")}>
              <span>
                <CalendarDays />
              </span>
              Agendar atendimento
              <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate("help")}>
              <span>
                <CircleHelp />
              </span>
              Central de ajuda
              <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate("documents")}>
              <span>
                <WalletCards />
              </span>
              Meus documentos
              <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate("benefits")}>
              <span>
                <Users />
              </span>
              Consultar benefícios
              <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate("jobs")}>
              <span>
                <BriefcaseBusiness />
              </span>
              Buscar empregos
              <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate("messages")}>
              <span>
                <MessageSquare />
              </span>
              Minhas mensagens
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
        <div className="dashboard-insights">
          <section className="dashboard-panel recent-activity">
            <SectionHeading
              title="Atividades recentes"
              action={
                <button
                  className="text-link"
                  onClick={() => navigate("history")}
                >
                  Ver histórico <ArrowRight size={16} />
                </button>
              }
            />
            {[
              ["Protocolo atualizado", "Hoje, 09:15", FileText],
              ["Nova mensagem recebida", "Ontem, 16:40", MessageSquare],
              ["Documento disponível", "22 jun, 11:08", WalletCards],
            ].map(([label, time, ActivityIcon]) => {
              const Icon = ActivityIcon as LucideIcon
              return (
                <button
                  key={label as string}
                  onClick={() => navigate("history")}
                >
                  <span>
                    <Icon size={18} />
                  </span>
                  <strong>{label as string}</strong>
                  <small>{time as string}</small>
                  <ChevronRight size={17} />
                </button>
              )
            })}
          </section>
          <section className="dashboard-panel recommendation-panel">
            <span className="panel-label">
              <Sparkles size={20} /> Recomendado para você
            </span>
            <h2>Curso gratuito de atendimento digital</h2>
            <p>
              Formação online de 20 horas, com certificado e inscrições abertas.
            </p>
            <button
              className="button button-outline button-full"
              onClick={() =>
                selectService(services.find((item) => item.id === 12)!)
              }
            >
              Conhecer curso <ArrowRight size={16} />
            </button>
          </section>
        </div>
        {favorites.length > 0 && (
          <section className="favorite-strip">
            <div>
              <h2>Seus serviços favoritos</h2>
              <p>Acesse rapidamente os serviços que você salvou.</p>
            </div>
            <div>
              {services
                .filter((service) => favorites.includes(service.id))
                .slice(0, 3)
                .map((service) => (
                  <button
                    key={service.id}
                    onClick={() => selectService(service)}
                  >
                    <Heart size={17} fill="currentColor" />
                    {service.title}
                    <ArrowRight size={16} />
                  </button>
                ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

function ProtocolsPage({ notify }: { notify: (message: string) => void }) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(initialProtocols[0])
  const [searched, setSearched] = useState(false)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const found = initialProtocols.find((item) =>
      item.code.toLowerCase().includes(query.toLowerCase()),
    )
    if (found) {
      setSelected(found)
      setSearched(true)
      notify("Protocolo localizado.")
    } else notify("Protocolo não encontrado. Tente CD-2025-008271.")
  }
  return (
    <main>
      <div className="page-hero compact-hero">
        <div className="container">
          <span className="eyebrow">Transparência em cada etapa</span>
          <h1>Acompanhe suas solicitações</h1>
          <p>Consulte o andamento e veja os detalhes de cada protocolo.</p>
        </div>
      </div>
      <div className="container protocols-layout">
        <section>
          <form className="protocol-search" onSubmit={submit}>
            <label htmlFor="protocol">Consultar outro protocolo</label>
            <div>
              <FileText size={19} />
              <input
                id="protocol"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex.: CD-2025-008271"
                required
              />
              <button className="button button-primary">Consultar</button>
            </div>
            <small>Use o número informado no comprovante da solicitação.</small>
          </form>
          <div className="panel-heading">
            <h2>{searched ? "Resultado da consulta" : "Seus protocolos"}</h2>
            <span>{initialProtocols.length} solicitações</span>
          </div>
          <div className="protocol-list">
            {initialProtocols.map((protocol) => (
              <button
                className={selected.code === protocol.code ? "selected" : ""}
                key={protocol.code}
                onClick={() => setSelected(protocol)}
              >
                <span className="protocol-doc">
                  <FileText size={20} />
                </span>
                <span className="protocol-info">
                  <strong>{protocol.title}</strong>
                  <small>
                    {protocol.code} · Aberto em {protocol.date}
                  </small>
                </span>
                <span
                  className={`status ${
                    protocol.status === "Concluído"
                      ? "success"
                      : protocol.status.includes("Aguardando")
                        ? "danger"
                        : "warning"
                  }`}
                >
                  {protocol.status}
                </span>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>
        </section>
        <aside className="protocol-detail">
          <span
            className={`status ${
              selected.status === "Concluído" ? "success" : "warning"
            }`}
          >
            {selected.status}
          </span>
          <h2>{selected.title}</h2>
          <p className="protocol-number">{selected.code}</p>
          <div className="timeline">
            {[
              "Solicitação enviada",
              "Documentos recebidos",
              "Análise concluída",
            ].map((label, index) => (
              <div className={index <= selected.step ? "done" : ""} key={label}>
                <span>
                  {index <= selected.step ? <Check size={15} /> : index + 1}
                </span>
                <div>
                  <strong>{label}</strong>
                  <small>
                    {index === 0
                      ? selected.date
                      : index <= selected.step
                        ? "Etapa concluída"
                        : "Aguardando"}
                  </small>
                </div>
              </div>
            ))}
          </div>
          <div className="info-note">
            <CircleHelp size={18} />
            <p>
              <strong>Previsão de conclusão</strong>
              <br />
              Até 5 dias úteis após o envio.
            </p>
          </div>
          <button
            className="button button-outline button-full"
            onClick={() =>
              notify("Comprovante preparado para download (demonstração).")
            }
          >
            Baixar comprovante
          </button>
        </aside>
      </div>
    </main>
  )
}

function SchedulingPage({ notify }: { notify: (message: string) => void }) {
  const [step, setStep] = useState(1)
  const [service, setService] = useState("")
  const [unit, setUnit] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const next = () => {
    if (step === 1 && (!service || !unit))
      return notify("Escolha o serviço e a unidade.")
    if (step === 2 && (!date || !time))
      return notify("Escolha a data e o horário.")
    setStep(step + 1)
  }
  const confirm = () => {
    setConfirmed(true)
    notify("Agendamento confirmado com sucesso.")
  }
  if (confirmed)
    return (
      <main className="confirmation-page">
        <div className="confirmation-card">
          <span>
            <Check size={34} />
          </span>
          <h1>Agendamento confirmado!</h1>
          <p>Enviamos os detalhes para o seu e-mail.</p>
          <div>
            <strong>{service}</strong>
            <p>
              <CalendarDays size={17} /> {date} às {time}
            </p>
            <p>
              <MapPin size={17} /> {unit}
            </p>
          </div>
          <button
            className="button button-primary"
            onClick={() => {
              setConfirmed(false)
              setStep(1)
            }}
          >
            Fazer novo agendamento
          </button>
        </div>
      </main>
    )
  return (
    <main>
      <div className="page-hero compact-hero">
        <div className="container">
          <span className="eyebrow">Atendimento presencial</span>
          <h1>Agende seu atendimento</h1>
          <p>Escolha o serviço, a unidade e o melhor horário para você.</p>
        </div>
      </div>
      <div className="container schedule-wrap">
        <div className="schedule-progress">
          {["Serviço e local", "Data e horário", "Confirmação"].map(
            (label, index) => (
              <div className={step >= index + 1 ? "active" : ""} key={label}>
                <span>
                  {step > index + 1 ? <Check size={15} /> : index + 1}
                </span>
                <strong>{label}</strong>
              </div>
            ),
          )}
        </div>
        <section className="schedule-card">
          {step === 1 && (
            <>
              <div className="form-heading">
                <span>
                  <MapPin />
                </span>
                <div>
                  <h2>Escolha o serviço e a unidade</h2>
                  <p>Selecione onde deseja ser atendido.</p>
                </div>
              </div>
              <div className="form-grid">
                <label>
                  Serviço
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Selecione um serviço</option>
                    <option>Emissão de Carteira de Identidade</option>
                    <option>Atualização cadastral</option>
                    <option>Orientação sobre benefícios</option>
                  </select>
                </label>
                <label>
                  Unidade
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="">Selecione uma unidade</option>
                    <option>Posto Central de Atendimento</option>
                    <option>Unidade Cidadania Norte</option>
                    <option>Unidade Cidadania Sul</option>
                  </select>
                </label>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="form-heading">
                <span>
                  <CalendarDays />
                </span>
                <div>
                  <h2>Escolha a data e o horário</h2>
                  <p>Horários exibidos conforme disponibilidade fictícia.</p>
                </div>
              </div>
              <label className="date-field">
                Data do atendimento
                <input
                  type="date"
                  min="2025-06-26"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <fieldset className="time-slots">
                <legend>Horários disponíveis</legend>
                {["08:30", "09:00", "10:30", "14:00", "15:30", "16:00"].map(
                  (slot) => (
                    <button
                      type="button"
                      className={time === slot ? "selected" : ""}
                      key={slot}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ),
                )}
              </fieldset>
            </>
          )}
          {step === 3 && (
            <>
              <div className="form-heading">
                <span>
                  <CheckCircle2 />
                </span>
                <div>
                  <h2>Confira os dados</h2>
                  <p>Revise antes de confirmar o agendamento.</p>
                </div>
              </div>
              <div className="review-grid">
                <div>
                  <small>Serviço</small>
                  <strong>{service}</strong>
                </div>
                <div>
                  <small>Unidade</small>
                  <strong>{unit}</strong>
                </div>
                <div>
                  <small>Data</small>
                  <strong>{date}</strong>
                </div>
                <div>
                  <small>Horário</small>
                  <strong>{time}</strong>
                </div>
              </div>
              <div className="info-note">
                <ShieldCheck size={19} />
                <p>
                  Leve um documento oficial com foto e chegue com 10 minutos de
                  antecedência.
                </p>
              </div>
            </>
          )}
          <div className="schedule-actions">
            {step > 1 ? (
              <button
                className="button button-outline"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={17} /> Voltar
              </button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <button className="button button-primary" onClick={next}>
                Continuar <ArrowRight size={17} />
              </button>
            ) : (
              <button className="button button-primary" onClick={confirm}>
                Confirmar agendamento <Check size={17} />
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

function HelpPage({ notify }: { notify: (message: string) => void }) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState<number | null>(0)
  const faqs = [
    [
      "Como acompanho uma solicitação?",
      "Acesse “Acompanhar protocolo” no menu e informe o número recebido ao concluir o serviço. Se estiver conectado, suas solicitações também aparecem no painel.",
    ],
    [
      "Esqueci minha senha. O que devo fazer?",
      "Na tela de acesso, selecione “Esqueci minha senha” e informe o e-mail cadastrado para receber as instruções.",
    ],
    [
      "Como cancelar um agendamento?",
      "Acesse o painel do cidadão, abra o agendamento e selecione a opção de cancelamento.",
    ],
    [
      "Meus dados estão seguros?",
      "Este é um ambiente demonstrativo e não armazena dados reais. Em um portal oficial, dados devem seguir a legislação de proteção vigente.",
    ],
  ]
  const shown = faqs.filter((item) =>
    item.join(" ").toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <main>
      <div className="help-hero">
        <div className="container">
          <span className="eyebrow">Central de ajuda</span>
          <h1>Como podemos ajudar?</h1>
          <p>Encontre respostas rápidas ou fale com nosso atendimento.</p>
          <SearchBox
            value={search}
            setValue={setSearch}
            onSearch={() => undefined}
            compact
            placeholder="Busque uma dúvida ou assunto"
          />
        </div>
      </div>
      <div className="container help-layout">
        <section>
          <SectionHeading
            title="Perguntas frequentes"
            description="Respostas para as dúvidas mais comuns."
          />
          <div className="accordion">
            {shown.map(([question, answer], index) => (
              <div key={question} className={open === index ? "open" : ""}>
                <button
                  onClick={() => setOpen(open === index ? null : index)}
                  aria-expanded={open === index}
                >
                  <span>{question}</span>
                  <ChevronDown size={20} />
                </button>
                {open === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </section>
        <aside className="contact-card">
          <span>
            <MessageCircleQuestion />
          </span>
          <h2>Ainda precisa de ajuda?</h2>
          <p>Nossa equipe está disponível de segunda a sexta, das 8h às 18h.</p>
          <button
            className="button button-primary button-full"
            onClick={() =>
              notify("Atendimento por chat iniciado (demonstração).")
            }
          >
            Iniciar atendimento
          </button>
          <div>
            <Mail size={16} /> ajuda@cidadaniadigital.demo
          </div>
        </aside>
      </div>
    </main>
  )
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo onClick={() => navigate("home")} />
          <p>
            Serviços públicos digitais com simplicidade, segurança e
            transparência.
          </p>
        </div>
        <div>
          <strong>Serviços</strong>
          <button onClick={() => navigate("catalog")}>
            Catálogo de serviços
          </button>
          <button onClick={() => navigate("protocols")}>
            Acompanhar protocolo
          </button>
          <button onClick={() => navigate("scheduling")}>Agendamento</button>
        </div>
        <div>
          <strong>Suporte</strong>
          <button onClick={() => navigate("help")}>Central de ajuda</button>
          <button onClick={() => navigate("help")}>Acessibilidade</button>
          <button onClick={() => navigate("help")}>Termos de uso</button>
        </div>
        <div>
          <strong>Portal demonstrativo</strong>
          <p>
            Projeto acadêmico com dados fictícios. Não possui vínculo com órgãos
            governamentais.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 Cidadania Digital</span>
        <span>Feito para aproximar serviços e cidadãos.</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [search, setSearch] = useState("")
  const [selectedService, setSelectedService] = useState<Service>(services[0])
  const [selectedArea, setSelectedArea] = useState(portalAreas[0])
  const [favorites, setFavorites] = useState<number[]>([2])
  const [loggedIn, setLoggedIn] = useState(false)
  const [pendingService, setPendingService] = useState(false)
  const [notifications, setNotifications] =
    useState<CitizenNotification[]>(initialNotifications)
  const [readNotificationIds, setReadNotificationIds] = useState<number[]>([3])
  const [fontScale, setFontScale] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [toast, setToast] = useState("")
  const toastTimer = useRef<number | null>(null)

  const navigate = (target: Page) => {
    setPage(target)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const notify = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(""), 3200)
  }
  const unreadNotificationCount = notifications.filter(
    (item) => !readNotificationIds.includes(item.id),
  ).length
  const markNotificationRead = (id: number) => {
    setReadNotificationIds((current) =>
      current.includes(id) ? current : [...current, id],
    )
  }
  const markAllNotificationsRead = () => {
    setReadNotificationIds(notifications.map((item) => item.id))
  }
  const clearNotifications = () => {
    setNotifications([])
    setReadNotificationIds([])
    try {
      window.localStorage.setItem(notificationsClearedStorageKey, "true")
      notify("Todas as notificações foram removidas.")
    } catch (error) {
      console.error("Não foi possível salvar a limpeza das notificações.", error)
      notify(
        "Notificações removidas desta sessão, mas não foi possível salvar essa alteração no navegador.",
      )
    }
  }
  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
    notify(
      favorites.includes(id)
        ? "Serviço removido dos favoritos."
        : "Serviço adicionado aos favoritos.",
    )
  }
  const selectService = (service: Service) => {
    setSelectedService(service)
    navigate("service")
  }
  const openArea = (area: typeof portalAreas[number]) => {
    setSelectedArea(area)
    navigate("area")
  }
  const login = () => {
    setLoggedIn(true)
    notify(
      pendingService
        ? "Login realizado. Sua solicitação foi iniciada."
        : "Login realizado com sucesso.",
    )
    setPendingService(false)
    navigate("dashboard")
  }
  const logout = () => {
    setLoggedIn(false)
    notify("Você saiu da sua conta.")
    navigate("home")
  }
  const startService = () => {
    if (!loggedIn) {
      setPendingService(true)
      notify("Entre na sua conta para iniciar o serviço.")
      navigate("login")
    } else {
      notify("Solicitação iniciada. Acompanhe pelo seu painel.")
      navigate("dashboard")
    }
  }

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`
  }, [fontScale])

  useEffect(() => {
    try {
      if (window.localStorage.getItem(notificationsClearedStorageKey) === "true") {
        setNotifications([])
        setReadNotificationIds([])
      }
    } catch (error) {
      console.error("Não foi possível carregar o estado das notificações.", error)
      notify("Não foi possível recuperar a limpeza anterior das notificações.")
    }
  }, [])

  let content: ReactNode
  if (page === "home")
    content = (
      <HomePage
        navigate={navigate}
        search={search}
        setSearch={setSearch}
        selectService={selectService}
        selectArea={openArea}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    )
  else if (page === "catalog")
    content = (
      <CatalogPage
        navigate={navigate}
        search={search}
        setSearch={setSearch}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        selectService={selectService}
      />
    )
  else if (page === "service")
    content = (
      <ServicePage
        service={selectedService}
        navigate={navigate}
        favorite={favorites.includes(selectedService.id)}
        toggleFavorite={toggleFavorite}
        startService={startService}
      />
    )
  else if (page === "area")
    content = (
      <AreaPage
        area={selectedArea}
        selectArea={openArea}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        selectService={selectService}
      />
    )
  else if (page === "login")
    return (
      <>
        <LoginPage login={login} navigate={navigate} />
        {toast && (
          <div className="toast" role="status">
            <CheckCircle2 size={19} />
            {toast}
          </div>
        )}
      </>
    )
  else if (page === "recover")
    return (
      <>
        <RecoverPage navigate={navigate} notify={notify} />
        {toast && (
          <div className="toast" role="status">
            <CheckCircle2 size={19} />
            {toast}
          </div>
        )}
      </>
    )
  else if (page === "dashboard")
    content = (
      <DashboardPage
        navigate={navigate}
        favorites={favorites}
        selectService={selectService}
        notify={notify}
        notificationCount={unreadNotificationCount}
      />
    )
  else if (page === "protocols") content = <ProtocolsPage notify={notify} />
  else if (page === "scheduling") content = <SchedulingPage notify={notify} />
  else if (
    [
      "documents",
      "benefits",
      "jobs",
      "notifications",
      "messages",
      "favorites",
      "history",
      "calendar",
    ].includes(page)
  )
    content = (
      <CitizenCenterPage
        mode={page}
        navigate={navigate}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        selectService={selectService}
        notify={notify}
        notifications={notifications}
        readNotificationIds={readNotificationIds}
        notificationCount={unreadNotificationCount}
        markNotificationRead={markNotificationRead}
        markAllNotificationsRead={markAllNotificationsRead}
        clearNotifications={clearNotifications}
      />
    )
  else if (page === "proposals")
    content = (
      <ProposalsPage
        navigate={navigate}
        selectProposal={(proposal) => {
          setSelectedService({
            id: proposal.id,
            title: proposal.title,
            category: proposal.category,
            description: proposal.summary,
            time: proposal.deadline,
            online: true,
            icon: proposal.icon,
          })
          navigate("proposal")
        }}
      />
    )
  else if (page === "proposal")
    content = (
      <ProposalDetailPage
        proposal={
          "id" in selectedService
            ? ({
                id: selectedService.id,
                title: selectedService.title,
                category: selectedService.category,
                summary: selectedService.description,
                deadline: selectedService.time,
                status: "Em execução",
                amount: "R$ 0,00",
                icon: selectedService.icon,
              } as Proposal)
            : ({
                id: 0,
                title: "Proposta",
                category: "Atendimento",
                summary: "Detalhes da proposta",
                deadline: "—",
                status: "Em execução",
                amount: "—",
                icon: Landmark,
              } as Proposal)
        }
        navigate={navigate}
      />
    )
  else content = <HelpPage notify={notify} />

  return (
    <div
      className={`app-shell ${highContrast ? "high-contrast" : ""} ${
        reducedMotion ? "reduced-motion" : ""
      }`}
    >
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <Header
        page={page}
        navigate={navigate}
        loggedIn={loggedIn}
        notifications={notifications}
        unreadNotifications={unreadNotificationCount}
        logout={logout}
        fontScale={fontScale}
        setFontScale={setFontScale}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
      />
      <div id="main-content">{content}</div>
      <Footer navigate={navigate} />
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={19} />
          {toast}
        </div>
      )}
    </div>
  )
}

function ProposalsPage({
  navigate,
  selectProposal,
}: {
  navigate: (page: Page) => void
  selectProposal: (proposal: Proposal) => void
}) {
  return (
    <main>
      <div className="page-hero compact-hero">
        <div className="container">
          <div className="breadcrumbs">
            <button onClick={() => navigate("home")}>Início</button>
            <ChevronRight size={14} />
            <span>Propostas e investimentos</span>
          </div>
          <h1>Propostas em andamento</h1>
          <p>Conheça as principais ações e investimentos do município.</p>
        </div>
      </div>
      <div className="container" style={{ padding: "40px 0 80px" }}>
        <div className="service-grid catalog-grid">
          {proposalList.map((proposal) => {
            const Icon = proposal.icon
            return (
              <article className="service-card" key={proposal.id}>
                <div className="service-card-top">
                  <span className="service-icon">
                    <Icon size={22} />
                  </span>
                  <span className="service-category">{proposal.category}</span>
                </div>
                <h3>{proposal.title}</h3>
                <p>{proposal.summary}</p>
                <div className="service-meta">
                  <span>
                    <Clock3 size={15} /> {proposal.deadline}
                  </span>
                  <span className="online">{proposal.status}</span>
                </div>
                <div className="service-meta" style={{ marginTop: "12px" }}>
                  <span>
                    <WalletCards size={15} /> {proposal.amount}
                  </span>
                </div>
                <button
                  className="text-link stretched"
                  onClick={() => selectProposal(proposal)}
                >
                  Ver proposta <ArrowRight size={17} />
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}

function ProposalDetailPage({
  proposal,
  navigate,
}: {
  proposal: Proposal
  navigate: (page: Page) => void
}) {
  const Icon = proposal.icon

  return (
    <main>
      <div className="service-detail-hero">
        <div className="container">
          <div className="breadcrumbs light">
            <button onClick={() => navigate("home")}>Início</button>
            <ChevronRight size={14} />
            <button onClick={() => navigate("proposals")}>Propostas</button>
            <ChevronRight size={14} />
            <span>{proposal.category}</span>
          </div>
          <div className="detail-hero-grid">
            <div>
              <span className="detail-category">
                <Icon size={18} /> {proposal.category}
              </span>
              <h1>{proposal.title}</h1>
              <p>{proposal.summary}</p>
              <div className="detail-tags">
                <span>
                  <Clock3 size={17} /> {proposal.deadline}
                </span>
                <span>
                  <CheckCircle2 size={17} /> {proposal.status}
                </span>
              </div>
            </div>
            <button className="favorite-detail" onClick={() => navigate("help")}>
              <CircleHelp size={19} /> Mais informações
            </button>
          </div>
        </div>
      </div>
      <div className="container detail-layout">
        <article className="detail-content">
          <section>
            <h2>Objetivo</h2>
            <p>
              A proposta foi pensada para ampliar o acesso da população a serviços,
              oportunidades e apoio em áreas estratégicas para o desenvolvimento da cidade.
            </p>
          </section>
          <section>
            <h2>Impacto esperado</h2>
            <ul className="document-list">
              <li><Check size={17} /> Melhoria no atendimento à população</li>
              <li><Check size={17} /> Mais acesso a oportunidades e benefícios</li>
              <li><Check size={17} /> Acompanhamento mais transparente das ações</li>
            </ul>
          </section>
          <section>
            <h2>Etapas</h2>
            <ol className="steps-list">
              <li>
                <span>1</span>
                <div>
                  <strong>Diagnóstico</strong>
                  <p>Identificação das necessidades e da população alvo.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Execução</strong>
                  <p>Implementação com acompanhamento regular do município.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Avaliação</strong>
                  <p>Monitoramento do impacto e ajustes contínuos.</p>
                </div>
              </li>
            </ol>
          </section>
        </article>
        <aside className="start-card">
          <span className="secure-label">
            <ShieldCheck size={18} /> Investimento público
          </span>
          <h2>{proposal.amount}</h2>
          <p>Estimativa de apoio e execução conforme cronograma da ação pública.</p>
          <button className="button button-primary button-full" onClick={() => navigate("catalog")}>
            Explorar serviços relacionados <ArrowRight size={18} />
          </button>
          <button className="button button-outline button-full" onClick={() => navigate("scheduling")}>
            Agendar atendimento
          </button>
          <small>Informações ilustrativas e de caráter demonstrativo.</small>
        </aside>
      </div>
    </main>
  )
}
