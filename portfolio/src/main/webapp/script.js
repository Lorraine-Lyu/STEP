// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// the indexes recording the picture 
// the slides in gallery.html is showing
var slide1 = 0;
var slide2 = 0;

/**
 * Controls(flips) both slideshow in gallery.html
 */
function flip(/* num of pages to flip= */ num, 
  /* index of the slide= */ sIndex) {
  var slide;
  if (sIndex == 1) {
    slide1 += num;
    slide = document.getElementById("slide1").getElementsByTagName("img");
    slide1 = updateFlip(slide1, slide);
  } else {
    slide2 += num;
    slide = document.getElementById("slide2").getElementsByTagName("img");
    slide2 = updateFlip(slide2, slide);
  }
}

/**
 * The helper function for flip(n,s); 
 * sets the input slide to show 
 * picture corresponding to the 'show' index
 */
function updateFlip(/* page index= */ show, slide) {
  if (show > 4) {
      show = 0;
  } else if (show < 0) {
      show = 4;
  }

  for (i = 0; i < 5; i++) {
    slide[i].style.display = "none";  
  }
  slide[show].style.display = "block";
  return show;
}

// set both slides to the first page
flip(0, 1);
flip(0, 2);
