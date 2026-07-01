(function ($) {
  ("use strict");

  /*--------------------------------------------------------------
 ## Down Load Button Function
   ----------------------------------------------------------------*/
  $("#download_btn").on("click", function () {
    var downloadSection = $("#download_section");
    var cWidth = downloadSection.width();
    var cHeight = downloadSection.height();
    var topLeftMargin = 40;
    var pdfWidth = cWidth + topLeftMargin * 2;
    var pdfHeight = pdfWidth * 1.5 + topLeftMargin * 2;
    var canvasImageWidth = cWidth;
    var canvasImageHeight = cHeight;
    var totalPDFPages = Math.ceil(cHeight / pdfHeight) - 1;

    html2canvas(downloadSection[0], { allowTaint: true }).then(function (
      canvas
    ) {
      canvas.getContext("2d");
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight]);
      pdf.addImage(
        imgData,
        "JPG",
        topLeftMargin,
        topLeftMargin,
        canvasImageWidth,
        canvasImageHeight
      );
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(pdfWidth, pdfHeight);
        pdf.addImage(
          imgData,
          "JPG",
          topLeftMargin,
          -(pdfHeight * i) + topLeftMargin * 0,
          canvasImageWidth,
          canvasImageHeight
        );
      }
      pdf.save("ivonne-invoice.pdf");
    });
  });

  $("#copybtn1").on("click", function () {
    let text = document.getElementById("myText1");
    navigator.clipboard.writeText(text.innerHTML);
  });

  /* Copy text */

  $("#copybtn2").on("click", function () {
    let text2 = document.getElementById("myText2");
    navigator.clipboard.writeText(text2.innerText);
  });
})(jQuery); // End of use
