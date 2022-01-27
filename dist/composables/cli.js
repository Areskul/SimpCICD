"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCli = void 0;
const cac_1 = require("cac");
const logger_1 = require("@composables/logger");
const config_1 = require("@composables/config");
const deploy_1 = require("@resolvers/deploy");
const config = (0, config_1.useConfig)();
const useCli = (conf) => {
    const cli = (0, cac_1.cac)("simp");
    const setConfigAction = async (options) => {
        try {
            config.set(conf);
        }
        catch (err) {
            logger_1.log.error(err);
        }
    };
    const getConfigAction = async (options) => {
        if (!options.parseConfig)
            return;
        try {
            const conf = config.get();
            logger_1.log.info(conf);
        }
        catch (err) {
            logger_1.log.error(err);
        }
    };
    cli.option("--parse-config", "parse loaded config");
    cli.command("").action(async (options) => {
        await setConfigAction(options);
        await getConfigAction(options);
    });
    cli
        .command("deploy")
        .option("-p, --pipeline", "<srting> pipeline to execute")
        .action(async (options) => {
        await setConfigAction(options);
        await getConfigAction(options);
        (0, deploy_1.deploy)();
    });
    cli.help();
    cli.parse();
    return cli;
};
exports.useCli = useCli;
//# sourceMappingURL=cli.js.map