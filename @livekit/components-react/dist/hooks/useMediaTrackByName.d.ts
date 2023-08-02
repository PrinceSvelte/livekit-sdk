/// <reference types="react" />
import type { Participant } from 'livekit-client';
import type { UseMediaTrackOptions } from './useMediaTrack';
/** @public */
export declare function useMediaTrackByName(name: string, participant?: Participant, options?: UseMediaTrackOptions): {
    publication: import("livekit-client").TrackPublication | undefined;
    isMuted: boolean | undefined;
    isSubscribed: boolean | undefined;
    track: import("livekit-client").Track | undefined;
    elementProps: import("react").HTMLAttributes<HTMLElement>;
};
//# sourceMappingURL=useMediaTrackByName.d.ts.map