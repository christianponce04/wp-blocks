import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import './editor.scss';
import  classname from "classnames";
import {__ } from	'@wordpress/i18n';
import {PanelBody,RangeControl} from "@wordpress/components";


export default function Edit(props) {
	const {attributes, setAttributes} = props
	const {text,alignment,shadow,shadowOpacity} = attributes

	const classes = classname(`text-box-align-${alignment}`,{
		"has-shadow": shadow,
		[`shadow-opacity-${shadowOpacity}`]: shadow && shadowOpacity,
	});

	const onChangeShadow = (newShadow) => {
		setAttributes({
			shadowOpacity:newShadow
		})
	}

	const onChangeAlignment = (newAlign) => {
		setAttributes({ alignment:newAlign})
	};

	const onChangeText = (newText) => {
		setAttributes({ text: newText })
	};

	const toggleShadow = () =>{
		setAttributes({
			shadow: !shadow
		})
	}

	return (
		<div>

			<InspectorControls>
				{ shadow &&
					<PanelBody title ={ __("Shadow Setting","text-box")}>
						<RangeControl
							label={__("Shadow Setting","text-box")}
							value={shadowOpacity}
							min={10}
							max={40}
							step={10}
							onChange={onChangeShadow}
						/>
					</PanelBody>
				}
			</InspectorControls>

			<BlockControls controls={[{
				icon:"admin-page",
				title:__("shadow","text-box"),
				onClick:toggleShadow,
				isActive:shadow,
			}]}>
				<AlignmentToolbar value={alignment} onChange={onChangeAlignment}/>
			</BlockControls>

			<RichText {...useBlockProps({
				className: classes,
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
