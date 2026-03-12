type Tab = "explain" | "debug" | "generate";

export interface ExplanationRequest {
  code: string;
}

export interface ExplanationResponse {
  explanation: string;
}

export interface CodeDebuggingRequest {
  code: string;
  error?: string;
}

export interface CodeDebuggingResponse {
  debugging: string;
}

export interface GenerateCodeRequest {
  language: string;
  description: string;
}

export interface GenerateCodeResponse {
  conde: string;
}

export interface TabHeaders {
  id: Tab;
  label: string;
  icon: string;
  gradient: string;
}

export interface Features {
  title: string;
  description: string;
  icon: string;
}

export interface HistoryItem {
  id: number;
  type: Tab;
  timestamp: string;
  input: string;
  output: string;
}
