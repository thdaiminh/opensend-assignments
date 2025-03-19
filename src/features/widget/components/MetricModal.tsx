import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoAddOutline, IoAccessibility, IoEye } from 'react-icons/io5';
import { PiCursorClick, PiFolderUserFill } from 'react-icons/pi';
import { RiMailAiLine, RiMailOpenLine } from 'react-icons/ri';
import { Widget, WidgetType } from '@/features/widget/types';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { addWidgetToLayout, updateWidget } from '@/features/widget/widgetSlice';
import { ModalContext } from '@/app/providers/ModalContext';
import { WIDGET_GRID_MIN_SIZE } from '@/features/widget/constants';

const MetricType = ({ isSelected, type, onClick }: { isSelected: boolean; type: WidgetType; onClick?: () => void }) => {
	const getTypeData = () => {
		switch (type) {
			case WidgetType.IDENTITIES_PROVIDED:
				return {
					title: 'Identities Provided',
					icon: <IoAccessibility className={'w-full h-full'} />,
					value: type
				};
			case WidgetType.ITERABLE_METRIC:
				return {
					title: 'Iterable Metric',
					icon: <IoEye className={'w-full h-full'} />,
					value: type
				};
			case WidgetType.YOTPO_METRIC:
			default:
				return {
					title: 'Yotpo Metric',
					icon: <PiCursorClick className={'w-full h-full'} />,
					value: type
				};
		}
	};

	const typeData = getTypeData();

	return (
		<div
			className={`flex flex-1 justify-center items-center bg-white dark:bg-warm-black gap-4 ${isSelected ? 'selected border-primary border-2' : ''} hover:border-primary border-gray-4 border-1 rounded-xl cursor-pointer`}
			onClick={onClick}
		>
			<div className={'card flex justify-center items-center p-8 gap-8'}>
				<div className={'bg-[#f0f0f0] dark:bg-warm-black border-2 border-base-content rounded-md w-32 h-32 flex justify-center items-center p-4'}>
					<div className={'flex justify-center items-center w-16 h-16 rounded-full '}>{typeData?.icon}</div>
				</div>

				<div className={`text-center ${isSelected ? 'font-semibold ' : ''} text-lg`}>{typeData?.title}</div>
			</div>
		</div>
	);
};

