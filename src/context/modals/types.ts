import { API, Client } from "revolt.js";

export type Modal = {
    key?: string;
} & (
    | ({
          type: "mfa_flow";
      } & (
          | {
                state: "known";
                client: Client;
                callback: (ticket?: API.MFATicket) => void;
            }
          | {
                state: "unknown";
                available_methods: API.MFAMethod[];
                callback: (response?: API.MFAResponse) => void;
            }
      ))
    | { type: "mfa_recovery"; codes: string[]; client: Client }
    | {
          type: "mfa_enable_totp";
          identifier: string;
          secret: string;
          callback: (code?: string) => void;
      }
    | {
          type: "out_of_date";
          version: string;
      }
    | {
          type: "changelog";
          initial?: number;
      }
    | {
          type: "sign_out_sessions";
          client: Client;
          onDelete: () => void;
          onDeleting: () => void;
      }
    | {
          type: "show_token";
          name: string;
          token: string;
      }
    | {
          type: "error";
          error: string;
      }
    | {
          type: "clipboard";
          text: string;
      }
    | {
          type: "signed_out";
      }
);

export type ModalProps<T extends Modal["type"]> = Modal & { type: T } & {
    onClose: () => void;
    signal?: "close" | "confirm";
};