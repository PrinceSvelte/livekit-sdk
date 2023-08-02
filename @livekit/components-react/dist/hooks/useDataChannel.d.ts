import type { DataSendOptions, ReceivedDataMessage } from '@livekit/components-core';
type UseDataChannelReturnType<T extends string | undefined = undefined> = {
    isSending: boolean;
    send: (payload: Uint8Array, options: DataSendOptions) => void;
    message: ReceivedDataMessage<T> | undefined;
};
/**
 * @public
 */
export declare function useDataChannel<T extends string>(topic: T, onMessage?: (msg: ReceivedDataMessage<T>) => void): UseDataChannelReturnType<T>;
/**
 * @public
 */
export declare function useDataChannel(onMessage?: (msg: ReceivedDataMessage) => void): UseDataChannelReturnType;
export {};
//# sourceMappingURL=useDataChannel.d.ts.map