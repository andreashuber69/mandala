import { Model } from "./Model";

class App {
    public static async main() {
        try {
            const model = new Model();

            // eslint-disable-next-line no-await-in-loop
            while (await App.continue(model)) {
                model.split();
            }

            return 0;
        } catch (ex: unknown) {
            console.error(`${ex}`);

            return 1;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    private static async continue({ time, mandalas, participants }: Model) {
        console.log(`Time: ${time}, Mandalas: ${mandalas}, Participants: ${participants}`);
        const response = (await this.requestInput("Continue [Y]: ")).toLowerCase();

        return response === "y" || response === "";
    }

    private static async requestInput(prompt: string) {
        process.stdout.write(prompt);

        return App.getConsoleInput();
    }

    private static async getConsoleInput() {
        return new Promise<string>((resolve) => {
            const stdin = process.openStdin();
            stdin.once("data", (args: { readonly toString: () => string }) => {
                resolve(args.toString().trim());
                stdin.pause();
            });
        });
    }
}

// The catch should never be reached (because we handle all errors in main). If it does, we let the whole thing fail.
App.main().then((exitCode) => (process.exitCode = exitCode)).catch(() => (process.exitCode = 1));
