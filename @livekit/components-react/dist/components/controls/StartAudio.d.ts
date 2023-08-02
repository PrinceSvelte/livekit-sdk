import type { Room } from 'livekit-client';
import * as React from 'react';
/** @alpha */
export interface UseStartAudioProps {
    room?: Room;
    props: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
/**
 * In many browsers to start audio playback, the user must perform a user-initiated event such as clicking a button.
 * The `useStatAudio` hook returns an object with a boolean `canPlayAudio` flag
 * that indicates whether audio playback is allowed in the current context,
 * as well as a `startAudio` function that can be called in a button `onClick` callback to start audio playback in the current context.
 *
 * @see Autoplay policy on MDN web docs for more info: {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#autoplay_policy}
 * @alpha
 */
export declare function useStartAudio({ room, props }: UseStartAudioProps): {
    mergedProps: React.HTMLAttributes<HTMLElement>;
    canPlayAudio: boolean;
};
/** @public */
export interface AllowAudioPlaybackProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}
/**
 * The StartAudio component is only visible when the browser blocks audio playback. This is due to some browser implemented autoplay policies.
 * To start audio playback, the user must perform a user-initiated event such as clicking this button.
 * As soon as audio playback starts, the button hides itself again.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <StartAudio label="Click to allow audio playback" />
 * </LiveKitRoom>
 * ```
 *
 * @see Autoplay policy on MDN web docs: {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#autoplay_policy}
 * @public
 */
export declare function StartAudio({ label, ...props }: AllowAudioPlaybackProps): React.JSX.Element;
//# sourceMappingURL=StartAudio.d.ts.map