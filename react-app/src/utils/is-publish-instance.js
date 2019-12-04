/**
 * Determine whether current AEM instance is a publish instance
 */
export default function isPublishInstance() {
  // Get all <meta property="cq:wcmmode" /> tags
  const metaTags = [...document.getElementsByTagName('meta')];
  const modeMetaTags = metaTags.filter(
    metaTag => metaTag.getAttribute('property') === 'cq:wcmmode'
  );

  // Warn if more than one WCMMode tag is found
  if (modeMetaTags.length > 1) {
    console.error(
      'More than one <meta property="cq:wcmmode" /> tag found in document'
    );
  }

  // Return result: Publish instance if no WCMMode tag is set to "edit"
  return !modeMetaTags.some(tag => tag.getAttribute('content') === 'edit');
}
