import * as React from 'react';
/** @public */
export type DisconnectButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    stopTracks?: boolean;
};
/** @public */
export declare function useDisconnectButton(props: DisconnectButtonProps): {
    buttonProps: React.HTMLAttributes<HTMLElement>;
};
/**
 * The DisconnectButton is a basic html button with the added ability to disconnect from a LiveKit room.
 * Normally, it is used by end-users to leave a video or audio call.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <DisconnectButton>Leave room</DisconnectButton>
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function DisconnectButton(props: DisconnectButtonProps): React.JSX.Element;
//# sourceMappingURL=DisconnectButton.d.ts.map