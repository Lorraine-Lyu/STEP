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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that receives comments from POST requests. */
@WebServlet("/comment")
public class DataServlet extends HttpServlet {

  private final String HTML_Contant_Type = "text/html";

  private final String REDIRECT = "/index.html";

  private final String ENTITY_TYPE = "comment";

  private final String FIELD_NAME = "name";

  private final String FIELD_TEXT = "text";
  
  private final String DEFAULT_VAL = "";

  // This method is defined on the other branch
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType(HTML_Contant_Type);
    response.getWriter().println(DEFAULT_VAL); 
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String name = getParameter(request, FIELD_NAME, DEFAULT_VAL); 
    String text = getParameter(request, FIELD_TEXT, DEFAULT_VAL);

    // Generate comment entity
    Entity comment = new Entity(ENTITY_TYPE);
    comment.setProperty(FIELD_NAME, name);
    comment.setProperty(FIELD_TEXT, text);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(comment);

    response.sendRedirect(REDIRECT);
  }

  /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}
