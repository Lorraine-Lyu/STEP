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

import Controller from '/Controller.js'

// Fetches data from servelet when the document is loaded
window.onload = async () => {
  const controller = new Controller();
  await Controller.loadComments(document.getElementById('comments'));
  await Controller.checkLoginStatus(controller, document);
}





const openNameForm = () => {
  document.getElementById("myForm").style.display = "block";
}

const closeNameForm = () => {
  document.getElementById("myForm").style.display = "none";
}