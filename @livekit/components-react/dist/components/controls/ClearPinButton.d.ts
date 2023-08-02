import * as React from 'react';
/** @public */
export type ClearPinButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
/** @public */
export declare function useClearPinButton(props: ClearPinButtonProps): {
    buttonProps: React.HTMLAttributes<HTMLElement>;
};
/**
 * The ClearPinButton is a basic html button with the added ability to signal
 * the LiveKitRoom that it should display the grid view again.
 *
 * @remarks
 * This component works only inside a PinContext.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <ClearPinButton>Leave room</ClearPinButton>
 * </LiveKitRoom>
 * ```
 * @public
 */
export declare function ClearPinButton(props: ClearPinButtonProps): React.JSX.Element;
//# sourceMappingURL=ClearPinButton.d.ts.map