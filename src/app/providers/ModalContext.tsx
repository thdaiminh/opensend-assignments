import React, { createContext, useState } from 'react';
import { Widget } from '@/features/widget/types';

type ModalContextType = {
	isMetricModalOpen: boolean;
	editingWidget: Widget | undefined;
	openMetricModal: (widget?: Widget) => void;
	closeMetricModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
	isMetricModalOpen: false,
	editingWidget: undefined,
	openMetricModal: () => {},
	closeMetricModal: () => {}
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);
	const [editingWidget, setEditingWidget] = useState<Widget | undefined>(undefined);

	const openMetricModal = (widget?: Widget) => {
		setEditingWidget(widget);
		setIsMetricModalOpen(true);
	};

	const closeMetricModal = () => {
		setIsMetricModalOpen(false);
		setEditingWidget(undefined);
	};

	return (
		<ModalContext.Provider
			value={{
				isMetricModalOpen,
				editingWidget,
				openMetricModal,
				closeMetricModal
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
