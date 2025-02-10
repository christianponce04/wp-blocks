import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	withColors
} from '@wordpress/block-editor';
import './editor.scss';
import {     __ } from	'@wordpress/i18n'


function Edit(props) {
	const {attributes, setAttributes, backgroundColor,textColor,setBackgroundColor,setTextColor} = props
	const {text,alignment} = attributes


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
							value: backgroundColor.color,
							onChange:setBackgroundColor,
							label:__("Background Color","text-box")
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label:__("Text Color","text-box")
						},
					]}
				>
					<ContrastChecker
						textColor ={ textColor.color}
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
					backgroundColor: backgroundColor.color,
					color: textColor.color,
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
export default  withColors({
	backgroundColor : 'backgroundColor',
	textColor:'color',
})(Edit);