const MetricForm = ({ type, onDataChange }: { type?: WidgetType; onDataChange: (data: any) => void }) => {
	const { editingWidget } = useContext(ModalContext);
	const isEditMode = !!editingWidget;
	let defaultData;
	const getDefaultData = () => {
		switch (type) {
			case WidgetType.IDENTITIES_PROVIDED:
				return {
					widgetTypeDescription: 'Identities Provided - TEXT',
					title: 'Identities Provided',
					description: 'New identities provided during the selected time period.',
					icon: <PiFolderUserFill className={'w-full h-full'} />,
					value: 0
				};
			case WidgetType.ITERABLE_METRIC:
				return {
					widgetTypeDescription: 'Iterable Metric - TEXT',
					title: 'Clicked',
					description: 'Number of provided identities who clicked on emails for the selected time period.',
					icon: <RiMailAiLine className={'w-full h-full'} />,
					value: 0
				};
			case WidgetType.YOTPO_METRIC:
			default:
				return {
					widgetTypeDescription: 'Yotpo Metric - TEXT',
					title: 'Opened message',
					description: 'Number of provided identities who opened emails during the selected time period.',
					icon: <RiMailOpenLine className={'w-full h-full'} />,
					value: 0
				};
		}
	};

	defaultData = getDefaultData();

	const {
		register,
		setValue,
		watch,
		formState: { errors }
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			title: isEditMode ? editingWidget?.title : defaultData.title,
			description: isEditMode ? editingWidget?.description : defaultData.description
		}
	});

	useEffect(() => {
		defaultData = getDefaultData();
		if (!isEditMode) {
			setValue('title', defaultData.title);
			setValue('description', defaultData.description);
		}
	}, [type]);

	useEffect(() => {
		if (editingWidget) {
			setValue('title', editingWidget.title);
			setValue('description', editingWidget.description);
		}
	}, [editingWidget]);

	useEffect(() => {
		const subscription = watch((value) => {
			onDataChange(value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<div className={`flex flex-1 flex-col lg:flex-row justify-start items-start gap-8 hover:border-primary`}>
			<div className={'border-gray-4 border-1 bg-transparent flex flex-col flex-3/5 justify-start items-start rounded-md'}>
				<div className={'w-full bg-white dark:bg-warm-black flex flex-col gap-3 border-b-gray-4 border-b-1 rounded-md p-6'}>
					<div className={'flex justify-between items-center uppercase font-bold text-base-content/80 text-sm'}>{defaultData.title}</div>
					<div className={'flex items-baseline gap-2'}>
						<div className={'w-7 h-7'}>{defaultData.icon}</div>

						<span className={'font-semibold text-2xl'}>{defaultData.value}</span>
					</div>
				</div>
				<div className={'p-6 py-3 text-base-content/75 text-sm'}>{defaultData.description}</div>
			</div>
			<div className={'flex h-full flex-2/5 flex-col gap-8 justify-end items-end'}>
				<div className={'w-full bg-white dark:bg-warm-black flex flex-col gap-0.5 p-6 rounded-md border-gray-4 border-1'}>
					<div className={'font-semibold text-base-content/70 text-sm'}>Widget type</div>
					<div className={`text-md`}>{defaultData?.widgetTypeDescription}</div>
				</div>
				<div className={'w-full h-full bg-white dark:bg-warm-black flex flex-col gap-3 p-6 rounded-md border-gray-4 border-1'}>
					<div className={'flex flex-col gap-0.5'}>
						<div className={'font-semibold text-base-content/70 text-sm'}>
							Title<span className={'ml-0.5 text-error-3'}>*</span>
						</div>
						<div className={`text-md`}>
							<label
								className={`w-full input input-neutral bg-white focus-within:shadow-none focus-within:outline-none ${errors.title ? 'input-error' : ''}`}
							>
								<input
									{...register('title', {
										required: {
											value: true,
											message: 'Title is required'
										}
									})}
								/>
							</label>

							{errors.title && <span className={'text-error-3 text-sm'}>Title is required</span>}
						</div>
					</div>
					<div className={'flex flex-col gap-0.5 flex-1'}>
						<div className={'font-semibold text-base-content/70 text-sm'}>
							Description <span className={'ml-0.5 text-error-3'}>*</span>
						</div>
						<div className={`h-3/4`}>
							<textarea
								className={`textarea textarea-neutral focus-within:shadow-none focus-within:outline-none w-full ${errors.description ? 'input-error' : ''}`}
								{...register('description', {
									required: {
										value: true,
										message: 'Description is required'
									}
								})}
							></textarea>
							{errors.description && <span className={'text-error-3 text-sm'}>Description is required</span>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const ChooseTypeStep = ({
	handleClose,
	handleNext,
	className
}: {
	handleClose: () => void;
	handleNext: (data: WidgetType) => void;
	className?: string;
}) => {
	const handleMetricSelection = (type: WidgetType) => {
		setSelectedType(type);
	};
	const { editingWidget } = useContext(ModalContext);
	const [selectedType, setSelectedType] = useState<WidgetType | undefined>(editingWidget ? editingWidget.type : undefined);
	const handleSubmit = () => {
		if (!selectedType) return;
		handleNext(selectedType);
	};
	const isEditMode = !!editingWidget;

	useEffect(() => {
		if (editingWidget) {
			setSelectedType(editingWidget.type);
		} else {
			setSelectedType(undefined);
		}
	}, [editingWidget]);

	return (
		<div className={`gap-6 flex flex-col flex-1 duration-300 ease-in-out ${className}`}>
			<div className={'modal-header mb-8 text-center flex flex-col gap-6'}>
				<h3 className="font-bold font-darkerGrotesque text-5xl">{isEditMode ? 'Edit metric' : 'Add a metric'}</h3>
				<div className={'text-base-content/75'}>Select a widget type{isEditMode ? '.' : ' to add to the overview page.'} </div>
			</div>
			<div className="modal-content flex flex-1 flex-col">
				<div className="flex flex-1 flex-col gap-6">
					<div className={'font-semibold text-2xl'}>Overview</div>
					<div className={'flex flex-1 justify-between gap-6 flex-col lg:flex-row'}>
						<MetricType
							isSelected={selectedType === WidgetType.IDENTITIES_PROVIDED}
							type={WidgetType.IDENTITIES_PROVIDED}
							onClick={() => handleMetricSelection(WidgetType.IDENTITIES_PROVIDED)}
						/>
						<MetricType
							isSelected={selectedType === WidgetType.ITERABLE_METRIC}
							type={WidgetType.ITERABLE_METRIC}
							onClick={() => handleMetricSelection(WidgetType.ITERABLE_METRIC)}
						/>
						<MetricType
							isSelected={selectedType === WidgetType.YOTPO_METRIC}
							type={WidgetType.YOTPO_METRIC}
							onClick={() => handleMetricSelection(WidgetType.YOTPO_METRIC)}
						/>
					</div>
				</div>
			</div>
			<div className="mt-6 pb-6">
				<div className={'flex gap-8'}>
					<div
						className={'btn btn-neutral btn-outline font-darkerGrotesque text-lg flex-1 rounded-sm font-semibold shadow-none'}
						onClick={handleClose}
					>
						Cancel
					</div>
					<div
						className={`btn btn-primary font-darkerGrotesque text-lg flex-1 rounded-sm font-semibold shadow-none ${!selectedType ? 'btn-disabled' : ''} `}
						onClick={handleSubmit}
					>
						Next
					</div>
				</div>
			</div>
		</div>
	);
};

const FormStep = ({
	handleBack,
	className,
	selectedType,
	handleClose
}: {
	handleBack: () => void;
	className?: string;
	selectedType?: WidgetType;
	handleClose: () => void;
}) => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState<Pick<Widget, 'title' | 'description'> | null>(null);
	const { widgets } = useAppSelector((state) => state.widget);
	const { editingWidget } = useContext(ModalContext);

	const isEditMode = !!editingWidget;

	const handleSubmit = () => {
		if (!formData) return;

		const widgetData = {
			...formData,
			id: editingWidget ? editingWidget.id : widgets ? (widgets.length + 1).toString() : '4',
			type: selectedType,
			value: 0
		} as Widget;
		if (isEditMode) {
			dispatch(updateWidget(widgetData));
		} else {
			const layoutData = {
				w: 2,
				h: 2,
				x: 0,
				y: 0,
				i: widgets ? (widgets.length + 1).toString() : '4',
				minW: WIDGET_GRID_MIN_SIZE,
				minH: WIDGET_GRID_MIN_SIZE
			};
			dispatch(addWidgetToLayout({ widget: widgetData, layout: layoutData }));
		}

		handleClose();
	};

	const shouldDisableSubmitButton = () => {
		return !formData?.title || !formData?.description;
	};

	const handleFormDataChange = (data: Widget | null) => {
		setFormData(data);
	};

	return (
		<div className={`gap-6 flex flex-col flex-1 duration-400 ease-in-out ${className}`}>
			<div className={'modal-header mb-8 text-center flex flex-col gap-6'}>
				<h3 className="font-bold font-darkerGrotesque text-5xl">Configure widget</h3>
				<div className={'text-base-content/75'}>Add a title and select data to display on the overview page.</div>
			</div>
			<div className="modal-content flex flex-1 flex-col">
				<div className="flex flex-1 flex-col gap-6">
					<div className={'flex flex-1 justify-between gap-6'}>
						<MetricForm type={selectedType} onDataChange={handleFormDataChange} />
					</div>
				</div>
			</div>
			<div className="mt-6 pb-6">
				<div className={'flex gap-8'}>
					<div
						className={'btn btn-neutral btn-outline font-darkerGrotesque text-lg flex-1 rounded-sm font-semibold shadow-none'}
						onClick={handleBack}
					>
						Back
					</div>
					<div
						className={`btn btn-primary font-darkerGrotesque text-lg flex-1 rounded-sm font-semibold shadow-none ${shouldDisableSubmitButton() ? 'btn-disabled' : ''} `}
						onClick={handleSubmit}
					>
						{isEditMode ? 'Update' : 'Add'}
					</div>
				</div>
			</div>
		</div>
	);
};

type MetricModalProps = {
	isOpen: boolean;
	onClose: () => void;
	editWidget?: Widget;
};

const MetricModal = (props: MetricModalProps) => {
	const { isOpen, onClose, editWidget } = props;
	const modalRef = useRef<HTMLDialogElement>(null);
	const [visible, setVisible] = useState(false);
	const [isTypeStepFinished, setIsTypeStepFinished] = useState(false);
	const [selectedType, setSelectedType] = useState<WidgetType | undefined>(editWidget ? editWidget.type : undefined);

	const { setValue } = useForm({ mode: 'onSubmit' });

	const handleClose = () => {
		setVisible(false);
		modalRef?.current?.close();
		onClose();
	};

	const handleESC = (event: React.SyntheticEvent<HTMLDialogElement>) => {
		event.preventDefault();
		handleClose();
	};

	const handleSubmitMetricType = (data: WidgetType) => {
		setIsTypeStepFinished(true);
		setSelectedType(data);
		setValue('type', data);
	};

	const handleBackStep = () => {
		setIsTypeStepFinished(false);
	};

	const handleReset = () => {
		setValue('type', undefined);
		setValue('title', undefined);
		setValue('description', undefined);
		setSelectedType(undefined);
		setIsTypeStepFinished(false);
	};

	const handleCloseForm = () => {
		handleClose();
		handleReset();
	};

	useEffect(() => {
		if (!modalRef.current) {
			return;
		}
		isOpen ? modalRef.current.showModal() : handleClose();
	}, [isOpen]);

	useEffect(() => {
		if (!modalRef.current) {
			return;
		}
		visible ? modalRef.current.showModal() : handleClose();
	}, [visible]);

	return (
		<>
			<div className={'absolute bottom-4 right-4 z-10'}>
				<div
					className={'tooltip tooltip-left tooltip-primary bg-primary w-10 h-10 flex justify-center items-center rounded-full cursor-pointer p-2'}
					data-tip={'Add a metric'}
					onClick={() => setVisible(true)}
				>
					<IoAddOutline className={'fill-white stroke-white w-full h-full'} />
				</div>
			</div>
			<dialog ref={modalRef} id="metric-modal" className="modal" onCancel={(e) => handleESC(e)}>
				<form method="dialog" className="modal-box flex max-w-5/6 w-5/6 max-h-5/6 h-5/6 bg-[#f5f5f0] dark:bg-[#1d1f21] overflow-x-hidden">
					<div
						className="rounded-full bg-transparent w-6 h-6 absolute right-2 top-2 cursor-pointer hover:border-base-content hover:border-1"
						onClick={handleClose}
					>
						<IoAddOutline className={'w-full h-full rotate-45'} />
					</div>
					<ChooseTypeStep
						className={isTypeStepFinished ? '-translate-x-[150%] absolute opacity-0 invisible ' : ''}
						handleClose={handleClose}
						handleNext={handleSubmitMetricType}
					/>
					<FormStep
						className={!isTypeStepFinished ? 'translate-x-[150%] absolute opacity-0 invisible' : ''}
						selectedType={selectedType}
						handleBack={handleBackStep}
						handleClose={handleCloseForm}
					/>
				</form>
			</dialog>
		</>
	);
};

export default MetricModal;
