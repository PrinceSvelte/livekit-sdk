import type { Participant, Track, TrackPublication } from 'livekit-client';
import * as React from 'react';
import type { ParticipantClickEvent } from '@livekit/components-core';
/** @public */
export type VideoTrackProps = React.HTMLAttributes<HTMLVideoElement> & {
    source: Track.Source;
    name?: string;
    participant?: Participant;
    publication?: TrackPublication;
    onTrackClick?: (evt: ParticipantClickEvent) => void;
    onSubscriptionStatusChanged?: (subscribed: boolean) => void;
};
/**
 * The VideoTrack component is responsible for rendering participant video tracks like `camera` and `screen_share`.
 * This component must have access to the participant's context, or alternatively pass it a `Participant` as a property.
 *
 * @example
 * ```tsx
 * <VideoTrack source={Track.Source.Camera} />
 * ```
 * @see {@link @livekit/components-react#ParticipantTile | ParticipantTile}
 * @public
 */
export declare function VideoTrack({ onTrackClick, onClick, onSubscriptionStatusChanged, name, publication, source, ...props }: VideoTrackProps): React.JSX.Element;
//# sourceMappingURL=VideoTrack.d.ts.map