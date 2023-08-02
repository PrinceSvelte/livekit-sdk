import type { Participant } from 'livekit-client';
import * as React from 'react';
import type { TrackReference, TrackReferenceOrPlaceholder } from '@livekit/components-core';
import type { ParticipantClickEvent } from '@livekit/components-core';
/** @public */
export interface FocusLayoutContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    focusTrack?: TrackReference;
    participants?: Array<Participant>;
}
/** @public */
export declare function FocusLayoutContainer(props: FocusLayoutContainerProps): React.JSX.Element;
/** @public */
export interface FocusLayoutProps extends React.HTMLAttributes<HTMLElement> {
    track?: TrackReferenceOrPlaceholder;
    onParticipantClick?: (evt: ParticipantClickEvent) => void;
}
/** @public */
export declare function FocusLayout({ track, ...htmlProps }: FocusLayoutProps): React.JSX.Element;
//# sourceMappingURL=FocusLayout.d.ts.map