import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker
} from '@wordpress/block-editor';
import './editor.scss';
import { __ } from	'@wordpress/i18n'


export default function Edit({attributes, setAttributes}) {
	const {text,alignment,backgroundColor,textColor} = attributes

	const onChangeBackgroundColor = (newBackground) => {
		setAttributes({ backgroundColor:newBackground})
	};

	const onChangeTextColor = (newTextColor) => {
		setAttributes({ textColor:newTextColor})
	};

	const onChangeAlignment = (newAlign) => {
		setAttributes({ alignment:newAlign})
	};

	const onChangeText = (newText) => {
		setAttributes({ text: newText })
	};

	return (
		<div>

			<InspectorControls>
				<PanelColorSettings
					title={__('Color Settings', 'text-box')}
					icon="admin-appearance"
					initialOpen
					disableCustomColors = { false}
					colorSettings ={ [
						{
							value: backgroundColor,
							onChange:onChangeBackgroundColor,
							label:__("Background Color","text-box")
						},
						{
							value: textColor,
							onChange: onChangeTextColor,
							label:__("Text Color","text-box")
						},
					]}
				>
					<ContrastChecker
						textColor ={ textColor}
						backgroundColor ={ backgroundColor}
					/>
				</PanelColorSettings>

			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar value={alignment} onChange={onChangeAlignment}/>
			</BlockControls>

			<RichText {...useBlockProps({
				className:`text-box-align-${alignment}`,
				style:{
					backgroundColor,
					color: textColor
				}
			})}
								onChange={onChangeText}
								placeholder="This is a placeholder for edit"
								value={text}
								tagName="h4"
								allowedFormats={[]}
			/>
		</div>
	);
}
