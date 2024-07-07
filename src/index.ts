export default async function sleep(sleepTimeInMs: number, abortSignal?: AbortSignal): Promise<void> {
    if (abortSignal?.aborted)
        return Promise.resolve();

    return new Promise<void>(resolve => {
        const timeout = setTimeout(() => {
            resolve();
            // eslint-disable-next-line no-use-before-define
            abortSignal?.removeEventListener(`abort`, abortHandler);
        }, sleepTimeInMs);

        const abortHandler = () => {
            resolve();
            abortSignal?.removeEventListener(`abort`, abortHandler);
            clearTimeout(timeout);
        };

        abortSignal?.addEventListener(`abort`, abortHandler);
    });
}