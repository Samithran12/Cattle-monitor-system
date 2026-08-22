import React, { Component, ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[CattleIQ Crash Caught by ErrorBoundary]:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleClearAndReset = () => {
    try {
      localStorage.removeItem("cattleiq_animals_v2");
      localStorage.removeItem("cattleiq_smart_tasks_v2");
      localStorage.removeItem("cattleiq_pending_sync_queue");
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-sans">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-3xl font-bold">
                healing
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-extrabold font-display text-white">
                Something went wrong
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed">
                மன்னிக்கவும், எதிர்பாராத பிழை ஏற்பட்டது. உங்கள் மாடுகளின் தரவு பாதுகாப்பாக உள்ளது.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                CattleIQ ran into an unexpected problem. Your local herd data remains safe.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-black rounded-2xl border border-zinc-800 text-left overflow-hidden">
                <span className="text-[10px] font-mono text-red-400 uppercase font-bold block mb-1">
                  Diagnostics:
                </span>
                <p className="text-xs font-mono text-zinc-300 break-words line-clamp-3">
                  {this.state.error.message || "Unknown client error"}
                </p>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full py-3.5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-extrabold text-xs shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>Reload CattleIQ</span>
              </button>

              <button
                onClick={this.handleClearAndReset}
                className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold text-xs border border-zinc-700 transition-colors cursor-pointer"
              >
                Reset Cache & Restart
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
