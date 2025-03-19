import { Layout } from 'react-grid-layout';

export type WidgetLayoutBreakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export type WidgetLayout = Record<WidgetLayoutBreakpoint, Layout[]>;

export interface WidgetState {
	layouts: WidgetLayout | null;
	widgets: Widget[] | null;
}

export enum WidgetType {
	IDENTITIES_PROVIDED = 'IDENTITIES_PROVIDED',
	ITERABLE_METRIC = 'ITERABLE_METRIC',
	YOTPO_METRIC = 'YOTPO_METRIC'
}

export type Widget = {
	id: string;
	title: string;
	description: string;
	type: WidgetType;
	value: number;
};
