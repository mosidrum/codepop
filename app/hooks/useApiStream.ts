"use client";

import { useRef, useState } from "react";

type Mode = "explain" | "debug" | "generate";

interface UseApiStreamProps {
  mode: Mode;
  language: string;
}

export const useApiStream = ({ mode, language }: UseApiStreamProps) => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const submit = async (input: string) => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResult("");

    abortControllerRef.current = new AbortController();

    try {
      const endpoint = `/api/${mode}`;
      const body =
        mode === "generate"
          ? { description: input, language }
          : mode === "debug"
            ? { code: input, error: "" }
            : { code: input };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: abortControllerRef.current.signal,
      });

      const data = (await response.json()) as { error?: string; data?: string };

      if (data.error) {
        setResult(`Error: ${data.error}`);
        setIsLoading(false);
      } else if (data.data) {
        const text = data.data;
        let index = 0;
        streamIntervalRef.current = setInterval(() => {
          if (index < text.length) {
            setResult(text.slice(0, index + 1));
            index++;
          } else {
            if (streamIntervalRef.current) {
              clearInterval(streamIntervalRef.current);
              streamIntervalRef.current = null;
            }
            setIsLoading(false);
          }
        }, 10) as unknown as NodeJS.Timeout;
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setResult((prev) => prev + "\n\n[Stopped by user]");
      } else {
        setResult(
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
      setIsLoading(false);
    }
  };

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setIsLoading(false);
  };

  return { result, isLoading, submit, stop };
};
