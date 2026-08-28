/**
 * Everything in this file is drawn from the orchestrator contract Luis wrote
 * and maintains at t1/shipping-admin-nextjs/CLAUDE.md (288 lines, sole author):
 * its six named subagents, its risk ladder (low / medium / high), its
 * delegation strategies, and the eight flows it marks HIGH RISK.
 * Nothing here is aspirational — if the file changes, change this too.
 */

export type RiskLevel = "bajo" | "medio" | "alto";

export interface ArchLayer {
  id: string;
  name: string;
  path: string;
  rule: string;
}

export interface Subagent {
  id: string;
  role: string;
}

export interface AiScenario {
  id: string;
  /** Segmented-control label. Keep short. */
  label: string;
  title: string;
  risk: RiskLevel;
  /** How the orchestrator decides to act on this class of task. */
  strategy: string;
  reasoning: string;
  /** Layer ids that a task of this class is allowed to touch. */
  layers: string[];
  /** Subagent ids that get spawned. Empty means "solve it directly". */
  agents: string[];
}

/** The layer ladder the orchestrator selects agents by. */
export const architecture: ArchLayer[] = [
  {
    id: "ui",
    name: "UI",
    path: "src/components/",
    rule: "Componentes de presentación. Sin lógica de negocio, sin fetch.",
  },
  {
    id: "hooks",
    name: "Hooks",
    path: "src/hooks/",
    rule: "Orquestación del cliente. Coordinan, no deciden reglas de negocio.",
  },
  {
    id: "estado",
    name: "Estado",
    path: "src/redux/ · src/context/",
    rule: "Redux Toolkit y contextos. Estado compartido, reducers puros.",
  },
  {
    id: "acciones",
    name: "Acciones de servidor",
    path: "src/actions/",
    rule: "El BFF. Únicas mutaciones; el token nunca llega al navegador.",
  },
  {
    id: "servicios",
    name: "Servicios",
    path: "src/services/",
    rule: "La única capa que habla con APIs externas. Frontera del sistema.",
  },
  {
    id: "utils",
    name: "Utils",
    path: "src/utils/",
    rule: "Lógica pura, sin efectos. Lo más fácil de probar y de delegar.",
  },
];

/** The six subagents declared in the orchestrator file. */
export const subagents: Subagent[] = [
  { id: "tech-lead-architect", role: "Arquitectura y refactors entre capas" },
  { id: "senior-fullstack-shipping", role: "Lógica de envíos, órdenes y paqueterías" },
  { id: "mid-frontend-ui", role: "Componentes, formularios, tablas y modales" },
  { id: "qa-playwright", role: "Pruebas end-to-end y validación de flujos" },
  { id: "technical-writer", role: "Documentación técnica co-locada" },
  { id: "devops-shipping", role: "CI/CD, build y despliegue" },
];

export const riskCopy: Record<RiskLevel, { label: string; definition: string; accent: string }> = {
  bajo: {
    label: "Riesgo bajo",
    definition: "Solo UI, sin lógica de negocio.",
    accent: "#30D158",
  },
  medio: {
    label: "Riesgo medio",
    definition: "Un solo dominio, sin impacto financiero.",
    accent: "#FF9F0A",
  },
  alto: {
    label: "Riesgo alto",
    definition: "Multi-dominio, dinero, autenticación o integración con paqueterías.",
    accent: "#FF453A",
  },
};

/**
 * Five real task classes from the file's own taxonomy, ordered by escalation.
 * The point of the sequence: the amount of machinery scales with the blast
 * radius, and the smallest task gets no machinery at all.
 */
export const scenarios: AiScenario[] = [
  {
    id: "estilo",
    label: "Cambio de estilo",
    title: "Un ajuste de estilo o de copy",
    risk: "bajo",
    strategy: "Se resuelve directo. Sin subagentes.",
    reasoning:
      "Delegar cuesta más que hacerlo. El contrato dice explícitamente cuándo NO usar subagentes, y este es el caso: un cambio de una capa, sin lógica detrás, se lee y se corrige en el momento.",
    layers: ["ui"],
    agents: [],
  },
  {
    id: "bug",
    label: "Bug de un dominio",
    title: "Un bug en una acción o en un servicio",
    risk: "medio",
    strategy: "Un subagente, con el contexto de su capa.",
    reasoning:
      "Una sola capa, un solo dominio y sin dinero de por medio. Entra el especialista de envíos con las reglas de su frontera y devuelve el diagnóstico antes que el parche.",
    layers: ["acciones", "servicios"],
    agents: ["senior-fullstack-shipping"],
  },
  {
    id: "feature",
    label: "Feature entre capas",
    title: "Una feature que cruza capas",
    risk: "medio",
    strategy: "Varios subagentes en paralelo, uno por capa.",
    reasoning:
      "Como las fronteras están escritas, cada agente trabaja dentro de la suya sin pisarse: la UI no inventa lógica y el servicio no renderiza. Al final yo sintetizo y reviso el diff completo.",
    layers: ["ui", "hooks", "estado", "acciones", "servicios"],
    agents: ["tech-lead-architect", "mid-frontend-ui", "senior-fullstack-shipping"],
  },
  {
    id: "guias",
    label: "Creación de guías",
    title: "Un cambio en la creación de guías",
    risk: "alto",
    strategy: "Cadena secuencial, con QA obligatorio al cierre.",
    reasoning:
      "Es uno de los ocho flujos marcados como alto riesgo: cotizar paquetería, crear la guía y generar la etiqueta. Nada se toca sin entender primero la capa de integración con paqueterías, y nada se cierra sin pruebas.",
    layers: ["acciones", "servicios", "utils"],
    agents: ["tech-lead-architect", "senior-fullstack-shipping", "qa-playwright"],
  },
  {
    id: "marketplace",
    label: "Integración nueva",
    title: "Una integración de marketplace nueva",
    risk: "alto",
    strategy: "Todo el equipo, secuencial, y queda documentado.",
    reasoning:
      "El mapeo orden → envío es la parte frágil, y cada marketplace trae sus propios casos borde. Aquí el valor de la IA no es escribir rápido: es que la investigación, las pruebas, la documentación y el despliegue avancen sin que se caiga ninguno.",
    layers: ["ui", "estado", "acciones", "servicios", "utils"],
    agents: [
      "tech-lead-architect",
      "senior-fullstack-shipping",
      "mid-frontend-ui",
      "qa-playwright",
      "technical-writer",
      "devops-shipping",
    ],
  },
];

/** The three practices that surround the delegation loop. */
export const practices = [
  {
    title: "El contexto vive en el repo",
    body: "Un orquestador de 288 líneas versionado junto al código: las reglas de cada capa, los ocho flujos de alto riesgo y el formato con el que toda propuesta debe llegar. Si el repositorio cambia, el contrato cambia con él en el mismo commit.",
    tag: "CLAUDE.md",
  },
  {
    title: "Del diseño al código sin intermediarios",
    body: "El servidor MCP de Figma entrega el contexto de diseño directo al editor: el componente sale con los tokens del design system, no con hex sueltos copiados de una captura. La fidelidad se verifica contra el frame, no contra la memoria.",
    tag: "Figma MCP",
  },
  {
    title: "Propone la IA, deciden las compuertas",
    body: "Nada llega a producción por venir de un agente. La suite de Vitest es compuerta dura en GitHub Actions antes de build y deploy, y todo pasa por revisión humana. Las fronteras limpias existen justo para que un diff generado se pueda leer.",
    tag: "CI · revisión",
  },
];
