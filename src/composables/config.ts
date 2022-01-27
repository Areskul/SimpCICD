import type { Config } from "@type/index";
import { log } from "@composables/logger";

interface Store {
  config?: Config;
}
let store: Store = {};

const useConfig = () => ({
  defineConfig,
  set,
  get
});

const set = (filePath?: string) => {
  try {
    const path = filePath ? filePath : "@/../simp.config";
    const config = require(path);
    store.config = config;
    return config;
  } catch (err) {
    log.error(err);
    return;
  }
};
const get = () => {
  return store.config;
};

const defineConfig = (config: Config): Config => {
  return config;
};

export { useConfig };
