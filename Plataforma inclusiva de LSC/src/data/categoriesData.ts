import type { IconName } from "../components/Icons";

export interface VideoLesson {
  id: string;
  categoryId: "conversacion" | "canciones" | "historias";
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  signsCount: number;
  level: "Principiante" | "Intermedio" | "Avanzado";
  thumbnail: string;
  videoLabel: string;
  currentSign: string;
  currentSignGloss: string;
  currentSignDesc: string;
  steps: string[];
  facialExpressionNote: string;
  verified: boolean;
  progressPercent: number;
  completed: boolean;
  lessonNumber: number;
}

export interface Category {
  id: "conversacion" | "canciones" | "historias";
  title: string;
  subtitle: string;
  description: string;
  icon: IconName;
  color: "indigo" | "mint" | "coral";
  totalLessons: number;
  completedLessons: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "conversacion",
    title: "Conversación",
    subtitle: "Señas cotidianas y frases del día a día",
    description:
      "Aprende cómo comunicarte con personas sordas en situaciones de la vida diaria: saludos, preguntas, familia, direcciones y emociones.",
    icon: "message",
    color: "indigo",
    totalLessons: 6,
    completedLessons: 2,
  },
  {
    id: "canciones",
    title: "Canciones",
    subtitle: "Aprende música traducida a LSC",
    description:
      "Descubre la belleza del ritmo visual, la rima y la poesía corporal a través de canciones emblemáticas interpretadas en Lengua de Señas Colombiana.",
    icon: "music",
    color: "mint",
    totalLessons: 5,
    completedLessons: 0,
  },
  {
    id: "historias",
    title: "Historias",
    subtitle: "Cuentos y relatos visuales",
    description:
      "Desarrolla tu comprensión espacial y narrativa con fábulas, leyendas tradicionales y anécdotas urbanas contadas por señantes nativos.",
    icon: "stories",
    color: "coral",
    totalLessons: 5,
    completedLessons: 0,
  },
];

