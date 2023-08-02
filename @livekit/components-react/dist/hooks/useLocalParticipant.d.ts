import type { TrackPublication, LocalParticipant, Room } from 'livekit-client';
/** @public */
export interface UseLocalParticipantOptions {
    /**
     * The room to use. If not provided, the hook will use the room from the context.
     */
    room?: Room;
}
/**
 * The useLocalParticipant hook the state of the local participant.
 * @public
 */
export declare const useLocalParticipant: (options?: UseLocalParticipantOptions) => {
    isMicrophoneEnabled: boolean;
    isScreenShareEnabled: boolean;
    isCameraEnabled: boolean;
    microphoneTrack: TrackPublication | undefined;
    cameraTrack: TrackPublication | undefined;
    localParticipant: LocalParticipant;
};
//# sourceMappingURL=useLocalParticipant.d.ts.map