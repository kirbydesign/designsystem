import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListLoadMoreService {
  async handleLoadMore(loadMoreCallback: () => Promise<boolean>) {
    let isLoadMoreDone = true;
    if (loadMoreCallback) {
      try {
        isLoadMoreDone = await loadMoreCallback();
      } catch {
        return isLoadMoreDone;
      }
    }
    return isLoadMoreDone;
  }
}
