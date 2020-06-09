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

// Fetches data from servelet when the document is loaded
window.onload = async () => {
  let commentResponse = undefined;
  try {
    commentResponse = await fetch('/comment');
  } catch (e) {
    alert('Cannot get response');
    console.log(e);
    return;
  }

  try {
    const jsonArray = await commentResponse.json();
    const comments = jsonArray
      .map(entry => 
      `<div class='entry'><p> ${entry.userName} : ${entry.comment}</p></div>`)
      .join('');
    document.getElementById('comments').innerHTML = comments;
  } catch (e) {
    alert('Cannot parse response');
    console.log(e);
  }
}