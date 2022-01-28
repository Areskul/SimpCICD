"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExec = void 0;
const logger_1 = require("@composables/logger");
const child_process_1 = require("child_process");
const picocolors_1 = require("picocolors");
const useExec = () => ({
    execPipeline,
    execStep,
    exec
});
exports.useExec = useExec;
const exec = async (cmd) => {
    try {
        const res = await (0, child_process_1.execSync)(cmd, {
            stdio: ["ignore", "ignore", "pipe"]
        });
        logger_1.log.debug((0, picocolors_1.green)(cmd));
        return;
    }
    catch (err) {
        logger_1.log.error(err);
        console.log((0, picocolors_1.red)("Some commands couldn't be executed"));
        throw err;
    }
};
const execStep = async (step) => {
    console.log(`step: ${step.name}`);
    out: for (const command of step.commands) {
        try {
            await exec(command);
        }
        catch (err) {
            throw err;
        }
    }
};
const execPipeline = async (pipeline) => {
    console.log(`pipeline: ${pipeline.name}`);
    out: for (const step of pipeline.steps) {
        try {
            await execStep(step);
        }
        catch (err) {
            throw err;
            // return err;
        }
    }
};
//# sourceMappingURL=exec.js.map