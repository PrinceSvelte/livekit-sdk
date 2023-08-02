/** @public */
export interface UserInfo {
    identity?: string;
    name?: string;
    metadata?: string;
}
/** @public */
export interface UseTokenOptions {
    userInfo?: UserInfo;
}
/** @public */
export declare function useToken(tokenEndpoint: string | undefined, roomName: string, options?: UseTokenOptions): string | undefined;
//# sourceMappingURL=useToken.d.ts.map