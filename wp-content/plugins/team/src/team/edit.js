import { __ } from '@wordpress/i18n';
import { useBlockProps,InnerBlocks,InspectorControls } from '@wordpress/block-editor';
import {PanelBody,RangeControl} from	'@wordpress/components'
import './editor.scss';

export default function Edit({attributes,setAttributes}) {
	const {columns} = attributes;
	const onChangeColumns =(newColumns) => {
		setAttributes({ columns:newColumns })
	}

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
									template={[
										['block-course/team-member'],
										['block-course/team-member'],
										['block-course/team-member'],
									]}
			/>
		</div>
	);
}
