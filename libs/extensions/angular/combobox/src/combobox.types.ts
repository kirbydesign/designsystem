export enum OpenState {
  closed,
  opening,
  open,
}

export class GroupItem {
  constructor(
    public id: string,
    public displayName: string
  ) {}
}

/**
 * Defines a single group within the combobox dropdown.
 *
 * @template T The type of items in the combobox.
 */
export interface GroupDefinition<T = unknown> {
  /** Unique identifier for the group. */
  id: string;
  /** Label rendered in the group header row. */
  displayName: string;
  /**
   * Predicate that returns `true` when `item` belongs to this group.
   * Groups are evaluated in array order; an item is placed in the first
   * group whose condition returns `true`.
   */
  condition: (item: T) => boolean;
}

/**
 * An ordered array of {@link GroupDefinition} objects passed to `[groupSettings]`.
 * Groups are rendered in the order they appear in this array.
 * Items that match no group are appended ungrouped at the end (no header).
 *
 * @template T The type of items in the combobox.
 */
export type GroupSettings<T = unknown> = GroupDefinition<T>[];
