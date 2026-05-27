export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: string;
  topic: string;
  subtopic?: string;
  difficulty: Difficulty;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  reference?: string;
  figure?: string;
};

export type TopicSummary = {
  topic: string;
  count: number;
};
