import { WidgetLayout } from '@/features/widget/types';
import { Layout } from 'react-grid-layout';

export const correctLayoutDimensions = (layout: WidgetLayout) => {
	const correctedLayout = JSON.parse(JSON.stringify(layout));

	Object.keys(correctedLayout).forEach((breakpoint) => {
		const items = correctedLayout[breakpoint];

		items.forEach((item: Layout) => {
			if (item.minW !== undefined && item.w < item.minW) {
				item.w = item.minW;
			}

			if (item.minH !== undefined && item.h < item.minH) {
				item.h = item.minH;
			}
		});
	});
	return correctedLayout;
};
