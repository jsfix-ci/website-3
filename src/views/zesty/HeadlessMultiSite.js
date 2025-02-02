/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Headless Multi Site 
 * Name: headless_multi_site 
 * Model ZUID: 6-a4f2ed849b-r1cwpc
 * File Created On: Wed Jul 27 2022 18:58:43 GMT+0800 (Philippine Standard Time)
 * 
 * Model Fields:
 * 
  * header_title_description (wysiwyg_basic)
 * header_graphic (images)
 * what_is_multi_site (wysiwyg_basic)
 * what_is_graphic (images)
 * why_zesty_title (text)
 * why_1 (wysiwyg_basic)
 * why_1_graphic (images)
 * why_2 (wysiwyg_basic)
 * why_2_graphic (images)
 * why_3 (wysiwyg_basic)
 * why_3_graphic (images)
 * what_header (wysiwyg_basic)
 * what_1 (wysiwyg_basic)
 * what_1_graphic (images)
 * what_2 (wysiwyg_basic)
 * what_2_graphic (images)
 * what_3 (wysiwyg_basic)
 * what_3_graphic (images)
 * how_title (text)
 * how_1 (wysiwyg_basic)
 * how_1_graphic (images)
 * how_2 (wysiwyg_basic)
 * how_2_graphic (images)
 * how_3 (wysiwyg_basic)
 * how_3_graphic (images)
 * features_title (text)
 * footer_cta_button (text)
 * footer_cta_text (wysiwyg_basic)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-a4f2ed849b-r1cwpc
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';

function HeadlessMultiSite({ content }) {
  return (
    <>
      {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
      <h1
        dangerouslySetInnerHTML={{ __html: content.meta.web.seo_meta_title }}
      ></h1>
      <div>{content.meta.web.seo_meta_description}</div>
      <div
        style={{
          background: '#eee',
          border: '1px #000 solid',
          margin: '10px',
          padding: '20px',
        }}
      >
        <h2>Accessible Zesty.io JSON Object</h2>
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div>
      {/* End of Zesty.io output example */}
    </>
  );
}

export default HeadlessMultiSite;
