/**
 * Single source of truth for every string on this site.
 *
 * Ground rule: nothing here is invented. Every field traces back to
 * "Mushfiqur Rahman (Research) CV.pdf", to the public github.com/mushfiq525
 * account (including project READMEs), or to a value Mushfiqur supplied
 * directly — the LinkedIn URL is the one case of the last kind, since the CV
 * shows only a link label. If a value isn't from one of those, it is left empty
 * and the UI hides the element rather than guessing.
 */

export type ProjectTag =
  | "Computer Vision"
  | "Deep Learning"
  | "Machine Learning"
  | "Research"
  | "Graphics";

export type Link = { label: string; url: string };

export type Project = {
  name: string;
  /** Short line used on the card. Sourced from the CV entry. */
  blurb: string;
  /** Extra specifics drawn from the repo README, where one exists. */
  detail?: string;
  tags: ProjectTag[];
  stack: string[];
  links: Link[];
  /** Set when the work is published or under review. */
  status?: string;
};

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export const profile = {
  name: "Mushfiqur Rahman",
  /** Short form used for the header mark and the photo fallback. */
  initials: "MUSHFIQ",
  role: "Computer Vision & Deep Learning",
  location: "Dhaka, Bangladesh",
  email: "mushfiq181250@gmail.com",
  phone: "+8801621893927",
  /** CV Summary section, lightly punctuated. */
  summary:
    "Graduate student from Bangladesh University of Business and Technology with hands-on experience in Artificial Intelligence, Machine Learning, and Deep Learning. I enjoy building models, experimenting with architectures, and solving real-world problems through data-driven approaches.",
  /** Photo lives in /public. Falls back to a wordmark if the file is absent. */
  photo: "/mushfiq.jpg",
  resume: "/resume.pdf",
} as const;

export const socials: Link[] = [
  { label: "GitHub", url: "https://github.com/mushfiq525" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/mushfiq525/" },
  { label: "Email", url: "mailto:mushfiq181250@gmail.com" },
];

export const githubUsername = "mushfiq525";

// ---------------------------------------------------------------------------
// Research — the CV's strongest single item, so it gets its own section
// ---------------------------------------------------------------------------

export const research = {
  venue: "ICICV 2026",
  status: "Accepted",
  title: "FinTech Fraud Detection Using Graph Neural Networks",
  abstract:
    "A session-based fraud detection approach using Graph Neural Networks: building transaction graphs and applying unsupervised anomaly detection to identify fraudulent behaviour. Compares Graph Neural Networks against traditional machine learning models in fintech fraud detection.",
  contributions: [
    "Session-based transaction graph construction",
    "Unsupervised anomaly detection over graph structure",
    "Benchmarked against traditional ML baselines",
  ],
} as const;

// ---------------------------------------------------------------------------
// Projects — the eight entries from the CV's Projects section, in CV order
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    name: "Gesture-Controlled Virtual Smart Whiteboard",
    blurb:
      "A webcam-based whiteboard controlled entirely by hand gestures — freehand drawing, smart shape correction, select/move/scale, and paint-bucket fill with no mouse or keyboard.",
    detail:
      "Gesture recognition is purely geometric over MediaPipe's 21 hand landmarks — no model training anywhere. Shape correction snaps a shaky sketch to a clean triangle, rectangle or circle using convex hull and contour analysis. Landmark detection frequency adapts to frame rate instead of stuttering under load.",
    tags: ["Computer Vision"],
    stack: ["Python", "MediaPipe", "OpenCV", "NumPy", "Streamlit"],
    links: [
      { label: "Live demo", url: "https://virtual-whiteboard-project.streamlit.app/" },
      { label: "Source", url: "https://github.com/mushfiq525/virtual-whiteboard" },
    ],
  },
  {
    name: "Facial Emotion Recognition",
    blurb:
      "A MobileNetV2 + SE-block model trained on RAF-DB to classify 7 emotions, exported to ONNX for fully client-side, real-time webcam inference in the browser.",
    detail:
      "Two stages: MediaPipe's Face Detector compiled to WebAssembly locates the face, then the classifier labels each frame. Inference runs entirely on the visitor's device via onnxruntime-web — no server compute, and the video never leaves their machine.",
    tags: ["Deep Learning", "Computer Vision"],
    stack: ["PyTorch", "ONNX", "onnxruntime-web", "MediaPipe", "WebAssembly"],
    links: [
      { label: "Source", url: "https://github.com/mushfiq525/facial-emotion-recognition" },
    ],
  },
  {
    name: "FinTech Fraud Detection Using Graph Neural Networks",
    blurb:
      "A session-based fraud detection approach using GNNs: building transaction graphs and applying unsupervised anomaly detection to identify fraudulent behaviour.",
    detail:
      "Compared Graph Neural Networks with traditional machine learning models in fintech fraud detection.",
    tags: ["Research", "Deep Learning"],
    stack: ["Python", "Graph Neural Networks"],
    links: [],
    status: "Accepted at ICICV 2026",
  },
  {
    name: "Generalized Fundus Disease Classification",
    blurb:
      "A generalized retinal disease classifier built by combining multiple fundus datasets and validating on external data.",
    detail:
      "Handles domain shift and dataset harmonization across multi-dataset retinal images.",
    tags: ["Deep Learning", "Computer Vision"],
    stack: ["PyTorch", "OpenCV"],
    links: [],
  },
  {
    name: "Art Style Classification",
    blurb:
      "A CNN–Transformer ensemble for art style classification on the WikiArt dataset.",
    detail: "Ensembles EfficientNetV2-S, ConvNeXt-Tiny and DINOv2-S.",
    tags: ["Deep Learning", "Computer Vision"],
    stack: ["PyTorch", "EfficientNetV2-S", "ConvNeXt-Tiny", "DINOv2-S"],
    links: [],
  },
  {
    name: "Diabetes Prediction via Federated Learning",
    blurb:
      "A federated learning framework for diabetes prediction on Non-IID client data.",
    detail:
      "Experiments with FL algorithms to improve global model accuracy while preserving data privacy.",
    tags: ["Machine Learning"],
    stack: ["Python", "Federated Learning"],
    links: [],
  },
  {
    name: "Crop Disease Detection",
    blurb:
      "A multi-class crop disease classification system reaching high accuracy across 15 disease categories.",
    detail:
      "Applied preprocessing, augmentation, transfer learning with ResNet50 and EfficientNet, and Optuna-based hyperparameter tuning.",
    tags: ["Deep Learning", "Computer Vision"],
    stack: ["PyTorch", "ResNet50", "EfficientNet", "Optuna"],
    links: [{ label: "Source", url: "https://github.com/mushfiq525/Crop-Disease-Detection" }],
  },
  {
    name: "Interactive Underwater World",
    blurb:
      "A real-time underwater world with animated fish, plants, bubbles and lighting effects for an interactive academic graphics project.",
    tags: ["Graphics"],
    stack: ["C++", "OpenGL"],
    links: [
      { label: "Source", url: "https://github.com/mushfiq525/Interactive-Underwater-World" },
    ],
  },
];

