import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
/** @public */
export interface UseVisualStableUpdateOptions {
    /** Overwrites the default sort function. */
    customSortFunction?: (trackReferences: TrackReferenceOrPlaceholder[]) => TrackReferenceOrPlaceholder[];
}
/**
 * The useVisualStableUpdate hook tries to keep visual updates of the TackBundles array to a minimum,
 * while still trying to display important tiles such as speaking participants or screen shares.
 *
 * Updating works with pagination. For example, if a participant starts speaking on the second page,
 * they will be moved to the first page by replacing the least active/interesting participant on the first page.
 *
 * @beta
 */
export declare function useVisualStableUpdate(
/** `TrackReference`s to display in the grid.  */
trackReferences: TrackReferenceOrPlaceholder[], maxItemsOnPage: number, options?: UseVisualStableUpdateOptions): TrackReferenceOrPlaceholder[];
//# sourceMappingURL=useVisualStableUpdate.d.ts.map