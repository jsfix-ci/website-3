/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Headless CMS Multi-lang 
 * Name: headless_cms_multi_lang 
 * Model ZUID: 6-e8dff7d0a0-np3tcx
 * File Created On: Wed Jul 27 2022 18:58:43 GMT+0800 (Philippine Standard Time)
 * 
 * Model Fields:
 * 
  * hero_h1 (text)
 * hero_title_and_description (wysiwyg_basic)
 * hero_graphic (images)
 * solution_1 (wysiwyg_basic)
 * solution_1_graphic (images)
 * solution_2 (wysiwyg_basic)
 * solution_2_graphic (images)
 * solution_3 (wysiwyg_basic)
 * solution_3_graphic (images)
 * solution_4 (wysiwyg_basic)
 * solution_4_graphic (images)
 * solution_5 (wysiwyg_basic)
 * solution_5_graphic (images)
 * why_zesty_title (text)
 * why_tiles (one_to_many)
 * bottom_cta (wysiwyg_basic)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-e8dff7d0a0-np3tcx
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React from 'react';

function HeadlessCmsMultiLang({ content }) {
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

export default HeadlessCmsMultiLang;
