/// <reference types="react" />
import type { VideoSource, AudioSource } from '@livekit/components-core';
import type { Participant } from 'livekit-client';
/** @public */
export interface UseMediaTrackOptions {
    element?: React.RefObject<HTMLMediaElement>;
    props?: React.HTMLAttributes<HTMLVideoElement | HTMLAudioElement>;
}
/** @public */
export declare function useMediaTrack(source: VideoSource | AudioSource, participant?: Participant, options?: UseMediaTrackOptions): {
    publication: import("livekit-client").TrackPublication | undefined;
    isMuted: boolean | undefined;
    isSubscribed: boolean | undefined;
    track: import("livekit-client").Track | undefined;
    elementProps: import("react").HTMLAttributes<HTMLElement>;
};
//# sourceMappingURL=useMediaTrack.d.ts.map