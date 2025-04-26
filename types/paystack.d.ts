interface PaystackPopSetupOptions {
  key: string;
  email: string;
  amount: number;
  ref: string;
  callback: (response: { status: string; reference: string }) => void;
  onClose: () => void;
}

interface PaystackPopHandler {
  setup(options: PaystackPopSetupOptions): {
    openIframe(): void;
  };
}

declare global {
  interface Window {
    PaystackPop: PaystackPopHandler;
  }
}

export {};