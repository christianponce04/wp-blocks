
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import {__ } from	'@wordpress/i18n';

registerBlockType( 'block/text-box', {
	icon: {
			src:'text-page',
			background:'#000',
			foreground:'#fff',
	},
	edit: Edit,
 	save:save,
	variations:[{
		name:'block/text-box',
		title:__('Gradient Text Box'),
		icon: 'wordpress',

	}]
} );
