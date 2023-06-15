export interface IQuestionResponse {
  question: string;
  answers: { option_text: string; option_key: string }[];
}
