import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListLoadMoreService {
  async handleLoadMore(loadMoreCallback: () => Promise<boolean>) {
    let hasMoreItems = false;
    try {
      if (loadMoreCallback) {
        hasMoreItems = await loadMoreCallback();
      }
    } finally {
      return hasMoreItems;
    }
  }
}
