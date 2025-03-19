import React, { useMemo } from 'react';

interface WidgetGridLayerProps {
	containerWidth: number;
	cols: number;
	padding: number;
	gridSize: number;
	isLayerVisible: boolean;
}

const PATTERN_NAME = 'grid_layout_pattern';

const WidgetGridLayer = (props: WidgetGridLayerProps) => {
	const { containerWidth, cols, padding, gridSize, isLayerVisible } = props;

	const renderPattern = useMemo(() => {
		const paddingWidth = padding * (cols - 1);
		const columnWidth = (containerWidth - paddingWidth) / cols;

		return (
			<pattern id={PATTERN_NAME} patternUnits="userSpaceOnUse" width="100%" height={gridSize + padding}>
				{[...Array(cols)].map((_, index) => {
					return (
						<rect
							key={index}
							x={(columnWidth + padding) * index}
							y={0}
							width={gridSize}
							height={gridSize}
							className={'fill-base-300/50 dark:fill-base-100/80'}
							rx="4"
						/>
					);
				})}
			</pattern>
		);
	}, [containerWidth, cols, padding, gridSize]);

	return (
		<div className={`absolute max-w-full w-full h-full top-0 left-0 ${isLayerVisible ? 'visible' : 'invisible'}`}>
			<svg width="100%" height="100%">
				<defs>{renderPattern}</defs>
				<rect x="0" y="0" width="100%" height="100%" fill={`url(#${PATTERN_NAME})`} />
			</svg>
		</div>
	);
};

export default WidgetGridLayer;
