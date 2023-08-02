import type { Participant, Track } from 'livekit-client';
/** @public */
export interface UseIsMutedOptions {
    participant?: Participant;
}
/** @public */
export declare function useIsMuted(source: Track.Source, options?: UseIsMutedOptions): boolean;
//# sourceMappingURL=useIsMuted.d.ts.map