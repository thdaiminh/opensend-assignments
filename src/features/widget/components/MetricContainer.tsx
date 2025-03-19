import DynamicText, { DynamicTextRef } from '@/components/ui/typography/DynamicText';
import React, { useContext, useEffect, useRef } from 'react';
import { IoPencil, IoTrash } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { removeWidgetLayout, removeWidget } from '@/features/widget/widgetSlice';
import { ModalContext } from '@/app/providers/ModalContext';
import { UserType } from '@/features/auth';

const MetricContainer = React.forwardRef<HTMLDivElement, any>((props, ref) => {
	const { widget, className, style, children, onMouseDown, onMouseUp, onTouchEnd, isEditingLayOut, layoutInfo } = props;
	const dispatch = useAppDispatch();
	const { openMetricModal } = useContext(ModalContext);
	const dynamicTextRef = useRef<DynamicTextRef>(null);
	const dynamicTextRef2 = useRef<DynamicTextRef>(null);
	const { user } = useAppSelector((state) => state.auth);
	const isAdmin = user?.role === UserType.Admin;

	const editMetric = () => {
		openMetricModal(widget);
	};

	const removeMetric = () => {
		dispatch(removeWidgetLayout(widget.id));
		dispatch(removeWidget(widget.id));
	};

	useEffect(() => {
		dynamicTextRef?.current?.resizeText();
		dynamicTextRef2?.current?.resizeText();
	}, [isEditingLayOut]);

	return (
		<div
			className={`${className} group w-full h-full rounded-sm bg-base-300 p-4 hover:bg-base-200 relative`}
			ref={ref}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onTouchEnd={onTouchEnd}
			style={style}
		>
			{isAdmin && (
				<div className={'absolute top-1 right-1 flex gap-4 p-2 rounded-full bg-base-100 invisible group-hover:visible'}>
					<IoPencil className={'w-4 h-4 cursor-pointer'} onClick={editMetric} />
					<IoTrash className={'w-4 h-4 cursor-pointer'} onClick={removeMetric} />
				</div>
			)}

			<div className={'flex flex-col w-full h-full justify-center items-center gap-6'}>
				<DynamicText ref={dynamicTextRef} text={widget.title} minFontSize={10} maxFontSize={36} className={'text-center select-none'} />
				<DynamicText
					ref={dynamicTextRef2}
					text={widget.value}
					minFontSize={24}
					maxFontSize={54}
					className={'text-center font-semibold select-none'}
				/>
			</div>
			{children}
		</div>
	);
});

export default MetricContainer;
