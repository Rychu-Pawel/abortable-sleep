# abortable-sleep

The `abortable-sleep` is an NPM package that gives you access to awaiatable sleep function with abort signal support.

## Installation

To install the package, use the following command in your project:

```bash
npm install abortable-sleep
```

## Example

```typescript
const abortController = new AbortController();

await sleep(1000, abortController.signal);
```