/** Filter chips, ordered by how many projects carry each tag. */
export const projectTags: ProjectTag[] = [
  "Computer Vision",
  "Deep Learning",
  "Machine Learning",
  "Research",
  "Graphics",
];

// ---------------------------------------------------------------------------
// Skills — the CV's four Technical Skills categories, verbatim
// ---------------------------------------------------------------------------

export const skills: { category: string; items: string[] }[] = [
  { category: "Programming", items: ["Python", "C++"] },
  {
    category: "Artificial Intelligence",
    items: ["Computer Vision", "Deep Learning", "PyTorch"],
  },
  {
    category: "Data Analysis & Visualization",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "ML pipelines"],
  },
  {
    category: "Tools & Version Control",
    items: ["Git", "GitHub", "Jupyter Notebook", "VS Code", "Kaggle"],
  },
];

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export const education = [
  {
    institution: "Bangladesh University of Business and Technology",
    place: "Mirpur-2, Dhaka-1216",
    qualification: "B.Sc. in Computer Science and Engineering",
    grade: "CGPA 3.99 / 4.00",
    period: "Jan 2022 – April 2026",
  },
  {
    institution: "B.A.F Shaheen College",
    place: "Dhaka",
    qualification: "Higher Secondary Certificate (HSC)",
    grade: "GPA 5.00 / 5.00",
    period: "Passing year 2020",
  },
  {
    institution: "Rupnagar Govt. Secondary School",
    place: "",
    qualification: "Secondary School Certificate (SSC)",
    grade: "GPA 5.00 / 5.00",
    period: "Passing year 2018",
  },
];

// ---------------------------------------------------------------------------
// Certifications & achievements
// ---------------------------------------------------------------------------

export const certifications: { title: string; issuer: string; url?: string }[] = [
  {
    title: "TAFE Data Analyst Certificate",
    issuer: "BUBT",
    url: "https://github.com/mushfiq525/BUBT-TAFE-Certificate",
  },
];

export const achievements: { title: string; context: string }[] = [
  {
    title: "Research paper accepted at ICICV 2026",
    context: "FinTech Fraud Detection Using Graph Neural Networks",
  },
  {
    title: "Brainstorming Week — Research Poster (SE)",
    context: "Participation, BUBT",
  },
  {
    title: "Brainstorming Week — Software Development",
    context: "CSE 300, SkillXchange — Participation, BUBT",
  },
];

// ---------------------------------------------------------------------------
// Navigation — drives both the header and the command palette
// ---------------------------------------------------------------------------

export const sections = [
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "github", label: "GitHub" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;
