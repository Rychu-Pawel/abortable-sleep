import test from "ava";
import sleep from "../src/index.js";

const toleranceInMs = 50;

test.serial(`sleeps requested time`, async t => {
    // ARRANGE
    const sleepTime = 200;

    // ACT
    const startTime = new Date().getTime();

    await sleep(sleepTime);

    const endTime = new Date().getTime();

    // ASSERT
    t.true(endTime - startTime > sleepTime);
    t.true(endTime - startTime < sleepTime + toleranceInMs);
});

test.serial(`returns immediately when called with aborted signal`, async t => {
    // ARRANGE
    const sleepTime = 200;

    const abortController = new AbortController();

    // ACT
    abortController.abort();

    const startTime = new Date().getTime();

    await sleep(sleepTime, abortController.signal);

    const endTime = new Date().getTime();

    // ASSERT
    t.true(endTime - startTime < 2);
});

test.serial(`returns immediately after abort is called`, async t => {
    // ARRANGE
    const sleepTime = 200;
    const abortAfter = 50;

    const abortController = new AbortController();

    // ACT
    setTimeout(() => abortController.abort(), abortAfter);

    const startTime = new Date().getTime();

    await sleep(sleepTime, abortController.signal);

    const endTime = new Date().getTime();

    // ASSERT
    t.true(endTime - startTime > abortAfter);
    t.true(endTime - startTime < abortAfter + toleranceInMs);
});