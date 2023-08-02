import type { Participant } from 'livekit-client';
import * as React from 'react';
/** @public */
export interface AudioVisualizerProps extends React.HTMLAttributes<SVGElement> {
    participant?: Participant;
}
/** @public */
export declare function AudioVisualizer({ participant, ...props }: AudioVisualizerProps): React.JSX.Element;
//# sourceMappingURL=AudioVisualizer.d.ts.map