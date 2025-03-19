import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useEffect, useMemo, useState } from 'react';
import WidgetGridLayer from '@/features/widget/components/WidgetGridLayer';
import MetricContainer from '@/features/widget/components/MetricContainer';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { setWidgetLayout } from '@/features/widget/widgetSlice';
import { WidgetLayoutBreakpoint } from '@/features/widget/types';
import { IoMdArrowUp } from 'react-icons/io';

interface WidgetGridLayoutProps {
	gap: number;
	cols: { [key: string]: number };
	breakpoints: { [key: string]: number };
}

const WidgetGridLayout = (props: WidgetGridLayoutProps) => {
	const { gap, cols, breakpoints } = props;
	const dispatch = useAppDispatch();
	const { layouts, widgets } = useAppSelector((state) => state.widget);
	const [isLayerVisible, setIsLayerVisible] = useState(false);
	const [isEditingLayOut, setIsEditingLayOut] = useState(false);
	const [width, setWidth] = useState<number>(0);
	const [breakpoint, setBreakpoint] = useState<WidgetLayoutBreakpoint>('lg');
	const [breakpointCols, setBreakpointCols] = useState<number>(12);
	const [gridSize, setGridSize] = useState<number>(0);

	const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

	const onWidthChange = (containerWidth: number, gap: [number, number], cols: number) => {
		setWidth(containerWidth);
		setGridSize(Math.round((containerWidth - gap[0] * (cols - 1)) / cols));
		setBreakpointCols(cols);
	};

	const onLayoutChange = (_: any, updatedLayouts: any) => {
		dispatch(setWidgetLayout(updatedLayouts));
	};

	const onBreakpointChange = (breakpoint: WidgetLayoutBreakpoint, _: number) => {
		setBreakpoint(breakpoint);
	};

	const handleEditingEvent = () => {
		setIsLayerVisible(true);
		setIsEditingLayOut(true);
	};

	const handleStopEvent = () => {
		setIsLayerVisible(false);
		setIsEditingLayOut(false);
	};

	return (
		<div className={'relative flex-1 overflow-x-hidden'}>
			<WidgetGridLayer isLayerVisible={isLayerVisible} gridSize={gridSize} containerWidth={width} cols={breakpointCols} padding={gap} />

			{layouts && (
				<ResponsiveGridLayout
					cols={cols}
					layouts={layouts}
					autoSize={false}
					margin={[gap, gap]}
					containerPadding={[0, 0]}
					rowHeight={gridSize}
					breakpoints={breakpoints}
					compactType={null}
					onWidthChange={onWidthChange}
					onLayoutChange={onLayoutChange}
					onBreakpointChange={onBreakpointChange}
					onDragStart={handleEditingEvent}
					onDragStop={handleStopEvent}
					onResizeStart={handleEditingEvent}
					onResizeStop={handleStopEvent}
					resizeHandle={
						<div className="react-resizable-handle absolute bottom-0 right-0 z-2 rotate-140 cursor-nw-resize invisible group-hover:visible">
							<IoMdArrowUp />
						</div>
					}
				>
					{widgets?.map((widget) => (
						<MetricContainer
							key={widget.id}
							widget={widget}
							isEditingLayOut={isEditingLayOut}
							layoutInfo={layouts?.[breakpoint].find((layout) => layout.i === widget.id)}
						/>
					))}
				</ResponsiveGridLayout>
			)}
		</div>
	);
};

export default WidgetGridLayout;
