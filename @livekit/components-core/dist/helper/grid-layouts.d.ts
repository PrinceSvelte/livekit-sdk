export type GridLayout = {
    name: string;
    columns: number;
    rows: number;
    /** Minimum number of tiles needed to use this layout. */
    minTiles: number;
    /** Maximum tiles that fit into this layout. */
    maxTiles: number;
    /** Minimum width required to use this layout. */
    minWidth: number;
    /** Minimum height required to use this layout. */
    minHeight: number;
};
export declare const GRID_LAYOUTS: GridLayout[];
export declare function selectGridLayout(layouts: GridLayout[], participantCount: number, width: number, height: number): GridLayout;
//# sourceMappingURL=grid-layouts.d.ts.map