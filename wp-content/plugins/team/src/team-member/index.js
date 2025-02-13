import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from "./edit"
import Save from "./save"

registerBlockType('block-course/team-member',{
		title:__("Team Member","team-member"),
		description: __("A team member item","team-member"),
		icon:"admin-users",
		parent:["block-course/team-members"],
		support: {
			reusable: false,
			html:false,
		},
		attributes:{
			name: {
				type:"string",
				source:"html",
				selector:"h4"
			},
			bio: {
				type:"string",
				source:"html",
				selector:"p"
			},
			id:{
				type: 'number'
			},
			alt:{
				type: 'string',
				source: 'attribute',
				selector:'img',
				attribute:'alt',
				default:''
			},
			url:{
				type:'string',
				source:'attribute',
				selector:'img',
				attribute:'src'
			},
			socialLinks:{
				type:'array',
				default:[],
				source:'query',
				selector:'.wp-block-block-course-team-members-social-links ul li',
				query:{
					icon:{
						source: 'attribute',
						attribute: 'data-icon',
					},
					link:{
						source:'attribute',
						selector:'a',
						attribute:'href',
					},
				}
			},
		},
		edit: Edit,
		save: Save,
})
