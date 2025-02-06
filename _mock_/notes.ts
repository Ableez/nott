export type Note = {
  title: string;
  backgroundStyle: string;
  editorState: string;
  summary: string;
  parent: string;
  theme: string;
  lastEditedTime: string; // ISO TIMESTAMP
  plainMarkdown: string;
};

export const notes: Note[] = [
  {
    title: "Meeting Notes: Project Alpha",
    backgroundStyle: "none",
    editorState: "",
    summary:
      "Key decisions on project scope, resource allocation, and initial timeline.",
    parent: "",
    theme: "#a855f7", // Purple
    plainMarkdown: "",
    lastEditedTime: new Date(
      new Date().getTime() - 1 * 60 * 60 * 1000
    ).toISOString(), // 1 hour ago
  },
  {
    title: "Quick Grocery Run",
    backgroundStyle: "none",
    editorState: "",
    summary: "Essentials: Milk, eggs, bread, and cheese. Check for sales.",
    parent: "",
    theme: "#f472b6", // Pink
    plainMarkdown: "",
    lastEditedTime: new Date(
      new Date().getTime() - 2 * 60 * 60 * 1000
    ).toISOString(), // 2 hours ago
  },
  {
    title: "Blog Post Ideas: Tech Trends",
    backgroundStyle: "none",
    editorState: "",
    summary:
      "Explore AI, blockchain, and cybersecurity trends. Target audience: tech enthusiasts.",
    parent: "",
    theme: "#34d399", // Green
    plainMarkdown: "",
    lastEditedTime: new Date(
      new Date().getTime() - 3 * 60 * 60 * 1000
    ).toISOString(), // 3 hours ago
  },
  {
    title: "Must-Read Books",
    backgroundStyle: "none",
    editorState: "",
    summary:
      "Recommendations from colleagues: Sci-fi, biography, and mystery genres.",
    parent: "",
    theme: "#0ea5e9", // Sky Blue
    plainMarkdown: "",
    lastEditedTime: new Date(
      new Date().getTime() - 4 * 60 * 60 * 1000
    ).toISOString(), // 4 hours ago
  },
  {
    title: "Summer Travel: Italy",
    backgroundStyle: "none",
    editorState: "",
    summary:
      "Researching Rome, Florence, and Venice. Focus on historical sites and local cuisine.",
    parent: "",
    theme: "#facc15", // Yellow
    plainMarkdown: "",
    lastEditedTime: new Date(
      new Date().getTime() - 5 * 60 * 60 * 1000
    ).toISOString(), // 5 hours ago
  },
  {
    title: "Fitness Goals - November",
    backgroundStyle: "none",
    editorState: "",
    summary:
      "Plan: Daily cardio, strength training 3x/week. Track progress weekly.",
    parent: "",
    theme: "#6b7280", // Gray
    plainMarkdown: "",
    lastEditedTime: new Date(
      new Date().getTime() - 6 * 60 * 60 * 1000
    ).toISOString(), // 6 hours ago
  },
  {
    title: "Home Improvement Ideas",
    backgroundStyle: "none",
    editorState: "",
    summary: "Brainstorming session on potential blog topics.",
    parent: "",
    theme: "#ef4444", // Red
    plainMarkdown: "",
    lastEditedTime: new Date(
      new Date().getTime() - 7 * 60 * 60 * 1000
    ).toISOString(), // 7 hours ago
  },
  {
    title: "New Year Resolutions",
    backgroundStyle: "none",
    editorState: "",
    summary:
      "Personal and professional goals for the upcoming year. Review quarterly.",
    parent: "",
    theme: "#db2777", // Rose
    plainMarkdown: "",
    lastEditedTime: new Date(
      new Date().getTime() - 8 * 60 * 60 * 1000
    ).toISOString(), // 8 hours ago
  },
];
