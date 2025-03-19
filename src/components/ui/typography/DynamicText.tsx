import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

interface DynamicTextProps {
	text: string;
	minFontSize?: number;
	maxFontSize?: number;
	className?: string;
}

export interface DynamicTextRef {
	resizeText: () => void;
}

const DynamicText = React.forwardRef<DynamicTextRef, DynamicTextProps>(({ text, minFontSize = 12, maxFontSize = 48, className = '' }, ref) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState<number>(maxFontSize);

	// Initial resize
	useEffect(() => {
		resizeText();
	}, []);

	// Resize when text or size constraints change
	useEffect(() => {
		resizeText();
	}, [text, minFontSize, maxFontSize]);

	useImperativeHandle(ref, () => ({
		resizeText
	}));

	const resizeText = () => {
		if (!containerRef.current || !textRef.current) return;

		const containerWidth = containerRef.current.offsetWidth - 32;
		// Start with maximum font size
		let currentFontSize = maxFontSize;
		textRef.current.style.fontSize = `${currentFontSize}px`;

		// Reduce font size until text fits container
		while (textRef.current.scrollWidth > containerWidth && currentFontSize > minFontSize) {
			currentFontSize--;
			textRef.current.style.fontSize = `${currentFontSize}px`;
		}

		setFontSize(currentFontSize);
	};

	return (
		<div ref={containerRef} className={`w-full overflow-hidden dynamic-text-container ${className}`}>
			<div ref={textRef} className={`dynamic-text font-size-${fontSize} whitespace-nowrap inline-block`}>
				{text}
			</div>
		</div>
	);
});

export default DynamicText;
