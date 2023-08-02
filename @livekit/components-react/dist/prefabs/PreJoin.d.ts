import type { CreateLocalTracksOptions, LocalAudioTrack, LocalTrack, LocalVideoTrack } from 'livekit-client';
import * as React from 'react';
/** @public */
export type LocalUserChoices = {
    username: string;
    videoEnabled: boolean;
    audioEnabled: boolean;
    videoDeviceId: string;
    audioDeviceId: string;
};
/** @public */
export type PreJoinProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> & {
    /** This function is called with the `LocalUserChoices` if validation is passed. */
    onSubmit?: (values: LocalUserChoices) => void;
    /**
     * Provide your custom validation function. Only if validation is successful the user choices are past to the onSubmit callback.
     */
    onValidate?: (values: LocalUserChoices) => boolean;
    onError?: (error: Error) => void;
    /** Prefill the input form with initial values. */
    defaults?: Partial<LocalUserChoices>;
    /** Display a debug window for your convenience. */
    debug?: boolean;
    joinLabel?: string;
    micLabel?: string;
    camLabel?: string;
    userLabel?: string;
};
/** @alpha */
export declare function usePreviewTracks(options: CreateLocalTracksOptions, onError?: (err: Error) => void): LocalTrack[] | undefined;
/** @public */
export declare function usePreviewDevice<T extends LocalVideoTrack | LocalAudioTrack>(enabled: boolean, deviceId: string, kind: 'videoinput' | 'audioinput'): {
    selectedDevice: MediaDeviceInfo | undefined;
    localTrack: T | undefined;
    deviceError: Error | null;
};
/**
 * The PreJoin prefab component is normally presented to the user before he enters a room.
 * This component allows the user to check and select the preferred media device (camera und microphone).
 * On submit the user decisions are returned, which can then be passed on to the LiveKitRoom so that the user enters the room with the correct media devices.
 *
 * @remarks
 * This component is independent from the LiveKitRoom component and don't has to be nested inside it.
 * Because it only access the local media tracks this component is self contained and works without connection to the LiveKit server.
 *
 * @example
 * ```tsx
 * <PreJoin />
 * ```
 * @public
 */
export declare const PreJoin: ({ defaults, onValidate, onSubmit, onError, debug, joinLabel, micLabel, camLabel, userLabel, ...htmlProps }: PreJoinProps) => React.JSX.Element;
//# sourceMappingURL=PreJoin.d.ts.map