import type { RoomEvent, RemoteParticipant, Room } from 'livekit-client';
/** @public */
export interface UseRemoteParticipantsOptions {
    /**
     * To optimize performance, you can use the `updateOnlyOn` property to decide on what RoomEvents the hook updates.
     * By default it updates on all relevant RoomEvents to keep the returned participants array up to date.
     * The minimal set of non-overwriteable `RoomEvents` is: `[RoomEvent.ParticipantConnected, RoomEvent.ParticipantDisconnected, RoomEvent.ConnectionStateChanged]`
     */
    updateOnlyOn?: RoomEvent[];
    /**
     * The room to use. If not provided, the hook will use the room from the context.
     */
    room?: Room;
}
/**
 * The useRemoteParticipants
 *
 * @public
 */
export declare const useRemoteParticipants: (options?: UseRemoteParticipantsOptions) => RemoteParticipant[];
//# sourceMappingURL=useRemoteParticipants.d.ts.map