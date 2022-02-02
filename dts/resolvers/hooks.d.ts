import type { Config } from "@type/index";
export declare const useHooks: (config: Config) => {
    caller: () => void;
    generateHook: (name: string) => Promise<unknown>;
    printHooks: () => void;
    build: () => Promise<void>;
    generateOutputs: (bundle: any) => Promise<void>;
};
