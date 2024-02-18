
// stores what the user types in (this will later be used in the POST request while generating the handwriting)
var typed           = "";

var upload_hw       = -1;

// stores which handwriting the user selects (if a default handwriting is selected)
var selected_hw     = -1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", function () {
    function populateSwiper(swiperWrapperId, imgSuffix) {
      const swiperWrapper = document.getElementById(swiperWrapperId);
  
      for (let i = 1; i <= 12; i++) {
        const imgPath = `/static/${i}${imgSuffix}.png`;
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('swiper-slide');
  
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-image');
  
        const imgElement = document.createElement('img');
        imgElement.src = imgPath;
        imgElement.alt = 'Image Slider';
        imgElement.onclick = function() {
          defaultClick(i);
          scrollToGenerate();
        };
  
        cardDiv.appendChild(imgElement);
        slideDiv.appendChild(cardDiv);
        swiperWrapper.appendChild(slideDiv);
      }
    }
  
    populateSwiper('swiper-wrapper', '');
    populateSwiper('swiper-wrapper-mobile', '_mobile');
  
    // Swiper initialization here
    var swiper = new Swiper(".swiper-container", {
      slidesPerView: 1.5,
      spaceBetween: 10,
      centeredSlides: true,
      freeMode: true,
      grabCursor: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        500: {
          slidesPerView: 1
        },
        700: {
          slidesPerView: 1.5
        }
      }
    });
  });
  
  

