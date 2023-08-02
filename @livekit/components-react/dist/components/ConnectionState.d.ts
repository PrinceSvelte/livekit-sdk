import type { Room } from 'livekit-client';
import * as React from 'react';
/** @public */
export interface ConnectionStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The room from which the connection status should be displayed.
     */
    room?: Room;
}
/**
 * The `useConnectionState` hook allows you to simply implement your own `ConnectionState` component.
 *
 * @example
 * ```tsx
 * const connectionState = useConnectionState(room);
 * ```
 * @public
 */
export declare function useConnectionState(room?: Room): import("livekit-client").ConnectionState;
/**
 * The ConnectionState component displays the connection status of the room in written form.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <ConnectionState />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function ConnectionState({ room, ...props }: ConnectionStatusProps): React.JSX.Element;
//# sourceMappingURL=ConnectionState.d.ts.map