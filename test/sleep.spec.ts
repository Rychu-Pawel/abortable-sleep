import test from "ava";
import sleep from "../src/index.js";

test.serial(`sleeps requested time`, async t => {
    // ARRANGE
    const sleepTime = 200;

    // ACT
    const startTime = new Date().getTime();

    await sleep(sleepTime);

    const endTime = new Date().getTime();

    // ASSERT
    t.true(endTime - startTime > sleepTime);
    t.true(endTime - startTime < sleepTime + 20);
});