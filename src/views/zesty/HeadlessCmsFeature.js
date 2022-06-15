/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Headless CMS Features 
 * Name: headless_cms_features 
 * Model ZUID: 6-b0ad9acbea-721hmm
 * File Created On: Wed Jun 15 2022 19:35:52 GMT+0200 (Central European Summer Time)
 * 
 * Model Fields:
 * 
  * hero_title (text)
 * hero_description (wysiwyg_basic)
 * hero_graphic (images)
 * features_benefit_1 (textarea)
 * features_benefit_1_graphic (images)
 * features_benefit_2 (textarea)
 * features_benefit_2_graphic (images)
 * features_benefit_3 (textarea)
 * features_benefit_3_graphic (images)
 * benefit_section_1_title (wysiwyg_basic)
 * features_section_1 (one_to_many)
 * benefits_section_2_title (wysiwyg_basic)
 * features_section_2 (one_to_many)
 * benefits_section_3_title (wysiwyg_basic)
 * features_section_3 (one_to_many)
 * integrations (wysiwyg_basic)
 * what_they_can_do_header (text)
 * what_section_1 (wysiwyg_basic)
 * what_section_1_graphic (images)
 * what_section_2 (wysiwyg_basic)
 * what_section_2_graphic (images)
 * what_section_3 (wysiwyg_basic)
 * what_section_3_graphic (images)
 * bottom_cta (wysiwyg_basic)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-b0ad9acbea-721hmm
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React  from 'react';

function HeadlessCmsFeature({content}) {
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
  
export default HeadlessCmsFeature;
