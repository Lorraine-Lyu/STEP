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

// Fetches data from servelet when the document is loaded.
// Checks whether the user has logged in and if not, get the 
// login url from backend.
window.onload = async () => {
  window.controller = new Controller(document);
  await Controller.loadComments(document.getElementById('comments'));
  await Controller.checkLoginStatus(window.controller, document);
}