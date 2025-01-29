import {useBlockProps, RichText, BlockControls, AlignmentToolbar,InspectorControls} from '@wordpress/block-editor';
import './editor.scss';
import { __ } from	'@wordpress/i18n'
import {
	AnglePickerControl,
	PanelBody,
	TextareaControl,
	TextControl,
	ToggleControl,
	ColorPicker, ColorPalette
} from '@wordpress/components'


export default function Edit({attributes, setAttributes}) {
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
					<PanelBody
						title={__('Color Settings','text-box')}
						icon="admin-appearance"
						initialOpen
					>
					<TextControl
						label="Input label"
						value={text}
						onChange={onChangeText}
						help="help text"
					/>
						<TextareaControl
							label="Input Area Control"
							value={text}
							onChange={onChangeText}
							help="help text"
						/>
						<ToggleControl
							label="Toggle label"
							checked={true}
							onChange={(v) => console.log(v)}
						/>
						<AnglePickerControl/>
						<ColorPicker
							color={'FO3'}
							onChangeComplete={ (v) => console.log(v)}
						/>
						<ColorPalette
						colors ={[
							{
								name:'red',
								color:'#F00'
							},
							{
								name:'black',
								color:'#000'
							}
						]}
						/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar value={alignment} onChange={onChangeAlignment}/>
			</BlockControls>

			<RichText {...useBlockProps({
				className:`text-box-align${alignment}`,
			})}
								onChange={onChangeText}
								placeholder="This is a placeholder for edit"
								value={text}
								tagName="h4"
								allowedFormats={[]}
								style={{textAlign: alignment}}
			/>
		</div>
	);
}