// utility function to get session cookie (for post requests)
function getCookie(name) {
    var cookieValue     = null;
    if (document.cookie && document.cookie !== '') {
        var cookies     = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie  = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// utility function to convert from arrayBuffer to base 64 encoded bytes-string
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

function saveText() {
    restoreOriginalGenerate();

    textarea = document.getElementById ("textinput");
    typed = textarea.value;
}

function restoreNextButton () {
    nextbutton = document.getElementById ("text-input-next");
    nextbutton.textContent = "Next";
}

function restoreOriginalGenerate() {
    var generateButtonExt  = document.getElementById("generate-button-extern");
    var generateButtonInt  = document.getElementById("generate-button-intern");

    generateButtonExt.setAttribute("onclick", "generateClick()");

    generateButtonInt.textContent = "Generate";
    generateButtonInt.removeAttribute("href");
    generateButtonInt.removeAttribute("target");
}

function nextClickScroll() {

    // textarea = document.getElementById ("textinput");
    // typed = textarea.value;

    // nextbutton = document.getElementById ("text-input-next");

    // if (typed == "") {
    //     nextbutton.textContent = "Text cannot be empty";
    //     setTimeout (restoreNextButton, 3000);
    // }
    // else {
    //     resSection = document.getElementById("choose-handwriting");
    //     if (window.getComputedStyle(resSection).display == "none") {
    //         resSection = document.getElementById("select-default-hw");
    //     }
    //     resSection.scrollIntoView()
    // }
    // Get all images
    const images = document.querySelectorAll('.image');

    // Add click event listener to each image
    images.forEach(image => {
        image.addEventListener('click', function() {
            // Store the image's data
            const imageData = this.src; // or any other data you want to store

            // Scroll to the next section
            const resSection = document.getElementById("choose-handwriting");
            if (window.getComputedStyle(resSection).display == "none") {
                resSection = document.getElementById("select-default-hw");
            }
            resSection.scrollIntoView();
        });
    });
}



async function placeholderAnimation() {
    textInput = document.getElementById("textinput");
    textInput["placeholder"] = "";

    text = "Convert text to handwriting or calligraphy.\n\nYou type it in...\n ...We'll write it out."
    // text = "Handwriter converts text to handwriting.\nGet started by typing it in,\n\nWe'll write it out.";
    total_time = 5000;
    sleep_time = total_time / text.length;

    // text = "Type it in.\nWe'll write it out.";

    for (const char of text) {
        textInput["placeholder"] = textInput["placeholder"] + char;
        if (char == '\n') {
            await sleep(2 * sleep_time);
        }
        if (char != ' ') {
            await sleep(sleep_time);
        }
    }
}

function userUploadHw() {
    resSection = document.getElementById("user-upload-hw");
    resSection.scrollIntoView();
}

function selectDefaultHw() {
    resSection = document.getElementById("select-default-hw");
    resSection.scrollIntoView();
}

function userUploadHwNext() {
    resSection = document.getElementById("generate");
    resSection.scrollIntoView();
}

function aboutUsClick() {
    resSection = document.getElementById("meet-the-team");
    resSection.scrollIntoView();
}

function contactClick() {
    resSection = document.getElementById("contact-us");
    resSection.scrollIntoView();
}

function shareClick(id, resultMode = false) {
    if(resultMode) {
        navigator.clipboard.writeText(window.location.href + "\nCheck out this awesome website that helped me convert text into handwriting! You can use it for personalised letters, assignments and so much more!\nCreated using www.handwriter.in");
    } else {
        navigator.clipboard.writeText("Check out www.handwriter.in to convert text to handwriting!\nYou can use it for personalised letters, assignments and so much more!");
    }

    shareClickButton = document.getElementById(id);
    shareClickButton.textContent = "Copied";
    setTimeout (restoreShareButton, 2000);
}

function restoreShareButton() {
    shareClickButton.textContent = "Share"
}

function defaultClick(number) {
    restoreOriginalGenerate();
    restoreUpload();
    selected_hw = number;
    upload_hw = -1;
    document.getElementById("generate-text-mobile").style.display = "none";
}

function scrollToGenerate () {
    resSection = document.getElementById("generate-button-div");
    resSection.scrollIntoView();
}

function redirectToHome() {
    resSection = document.getElementById("main-title");
}

function uploadClick() {

    // var validExt = ["BMP", "GIF", "JPEG", "JPG", "LBM", "PCX", "PNG", "PNM", "SVG", "TGA", "TIFF", "WEBP", "XPM"];
    selected_hw = -1;
    restoreOriginalGenerate();

    var uploadInput     = document.getElementById("upload-input");
    var uploadButton    = document.getElementById("upload-button");
    var numFiles        = uploadInput.files.length;

    // check to see if a file has been selected (the number of files selected should be non-zero)
    if (!(numFiles === 0)) {

        // get the file object and its name (complete path + extension)
        upload_hw       = uploadInput.files[0];
        var filename    = upload_hw.name;
        // var fileExt     = filename.split('.').pop().toUpperCase();

        if (!(upload_hw.type.split('/')[0] === "image")) {
            // unselect the file
            upload_hw   = -1;

            // change the text (and color) to indicate invalid file (behaviour of button does not change)
            uploadButton.textContent = "File must be image";
            uploadButton.setAttribute("style", "width: 100% !important; color: #FF0000 !important;");

            // after 3 seconds, restore the text and color back to normal (once again, without altering behaviour)
            setTimeout(function () {
                var uploadButton = document.getElementById("upload-button");
                uploadButton.textContent = "Upload";
                uploadButton.setAttribute("style", "width: 100% !important;");
            }, 3000);
        }
        else if (upload_hw.size > 10000000) {
            // unselect the file
            upload_hw   = -1;

            // change the text (and color) to indicate invalid file (behaviour of button does not change)
            uploadButton.textContent = "Size must not exceed 10 MB";
            uploadButton.setAttribute("style", "width: 100% !important; color: #FF0000 !important;");

            // after 3 seconds, restore the text and color back to normal (once again, without altering behaviour)
            setTimeout(function () {
                var uploadButton = document.getElementById("upload-button");
                uploadButton.textContent = "Upload";
                uploadButton.setAttribute("style", "width: 100% !important;");
            }, 3000);
        }
        // the text on the upload button should change if the image is valid
        // this does not change the behaviour of the button
        // clicking on the button will allow the user to select another file
        // selecting a new file (valid or not) will unselect the current file
        // if (validExt.indexOf(fileExt) != -1) {
        else {
            filename_display = filename;
            //reduce length of long file names and display
            if(filename.length > 10) {
                filename_display = filename.substring(0, 8) + "..."
            }
            uploadButton.textContent = "\"" + filename_display + "\" selected";
            setTimeout (scrollToGenerate, 1000);
        }
    }
}

function restoreUpload() {
    var uploadButton = document.getElementById("upload-button");
    uploadButton.textContent = "Upload";
}

function invalidImageRestore() {

    res = document.getElementById ("user-upload-hw");
    var generateButtonInt  = document.getElementById("generate-button-intern");

    res.scrollIntoView();

    generateButtonInt.textContent = "Generate";
}

function goToResult (imgURL) {

    // change the generate button to a redirect button
    var generateButtonExt  = document.getElementById("generate-button-extern");
    var generateButtonInt  = document.getElementById("generate-button-intern");

    // open the result in a new tab
    // window.open("https://handwriter.in/result/" + path, '_blank');
    window.open("/r.html?url=" + imgURL, '_blank');

    // clicking should no longer send a post request, only redirect to the new page
    generateButtonExt.setAttribute("onclick", "");

    // the button should now open the result page in a new tab

    //check if view == mobile
    if (window.getComputedStyle(document.getElementById("user-upload-hw")).display === "none") {
        var textMobile = document.getElementById("generate-text-mobile");
        textMobile.textContent = "Click again if not redirected";
        document.getElementById("generate-text-mobile").style.display = "block";
    } else {
        generateButtonInt.textContent = "Click here if not automatically redirected";
    }
    generateButtonInt.setAttribute("href", "https://handwriter.in/r.html?url=" + imgURL);
    generateButtonInt.setAttribute("target", "_blank");
}

async function noHwRestore() {

    res = document.getElementById ("choose-handwriting");
    var generateButtonInt  = document.getElementById("generate-button-intern");

    res.scrollIntoView();

    generateButtonInt.textContent = "Generate";

    document.getElementById("generate-text-mobile").style.display = "none";
}

async function generateClick () {
    console.log("text = " + typed);
    console.log("selected_hw = " + selected_hw);

    var isMobile = false;
    var textMobile = document.getElementById("generate-text-mobile");

    //check if view == mobile
    if (window.getComputedStyle(document.getElementById("user-upload-hw")).display === "none") {
        isMobile = true;
    }

    var generateButtonExt  = document.getElementById("generate-button-extern");
    var generateButtonInt  = document.getElementById("generate-button-intern");

    if (typed == "") {
        nextbutton = document.getElementById ("text-input-next");
        navbar = document.getElementById("navbar");
        navbar.scrollIntoView();
        nextbutton.textContent = "Text cannot be empty";
        setTimeout (restoreNextButton, 2000);

        return;
    }

    if (selected_hw == -1 && upload_hw == -1) {
        if(isMobile) {
            textMobile.style.display = "block";
            textMobile.textContent = "Please select a template";
        } else {
            generateButtonInt.textContent = "Please select or upload a handwriting";
        }
        setTimeout(noHwRestore, 2000);

        return;
    }

    const url = "https://dtpylwwmiaeer5nz6y2pkzrir40hymid.lambda-url.ap-south-1.on.aws/";
    const params = {
    "typed": typed,
    "upl-hw": "-1",
    "sel-hw": selected_hw
    };

    if (upload_hw != -1) {
        var txt = await upload_hw.arrayBuffer();
        txt = arrayBufferToBase64(txt);
        // body["upl-hw"] = txt;
        const payload = {
            upl_hw: txt,
        };        
        const url = 'https://7z66tplb4pjpdvgd6lxyyhik7u0ndaah.lambda-url.ap-south-1.on.aws/';
        fetch(url, {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'application/json',
            // },
            body: JSON.stringify(payload),
          })
          .then(response => response.json())
          .then(data => {
            // Accessing specific keys from the response
            const path = data.path;

            const params2 = {
                "typed": typed,
                "upl-hw": path.toString(),
                "sel-hw": selected_hw
            };          
              const searchParams = new URLSearchParams(params2);
              const url2 = "https://dtpylwwmiaeer5nz6y2pkzrir40hymid.lambda-url.ap-south-1.on.aws/";

              fetch(`${url2}?${searchParams.toString()}`)
              .then(response => response.json())
              .then(data => {
                  const imgURLEncoded = data['img_url'];
                  const imgURL = decodeURIComponent(imgURLEncoded);
                  goToResult(imgURL);
              })
              .catch(error => {
                  console.error("Error:", error);
                  // generateButtonInt.textContent = "Error generating result";
                  // setTimeout(invalidImageRestore, 2000);        
                  goToResult(imgURL);
              });              
          
            console.log(`Path: ${path}`);
          })
          .catch((error) => {
            console.error('Error in POST request:', error);
          });
    } else {
        const searchParams = new URLSearchParams(params);

        fetch(`${url}?${searchParams.toString()}`)
        .then(response => response.json())
        .then(data => {
            const imgURLEncoded = data['img_url'];
            const imgURL = decodeURIComponent(imgURLEncoded);
            goToResult(imgURL);
        })
        .catch(error => {
            console.error("Error:", error);
            // generateButtonInt.textContent = "Error generating result";
            // setTimeout(invalidImageRestore, 2000);        
            goToResult(imgURL);
        });
    }

}

window.onload = function() {
    var slider = document.getElementById("slider");
    if (slider != null) {
        placeholderAnimation();
        if (window.getComputedStyle(document.getElementById("user-upload-hw")).display === "none") {
            var res = document.getElementById("select-default-hw");
            res = res.getElementsByTagName("div")[0];
            res = res.getElementsByTagName("p")[0];
            res.textContent = "choose handwriting";
        }
    }
}

