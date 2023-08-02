import type { TrackReferenceOrPlaceholder } from '@livekit/components-core';
import * as React from 'react';
/** @public */
export interface CarouselLayoutProps extends React.HTMLAttributes<HTMLMediaElement> {
    tracks: TrackReferenceOrPlaceholder[];
    children: React.ReactNode;
    /** Place the tiles vertically or horizontally next to each other.
     * If undefined orientation is guessed by the dimensions of the container. */
    orientation?: 'vertical' | 'horizontal';
}
/**
 * @deprecated Renamed to [[CarouselLayout]]
 */
export declare const CarouselView: typeof CarouselLayout;
/**
 * The `CarouselLayout` displays a list of tracks horizontally or vertically.
 * Depending on the size of the container, the carousel will display as many tiles as possible and overflows the rest.
 * The CarouselLayout uses the `useVisualStableUpdate` hook to ensure that tile reordering due to track updates
 * is visually stable but still moves the important tiles (speaking participants) to the front.
 *
 * @example
 * ```tsx
 * const tracks = useTracks();
 * <CarouselLayout tracks={tracks}>
 *   <ParticipantTile />
 * </CarouselLayout>
 * ```
 * @public
 */
export declare function CarouselLayout({ tracks, orientation, ...props }: CarouselLayoutProps): React.JSX.Element;
//# sourceMappingURL=CarouselLayout.d.ts.map