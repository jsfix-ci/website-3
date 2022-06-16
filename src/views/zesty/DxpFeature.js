/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: DXP Features 
 * Name: dxp_features 
 * Model ZUID: 6-f686a0abe7-8zs3jw
 * File Created On: Tue Jun 14 2022 20:20:46 GMT+0800 (Philippine Standard Time)
 * 
 * Model Fields:
 * 
  * hero_title (text)
 * hero_description (textarea)
 * hero_graphic (images)
 * section_1 (wysiwyg_basic)
 * section_1_features (one_to_many)
 * section_2 (wysiwyg_basic)
 * section_2_features (one_to_many)
 * section_3 (wysiwyg_basic)
 * section_3_features (one_to_many)
 * section_2_cta (text)
 * section_2_cta_link (internal_link)
 * section_3_cta (text)
 * section_3_cta_link (internal_link)
 * why_zesty (wysiwyg_basic)
 * case_studies_title (text)
 * testimonials (one_to_many)
 * bottom_description (wysiwyg_basic)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-f686a0abe7-8zs3jw
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React  from 'react';

function DxpFeature({content}) {
    return (
        <>
            {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
            <h1 dangerouslySetInnerHTML={{__html:content.meta.web.seo_meta_title}}></h1>
            <div>{content.meta.web.seo_meta_description}</div>
            <div style={{background: '#eee', border: '1px #000 solid', margin: '10px', padding: '20px'}}>
                <h2>Accessible Zesty.io JSON Object</h2>
                <pre>{JSON.stringify(content, null, 2)}</pre>
            </div>
            {/* End of Zesty.io output example */}
        </>
    );
}
  
export default DxpFeature;
