import type { CaptureOptionsBySource, ToggleSource } from '@livekit/components-core';
import * as React from 'react';
/** @public */
export type TrackToggleProps<T extends ToggleSource> = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
    source: T;
    showIcon?: boolean;
    initialState?: boolean;
    onChange?: (enabled: boolean) => void;
    captureOptions?: CaptureOptionsBySource<T>;
};
/** @public */
export type UseTrackToggleProps<T extends ToggleSource> = Omit<TrackToggleProps<T>, 'showIcon'>;
/** @public */
export declare function useTrackToggle<T extends ToggleSource>({ source, onChange, initialState, captureOptions, ...rest }: UseTrackToggleProps<T>): {
    toggle: ((forceState?: boolean | undefined) => void) | ((forceState?: boolean | undefined, captureOptions?: CaptureOptionsBySource<T> | undefined) => Promise<void>);
    enabled: boolean;
    pending: boolean;
    track: import("livekit-client").LocalTrackPublication | undefined;
    buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
};
/**
 * With the TrackToggle component it is possible to mute and unmute your camera and microphone.
 * The component uses an html button element under the hood so you can treat it like a button.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <TrackToggle source={Track.Source.Microphone} />
 *   <TrackToggle source={Track.Source.Camera} />
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function TrackToggle<T extends ToggleSource>({ showIcon, ...props }: TrackToggleProps<T>): React.JSX.Element;
//# sourceMappingURL=TrackToggle.d.ts.map