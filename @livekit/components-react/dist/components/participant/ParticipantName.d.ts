import type { Participant } from 'livekit-client';
import * as React from 'react';
/** @public */
export declare function useParticipantInfo(props?: UseParticipantInfoOptions): {
    identity: string;
    name: string | undefined;
    metadata: string | undefined;
};
/** @public */
export type UseParticipantInfoOptions = {
    participant?: Participant;
};
/** @public */
export type ParticipantNameProps = React.HTMLAttributes<HTMLSpanElement> & UseParticipantInfoOptions;
/**
 * The ParticipantName component displays the name of the participant as a string within an HTML span element.
 * If no participant name is undefined the participant identity string is displayed.
 *
 * @example
 * ```tsx
 * <ParticipantName />
 * ```
 * @public
 */
export declare function ParticipantName({ participant, ...props }: ParticipantNameProps): React.JSX.Element;
//# sourceMappingURL=ParticipantName.d.ts.map