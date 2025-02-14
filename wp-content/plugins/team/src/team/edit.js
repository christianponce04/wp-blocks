import { __ } from '@wordpress/i18n';
import { useBlockProps,InnerBlocks,InspectorControls } from '@wordpress/block-editor';
import {PanelBody,RangeControl} from	'@wordpress/components'
import './editor.scss';
import {useHasSelectedInnerBlock} from "@10up/block-components";


export default function Edit({attributes,setAttributes,isSelected}) {
	const {columns} = attributes;
	const onChangeColumns =(newColumns) => {
		setAttributes({ columns:newColumns })
	}
	const hasSelectedInnerBlock = useHasSelectedInnerBlock();
	const isActive = isSelected || hasSelectedInnerBlock;

	console.log(hasSelectedInnerBlock);

	return (
		<div {...useBlockProps({
			className: `has-${columns}-columns`
		})}>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__('Columns','team-members')}
						min={1}
						max={6}
						onChange={onChangeColumns}
						value={columns}
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks allowedBlocks={['block-course/team-member']}
									 orientation ="horizontal"
										template={[
											['block-course/team-member'],
											['block-course/team-member'],
											['block-course/team-member'],
										]}
									 renderAppender={isActive && InnerBlocks.ButtonBlockAppender}
			/>
		</div>
	);
}
