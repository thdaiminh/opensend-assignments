import React, { useContext } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WidgetGridLayout from '@/features/widget/components/WidgetGridLayout';
import { WIDGET_GRID_BREAKPOINT_COLS, WIDGET_GRID_BREAKPOINTS, WIDGET_GRID_GAP } from '@/features/widget/constants';

import MetricModal from '@/features/widget/components/MetricModal';
import { ModalContext } from '@/app/providers/ModalContext';

const layoutConfig = {
	gap: WIDGET_GRID_GAP,
	cols: WIDGET_GRID_BREAKPOINT_COLS,
	breakpoints: WIDGET_GRID_BREAKPOINTS
};

const Dashboard = () => {
	const { isMetricModalOpen, editingWidget, closeMetricModal } = useContext(ModalContext);

	return (
		<div className={'relative flex min-w-full min-h-full'}>
			<MetricModal isOpen={isMetricModalOpen} onClose={closeMetricModal} editWidget={editingWidget} />

			<WidgetGridLayout {...layoutConfig} />
		</div>
	);
};

export default Dashboard;
