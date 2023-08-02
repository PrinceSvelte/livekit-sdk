import * as React from 'react';
import type { Participant, Track } from 'livekit-client';
/** @public */
export interface TrackMutedIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
    source: Track.Source;
    participant?: Participant;
    show?: 'always' | 'muted' | 'unmuted';
}
/** @public */
export interface UseTrackMutedIndicatorOptions {
    participant?: Participant;
}
/** @public */
export declare const useTrackMutedIndicator: (source: Track.Source, options?: UseTrackMutedIndicatorOptions) => {
    isMuted: boolean;
    className: string;
};
/**
 * The TrackMutedIndicator shows whether the participant's camera or microphone is muted or not.
 *
 * @example
 * ```tsx
 * <TrackMutedIndicator source={Track.Source.Camera} />
 * <TrackMutedIndicator source={Track.Source.Microphone} />
 * ```
 * @public
 */
export declare const TrackMutedIndicator: ({ source, participant, show, ...props }: TrackMutedIndicatorProps) => React.JSX.Element | null;
//# sourceMappingURL=TrackMutedIndicator.d.ts.map