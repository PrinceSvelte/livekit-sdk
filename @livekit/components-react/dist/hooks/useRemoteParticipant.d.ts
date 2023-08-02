import type { ParticipantEvent, RemoteParticipant } from 'livekit-client';
/** @public */
export interface UseRemoteParticipantOptions {
    updateOnlyOn?: ParticipantEvent[];
}
/** @public */
export declare const useRemoteParticipant: (identity: string, options?: UseRemoteParticipantOptions) => RemoteParticipant | undefined;
//# sourceMappingURL=useRemoteParticipant.d.ts.map