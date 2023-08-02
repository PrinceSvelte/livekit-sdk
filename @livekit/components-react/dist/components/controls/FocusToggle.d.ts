import type { Participant, Track } from 'livekit-client';
import * as React from 'react';
/** @public */
export interface FocusToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    trackSource: Track.Source;
    participant?: Participant;
}
/**
 * The FocusToggle puts the ParticipantTile in focus or removes it from focus.
 *
 * @example
 * ```tsx
 * <ParticipantTile>
 *   <FocusToggle />
 * </ParticipantTile>
 * ```
 * @public
 */
export declare function FocusToggle({ trackSource, participant, ...props }: FocusToggleProps): React.JSX.Element;
//# sourceMappingURL=FocusToggle.d.ts.map