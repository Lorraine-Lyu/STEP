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

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that handles GET and POST requests for comments. */
@WebServlet("/suzhou")
public class SuzhouInfoServelet extends HttpServlet {

  // Response content type and redirect path
  private final String HTML_CONTENT_TYPE = "text/html";
  
  // This method is defined on the other branch
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType(HTML_CONTENT_TYPE);
    response.getWriter().println("<p>This is my hometown, Suzhou, Jiangsu, China.</p>"); 
    response.getWriter().println("<p>It is close to Shanghai, and it has 2000 years of history.</p>"); 
    response.getWriter().println("<p>I spent most of my time here before coming to U.S. for college.</p>"); 
    response.getWriter().println("<p>And this picture below is taken in my high school.</p>"); 
    response.getWriter().println("<img src='images/suzhong1.jpg' alt='My High School'>"); 
  }
}