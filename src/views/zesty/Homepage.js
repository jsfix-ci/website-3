/**
 * Zesty.io Content Model Component
 * When the ZestyLoader [..slug].js file is used, this component will autoload if it associated with the URL
 * 
 * Label: Homepage 
 * Name: homepage 
 * Model ZUID: 6-31079c-vdg69q
 * File Created On: Mon Feb 21 2022 07:38:12 GMT-0800 (Pacific Standard Time)
 * 
 * Model Fields:
 * 
  * title (text)
 * content (wysiwyg_advanced)
 * image (images)
 * customer_logo_heading (text)
 * main_headline (text)
 * main_description (wysiwyg_advanced)
 * og_image (images)

 * 
 * In the render function, text fields can be accessed like {content.field_name}, relationships are arrays,
 * images are objects {content.image_name.data[0].url}
 * 
 * This file is expected to be customized; because of that, it is not overwritten by the integration script.
 * Model and field changes in Zesty.io will not be reflected in this comment.
 * 
 * View and Edit this model's current schema on Zesty.io at https://8-aaeffee09b-7w6v22.manager.zesty.io/schema/6-31079c-vdg69q
 * 
 * Data Output Example: https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson
 * Images API: https://zesty.org/services/media-storage-micro-dam/on-the-fly-media-optimization-and-dynamic-image-manipulation
 */

import React, { useState } from 'react';
import FullScreenHeroWithImageSlider from '../../blocks/heroes/FullScreenHeroWithImageSlider';
import WithSwiperAndBrandBackgroundColor from '../../blocks/logoGrid/WithSwiperAndBrandBackgroundColor';
import FeaturesWithIllustration from '../../blocks/features/FeaturesWithIllustration';
import WithOverlappedCards from '../../blocks/team/WithOverlappedCards';
import ReviewsWithSimpleBoxes from '../../blocks/testimonials/ReviewsWithSimpleBoxes';
import VerticallyAlignedBlogCardsWithShapedImage from '../../blocks/blog/VerticallyAlignedBlogCardsWithShapedImage';
import CtaWithInputField from '../../blocks/cta/CtaWithInputField';
import ZestyExplorer from 'components/ZestyExplorer';

function Homepage({ content }) {
  let image_url = content?.zesty_benefits_image
    ? content.zesty_benefits_image.data[0].url
    : 'https://pzcvtc6b.media.zestyio.com/content-management.png';
  return (
    <>
      {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
      <FullScreenHeroWithImageSlider {...content} />

      <WithSwiperAndBrandBackgroundColor logos={content.homepage_logos?.data} />
      <FeaturesWithIllustration
        rich_text={content.zesty_benefits}
        image_url={image_url}
      />
      <WithOverlappedCards />
      <ReviewsWithSimpleBoxes />
      <VerticallyAlignedBlogCardsWithShapedImage />
      <CtaWithInputField />
      <hr />
      <ZestyExplorer content={content} />
      {/* <div
        style={{
          background: '#eee',
          border: '1px #000 solid',
          margin: '10px',
          padding: '20px',
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
        }}
      >
        <h2>Accessible Zesty.io JSON Object</h2>
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div> */}
      {/* End of Zesty.io output example */}
    </>
  );
}

export default Homepage;
