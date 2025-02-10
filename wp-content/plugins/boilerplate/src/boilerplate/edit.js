import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import './editor.scss';

export default function Edit(props) {
	const {attributes, setAttributes} = props
	const {text,alignment} = attributes

	const onChangeAlignment = (newAlign) => {
		setAttributes({ alignment:newAlign})
	};

	const onChangeText = (newText) => {
		setAttributes({ text: newText })
	};

	return (
		<div>
			<BlockControls>
				<AlignmentToolbar value={alignment} onChange={onChangeAlignment}/>
			</BlockControls>

			<RichText {...useBlockProps({
				className:`text-box-align-${alignment}`,
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
