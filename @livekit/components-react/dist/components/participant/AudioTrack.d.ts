import type { Participant, Track, TrackPublication } from 'livekit-client';
import * as React from 'react';
/** @public */
export type AudioTrackProps<T extends HTMLMediaElement = HTMLMediaElement> = React.HTMLAttributes<T> & {
    source: Track.Source;
    name?: string;
    participant?: Participant;
    publication?: TrackPublication;
    onSubscriptionStatusChanged?: (subscribed: boolean) => void;
    /** by the default the range is between 0 and 1 */
    volume?: number;
};
/**
 * The AudioTrack component is responsible for rendering participant audio tracks.
 * This component must have access to the participant's context, or alternatively pass it a `Participant` as a property.
 *
 * @example
 * ```tsx
 *   <ParticipantTile>
 *     <AudioTrack source={Track.Source.Microphone} />
 *   </ParticipantTile>
 * ```
 *
 * @see `ParticipantTile` component
 * @public
 */
export declare function AudioTrack({ onSubscriptionStatusChanged, volume, ...props }: AudioTrackProps): React.JSX.Element;
//# sourceMappingURL=AudioTrack.d.ts.map