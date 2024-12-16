export function executeAfterDelay(callback, delay) {
  const delayMs = parseDelayToMs(delay);

  setTimeout(callback, delayMs);
}

function parseDelayToMs(delay) {
  return delay * 1000;
}
