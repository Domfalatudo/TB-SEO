import {
  type Dispatch,
  FormEvent,
  ReactNode,
  type SetStateAction,
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
  icon: "file" | "calendar" | "wallet" | "recommendation"
  title: string
  text: string
  time: string
  type: string
}

type CitizenProtocol = {
  code: string
  title: string
  date: string
  status: string
  step: number
}

type CitizenAppointment = {
  id: string
  service: string
  unit: string
  date: string
  time: string
  reminder: boolean
}

type CitizenActivity = {
  id: string
  date: string
  title: string
  detail: string
  icon: "file" | "calendar" | "heart" | "message" | "briefcase"
}

type CitizenMessage = {
  id: string
  date: string
  text: string
}

type CitizenDocument = {
  title: string
  number: string
  valid: string
  icon: LucideIcon
  color: string
}

function usePersistentState<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored === null) return initialValue
      const parsed: unknown = JSON.parse(stored)
      if (isValid(parsed)) return parsed
      console.error(`Stored value for "${key}" has an invalid shape.`)
    } catch (error) {
      console.error(`Could not load "${key}" from local storage.`, error)
    }
    return initialValue
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Could not save "${key}" to local storage.`, error)
    }
  }, [key, value])

  return [value, setValue]
}

function isArrayOf<T>(
  value: unknown,
  isItem: (item: unknown) => item is T,
): value is T[] {
  return Array.isArray(value) && value.every(isItem)
}

const isString = (value: unknown): value is string => typeof value === "string"
const isNumber = (value: unknown): value is number => typeof value === "number"

const isCitizenProtocol = (value: unknown): value is CitizenProtocol =>
  typeof value === "object" &&
  value !== null &&
  "code" in value &&
  isString(value.code) &&
  "title" in value &&
  isString(value.title) &&
  "date" in value &&
  isString(value.date) &&
  "status" in value &&
  isString(value.status) &&
  "step" in value &&
  isNumber(value.step)

const isCitizenAppointment = (value: unknown): value is CitizenAppointment =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  isString(value.id) &&
  "service" in value &&
  isString(value.service) &&
  "unit" in value &&
  isString(value.unit) &&
  "date" in value &&
  isString(value.date) &&
  "time" in value &&
  isString(value.time) &&
  "reminder" in value &&
  typeof value.reminder === "boolean"

const isCitizenNotification = (value: unknown): value is CitizenNotification =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  isNumber(value.id) &&
  "icon" in value &&
  ["file", "calendar", "wallet", "recommendation"].includes(
    String(value.icon),
  ) &&
  "title" in value &&
  isString(value.title) &&
  "text" in value &&
  isString(value.text) &&
  "time" in value &&
  isString(value.time) &&
  "type" in value &&
  isString(value.type)

const isCitizenActivity = (value: unknown): value is CitizenActivity =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  isString(value.id) &&
  "date" in value &&
  isString(value.date) &&
  "title" in value &&
  isString(value.title) &&
  "detail" in value &&
  isString(value.detail) &&
  "icon" in value &&
  ["file", "calendar", "heart", "message", "briefcase"].includes(
    String(value.icon),
  )

const isCitizenMessage = (value: unknown): value is CitizenMessage =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  isString(value.id) &&
  "date" in value &&
  isString(value.date) &&
  "text" in value &&
  isString(value.text)

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
    highlight: "Documentos digitais",
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
    highlight: "Consulte vagas disponíveis",
  },
  {
    name: "Educação",
    shortName: "Educação",
    description: "Matrículas, certificados, bolsas, cursos e vida escolar.",
    icon: GraduationCap,
    color: "#002776",
    category: "Educação",
    highlight: "Cursos e matrículas",
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
    highlight: "Atendimento municipal",
  },
]

const services: Service[] = [
  {
    id: 1,
    title: "Emitir Carteira de Identidade",
    category: "Documentos",
    description:
      "Solicite a primeira ou segunda via da sua Carteira de Identidade Nacional.",
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
    online: true,
    popular: true,
    icon: Stethoscope,
  },
  {
    id: 3,
    title: "Solicitar Seguro-Desemprego",
    category: "Trabalho",
    description: "Envie seu requerimento e acompanhe a análise do benefício.",
    online: true,
    popular: true,
    icon: BriefcaseBusiness,
  },
  {
    id: 4,
    title: "Emitir Certificado Escolar",
    category: "Educação",
    description: "Peça certificados e declarações da rede pública de ensino.",
    online: true,
    popular: true,
    icon: GraduationCap,
  },
  {
    id: 5,
    title: "Cadastrar Bilhete de Transporte",
    category: "Transporte",
    description: "Solicite ou atualize seu cartão de transporte público.",
    online: true,
    icon: Bus,
  },
  {
    id: 6,
    title: "Inscrição em Programas Sociais",
    category: "Assistência Social",
    description:
      "Consulte os critérios e faça seu pré-cadastro em programas de assistência.",
    online: true,
    icon: Users,
  },
  {
    id: 7,
    title: "Abrir Microempresa",
    category: "Empreendedorismo",
    description: "Acesse orientações para formalizar seu pequeno negócio.",
    online: true,
    icon: Building2,
  },
  {
    id: 8,
    title: "Agendar Atendimento Presencial",
    category: "Atendimento",
    description: "Escolha unidade, data e horário para seu atendimento.",
    online: false,
    icon: CalendarDays,
  },
  {
    id: 9,
    title: "Solicitar Passe Estudantil",
    category: "Transporte",
    description:
      "Solicite o benefício de transporte para estudantes matriculados.",
    online: true,
    icon: Bus,
  },
  {
    id: 10,
    title: "Consultar Benefícios Disponíveis",
    category: "Assistência Social",
    description:
      "Veja programas sociais compatíveis com o seu perfil demonstrativo.",
    online: true,
    icon: Users,
  },
  {
    id: 11,
    title: "Buscar Vagas de Emprego",
    category: "Trabalho",
    description:
      "Encontre oportunidades por área, localidade e modalidade de trabalho.",
    online: true,
    icon: BriefcaseBusiness,
  },
  {
    id: 12,
    title: "Inscrição em Cursos Gratuitos",
    category: "Educação",
    description: "Consulte cursos presenciais e online com inscrições abertas.",
    online: true,
    icon: BookOpen,
  },
  {
    id: 13,
    title: "Agendar Consulta na Rede Pública",
    category: "Saúde",
    description: "Consulte unidades e solicite atendimento básico de saúde.",
    online: true,
    icon: CalendarCheck,
  },
  {
    id: 14,
    title: "Solicitar Reparo de Iluminação",
    category: "Atendimento",
    description:
      "Informe um ponto de iluminação pública que precisa de manutenção.",
    online: true,
    icon: Landmark,
  },
  {
    id: 15,
    title: "Orientação sobre Direitos do Consumidor",
    category: "Atendimento",
    description: "Saiba como registrar uma reclamação e buscar uma solução.",
    online: true,
    icon: ShieldCheck,
  },
  {
    id: 16,
    title: "Emitir Certidão de Nascimento Digital",
    category: "Documentos",
    description: "Solicite uma via digital demonstrativa da sua certidão.",
    online: true,
    icon: FileBadge,
  },
]

const appointmentUnits = [
  "Posto Central de Atendimento",
  "Unidade Cidadania Norte",
  "Unidade Cidadania Sul",
]

const appointmentTimeSlots = [
  "08:30",
  "09:00",
  "10:30",
  "14:00",
  "15:30",
  "16:00",
]

const proposalList: Proposal[] = [
  {
    id: 1,
    title: "Expansão da rede municipal de atendimento",
    category: "Atendimento",
    summary:
      "Ampliação de pontos de atendimento para reduzir filas e melhorar o acesso à população.",
    deadline: "Prazo não informado",
    status: "Informação ilustrativa",
    amount: "Valor não informado",
    icon: Landmark,
  },
  {
    id: 2,
    title: "Programa Cidade + Digital",
    category: "Tecnologia",
    summary:
      "Investimento em canais digitais para facilitar o acesso a serviços e documentos.",
    deadline: "Prazo não informado",
    status: "Informação ilustrativa",
    amount: "Valor não informado",
    icon: MonitorCog,
  },
  {
    id: 3,
    title: "Bolsa de formação profissional",
    category: "Educação",
    summary:
      "Ações para qualificação de jovens e adultos com cursos gratuitos e certificação.",
    deadline: "Prazo não informado",
    status: "Informação ilustrativa",
    amount: "Valor não informado",
    icon: GraduationCap,
  },
]

const citizenDocuments: CitizenDocument[] = []

const notificationIcons: Record<CitizenNotification["icon"], LucideIcon> = {
  file: FileText,
  calendar: CalendarDays,
  wallet: WalletCards,
  recommendation: Sparkles,
}

const activityIcons: Record<CitizenActivity["icon"], LucideIcon> = {
  file: FileText,
  calendar: CalendarDays,
  heart: Heart,
  message: MessageSquare,
  briefcase: BriefcaseBusiness,
}

function formatDisplayDate(value: string) {
  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value,
  )
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date)
}

function formatDisplayDateTime(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date)
}

function dateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

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
  const [profileOpen, setProfileOpen] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!profileOpen) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !accountMenuRef.current?.contains(event.target)
      ) {
        setProfileOpen(false)
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false)
    }

    document.addEventListener("pointerdown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [profileOpen])

  const go = (target: Page) => {
    navigate(target)
    setMobileOpen(false)
    setProfileOpen(false)
  }

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>Demonstração de serviços ao cidadão</span>
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
                      notifications.slice(0, 3).map((notification) => {
                        const Icon = notificationIcons[notification.icon]
                        return (
                          <p key={notification.id}>
                            <span className="notice-icon">
                              <Icon size={16} />
                            </span>
                            <span>
                              <strong>{notification.title}</strong>
                              <br />
                              {notification.text}
                            </span>
                          </p>
                        )
                      })
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
                <div className="account-menu-wrap" ref={accountMenuRef}>
                  <button
                    className="account-button"
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                    aria-controls="account-menu"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <span className="avatar">MC</span>
                    <span className="account-copy">
                      <small>Olá,</small>
                      <strong>Marina</strong>
                    </span>
                    <ChevronDown size={16} />
                  </button>
                  {profileOpen && (
                    <div className="account-menu" id="account-menu" role="menu">
                      <button role="menuitem" onClick={() => go("dashboard")}>
                        <User size={16} /> Minha área
                      </button>
                      <button role="menuitem" onClick={() => go("protocols")}>
                        <FileText size={16} /> Meus protocolos
                      </button>
                      <button
                        className="account-menu-logout"
                        role="menuitem"
                        onClick={() => {
                          setProfileOpen(false)
                          logout()
                        }}
                      >
                        <LogOut size={16} /> Sair da conta
                      </button>
                    </div>
                  )}
                </div>
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
          <Clock3 size={15} /> Prazo não informado
        </span>
        <span className={service.online ? "online" : "presential"}>
          {service.online ? "Fluxo digital de demonstração" : "Presencial"}
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
              <ShieldCheck size={16} /> Demonstração de serviços digitais
            </span>
            <h1>Mais facilidade para cuidar do que importa.</h1>
            <p>
              Explore serviços e acompanhe os protocolos criados nesta
              demonstração local.
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
                  <strong>Inicie um serviço</strong>
                  <small>Seu protocolo aparecerá aqui</small>
                </div>
              </div>
              <div className="progress-line">
                <i />
                <i />
                <i />
              </div>
              <div className="visual-status">
                <span>Área do cidadão</span>
                <strong>Acompanhe seus protocolos</strong>
              </div>
            </div>
            <div className="visual-card floating top">
              <CalendarDays size={21} />
              <div>
                <small>Agendamentos</small>
                <strong>Acesse seu calendário</strong>
              </div>
            </div>
            <div className="visual-card floating bottom">
              <ShieldCheck size={21} />
              <div>
                <small>Ambiente</small>
                <strong>Dados ficam no navegador</strong>
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
            title="Serviços em destaque"
            description="Exemplos disponíveis no catálogo desta demonstração."
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
            <span className="eyebrow">Recursos da demonstração</span>
            <h2>Explore serviços e acompanhe seus registros locais.</h2>
            <p>
              Solicitações e preferências são armazenadas neste navegador; não
              há conexão com sistemas governamentais.
            </p>
          </div>
          <div className="trust-items">
            <div>
              <span>
                <ShieldCheck />
              </span>
              <div>
                <h3>Dados locais</h3>
                <p>Os registros ficam neste navegador. Não use dados pessoais reais.</p>
              </div>
            </div>
            <div>
              <span>
                <Clock3 />
              </span>
              <div>
                <h3>Recursos interativos</h3>
                <p>Pesquise, salve e acompanhe os serviços do catálogo.</p>
              </div>
            </div>
            <div>
              <span>
                <CheckCircle2 />
              </span>
              <div>
                <h3>Contadores atualizados</h3>
                <p>Os números da conta vêm dos registros locais criados.</p>
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
            onSearch={() => setSearch(search.trim())}
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
                  <Clock3 size={17} /> Tempo estimado não informado
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
              Este protótipo registra uma solicitação local e gera um protocolo
              para demonstrar o acompanhamento. Não envia dados a um órgão
              público nem realiza a emissão do serviço.
            </p>
          </section>
          <section>
            <h2>Requisitos do serviço</h2>
            <p>
              Os requisitos reais dependem do órgão responsável e não estão
              conectados nesta demonstração. Consulte a fonte oficial antes de
              solicitar o serviço.
            </p>
          </section>
          <section>
            <h2>Etapas do serviço</h2>
            <ol className="steps-list">
              <li>
                <span>1</span>
                <div>
                  <strong>Crie o registro local</strong>
                  <p>Crie um registro demonstrativo sem enviar dados pessoais.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Acompanhe o protocolo</strong>
                  <p>Consulte o protocolo local criado para este serviço.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Consulte o resultado oficial</strong>
                  <p>O resultado real exige integração com o órgão responsável.</p>
                </div>
              </li>
            </ol>
          </section>
        </article>
        <aside className="start-card">
          <span className="secure-label">
            <ShieldCheck size={18} /> Modo demonstrativo
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
            Não informe dados pessoais reais. Este registro fica apenas neste
            navegador.
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
        <Logo onClick={() => navigate("login")} />
        <div className="auth-message">
          <span className="hero-badge">
            <ShieldCheck size={16} /> Acesso demonstrativo
          </span>
          <h1>Sua cidadania, mais simples e mais próxima.</h1>
          <p>
            Acesse serviços, acompanhe solicitações e mantenha seus dados em um
            só lugar.
          </p>
          <div className="auth-benefits">
            <span>
              <CheckCircle2 /> Conta demonstrativa
            </span>
            <span>
              <Clock3 /> Acesse serviços online
            </span>
          </div>
        </div>
        <small>
          Os dados de demonstração ficam neste navegador. Não informe dados
          pessoais reais.
        </small>
      </section>
      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit} noValidate>
          <span className="form-icon">
            <User size={25} />
          </span>
          <h2>Entre na sua conta demonstrativa</h2>
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
            <button type="button" onClick={() => navigate("recover")}>
              Esqueci minha senha
            </button>
          </div>
          <button className="button button-primary button-full" type="submit">
            Entrar <ArrowRight size={18} />
          </button>
          <div className="demo-hint">
            <strong>Conta local de demonstração</strong>
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
    setSent(true)
    notify("Recuperação não conectada: nenhum e-mail foi enviado.")
  }
  return (
    <main className="simple-auth">
      <Logo onClick={() => navigate("login")} />
      <div className="simple-auth-card">
        <span className="form-icon">
          <Mail size={24} />
        </span>
        {sent ? (
          <>
            <h1>Recuperação indisponível</h1>
            <p>
              Este projeto não está conectado a um serviço de identidade.
              Nenhum e-mail foi enviado para <strong>{email}</strong>.
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
            <p>
              A recuperação de senha exige um serviço de autenticação, que não
              está conectado nesta demonstração.
            </p>
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
              Verificar disponibilidade
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
            <small>
              Dados ilustrativos; consulte os canais oficiais para informações
              vigentes.
            </small>
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
  documents,
  appointments,
  activities,
  messages,
  sendMessage,
  savedJobs,
  toggleJobSaved,
  toggleAppointmentReminder,
  cancelAppointment,
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
  documents: CitizenDocument[]
  appointments: CitizenAppointment[]
  activities: CitizenActivity[]
  messages: CitizenMessage[]
  sendMessage: (text: string) => void
  savedJobs: string[]
  toggleJobSaved: (title: string) => void
  toggleAppointmentReminder: (id: string) => void
  cancelAppointment: (id: string) => void
}) {
  const [notificationFilter, setNotificationFilter] = useState("Todas")
  const [message, setMessage] = useState("")
  const [jobQuery, setJobQuery] = useState("")
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [savedJobsOnly, setSavedJobsOnly] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [calendarDate, setCalendarDate] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  )
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(
    null,
  )

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
        (!remoteOnly || job.location === "Remoto") &&
        (!savedJobsOnly || savedJobs.includes(job.title)),
  )

  let body: ReactNode
  if (mode === "documents") {
    body = documents.length ? (
      <>
        <div className="document-overview">
          <div>
            <BadgeCheck size={23} />
            <span>
              <strong>{documents.length} documentos</strong>
              <p>Documentos registrados nesta conta.</p>
            </span>
          </div>
        </div>
        <div className="digital-documents-grid">
          {documents.map(({ title, number, valid, icon: Icon, color }) => (
            <article className="digital-document" key={title}>
              <div className={`document-cover ${color}`}>
                <span>Cidadania Digital</span>
                <Icon size={34} />
                <strong>{title}</strong>
              </div>
              <div className="document-info">
                <strong>{title}</strong>
                <span>{number}</span>
                <small>
                  <CheckCircle2 size={14} /> {valid}
                </small>
              </div>
            </article>
          ))}
        </div>
      </>
    ) : (
      <div className="empty-state">
        <WalletCards size={36} />
        <h2>Nenhum documento cadastrado</h2>
        <p>Documentos só aparecerão aqui após serem emitidos ou vinculados.</p>
        <button
          className="button button-primary"
          onClick={() => navigate("catalog")}
        >
          Explorar serviços
        </button>
      </div>
    )
  } else if (mode === "benefits") {
    body = (
      <>
        <div className="benefit-summary">
          <div>
            <WalletCards />
            <span>
              <small>Benefícios vinculados a esta conta</small>
              <strong>0 ativos</strong>
              <p>Não há benefícios registrados neste navegador.</p>
            </span>
          </div>
          <span className="status">Sem benefícios ativos</span>
        </div>
        <div className="content-card-grid">
          {[
            [
              "Tarifa Social de Energia",
              "Consulte os requisitos nos canais oficiais",
              "Ver requisitos",
            ],
            [
              "Programa de Renda Municipal",
              "Consulte prazos e regras com seu município",
              "Ver orientações",
            ],
            [
              "Isenção de taxa em concursos",
              "Consulte as regras do edital correspondente",
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
                aria-expanded={selectedProgram === name}
                onClick={() =>
                  setSelectedProgram(selectedProgram === name ? null : name)
                }
              >
                {action} <ArrowRight size={16} />
              </button>
              {selectedProgram === name && (
                <p className="program-info">
                  Os critérios deste programa não estão conectados a uma fonte
                  oficial. Consulte o órgão responsável antes de solicitar.
                </p>
              )}
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
          <label className="switch-row">
            <input
              type="checkbox"
              checked={savedJobsOnly}
              onChange={(e) => setSavedJobsOnly(e.target.checked)}
            />
            <span>Somente salvas</span>
          </label>
        </div>
        {jobs.length ? (
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
                aria-pressed={savedJobs.includes(job.title)}
                onClick={() => toggleJobSaved(job.title)}
              >
                {savedJobs.includes(job.title)
                  ? "Remover das salvas"
                  : "Salvar vaga"}
              </button>
            </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <BriefcaseBusiness size={34} />
            <h2>Nenhuma vaga encontrada</h2>
            <p>Ajuste os filtros ou salve uma vaga para encontrá-la aqui.</p>
          </div>
        )}
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
              <Check size={16} /> Marcar todas como lidas
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
            {shown.map((notification) => {
              const Icon = notificationIcons[notification.icon]
              return (
                <button
                  key={notification.id}
                  className={
                    readNotificationIds.includes(notification.id)
                      ? "read"
                      : "unread"
                  }
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <span className="notification-list-icon">
                    <Icon size={20} />
                  </span>
                  <span>
                    <strong>{notification.title}</strong>
                    <p>{notification.text}</p>
                    <small>{notification.time}</small>
                  </span>
                  {!readNotificationIds.includes(notification.id) && <i />}
                  <ChevronRight size={18} />
                </button>
              )
            })}
          </div>
        ) : (
          <div className="empty-state notification-empty">
            <Bell size={32} />
            <h2>
              {notifications.length
                ? "Nenhuma notificação nesta categoria"
                : "Você ainda não tem notificações"}
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
    body = (
      <div className="messages-layout">
        <div className="conversation-panel" style={{ gridColumn: "1 / -1" }}>
          <header>
            <span>CD</span>
            <div>
              <strong>Mensagens desta demonstração</strong>
              <small>Ficam salvas somente neste navegador.</small>
            </div>
          </header>
          <div className="message-thread">
            {messages.length ? (
              messages.map((sent) => (
                <div className="sent" key={sent.id}>
                  {sent.text}
                  <small>{formatDisplayDateTime(sent.date)}</small>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <MessageSquare size={32} />
                <h2>Nenhuma mensagem registrada</h2>
                <p>
                  As mensagens enviadas aqui são guardadas localmente e não
                  chegam a um órgão público.
                </p>
              </div>
            )}
          </div>
          <form
            className="message-composer"
            onSubmit={(e) => {
              e.preventDefault()
              if (!message.trim()) return
              sendMessage(message)
              setMessage("")
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
    body = activities.length ? (
      <div className="activity-history">
        {activities.map((activity) => {
          const ActivityIcon = activityIcons[activity.icon]
          return (
            <article key={activity.id}>
              <span>
                <ActivityIcon size={18} />
              </span>
              <div>
                <small>{formatDisplayDateTime(activity.date)}</small>
                <strong>{activity.title}</strong>
                <p>{activity.detail}</p>
              </div>
              <button
                aria-label={`Ver ${activity.title}`}
                onClick={() =>
                  navigate(
                    activity.icon === "calendar"
                      ? "calendar"
                      : activity.icon === "heart"
                        ? "favorites"
                        : activity.icon === "message"
                          ? "messages"
                          : activity.icon === "briefcase"
                            ? "jobs"
                            : "protocols",
                  )
                }
              >
                <ChevronRight size={18} />
              </button>
            </article>
          )
        })}
      </div>
    ) : (
      <div className="empty-state">
        <History size={36} />
        <h2>Seu histórico está vazio</h2>
        <p>As ações realizadas nesta conta aparecerão aqui.</p>
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
    const year = calendarDate.getFullYear()
    const month = calendarDate.getMonth()
    const firstWeekday = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const calendarCellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7
    const appointmentDates = new Set(appointments.map((item) => item.date))
    const today = dateInputValue(new Date())
    const upcomingAppointments = appointments
      .filter((appointment) => appointment.date >= today)
      .sort((a, b) =>
        `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
      )
    const shownAppointments = selectedCalendarDate
      ? upcomingAppointments.filter(
          (appointment) => appointment.date === selectedCalendarDate,
        )
      : upcomingAppointments
    body = (
      <div className="calendar-layout">
        <div className="mini-calendar">
          <header>
            <button
              aria-label="Mês anterior"
              onClick={() => {
                setSelectedCalendarDate(null)
                setCalendarDate(new Date(year, month - 1, 1))
              }}
            >
              <ArrowLeft size={17} />
            </button>
            <strong>{monthNames[month]} de {year}</strong>
            <button
              aria-label="Próximo mês"
              onClick={() => {
                setSelectedCalendarDate(null)
                setCalendarDate(new Date(year, month + 1, 1))
              }}
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
            {Array.from({ length: calendarCellCount }, (_, index) => {
              const day = index - firstWeekday + 1
              const dayValue = dateInputValue(new Date(year, month, day, 12))
              return (
                <button
                  key={index}
                  disabled={day < 1 || day > daysInMonth}
                  className={`${selectedCalendarDate === dayValue ? "selected" : ""} ${
                    appointmentDates.has(dayValue) ? "has-event" : ""
                  }`}
                  aria-label={`${day} de ${monthNames[month]} de ${year}`}
                  onClick={() => setSelectedCalendarDate(dayValue)}
                >
                  {day > 0 && day <= daysInMonth ? day : ""}
                </button>
              )
            })}
          </div>
        </div>
        <div className="calendar-agenda">
          <div className="panel-heading">
            <h2>
              {selectedCalendarDate
                ? `Compromissos em ${formatDisplayDate(selectedCalendarDate)}`
                : "Próximos compromissos"}
            </h2>
            <button
              className="text-link"
              onClick={() => navigate("scheduling")}
            >
              Novo agendamento <Plus size={16} />
            </button>
          </div>
          {shownAppointments.length ? (
            shownAppointments.map((appointment) => {
              const appointmentDate = new Date(`${appointment.date}T12:00:00`)
              return (
                <article key={appointment.id}>
                  <span className="calendar-date-box">
                    <strong>{appointmentDate.getDate()}</strong>
                    {monthNames[appointmentDate.getMonth()].slice(0, 3).toUpperCase()}
                  </span>
                  <div>
                    <span className="status warning">Agendamento</span>
                    <h3>{appointment.service}</h3>
                    <p>
                      <Clock3 size={15} /> {appointment.time} ·{" "}
                      <MapPin size={15} /> {appointment.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleAppointmentReminder(appointment.id)}
                  >
                    {appointment.reminder
                      ? "Lembrete ativo"
                      : "Criar lembrete"}
                  </button>
                  <button
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    Cancelar
                  </button>
                </article>
              )
            })
          ) : (
            <div className="empty-state">
              <CalendarDays size={32} />
              <h2>Nenhum compromisso</h2>
              <p>
                {selectedCalendarDate
                  ? "Não há agendamentos nessa data."
                  : "Seus agendamentos futuros aparecerão aqui."}
              </p>
            </div>
          )}
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

function DashboardPage({
  navigate,
  favorites,
  selectService,
  notificationCount,
  protocols,
  appointments,
  documents,
  activities,
}: {
  navigate: (page: Page) => void
  favorites: number[]
  selectService: (service: Service) => void
  notificationCount: number
  protocols: CitizenProtocol[]
  appointments: CitizenAppointment[]
  documents: CitizenDocument[]
  activities: CitizenActivity[]
}) {
  const today = dateInputValue(new Date())
  const upcomingAppointments = appointments
    .filter((appointment) => appointment.date >= today)
    .sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
    )
  const nextAppointment = upcomingAppointments[0]
  const pendingProtocol = protocols.find((protocol) =>
    protocol.status.toLowerCase().includes("aguardando"),
  )
  const recommendedService =
    services.find(
      (service) => !protocols.some((protocol) => protocol.title === service.title),
    ) ?? services[0]
  const dashboardSignals = {
    activeProtocols: protocols.filter(
      (item) =>
        item.status !== "Concluído" && item.status !== "Cancelado",
    ).length,
    nextAppointment: nextAppointment
      ? `${formatDisplayDate(nextAppointment.date)} · ${nextAppointment.time}`
      : "Nenhum",
    favorites: favorites.length,
    documents: documents.length,
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
              <p>Dados desta conta salvos neste navegador.</p>
              <div className="profile-account-details">
                <span>
                  <FileText size={15} /> {protocols.length} serviços iniciados
                </span>
                <span>
                  <CalendarDays size={15} /> {upcomingAppointments.length} agendamentos futuros
                </span>
              </div>
            </div>
          </div>
          <div className="dashboard-welcome-actions">
            <span className="dashboard-date-card">
              <CalendarDays size={18} />
              <span>
                <small>Data de referência</small>
                <strong>
                  {new Intl.DateTimeFormat("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }).format(new Date())}
                </strong>
              </span>
            </span>
          </div>
        </div>
        <CitizenCenterNav
          current="dashboard"
          navigate={navigate}
          notificationCount={notificationCount}
        />
        {pendingProtocol && (
          <section className="pending-banner">
            <span className="pending-icon">
              <Archive size={22} />
            </span>
            <div>
              <span className="status danger">Ação necessária</span>
              <h2>{pendingProtocol.title}</h2>
              <p>
                O protocolo {pendingProtocol.code} está aguardando uma ação.
              </p>
            </div>
            <button
              className="button button-primary"
              onClick={() => navigate("protocols")}
            >
              Ver solicitação <ArrowRight size={17} />
            </button>
          </section>
        )}
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
            {protocols.length ? (
              protocols.slice(0, 2).map((protocol) => (
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
                      {protocol.code} · {formatDisplayDate(protocol.date)}
                    </small>
                  </span>
                  <span
                    className={`status ${
                      protocol.status === "Concluído"
                        ? "success"
                        : protocol.status.toLowerCase().includes("aguardando")
                          ? "danger"
                          : "warning"
                    }`}
                  >
                    {protocol.status}
                  </span>
                  <ChevronRight size={18} />
                </button>
              ))
            ) : (
              <div className="empty-state">
                <FileText size={30} />
                <h2>Nenhuma solicitação iniciada</h2>
                <p>Quando você iniciar um serviço, o protocolo aparecerá aqui.</p>
                <button
                  className="button button-outline"
                  onClick={() => navigate("catalog")}
                >
                  Explorar serviços
                </button>
              </div>
            )}
          </section>
          <aside className="dashboard-panel next-appointment">
            <div className="panel-label">
              <CalendarDays size={18} /> Próximo atendimento
            </div>
            {nextAppointment ? (
              <>
                <div className="appointment-date">
                  <strong>
                    {new Date(`${nextAppointment.date}T12:00:00`).getDate()}
                  </strong>
                  <span>
                    {new Date(`${nextAppointment.date}T12:00:00`)
                      .toLocaleDateString("pt-BR", { month: "short" })
                      .replace(".", "")
                      .toUpperCase()}
                    <small>
                      {new Date(
                        `${nextAppointment.date}T12:00:00`,
                      ).toLocaleDateString("pt-BR", { weekday: "long" })}
                    </small>
                  </span>
                </div>
                <h3>{nextAppointment.service}</h3>
                <p>
                  <Clock3 size={16} /> {nextAppointment.time}
                </p>
                <p>
                  <MapPin size={16} /> {nextAppointment.unit}
                </p>
                <button
                  className="button button-outline button-full"
                  onClick={() => navigate("calendar")}
                >
                  Ver agendamento
                </button>
              </>
            ) : (
              <>
                <p>Você não tem agendamentos futuros.</p>
                <button
                  className="button button-outline button-full"
                  onClick={() => navigate("scheduling")}
                >
                  Agendar atendimento
                </button>
              </>
            )}
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
            {activities.length ? (
              activities.slice(0, 3).map((activity) => {
                const Icon = activityIcons[activity.icon]
                return (
                  <button
                    key={activity.id}
                    onClick={() => navigate("history")}
                  >
                    <span>
                      <Icon size={18} />
                    </span>
                    <strong>{activity.title}</strong>
                    <small>{formatDisplayDateTime(activity.date)}</small>
                    <ChevronRight size={17} />
                  </button>
                )
              })
            ) : (
              <div className="empty-state">
                <History size={28} />
                <p>Nenhuma atividade registrada.</p>
              </div>
            )}
          </section>
          <section className="dashboard-panel recommendation-panel">
            <span className="panel-label">
              <Sparkles size={20} /> Serviço disponível
            </span>
            <h2>{recommendedService.title}</h2>
            <p>{recommendedService.description}</p>
            <button
              className="button button-outline button-full"
              onClick={() => selectService(recommendedService)}
            >
              Ver serviço <ArrowRight size={16} />
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

function ProtocolsPage({
  notify,
  protocols,
}: {
  notify: (message: string) => void
  protocols: CitizenProtocol[]
}) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<CitizenProtocol | null>(
    protocols[0] ?? null,
  )
  const [searched, setSearched] = useState(false)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const found = protocols.find(
      (item) => item.code.toLowerCase() === query.trim().toLowerCase(),
    )
    if (found) {
      setSelected(found)
      setSearched(true)
      notify("Protocolo localizado.")
    } else {
      setSelected(null)
      setSearched(true)
      notify("Esse protocolo não está salvo nesta conta.")
    }
  }
  const downloadReceipt = () => {
    if (!selected) return
    const receipt = [
      "Comprovante de solicitação — Cidadania Digital",
      `Protocolo: ${selected.code}`,
      `Serviço: ${selected.title}`,
      `Aberto em: ${formatDisplayDateTime(selected.date)}`,
      `Status: ${selected.status}`,
      "",
      "Registro local demonstrativo; não enviado a um órgão público.",
    ].join("\n")
    const file = new Blob([receipt], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(file)
    const link = document.createElement("a")
    link.href = url
    link.download = `${selected.code}.txt`
    link.click()
    URL.revokeObjectURL(url)
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
                placeholder="CD-ANO-CÓDIGO"
                required
              />
              <button className="button button-primary">Consultar</button>
            </div>
            <small>Use o número informado no comprovante da solicitação.</small>
          </form>
          <div className="panel-heading">
            <h2>{searched ? "Resultado da consulta" : "Seus protocolos"}</h2>
            <span>{protocols.length} solicitações</span>
          </div>
          <div className="protocol-list">
            {protocols.length ? (
              protocols.map((protocol) => (
                <button
                  className={
                    selected?.code === protocol.code ? "selected" : ""
                  }
                  key={protocol.code}
                  onClick={() => setSelected(protocol)}
                >
                  <span className="protocol-doc">
                    <FileText size={20} />
                  </span>
                  <span className="protocol-info">
                    <strong>{protocol.title}</strong>
                    <small>
                      {protocol.code} · Aberto em {formatDisplayDate(protocol.date)}
                    </small>
                  </span>
                  <span
                    className={`status ${
                      protocol.status === "Concluído"
                        ? "success"
                        : protocol.status.toLowerCase().includes("aguardando")
                          ? "danger"
                          : "warning"
                    }`}
                  >
                    {protocol.status}
                  </span>
                  <ChevronRight size={18} />
                </button>
              ))
            ) : (
              <div className="empty-state">
                <FileText size={32} />
                <h2>
                  {searched
                    ? "Protocolo não encontrado"
                    : "Nenhuma solicitação iniciada"}
                </h2>
                <p>
                  {searched
                    ? "A consulta local só encontra protocolos criados nesta conta."
                    : "Inicie um serviço do catálogo para criar seu primeiro protocolo."}
                </p>
              </div>
            )}
          </div>
        </section>
        {selected && (
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
                "Solicitação registrada",
                "Documentos recebidos",
                "Análise concluída",
              ].map((label, index) => (
                <div
                  className={index <= selected.step ? "done" : ""}
                  key={label}
                >
                  <span>
                    {index <= selected.step ? <Check size={15} /> : index + 1}
                  </span>
                  <div>
                    <strong>{label}</strong>
                    <small>
                      {index === 0
                        ? formatDisplayDateTime(selected.date)
                        : index <= selected.step
                          ? "Etapa concluída"
                          : "Aguardando atualização"}
                    </small>
                  </div>
                </div>
              ))}
            </div>
            <div className="info-note">
              <CircleHelp size={18} />
              <p>
                Este protocolo foi salvo localmente. O portal não consulta
                sistemas governamentais.
              </p>
            </div>
            <button
              className="button button-outline button-full"
              onClick={downloadReceipt}
            >
              Baixar comprovante
            </button>
          </aside>
        )}
      </div>
    </main>
  )
}

function SchedulingPage({
  notify,
  appointments,
  onConfirm,
}: {
  notify: (message: string) => void
  appointments: CitizenAppointment[]
  onConfirm: (
    details: Omit<CitizenAppointment, "id" | "reminder">,
  ) => boolean
}) {
  const [step, setStep] = useState(1)
  const [service, setService] = useState("")
  const [unit, setUnit] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const today = dateInputValue(new Date())
  const reservedSlots = new Set(
    appointments
      .filter(
        (appointment) =>
          appointment.date === date && appointment.unit === unit,
      )
      .map((appointment) => appointment.time),
  )
  const next = () => {
    if (step === 1 && (!service || !unit))
      return notify("Escolha o serviço e a unidade.")
    if (step === 2 && (!date || !time))
      return notify("Escolha a data e o horário.")
    if (step === 2 && date < today)
      return notify("A data do agendamento não pode estar no passado.")
    setStep(step + 1)
  }
  const confirm = () => {
    const saved = onConfirm({ service, unit, date, time })
    if (saved) setConfirmed(true)
  }
  if (confirmed)
    return (
      <main className="confirmation-page">
        <div className="confirmation-card">
          <span>
            <Check size={34} />
          </span>
          <h1>Agendamento confirmado!</h1>
          <p>O compromisso foi salvo no calendário desta conta.</p>
          <div>
            <strong>{service}</strong>
            <p>
              <CalendarDays size={17} /> {formatDisplayDate(date)} às {time}
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
                    {services.map((availableService) => (
                      <option key={availableService.id}>
                        {availableService.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Unidade
                  <select
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value)
                      setTime("")
                    }}
                  >
                    <option value="">Selecione uma unidade</option>
                    {appointmentUnits.map((availableUnit) => (
                      <option key={availableUnit}>{availableUnit}</option>
                    ))}
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
                  <p>Os horários ocupados nesta conta ficam indisponíveis.</p>
                </div>
              </div>
              <label className="date-field">
                Data do atendimento
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                    setTime("")
                  }}
                />
              </label>
              {date && unit ? (
                <fieldset className="time-slots">
                  <legend>Horários disponíveis nesta conta</legend>
                  {appointmentTimeSlots.map((slot) => {
                    const reserved = reservedSlots.has(slot)
                    return (
                    <button
                      type="button"
                      className={time === slot ? "selected" : ""}
                      key={slot}
                      disabled={reserved}
                      onClick={() => setTime(slot)}
                    >
                      {slot}{reserved ? " · ocupado" : ""}
                    </button>
                    )
                  })}
                </fieldset>
              ) : (
                <p>Selecione uma data e unidade para ver os horários.</p>
              )}
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
                  <strong>{formatDisplayDate(date)}</strong>
                </div>
                <div>
                  <small>Horário</small>
                  <strong>{time}</strong>
                </div>
              </div>
              <div className="info-note">
                <ShieldCheck size={19} />
                <p>
                  Consulte os requisitos oficiais do serviço antes de ir à
                  unidade. Esta demonstração não possui integração municipal.
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

function HelpPage({ navigate }: { navigate: (page: Page) => void }) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState<number | null>(0)
  const faqs = [
    [
      "Como acompanho uma solicitação?",
      "Inicie um serviço enquanto estiver conectado à conta de demonstração. O protocolo local aparece no painel e em “Acompanhar protocolo”.",
    ],
    [
      "Esqueci minha senha. O que devo fazer?",
      "A recuperação de senha não está conectada a um serviço de identidade; nenhum e-mail é enviado nesta demonstração.",
    ],
    [
      "Como cancelar um agendamento?",
      "Abra “Calendário” na área do cidadão e use “Cancelar” no compromisso correspondente.",
    ],
    [
      "Meus dados estão seguros?",
      "Os dados de demonstração são salvos no armazenamento local deste navegador e não são enviados a órgãos públicos. Não informe dados pessoais reais.",
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
          <p>Encontre respostas sobre os recursos desta demonstração local.</p>
          <SearchBox
            value={search}
            setValue={setSearch}
            onSearch={() => setSearch(search.trim())}
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
          <h2>Atendimento não conectado</h2>
          <p>
            Você pode registrar uma mensagem local, mas ela não será enviada a
            uma equipe real.
          </p>
          <button
            className="button button-primary button-full"
            onClick={() => navigate("messages")}
          >
            Abrir mensagens locais
          </button>
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
            Protótipo local para explorar serviços e testar os recursos do
            portal. Não conectado a sistemas governamentais.
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
        <span>© {new Date().getFullYear()} Cidadania Digital</span>
        <span>Feito para aproximar serviços e cidadãos.</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("login")
  const [search, setSearch] = useState("")
  const [selectedService, setSelectedService] = useState<Service>(services[0])
  const [selectedProposal, setSelectedProposal] = useState<Proposal>(
    proposalList[0],
  )
  const [selectedArea, setSelectedArea] = useState(portalAreas[0])
  const [favorites, setFavorites] = usePersistentState(
    "portal-cidadania-favorites",
    [],
    (value): value is number[] => isArrayOf(value, isNumber),
  )
  const [protocols, setProtocols] = usePersistentState(
    "portal-cidadania-protocols",
    [],
    (value): value is CitizenProtocol[] =>
      isArrayOf(value, isCitizenProtocol),
  )
  const [appointments, setAppointments] = usePersistentState(
    "portal-cidadania-appointments",
    [],
    (value): value is CitizenAppointment[] =>
      isArrayOf(value, isCitizenAppointment),
  )
  const [notifications, setNotifications] = usePersistentState(
    "portal-cidadania-notifications",
    [],
    (value): value is CitizenNotification[] =>
      isArrayOf(value, isCitizenNotification),
  )
  const [readNotificationIds, setReadNotificationIds] = usePersistentState(
    "portal-cidadania-read-notifications",
    [],
    (value): value is number[] => isArrayOf(value, isNumber),
  )
  const [activities, setActivities] = usePersistentState(
    "portal-cidadania-activities",
    [],
    (value): value is CitizenActivity[] => isArrayOf(value, isCitizenActivity),
  )
  const [messages, setMessages] = usePersistentState(
    "portal-cidadania-messages",
    [],
    (value): value is CitizenMessage[] => isArrayOf(value, isCitizenMessage),
  )
  const [savedJobs, setSavedJobs] = usePersistentState(
    "portal-cidadania-saved-jobs",
    [],
    (value): value is string[] => isArrayOf(value, isString),
  )
  const [loggedIn, setLoggedIn] = useState(false)
  const [pendingService, setPendingService] = useState(false)
  const [fontScale, setFontScale] = usePersistentState(
    "portal-cidadania-font-scale",
    100,
    (value): value is number =>
      typeof value === "number" && value >= 90 && value <= 120,
  )
  const [highContrast, setHighContrast] = usePersistentState(
    "portal-cidadania-high-contrast",
    false,
    (value): value is boolean => typeof value === "boolean",
  )
  const [reducedMotion, setReducedMotion] = usePersistentState(
    "portal-cidadania-reduced-motion",
    false,
    (value): value is boolean => typeof value === "boolean",
  )
  const [toast, setToast] = useState("")
  const toastTimer = useRef<number | null>(null)

  const navigate = (target: Page) => {
    if (!loggedIn && target !== "login" && target !== "recover") {
      setPage("login")
      return
    }
    setPage(target)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const notify = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(""), 3200)
  }
  const addActivity = (
    title: string,
    detail: string,
    icon: CitizenActivity["icon"],
  ) => {
    setActivities((current) =>
      [
        {
          id: `${Date.now()}-${Math.random()}`,
          date: new Date().toISOString(),
          title,
          detail,
          icon,
        },
        ...current,
      ].slice(0, 100),
    )
  }
  const addNotification = (
    title: string,
    text: string,
    type: string,
    icon: CitizenNotification["icon"],
  ) => {
    setNotifications((current) => [
      {
        id: Date.now() + current.length,
        icon,
        title,
        text,
        time: formatDisplayDateTime(new Date().toISOString()),
        type,
      },
      ...current,
    ])
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
    notify("Todas as notificações foram removidas.")
  }
  const toggleFavorite = (id: number) => {
    const service = services.find((item) => item.id === id)
    if (!service) return
    const isFavorite = favorites.includes(id)
    setFavorites((current) =>
      isFavorite
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
    const action = isFavorite ? "removido dos favoritos" : "adicionado aos favoritos"
    addActivity(
      isFavorite ? "Serviço removido dos favoritos" : "Serviço favoritado",
      service.title,
      "heart",
    )
    notify(`${service.title} ${action}.`)
  }
  const selectService = (service: Service) => {
    setSelectedService(service)
    navigate("service")
  }
  const openArea = (area: typeof portalAreas[number]) => {
    setSelectedArea(area)
    navigate("area")
  }
  const createServiceRequest = (service: Service) => {
    const now = new Date()
    let sequence = now.getTime() % 1_000_000
    let code = `CD-${now.getFullYear()}-${String(sequence).padStart(6, "0")}`
    while (protocols.some((protocol) => protocol.code === code)) {
      sequence = (sequence + 1) % 1_000_000
      code = `CD-${now.getFullYear()}-${String(sequence).padStart(6, "0")}`
    }

    const protocol: CitizenProtocol = {
      code,
      title: service.title,
      date: now.toISOString(),
      status: "Recebida",
      step: 0,
    }
    setProtocols((current) => [protocol, ...current])
    addActivity("Solicitação iniciada", `${service.title} · ${code}`, "file")
    addNotification(
      "Solicitação registrada",
      `${service.title} recebeu o protocolo ${code}.`,
      "Solicitações",
      "file",
    )
    notify(`Solicitação registrada. Protocolo: ${code}.`)
    setPage("dashboard")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const saveAppointment = (
    details: Omit<CitizenAppointment, "id" | "reminder">,
  ) => {
    const appointmentDate = new Date(`${details.date}T12:00:00`)
    if (
      !services.some((service) => service.title === details.service) ||
      !appointmentUnits.includes(details.unit) ||
      Number.isNaN(appointmentDate.getTime()) ||
      dateInputValue(appointmentDate) !== details.date ||
      details.date < dateInputValue(new Date()) ||
      !appointmentTimeSlots.includes(details.time)
    ) {
      notify("Confira o serviço, unidade, data e horário do agendamento.")
      return false
    }

    const alreadyBooked = appointments.some(
      (appointment) =>
        appointment.unit === details.unit &&
        appointment.date === details.date &&
        appointment.time === details.time,
    )
    if (alreadyBooked) {
      notify("Esse horário já está ocupado. Escolha outro.")
      return false
    }

    const appointment: CitizenAppointment = {
      ...details,
      id: `${Date.now()}-${Math.random()}`,
      reminder: false,
    }
    setAppointments((current) => [...current, appointment])
    addActivity(
      "Agendamento criado",
      `${details.service} · ${formatDisplayDate(details.date)} às ${details.time}`,
      "calendar",
    )
    addNotification(
      "Agendamento confirmado",
      `${details.service} em ${formatDisplayDate(details.date)} às ${details.time}.`,
      "Agenda",
      "calendar",
    )
    notify("Agendamento salvo neste navegador.")
    return true
  }
  const toggleAppointmentReminder = (id: string) => {
    const appointment = appointments.find((item) => item.id === id)
    if (!appointment) {
      notify("Agendamento não encontrado.")
      return
    }
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? { ...appointment, reminder: !appointment.reminder }
          : appointment,
      ),
    )
    const reminderIsSet = !appointment.reminder
    addActivity(
      reminderIsSet ? "Lembrete marcado" : "Lembrete removido",
      `${appointment.service} · ${formatDisplayDate(appointment.date)}`,
      "calendar",
    )
    notify(
      reminderIsSet
        ? "Lembrete salvo localmente."
        : "Lembrete removido.",
    )
  }
  const cancelAppointment = (id: string) => {
    const appointment = appointments.find((item) => item.id === id)
    if (!appointment) {
      notify("Agendamento não encontrado.")
      return
    }
    setAppointments((current) =>
      current.filter((item) => item.id !== id),
    )
    addActivity(
      "Agendamento cancelado",
      `${appointment.service} · ${formatDisplayDate(appointment.date)}`,
      "calendar",
    )
    addNotification(
      "Agendamento cancelado",
      `${appointment.service} em ${formatDisplayDate(appointment.date)}.`,
      "Agenda",
      "calendar",
    )
    notify("Agendamento cancelado.")
  }
  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const message: CitizenMessage = {
      id: `${Date.now()}-${Math.random()}`,
      date: new Date().toISOString(),
      text: trimmed,
    }
    setMessages((current) => [...current, message])
    addActivity("Mensagem registrada", trimmed, "message")
    notify("Mensagem salva neste navegador; não foi enviada a um órgão.")
  }
  const toggleJobSaved = (title: string) => {
    const isSaved = savedJobs.includes(title)
    setSavedJobs((current) =>
      isSaved ? current.filter((job) => job !== title) : [...current, title],
    )
    if (!isSaved) {
      addActivity("Vaga salva", title, "briefcase")
    }
    notify(isSaved ? "Vaga removida das salvas." : "Vaga salva.")
  }
  const login = () => {
    setLoggedIn(true)
    if (pendingService) {
      createServiceRequest(selectedService)
    } else {
      notify("Login demonstrativo realizado.")
      setPage("dashboard")
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setPendingService(false)
  }
  const logout = () => {
    setLoggedIn(false)
    setPage("login")
    notify("Você saiu da sua conta.")
  }
  const startService = () => {
    if (!loggedIn) {
      setPendingService(true)
      notify("Entre na sua conta para iniciar o serviço.")
      navigate("login")
    } else {
      createServiceRequest(selectedService)
    }
  }

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`
  }, [fontScale])

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
      <div className={reducedMotion ? "reduced-motion" : ""}>
        <LoginPage login={login} navigate={navigate} />
        {toast && (
          <div className="toast" role="status">
            <CheckCircle2 size={19} />
            {toast}
          </div>
        )}
      </div>
    )
  else if (page === "recover")
    return (
      <div className={reducedMotion ? "reduced-motion" : ""}>
        <RecoverPage navigate={navigate} notify={notify} />
        {toast && (
          <div className="toast" role="status">
            <CheckCircle2 size={19} />
            {toast}
          </div>
        )}
      </div>
    )
  else if (page === "dashboard")
    content = (
      <DashboardPage
        navigate={navigate}
        favorites={favorites}
        selectService={selectService}
        notificationCount={unreadNotificationCount}
        protocols={protocols}
        appointments={appointments}
        documents={citizenDocuments}
        activities={activities}
      />
    )
  else if (page === "protocols")
    content = <ProtocolsPage notify={notify} protocols={protocols} />
  else if (page === "scheduling")
    content = (
      <SchedulingPage
        notify={notify}
        appointments={appointments}
        onConfirm={saveAppointment}
      />
    )
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
        documents={citizenDocuments}
        appointments={appointments}
        activities={activities}
        messages={messages}
        sendMessage={sendMessage}
        savedJobs={savedJobs}
        toggleJobSaved={toggleJobSaved}
        toggleAppointmentReminder={toggleAppointmentReminder}
        cancelAppointment={cancelAppointment}
      />
    )
  else if (page === "proposals")
    content = (
      <ProposalsPage
        navigate={navigate}
        selectProposal={(proposal) => {
          setSelectedProposal(proposal)
          navigate("proposal")
        }}
      />
    )
  else if (page === "proposal")
    content = (
      <ProposalDetailPage
        proposal={selectedProposal}
        navigate={navigate}
      />
    )
  else content = <HelpPage navigate={navigate} />

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
