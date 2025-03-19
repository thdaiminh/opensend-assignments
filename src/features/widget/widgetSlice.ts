import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Widget, WidgetLayout, WidgetState } from '@/features/widget/types';
import { DEFAULT_WIDGET_LAYOUT, DEFAULT_WIDGETS } from '@/features/widget/constants';
import { correctLayoutDimensions } from '@/features/widget/utils';
import { Layout } from 'react-grid-layout';

const initialState: WidgetState = {
	layouts: null,
	widgets: null
};

const widgetSlice = createSlice({
	name: 'widget',
	initialState,
	reducers: {
		addWidgetToLayout: (state, action: PayloadAction<{ widget: Widget; layout: Layout }>) => {
			const { widget, layout } = action.payload;
			const clonedCurrentLayout = JSON.parse(JSON.stringify(state.layouts));
			Object.keys(clonedCurrentLayout).forEach((breakpoint) => {
				clonedCurrentLayout[breakpoint] = [...clonedCurrentLayout[breakpoint], layout];
			});
			state.layouts = clonedCurrentLayout;
			state.widgets?.push(widget);
			localStorage.setItem('layouts', JSON.stringify(clonedCurrentLayout));
			localStorage.setItem('widgets', JSON.stringify(state.widgets));
		},
		getWidgetLayout: (state) => {
			const initLayout = JSON.parse(localStorage.getItem('layouts') as string) || DEFAULT_WIDGET_LAYOUT;
			state.layouts = correctLayoutDimensions(initLayout);
		},
		setWidgetLayout: (state, action: PayloadAction<WidgetLayout>) => {
			const { payload } = action;
			const updatedLayout = { ...state.layouts, ...payload } as WidgetLayout;
			const correctedLayout = correctLayoutDimensions(updatedLayout);
			state.layouts = correctedLayout;
			localStorage.setItem('layouts', JSON.stringify(correctedLayout));
		},
		removeWidgetLayout: (state, action: PayloadAction<string>) => {
			const widgetId = action.payload;

			if (state.layouts) {
				const clonedLayouts = JSON.parse(JSON.stringify(state.layouts));

				Object.keys(clonedLayouts).forEach((breakpoint) => {
					clonedLayouts[breakpoint] = clonedLayouts[breakpoint].filter((item: Layout) => item.i !== widgetId);
				});
				state.layouts = clonedLayouts;
				localStorage.setItem('layouts', JSON.stringify(clonedLayouts));
			}
		},

		getWidgets: (state) => {
			state.widgets = JSON.parse(localStorage.getItem('widgets') as string) || DEFAULT_WIDGETS;
			if (!localStorage.getItem('widgets')) {
				localStorage.setItem('widgets', JSON.stringify(DEFAULT_WIDGETS));
			}
		},
		updateWidget: (state, action: PayloadAction<Widget>) => {
			const updatedWidget = action.payload;

			if (state.widgets) {
				state.widgets = state.widgets.map((widget) => (widget.id === updatedWidget.id ? updatedWidget : widget));

				localStorage.setItem('widgets', JSON.stringify(state.widgets));
			}
		},
		removeWidget: (state, action: PayloadAction<string>) => {
			const widgetId = action.payload;

			if (state.widgets) {
				state.widgets = state.widgets.filter((widget) => widget.id !== widgetId);
				localStorage.setItem('widgets', JSON.stringify(state.widgets));
			}
		}
	}
});

export const { addWidgetToLayout, getWidgetLayout, setWidgetLayout, removeWidgetLayout, getWidgets, updateWidget, removeWidget } =
	widgetSlice.actions;
export default widgetSlice.reducer;
