// Mock data de docentes
export interface Teacher {
  id: string;
  name: string;
  department: string;
  subjects: string[];
  rating: number;
  totalReviews: number;
  imageUrl: string;
}

export interface Review {
  id: string;
  teacherId: string;
  studentName: string;
  rating: number;
  subject: string;
  comment: string;
  date: string;
  difficulty: number; // 1-5
  wouldTakeAgain: boolean;
}

export interface SharedFile {
  id: string;
  name: string;
  type: string;
  subject: string;
  teacher: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  downloads: number;
  fileType: "examen" | "laboratorio";
  examCategory?: "regular" | "aplazado" | "sustitutorio";
}

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. María González",
    department: "Ciencias de la Computación",
    subjects: ["Algoritmos", "Estructuras de Datos", "Programación"],
    rating: 4.8,
    totalReviews: 45,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    id: "2",
    name: "Prof. Carlos Ramírez",
    department: "Matemáticas",
    subjects: ["Cálculo", "Álgebra Lineal", "Matemática Discreta"],
    rating: 4.5,
    totalReviews: 38,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    id: "3",
    name: "Dra. Ana Martínez",
    department: "Física",
    subjects: ["Física I", "Física II", "Mecánica Cuántica"],
    rating: 4.9,
    totalReviews: 52,
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
  {
    id: "4",
    name: "Prof. Roberto Silva",
    department: "Ingeniería de Software",
    subjects: ["Bases de Datos", "Desarrollo Web", "Arquitectura de Software"],
    rating: 4.3,
    totalReviews: 29,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  },
  {
    id: "5",
    name: "Dra. Laura Fernández",
    department: "Inteligencia Artificial",
    subjects: ["Machine Learning", "Deep Learning", "Visión por Computadora"],
    rating: 4.7,
    totalReviews: 41,
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
  },
  {
    id: "6",
    name: "Prof. Diego Torres",
    department: "Redes y Comunicaciones",
    subjects: ["Redes de Computadoras", "Seguridad Informática", "Sistemas Distribuidos"],
    rating: 4.2,
    totalReviews: 33,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    teacherId: "1",
    studentName: "Juan Pérez",
    rating: 5,
    subject: "Algoritmos",
    comment: "Excelente profesora, explica muy claro y siempre está dispuesta a ayudar. Sus clases son dinámicas y los ejercicios son muy útiles.",
    date: "2026-03-15",
    difficulty: 4,
    wouldTakeAgain: true,
  },
  {
    id: "2",
    teacherId: "1",
    studentName: "María López",
    rating: 5,
    subject: "Estructuras de Datos",
    comment: "Una de las mejores profesoras que he tenido. Hace que los temas complejos sean fáciles de entender.",
    date: "2026-03-10",
    difficulty: 3,
    wouldTakeAgain: true,
  },
  {
    id: "3",
    teacherId: "1",
    studentName: "Pedro Sánchez",
    rating: 4,
    subject: "Algoritmos",
    comment: "Muy buena profesora, aunque a veces va un poco rápido. Los exámenes son justos.",
    date: "2026-02-28",
    difficulty: 4,
    wouldTakeAgain: true,
  },
  {
    id: "4",
    teacherId: "2",
    studentName: "Ana García",
    rating: 5,
    subject: "Cálculo",
    comment: "Increíble profesor, tiene mucha paciencia y se preocupa por que todos entiendan.",
    date: "2026-03-20",
    difficulty: 5,
    wouldTakeAgain: true,
  },
  {
    id: "5",
    teacherId: "2",
    studentName: "Luis Rodríguez",
    rating: 4,
    subject: "Álgebra Lineal",
    comment: "Buen profesor, las clases son interesantes pero hay que estudiar bastante.",
    date: "2026-03-05",
    difficulty: 4,
    wouldTakeAgain: true,
  },
  {
    id: "6",
    teacherId: "3",
    studentName: "Carmen Díaz",
    rating: 5,
    subject: "Física II",
    comment: "La mejor profesora de física. Hace que todo tenga sentido y sus ejemplos son excelentes.",
    date: "2026-03-25",
    difficulty: 4,
    wouldTakeAgain: true,
  },
];

export const sharedFiles: SharedFile[] = [
  {
    id: "1",
    name: "Apuntes_Algoritmos_Parcial1.pdf",
    type: "PDF",
    subject: "Algoritmos",
    teacher: "Dr. María González",
    uploadedBy: "Juan Pérez",
    uploadDate: "2026-03-20",
    size: "2.4 MB",
    downloads: 156,
    fileType: "examen",
    examCategory: "regular",
  },
  {
    id: "2",
    name: "Ejercicios_Resueltos_Calculo.pdf",
    type: "PDF",
    subject: "Cálculo",
    teacher: "Prof. Carlos Ramírez",
    uploadedBy: "Ana García",
    uploadDate: "2026-03-18",
    size: "3.1 MB",
    downloads: 203,
    fileType: "laboratorio",
  },
  {
    id: "3",
    name: "Resumen_Fisica_II.docx",
    type: "DOCX",
    subject: "Física II",
    teacher: "Dra. Ana Martínez",
    uploadedBy: "Carmen Díaz",
    uploadDate: "2026-03-22",
    size: "1.8 MB",
    downloads: 98,
    fileType: "examen",
    examCategory: "aplazado",
  },
  {
    id: "4",
    name: "Proyecto_Base_Datos.zip",
    type: "ZIP",
    subject: "Bases de Datos",
    teacher: "Prof. Roberto Silva",
    uploadedBy: "Luis Rodríguez",
    uploadDate: "2026-03-15",
    size: "5.6 MB",
    downloads: 87,
    fileType: "laboratorio",
  },
  {
    id: "5",
    name: "Slides_Machine_Learning.pdf",
    type: "PDF",
    subject: "Machine Learning",
    teacher: "Dra. Laura Fernández",
    uploadedBy: "Pedro Sánchez",
    uploadDate: "2026-03-28",
    size: "4.2 MB",
    downloads: 145,
    fileType: "examen",
    examCategory: "sustitutorio",
  },
  {
    id: "6",
    name: "Laboratorio_Redes.pdf",
    type: "PDF",
    subject: "Redes de Computadoras",
    teacher: "Prof. Diego Torres",
    uploadedBy: "María López",
    uploadDate: "2026-03-12",
    size: "1.5 MB",
    downloads: 76,
    fileType: "laboratorio",
  },
];