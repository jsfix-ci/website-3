/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Landing Pages 
 * Name: landing_pages 
 * Model ZUID: 6-84b8ac9dc7-d9lrkj
 * File Created On: Thu Feb 17 2022 16:36:46 GMT-0800 (Pacific Standard Time)
 * 
 * Model Fields:
 * 
 * * title (text)
 * content (wysiwyg_basic)
 * trigger_words (text)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-84b8ac9dc7-d9lrkj
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

function LandingPageZestyModel({content}) {
    return (
        <>
            <h1 dangerouslySetInnerHTML={{__html:content.web.seo_meta_title}}></h1>
            <div dangerouslySetInnerHTML={{__html:content.web.seo_meta_description}}></div>
        </>
    );
};
  
export default LandingPageZestyModel;
