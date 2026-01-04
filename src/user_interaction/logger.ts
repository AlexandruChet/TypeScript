export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export interface ILogger {
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
}

export class Logger implements ILogger {
  constructor(private readonly context: string) {}

  private format(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  info(message: string, data?: unknown): void {
    console.info(this.format(LogLevel.INFO, message), data ?? '');
  }

  warn(message: string, data?: unknown): void {
    console.warn(this.format(LogLevel.WARN, message), data ?? '');
  }

  error(message: string, data?: unknown): void { 
    console.error(this.format(LogLevel.ERROR, message), data ?? '');
  }
}
