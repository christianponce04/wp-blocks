import {useBlockProps, RichText, BlockControls} from '@wordpress/block-editor';
import './editor.scss';
import {ToolbarGroup, ToolbarButton, ToolbarDropdownMenu} from '@wordpress/components'
import  { __ } from	'@wordpress/i18n'

export default function Edit({attributes, setAttributes}) {
	const {text} = attributes
	return (
		<div>

			<BlockControls group="inline">
				<p>Inline Controls</p>
			</BlockControls>

			<BlockControls group="block">
				<p>Block Controls</p>
			</BlockControls>

			<BlockControls
				group="other"
				controls={[
					{
						title: "button 1",
						icon: "admin-generic",
						isActive: true,
						onClick: () => console.log("Button 1 CLicked"),
					},
					{
						title: "button 2",
						icon: "admin-collapse",
						onClick: () => console.log("Button 1 CLicked"),
					}
				]}>
				{ text &&
				<ToolbarGroup>
					<ToolbarButton
						title="Align Left"
						icon="editor-alignleft"
						onClick={() => console.log('Align Left')}
					/>
					<ToolbarButton
						title="Align Center"
						icon="editor-aligncenter"
						onClick={() => console.log('Align Center')}
					/>
					<ToolbarButton
						title="Align Right"
						icon="editor-alignright"
						onClick={() => console.log('Align Right')}
					/>
					<ToolbarDropdownMenu
						icon="arrow-down-alt2"
						label={__('More Alignments', 'text-box') }
						controls ={[
							{
								title: __('Wide','text-box'),
								icon: 'align-wide',
							},
							{
								title: __('Full','text-box'),
								icon: 'align-full-width',
							},
						]}
					/>
				</ToolbarGroup>
				}
				<ToolbarGroup>
					<p>Hello world</p>
				</ToolbarGroup>

			</BlockControls>

			<RichText {...useBlockProps()}
								onChange={(value) => setAttributes({text: value})}
								placeholder="This is a placeholder for edit"
								value={text}
								tagName="h4"
								allowedFormats={[]}
			/>
		</div>
	);
}
