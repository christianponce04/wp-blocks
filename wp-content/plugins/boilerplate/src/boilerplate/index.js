
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType( 'block/text-box', {
	icon: {
			src:'text-page',
			background:'#000',
			foreground:'#fff',
	},
	edit: Edit,
 	save:save,
} );
