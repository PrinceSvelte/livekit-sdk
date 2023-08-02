import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import * as React from 'react';
/** @public */
export declare const TrackContext: React.Context<TrackReferenceOrPlaceholder | undefined>;
/**
 * Ensures that a track reference is provided via context.
 * If not inside a `TrackContext`, an error is thrown.
 * @public
 */
export declare function useTrackContext(): TrackReferenceOrPlaceholder;
/**
 * Returns a track reference from the `TrackContext` if it exists, otherwise `undefined`.
 * @public
 */
export declare function useMaybeTrackContext(): TrackReferenceOrPlaceholder | undefined;
/**
 * Ensures that a track reference is provided, either via context or explicitly as a parameter.
 * If not inside a `TrackContext` and no track reference is provided, an error is thrown.
 * @public
 */
export declare function useEnsureTrackReference(track?: TrackReferenceOrPlaceholder): TrackReferenceOrPlaceholder;
//# sourceMappingURL=track-context.d.ts.map