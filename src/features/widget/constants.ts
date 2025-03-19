import { WidgetType } from '@/features/widget/types';

export const WIDGET_GRID_BREAKPOINTS = { lg: 1200, md: 1025, sm: 768, xs: 480, xxs: 0 };

export const WIDGET_GRID_BREAKPOINT_COLS = {
	lg: 12,
	md: 10,
	sm: 8,
	xs: 4,
	xxs: 4
};

export const WIDGET_GRID_GAP = 4;

export const WIDGET_GRID_MIN_SIZE = 2;

export const DEFAULT_WIDGET_LAYOUT = {
	lg: [
		{
			w: 6,
			h: 2,
			x: 0,
			y: 0,
			i: '1',
			minW: 2,
			minH: 2
		},
		{
			w: 5,
			h: 2,
			x: 0,
			y: 2,
			i: '2',
			minW: 2,
			minH: 2
		},
		{
			w: 2,
			h: 2,
			x: 0,
			y: 4,
			i: '3',
			minW: 2,
			minH: 2
		}
	],
	md: [
		{
			w: 9,
			h: 3,
			x: 0,
			y: 0,
			i: '1',
			minW: 2,
			minH: 2
		},
		{
			w: 12,
			h: 2,
			x: 0,
			y: 3,
			i: '2',
			minW: 2,
			minH: 2
		},
		{
			w: 3,
			h: 3,
			x: 9,
			y: 0,
			i: '3',
			minW: 2,
			minH: 2
		}
	],
	sm: [
		{
			w: 4,
			h: 2,
			x: 0,
			y: 0,
			i: '1',
			minW: 2,
			minH: 2
		},
		{
			w: 4,
			h: 2,
			x: 0,
			y: 2,
			i: '2',
			minW: 2,
			minH: 2
		},
		{
			w: 4,
			h: 4,
			x: 4,
			y: 0,
			i: '3',
			minW: 2,
			minH: 2
		}
	],
	xs: [
		{
			w: 4,
			h: 2,
			x: 0,
			y: 0,
			i: '1',
			minW: 2,
			minH: 2
		},
		{
			w: 4,
			h: 2,
			x: 0,
			y: 2,
			i: '2',
			minW: 2,
			minH: 2
		},
		{
			w: 4,
			h: 4,
			x: 0,
			y: 4,
			i: '3',
			minW: 2,
			minH: 2
		}
	],
	xxs: [
		{
			w: 4,
			h: 2,
			x: 0,
			y: 0,
			i: '1',
			minW: 2,
			minH: 2
		},
		{
			w: 4,
			h: 2,
			x: 0,
			y: 2,
			i: '2',
			minW: 2,
			minH: 2
		},
		{
			w: 4,
			h: 4,
			x: 0,
			y: 4,
			i: '3',
			minW: 2,
			minH: 2
		}
	]
};

export const DEFAULT_WIDGETS = [
	{
		id: '1',
		title: 'Identities Provided',
		description: 'New identities provided during the selected time period.',
		type: 'IDENTITIES_PROVIDED' as WidgetType,
		value: 0
	},
	{
		id: '2',
		title: 'Clicked',
		description: 'Number of provided identities who clicked on emails for the selected time period.',
		type: 'YOTPO_METRIC' as WidgetType,
		value: 0
	},
	{
		id: '3',
		title: 'Opened message',
		description: 'Number of provided identities who opened emails during the selected time period.',
		type: 'ITERABLE_METRIC' as WidgetType,
		value: 0
	}
];
