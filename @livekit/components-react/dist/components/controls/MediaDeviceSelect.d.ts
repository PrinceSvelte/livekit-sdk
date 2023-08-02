import * as React from 'react';
import type { LocalAudioTrack, LocalVideoTrack, Room } from 'livekit-client';
/** @public */
export declare function useMediaDevices({ kind }: {
    kind: MediaDeviceKind;
}): MediaDeviceInfo[];
/** @public */
export interface UseMediaDeviceSelectProps {
    kind: MediaDeviceKind;
    room?: Room;
    track?: LocalAudioTrack | LocalVideoTrack;
    /**
     * this will call getUserMedia if the permissions are not yet given to enumerate the devices with device labels.
     * in some browsers multiple calls to getUserMedia result in multiple permission prompts.
     * It's generally advised only flip this to true, once a (preview) track has been acquired successfully with the
     * appropriate permissions.
     *
     * @see {@link MediaDeviceMenu}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices | MDN enumerateDevices}
     */
    requestPermissions?: boolean;
}
/** @public */
export declare function useMediaDeviceSelect({ kind, room, track, requestPermissions, }: UseMediaDeviceSelectProps): {
    devices: MediaDeviceInfo[];
    className: string;
    activeDeviceId: string;
    setActiveMediaDevice: (id: string, options?: import("@livekit/components-core").SetMediaDeviceOptions | undefined) => Promise<void>;
};
/** @public */
export interface MediaDeviceSelectProps extends React.HTMLAttributes<HTMLUListElement> {
    kind: MediaDeviceKind;
    onActiveDeviceChange?: (deviceId: string) => void;
    onDeviceListChange?: (devices: MediaDeviceInfo[]) => void;
    onDeviceSelectError?: (e: Error) => void;
    initialSelection?: string;
    /** will force the browser to only return the specified device
     * will call `onDeviceSelectError` with the error in case this fails
     */
    exactMatch?: boolean;
    track?: LocalAudioTrack | LocalVideoTrack;
    /**
     * this will call getUserMedia if the permissions are not yet given to enumerate the devices with device labels.
     * in some browsers multiple calls to getUserMedia result in multiple permission prompts.
     * It's generally advised only flip this to true, once a (preview) track has been acquired successfully with the
     * appropriate permissions.
     *
     * @see {@link MediaDeviceMenu}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices | MDN enumerateDevices}
     */
    requestPermissions?: boolean;
}
/**
 * The MediaDeviceSelect list all media devices of one kind.
 * Clicking on one of the listed devices make it the active media device.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <MediaDeviceSelect kind='audioinput' />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function MediaDeviceSelect({ kind, initialSelection, onActiveDeviceChange, onDeviceListChange, onDeviceSelectError, exactMatch, track, requestPermissions, ...props }: MediaDeviceSelectProps): React.JSX.Element;
//# sourceMappingURL=MediaDeviceSelect.d.ts.map