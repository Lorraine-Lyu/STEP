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

var slide1 = 0;
var slide2 = 0;

/**
 * Control both slideshow in gallery.html
 */
function flip(num, slide) {
  var slide;
  if (slide == 1) {
    slide1 += num;
    slide = document.getElementsById("slide1");
    slide1 = updateFlip(slide1, slide);
  } else {
    slide2 += num;
    slide = document.getElementsById("slide2");
    slide2 = updateFlip(slide2, slide);
  }
}

function updateFlip(show, slide) {
  if (show > 4) {
      show = 0;
  } else if (show < 0) {
      show = 4;
  }
  for (i = 0; i < 5; i++) {
    slide[i].style.display = "none";  
  }
  slide[show].display = "block";
  return show;
}

flip(0, 1);
flip(0, 2);
