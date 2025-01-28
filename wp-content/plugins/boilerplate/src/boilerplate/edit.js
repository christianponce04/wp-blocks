
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({attributes,setAttributes}) {
	const {text} = attributes
	return <RichText {...useBlockProps() }
		onChange={ (value) => setAttributes({text: value})}
		placeholder={ __("This is a placeholder for edit")}
    value = {text}
		tagName="h4"
    allowedFormats={["core/bold"]}
	/>;
}
