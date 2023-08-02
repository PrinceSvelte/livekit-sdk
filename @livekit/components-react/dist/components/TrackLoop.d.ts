import type { TrackReference, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import * as React from 'react';
/** @public */
export type TrackLoopProps = {
    /** Track references to loop over. */
    tracks: TrackReference[] | TrackReferenceOrPlaceholder[];
    /** The template component to be used in the loop. */
    children: React.ReactNode;
};
/**
 * The TrackLoop component loops over tracks. It is for example a easy way to loop over all participant camera and screen share tracks.
 * TrackLoop creates a TrackContext for each track that you can use to e.g. render the track.
 *
 * @example
 * ```tsx
 * const tracks = useTracks([Track.Source.Camera]);
 * <TrackLoop tracks={tracks} >
 *  <TrackContext.Consumer>
 *    {(track) => track && <VideoTrack {...track}/>}
 *  </TrackContext.Consumer>
 * <TrackLoop />
 * ```
 * @public
 */
export declare const TrackLoop: ({ tracks, ...props }: TrackLoopProps) => React.JSX.Element;
//# sourceMappingURL=TrackLoop.d.ts.map