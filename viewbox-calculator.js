// ViewBox Calculator Script
// Paste this into browser console to calculate optimal viewBox for #main-group

function calculateOptimalViewBox() {
  console.log('🔍 Starting viewBox calculation...');

  // Get the main group element
  const mainGroup = document.getElementById('main-group');
  if (!mainGroup) {
    console.error('❌ Element #main-group not found');
    return;
  }

  console.log('✅ Found #main-group element:', mainGroup);

  // Get the SVG container
  const svg = mainGroup.closest('svg');
  if (!svg) {
    console.error('❌ Parent SVG element not found');
    return;
  }

  console.log('✅ Found parent SVG:', svg);
  console.log('📏 Current viewBox:', svg.getAttribute('viewBox'));

  // Get bounding box using getBBox (this gives us SVG coordinate space)
  let bbox;
  try {
    bbox = mainGroup.getBBox();
    console.log('📐 getBBox result (SVG coordinates):', {
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height
    });
  } catch (error) {
    console.error('❌ getBBox failed:', error);
    return;
  }

  // Get getBoundingClientRect to understand scaling
  const rect = mainGroup.getBoundingClientRect();
  console.log('📐 getBoundingClientRect result (browser-scaled):', {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height
  });

  // Calculate scaling factor
  const scaleX = rect.width / bbox.width;
  const scaleY = rect.height / bbox.height;
  console.log('🔍 Scaling factors:', {
    scaleX: scaleX.toFixed(2),
    scaleY: scaleY.toFixed(2),
    average: ((scaleX + scaleY) / 2).toFixed(2)
  });

  // Add some padding (10-15% of the larger dimension, or minimum 5 units)
  const paddingPercent = 0.12; // 12% padding
  const minPadding = 5;
  const calculatedPadding = Math.max(bbox.width, bbox.height) * paddingPercent;
  const padding = Math.max(calculatedPadding, minPadding);

  console.log('📏 Calculated padding:', {
    percentage: `${paddingPercent * 100}%`,
    calculated: calculatedPadding,
    minimum: minPadding,
    used: padding
  });

  // Calculate new viewBox values based on getBBox
  const newViewBox = {
    x: bbox.x - padding,
    y: bbox.y - padding,
    width: bbox.width + (padding * 2),
    height: bbox.height + (padding * 2)
  };

  console.log('📊 New viewBox calculation:', newViewBox);

  // Format as viewBox string
  const viewBoxString = `${newViewBox.x.toFixed(2)} ${newViewBox.y.toFixed(2)} ${newViewBox.width.toFixed(2)} ${newViewBox.height.toFixed(2)}`;

  console.log('🎯 RESULT - New viewBox value (precise):');
  console.log(`viewBox="${viewBoxString}"`);

  // Also provide rounded values
  const roundedViewBox = `${Math.round(newViewBox.x)} ${Math.round(newViewBox.y)} ${Math.round(newViewBox.width)} ${Math.round(newViewBox.height)}`;
  console.log('🎯 RESULT - Rounded viewBox value:');
  console.log(`viewBox="${roundedViewBox}"`);

  // Show the transformation
  console.log('🔄 Transformation summary:');
  console.log(`  Original: viewBox="0 0 200 200"`);
  console.log(`  New:      viewBox="${roundedViewBox}"`);

  // Additional debugging info
  console.log('🔧 Debug info:', {
    svgDimensions: {
      width: svg.getAttribute('width') || 'not set',
      height: svg.getAttribute('height') || 'not set'
    },
    mainGroupTransform: mainGroup.getAttribute('transform') || 'none',
    allChildElements: mainGroup.children.length
  });

  // Preview the change
  console.log('🔄 To preview: previewViewBox("' + roundedViewBox + '")');
  console.log('📋 Copy this for your HTML:');
  console.log(`<svg viewBox="${roundedViewBox}" xmlns="http://www.w3.org/2000/svg">`);

  return {
    original: svg.getAttribute('viewBox'),
    calculated: viewBoxString,
    rounded: roundedViewBox,
    bbox: bbox,
    padding: padding,
    scaling: { scaleX, scaleY }
  };
}

// Function to preview the new viewBox
function previewViewBox(newViewBox) {
  const svg = document.querySelector('svg');
  if (svg) {
    const originalViewBox = svg.getAttribute('viewBox');
    svg.setAttribute('viewBox', newViewBox);
    console.log('👀 Preview applied! Original viewBox:', originalViewBox);
    console.log('🔄 To revert, run: revertViewBox("' + originalViewBox + '")');
  }
}

// Function to revert viewBox
function revertViewBox(originalViewBox) {
  const svg = document.querySelector('svg');
  if (svg) {
    svg.setAttribute('viewBox', originalViewBox);
    console.log('↩️ Reverted to original viewBox');
  }
}

// Run the calculation
const result = calculateOptimalViewBox();

// Make functions available globally
window.previewViewBox = previewViewBox;
window.revertViewBox = revertViewBox;
window.calculateOptimalViewBox = calculateOptimalViewBox;