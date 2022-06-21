/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: DXP Enterprise 
 * Name: dxp_enterprise 
 * Model ZUID: 6-c0e0cdc7d9-ff3h91
 * File Created On: Wed Jun 15 2022 00:51:14 GMT+0800 (Philippine Standard Time)
 * 
 * Model Fields:
 * 
  * h1_title (text)
 * hero_description (textarea)
 * hero_graphic (images)
 * features_title (text)
 * features (one_to_many)
 * why_zesty_title (text)
 * why_zesty_1 (wysiwyg_basic)
 * why_zesty_graphic_1 (images)
 * why_zesty_2 (wysiwyg_basic)
 * why_zesty_graphic_2 (images)
 * why_zesty_3 (wysiwyg_basic)
 * why_zesty_graphic_3 (images)
 * why_zesty_4 (wysiwyg_basic)
 * why_zesty_graphic_4 (images)
 * case_studies_title (text)
 * case_studies (one_to_many)
 * integrations_title (text)
 * integrations_graphic (images)
 * bottom_description (wysiwyg_basic)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-c0e0cdc7d9-ff3h91
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';

function DxpEnterprise({ content }) {
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

export default DxpEnterprise;