export const VIDEO_LESSONS: VideoLesson[] = [
  // ================= CONVERSACIÓN =================
  {
    id: "conv-1",
    categoryId: "conversacion",
    lessonNumber: 1,
    title: "Saludos y presentaciones básicas",
    subtitle: "Aprende a decir hola, presentarte y preguntar el nombre",
    description:
      "La base fundamental de cualquier interacción en LSC. Conoce cómo saludar con respeto, modular la sonrisa y presentarte de forma natural.",
    duration: "8 min",
    signsCount: 9,
    level: "Principiante",
    thumbnail:
      "https://images.unsplash.com/photo-1747264463796-950b96c98b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Vista frontal y perfil",
    currentSign: "HOLA",
    currentSignGloss: "HOLA",
    currentSignDesc: "Saludo general y cálido para iniciar cualquier conversación en LSC.",
    steps: [
      "Lleva tu mano dominante abierta a la altura de la frente o sien.",
      "Mueve la palma suavemente hacia afuera describiendo un arco corto.",
      "Acompaña siempre el gesto con una sonrisa empática y contacto visual directo.",
    ],
    facialExpressionNote: "Sonrisa abierta y contacto visual directo indispensable.",
    verified: true,
    progressPercent: 44,
    completed: false,
  },
  {
    id: "conv-2",
    categoryId: "conversacion",
    lessonNumber: 2,
    title: "Fórmulas de cortesía y agradecimiento",
    subtitle: "Por favor, gracias, de nada, perdón y con gusto",
    description:
      "El valor del respeto en la cultura sorda. Aprende a expresar agradecimiento sincero y disculpas con la intensidad gestual adecuada.",
    duration: "6 min",
    signsCount: 7,
    level: "Principiante",
    thumbnail:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Primer plano de manos",
    currentSign: "GRACIAS",
    currentSignGloss: "GRACIAS / CON GUSTO",
    currentSignDesc:
      "Gesto de gratitud sincera partiendo desde los labios o barbilla hacia adelante.",
    steps: [
      "Coloca las yemas de los dedos de la mano dominante cerca del mentón.",
      "Extiende la mano suavemente hacia la persona con la palma abierta hacia arriba.",
      "Inclina ligeramente la cabeza en señal de aprecio y respeto.",
    ],
    facialExpressionNote: "Mirada afable y ligera inclinación de cabeza.",
    verified: true,
    progressPercent: 100,
    completed: true,
  },
  {
    id: "conv-3",
    categoryId: "conversacion",
    lessonNumber: 3,
    title: "Familia y vínculos cercanos",
    subtitle: "Mamá, papá, hijos, hermanos y amigos",
    description:
      "Aprende las señas para nombrar a los integrantes de la familia y describir vínculos afectivos en la comunidad.",
    duration: "10 min",
    signsCount: 12,
    level: "Principiante",
    thumbnail:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Vista frontal",
    currentSign: "MAMÁ",
    currentSignGloss: "MADRE / MAMÁ",
    currentSignDesc: "Seña clásica con toque en la mejilla que denota afecto maternal.",
    steps: [
      "Forma la mano en configuración suave con el pulgar hacia la mejilla.",
      "Realiza dos toques suaves en el lateral de la mandíbula o mejilla.",
      "Mantén una expresión de calidez y cercanía.",
    ],
    facialExpressionNote: "Gesto tierno y relajado.",
    verified: true,
    progressPercent: 100,
    completed: true,
  },
  {
    id: "conv-4",
    categoryId: "conversacion",
    lessonNumber: 4,
    title: "Tiempo, días y números cotidianos",
    subtitle: "Hoy, ayer, mañana, días de la semana y horas",
    description:
      "Aprende la línea temporal en el espacio de señas: pasado hacia atrás, presente al frente y futuro hacia adelante.",
    duration: "12 min",
    signsCount: 15,
    level: "Intermedio",
    thumbnail:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Espacio temporal tridimensional",
    currentSign: "MAÑANA",
    currentSignGloss: "FUTURO / MAÑANA",
    currentSignDesc: "Movimiento hacia adelante que ubica la acción en el porvenir.",
    steps: [
      "Coloca la mano dominante con pulgar extendido cerca de la mandíbula.",
      "Gira el antebrazo hacia el frente proyectando el movimiento al espacio futuro.",
      "El cuerpo acompaña con una postura hacia el horizonte temporal.",
    ],
    facialExpressionNote: "Cejas ligeramente levantadas indicando proyección temporal.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "conv-5",
    categoryId: "conversacion",
    lessonNumber: 5,
    title: "Emociones y estados de ánimo",
    subtitle: "Feliz, triste, sorprendido, cansado y motivado",
    description:
      "En LSC, la expresión facial aporta más del 60% del significado. Domina los rasgos no manuales para comunicar sentimientos reales.",
    duration: "7 min",
    signsCount: 8,
    level: "Intermedio",
    thumbnail:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Enfoque en expresión facial",
    currentSign: "FELIZ",
    currentSignGloss: "ALEGRÍA / FELIZ",
    currentSignDesc: "Palmas que ascienden en el pecho transmitiendo plenitud y regocijo.",
    steps: [
      "Coloca ambas palmas abiertas sobre el pecho o parte superior del torso.",
      "Realiza movimientos circulares ascendentes alternados o simultáneos.",
      "Abre los ojos y sonríe con energía para reflejar la emoción.",
    ],
    facialExpressionNote: "Ojos brillantes y sonrisa amplia.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "conv-6",
    categoryId: "conversacion",
    lessonNumber: 6,
    title: "Lugares y direcciones en la ciudad",
    subtitle: "Casa, hospital, escuela, parque y preguntar ¿dónde?",
    description:
      "Cómo indicar ubicaciones, dar puntos de referencia y pedir indicaciones con señas espaciales precisas.",
    duration: "11 min",
    signsCount: 10,
    level: "Intermedio",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Clasificadores espaciales",
    currentSign: "CASA",
    currentSignGloss: "CASA / HOGAR",
    currentSignDesc: "Gesto icónico simulando el tejado de un hogar.",
    steps: [
      "Junta las yemas de ambas manos abiertas en ángulo de 90 grados.",
      "Forma la silueta de un techo a la altura del pecho.",
      "Mantén la posición un instante con mirada enfocada en el espacio.",
    ],
    facialExpressionNote: "Expresión neutral y enfocada.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },

  // ================= CANCIONES =================
  {
    id: "canc-1",
    categoryId: "canciones",
    lessonNumber: 1,
    title: "Color Esperanza (Diego Torres) - Adaptación LSC",
    subtitle: "Aprende el estribillo con ritmo visual y metáforas en señas",
    description:
      "La música en señas no es una traducción palabra por palabra, sino una reinterpretación poética del mensaje, ritmo y vibración emocional.",
    duration: "6 min",
    signsCount: 14,
    level: "Principiante",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Interpretación rítmica visual",
    currentSign: "ESPERANZA",
    currentSignGloss: "ESPERANZA / ILUSIÓN",
    currentSignDesc: "Cruce sutil de dedos y mirada al cielo que evoca optimismo y fe.",
    steps: [
      "Cruza los dedos medio e índice de la mano dominante frente al pecho.",
      "Realiza un suave movimiento ondulante ascendente.",
      "Acompaña con mirada hacia arriba y expresión de esperanza.",
    ],
    facialExpressionNote: "Mirada inspiradora y respiración pausada al compás del ritmo.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "canc-2",
    categoryId: "canciones",
    lessonNumber: 2,
    title: "La Tierra del Olvido (Carlos Vives) en LSC",
    subtitle: "Señas de geografía colombiana, mar y cordillera",
    description:
      "Un recorrido sonoro y visual por la riqueza natural de Colombia expresada mediante clasificadores de naturaleza y pasión.",
    duration: "8 min",
    signsCount: 18,
    level: "Intermedio",
    thumbnail:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Poesía visual colombiana",
    currentSign: "TIERRA",
    currentSignGloss: "TIERRA / PATRIA",
    currentSignDesc: "Movimiento de manos que abrazan y describen el territorio y la naturaleza.",
    steps: [
      "Abre ambas manos frente a ti con palmas hacia el suelo.",
      "Delinea una curva suave representando el horizonte fértil.",
      "Siente el ritmo del tambor y refleja la vibración con el torso.",
    ],
    facialExpressionNote: "Pasión cultural y orgullo con mirada firme.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "canc-3",
    categoryId: "canciones",
    lessonNumber: 3,
    title: "Cumpleaños Feliz y Aplauso Sordo",
    subtitle: "La canción más cantada con el tradicional aplauso visual",
    description:
      "Ideal para celebraciones inclusivas en colegios, familias y comunidades. Aprende a cantar y aplaudir al estilo sordo.",
    duration: "4 min",
    signsCount: 6,
    level: "Principiante",
    thumbnail:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Celebración comunitaria",
    currentSign: "APLAUSO SORDO",
    currentSignGloss: "APLAUSO VISUAL",
    currentSignDesc:
      "Girar ambas manos en alto agitando las palmas como señal de júbilo y ovación.",
    steps: [
      "Eleva ambas manos por encima de los hombros con las palmas abiertas.",
      "Gira las muñecas alternadamente de lado a lado con rapidez.",
      "Sonríe efusivamente para transmitir la alegría del festejo.",
    ],
    facialExpressionNote: "Máxima alegría, sonrisa amplia y ojos abiertos.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "canc-4",
    categoryId: "canciones",
    lessonNumber: 4,
    title: "Canción con Todos - Himno latinoamericano",
    subtitle: "Fuerza, unión comunitaria y expresión teatral",
    description:
      "Un clásico del folclore adaptado con intensidad coreográfica y movimientos amplios de brazos y torso.",
    duration: "7 min",
    signsCount: 20,
    level: "Avanzado",
    thumbnail:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Interpretación avanzada",
    currentSign: "UNIÓN",
    currentSignGloss: "UNIDAD / TODOS JUNTOS",
    currentSignDesc: "Dedos entrelazados que giran y afianzan el lazo colectivo.",
    steps: [
      "Une los dedos índices y pulgares formando eslabones interconectados.",
      "Mueve las manos en un círculo protector hacia el pecho.",
      "Fija la mirada con convicción y determinación.",
    ],
    facialExpressionNote: "Determinación, fuerza y hermandad.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "canc-5",
    categoryId: "canciones",
    lessonNumber: 5,
    title: "Himno Nacional de Colombia en LSC",
    subtitle: "Protocolo oficial, señas cívicas y solemnidad",
    description:
      "Conoce la traducción estandarizada y avalada por INSOR y FENASCOL del himno patrio en Lengua de Señas Colombiana.",
    duration: "9 min",
    signsCount: 22,
    level: "Intermedio",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Versión Oficial INSOR/FENASCOL",
    currentSign: "LIBERTAD",
    currentSignGloss: "LIBRE / LIBERTAD",
    currentSignDesc: "Muñecas cruzadas que se separan con fuerza rompiendo cadenas invisibles.",
    steps: [
      "Cruza los puños cerrados a la altura del pecho simulando ataduras.",
      "Separa con energía ambas manos abriendo las palmas hacia el exterior.",
      "Eleva la barbilla con solemnidad y respeto cívico.",
    ],
    facialExpressionNote: "Solemne, digno y respetuoso.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },

  // ================= HISTORIAS =================
  {
    id: "hist-1",
    categoryId: "historias",
    lessonNumber: 1,
    title: "El Viento y el Sol (Fábula visual)",
    subtitle: "Clasificadores de viento, calor y capas de abrigo",
    description:
      "Una fábula clásica donde aprenderás a usar clasificadores descriptivos para mostrar ráfagas de viento y el calor resplandeciente.",
    duration: "9 min",
    signsCount: 11,
    level: "Principiante",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Narración visual con clasificadores",
    currentSign: "VIENTO",
    currentSignGloss: "VIENTO FUERTE",
    currentSignDesc: "Palmas que ondulan con fuerza simulando corrientes huracanadas.",
    steps: [
      "Coloca ambas palmas enfrentadas a los lados del rostro.",
      "Muévelas con vigor en vaivén hacia la izquierda y derecha soplando con los labios entreabiertos.",
      "Infla levemente las mejillas para darle realismo a la corriente de aire.",
    ],
    facialExpressionNote: "Mejillas soplantes y ojos entrecerrados por la ventisca.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "hist-2",
    categoryId: "historias",
    lessonNumber: 2,
    title: "La Leyenda de El Dorado en Señas",
    subtitle: "Misterio, laguna sagrada y ofrendas de oro",
    description:
      "Relato místico de los pueblos indígenas muiscas, con señas que describen balsas de madera, brillos dorados y lagunas en la niebla.",
    duration: "12 min",
    signsCount: 24,
    level: "Intermedio",
    thumbnail:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Narración histórica ancestral",
    currentSign: "ORO",
    currentSignGloss: "BRILLANTE / ORO",
    currentSignDesc: "Toque en el lóbulo de la oreja que se abre en un destello resplandeciente.",
    steps: [
      "Toca el lóbulo de tu oreja con el dedo índice y pulgar.",
      "Aleja la mano abriendo los dedos en destello como un rayo de sol.",
      "Abre los ojos con admiración ante el resplandor.",
    ],
    facialExpressionNote: "Fascinación y asombro con ojos abiertos.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "hist-3",
    categoryId: "historias",
    lessonNumber: 3,
    title: "Un día en Bogotá: Relato urbano en primera persona",
    subtitle: "TransMilenio, lluvia repentina y encuentros casuales",
    description:
      "Aprende cómo las personas sordas narran anécdotas urbanas usando el cambio de rol (role-shifting) para personificar distintos personajes.",
    duration: "10 min",
    signsCount: 16,
    level: "Intermedio",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Cambio de rol (Role shifting)",
    currentSign: "LLUVIA",
    currentSignGloss: "LLUVIA TORRENCIAL",
    currentSignDesc: "Dedos que caen en cascada rápida desde arriba del rostro.",
    steps: [
      "Eleva ambas manos con dedos flexionados sobre la cabeza.",
      "Haz descender las manos en ráfagas sucesivas agitando los dedos.",
      "Frunce el ceño y encoge los hombros protegiéndote del agua.",
    ],
    facialExpressionNote: "Cejas contraídas y cuello recogido por el frío.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "hist-4",
    categoryId: "historias",
    lessonNumber: 4,
    title: "El Colibrí y el Fuego de la Selva",
    subtitle: "Pequeñas acciones que generan grandes transformaciones",
    description:
      "Una hermosa fábula donde el movimiento diminuto de las alas del colibrí contrasta con la inmensidad del incendio forestal.",
    duration: "8 min",
    signsCount: 15,
    level: "Avanzado",
    thumbnail:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Antropomorfismo y clasificadores animales",
    currentSign: "PÁJARO",
    currentSignGloss: "COLIBRÍ / AVE",
    currentSignDesc: "Pico ágil formado con índice y pulgar que bate velozmente en el aire.",
    steps: [
      "Forma un pico pequeño con índice y pulgar pegados a la boca.",
      "Abre y cierra rápido mientras la otra mano simula el aleteo veloz.",
      "Mueve la cabeza con movimientos rápidos e inquisitivos.",
    ],
    facialExpressionNote: "Mirada viva y movimientos de cuello precisos de ave.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
  {
    id: "hist-5",
    categoryId: "historias",
    lessonNumber: 5,
    title: "Mi primer viaje al mar",
    subtitle: "Experiencia sensorial: la inmensidad del agua y el olor a sal",
    description:
      "Relato autobiográfico lleno de poesía visual que describe la primera vez al sentir las olas chocar en los pies y el viento marino.",
    duration: "11 min",
    signsCount: 19,
    level: "Intermedio",
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=800",
    videoLabel: "LSC · Descriptores sensoriales y espaciales",
    currentSign: "OLAS",
    currentSignGloss: "MAR / OLAS DEL OCÉANO",
    currentSignDesc: "Movimiento continuo y armónico de las manos imitando el vaivén del agua.",
    steps: [
      "Coloca ambas palmas hacia abajo a la altura de la cintura.",
      "Descríbelas subiendo y bajando en ondas suaves y profundas hacia adelante.",
      "Acompaña la mirada siguiendo el horizonte lejano.",
    ],
    facialExpressionNote: "Paz, contemplación y respiración profunda.",
    verified: true,
    progressPercent: 0,
    completed: false,
  },
];
