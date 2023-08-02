import * as React from 'react';
import type { Participant, TrackPublication } from 'livekit-client';
import { Track } from 'livekit-client';
import type { ParticipantClickEvent, TrackReferenceOrPlaceholder } from '@livekit/components-core';
/** @public */
export type ParticipantTileProps = React.HTMLAttributes<HTMLDivElement> & {
    disableSpeakingIndicator?: boolean;
    participant?: Participant;
    source?: Track.Source;
    publication?: TrackPublication;
    onParticipantClick?: (event: ParticipantClickEvent) => void;
};
/** @public */
export type UseParticipantTileProps<T extends HTMLElement> = TrackReferenceOrPlaceholder & {
    disableSpeakingIndicator?: boolean;
    publication?: TrackPublication;
    onParticipantClick?: (event: ParticipantClickEvent) => void;
    htmlProps: React.HTMLAttributes<T>;
};
/** @public */
export declare function useParticipantTile<T extends HTMLElement>({ participant, source, publication, onParticipantClick, disableSpeakingIndicator, htmlProps, }: UseParticipantTileProps<T>): {
    elementProps: React.HTMLAttributes<HTMLDivElement>;
};
/** @public */
export declare function ParticipantContextIfNeeded(props: React.PropsWithChildren<{
    participant?: Participant;
}>): React.JSX.Element;
/**
 * The ParticipantTile component is the base utility wrapper for displaying a visual representation of a participant.
 * This component can be used as a child of the `TrackLoop` component or by spreading a track reference as properties.
 *
 * @example
 * ```tsx
 * <ParticipantTile source={Track.Source.Camera} />
 *
 * <ParticipantTile {...trackReference} />
 * ```
 * @public
 */
export declare const ParticipantTile: ({ participant, children, source, onParticipantClick, publication, disableSpeakingIndicator, ...htmlProps }: ParticipantTileProps) => React.JSX.Element;
//# sourceMappingURL=ParticipantTile.d.ts.map