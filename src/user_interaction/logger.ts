export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export interface ILogger {
  warn(arg0: string, arg1: { id: number }): unknown;
  info(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
}

export class Logger implements ILogger {
  constructor(private readonly name: string) {}

  private log(level: LogLevel, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    const base = `[${timestamp}] [${level}] [${this.name}]`;

    if (data !== undefined) console.log(`${base} ${message}`, data);
    else console.log(`${base} ${message}`);
  }

  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: unknown): void {
    this.log(LogLevel.ERROR, message, data);
  }
}
