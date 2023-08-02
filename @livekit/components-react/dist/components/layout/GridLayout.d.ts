import * as React from 'react';
import type { UseParticipantsOptions } from '../../hooks';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
/** @public */
export interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement>, Pick<UseParticipantsOptions, 'updateOnlyOn'> {
    children: React.ReactNode;
    tracks: TrackReferenceOrPlaceholder[];
}
/**
 * The GridLayout component displays the nested participants in a grid where every participants has the same size.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <GridLayout tracks={tracks}>
 *     <ParticipantTile />
 *   </GridLayout>
 * <LiveKitRoom>
 * ```
 * @public
 */
export declare function GridLayout({ tracks, ...props }: GridLayoutProps): React.JSX.Element;
//# sourceMappingURL=GridLayout.d.ts.map