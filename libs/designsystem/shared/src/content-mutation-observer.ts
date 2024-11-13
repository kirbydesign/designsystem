/* Function based on https://github.com/angular/components/blob/main/src/cdk/observers/observe-content.ts
 * Angular may add, remove, or edit comment nodes during change detection. We don't care about
 * these changes because they don't affect the user-preceived content, and worse it can cause
 * infinite change detection cycles where the change detection updates a comment, triggering the
 * MutationObserver, triggering another change detection and kicking the cycle off again. */
export function shouldIgnoreMutationRecord(record: MutationRecord) {
  // Ignore changes to comment text.
  if (record.type === 'characterData' && record.target instanceof Comment) {
    return true;
  }
  // Ignore addition / removal of comments.
  if (record.type === 'childList') {
    for (let i = 0; i < record.addedNodes.length; i++) {
      if (!(record.addedNodes[i] instanceof Comment)) {
        return false;
      }
    }
    for (let i = 0; i < record.removedNodes.length; i++) {
      if (!(record.removedNodes[i] instanceof Comment)) {
        return false;
      }
    }
    return true;
  }
  // Observe everything else.
  return false;
}

export function observeContent(
  observedElement: HTMLElement,
  callback: MutationCallback
): MutationObserver {
  const mutationObserver = new MutationObserver((mutations) =>
    callback(mutations, mutationObserver)
  );

  mutationObserver.observe(observedElement, {
    characterData: true,
    childList: true,
    subtree: true,
  });

  return mutationObserver;
}
