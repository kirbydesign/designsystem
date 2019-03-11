import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListLoadMoreService {
  async handleLoadMore(loadMoreCallback: () => Promise<boolean>) {
    let isLoadMoreDone = true;
    if (loadMoreCallback) {
      isLoadMoreDone = await loadMoreCallback();
    }
    return isLoadMoreDone;
  }
}
