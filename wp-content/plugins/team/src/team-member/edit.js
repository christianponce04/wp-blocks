
import { useBlockProps, RichText,MediaPlaceholder } from '@wordpress/block-editor';
import {__} from	'@wordpress/i18n';
import { isBlobURL } from "@wordpress/blob"
import  { Spinner,withNotices } from	"@wordpress/components"

 function Edit({attributes,setAttributes,noticeUI,noticeOperations}) {
	const {name,bio,alt,url} = attributes;
	const  onChangeName = (newName) =>{
		setAttributes({ name: newName})
	}
	const  onChangeBio = (newBio) =>{
		setAttributes({ bio: newBio})
	}

	const onSelectImage = (image) =>{
		if(!image || !image.url ){
			setAttributes({ url:undefined, alt:undefined, id:undefined })
			return;
		}
		setAttributes({ url:image.url, alt:image.alt, id:image.id })
	}

	const onSelectURL= (newURL) =>{
		setAttributes({
			url: newURL,
			id:undefined,
			alt:'',
		})
	}

	const onUploadError=(message)=>{
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	}

	return(
		<div {...useBlockProps()}>
			{url &&
					<div
					className={`wp-block-block-course-team-members-img${isBlobURL(url) ? ` is-loading`: ''}`}>
					<img	src={url} alt={alt}/>
						{isBlobURL(url) && <Spinner/>}
					</div>}
			<MediaPlaceholder
				icon="admin-users"
				onSelect = { onSelectImage }
				onSelectURL= { onSelectURL }
				onError = {onUploadError}
				// accept = "image/*"
				allowedTypes={['image']}
				disableMediaButtons={ url }
				notices = {noticeUI}
			/>
			<RichText
				placeholder={__("Member name:",'team-member')}
				tagName="h4"
				onChange= {onChangeName}
				value = {name}
				allowedFormats={[]}
			/>
			<RichText
				placeholder={__("Member Bio:",'team-member')}
				tagName="p"
				onChange = {onChangeBio}
				value={bio}
				allowedFormats={[]}
			/>
		</div>
	);
};

export default  withNotices(Edit);
