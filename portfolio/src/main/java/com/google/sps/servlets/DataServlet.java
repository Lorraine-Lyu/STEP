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

import static com.google.sps.data.ConstantValues.DEFAULT_VAL;
import static com.google.sps.data.ConstantValues.INDEX_PATH;
import static com.google.sps.data.ConstantValues.JSON_CONTENT_TYPE;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/** Servlet that handles GET and POST requests for comments. */
@WebServlet("/comment")
public class DataServlet extends HttpServlet {

  // The type of entity in database and fields in entity.
  private static final String ENTITY_TYPE = "comment";
  private static final String COMMENT_NAME = "name";
  private static final String COMMENT_TEXT = "text";
  // The object connected to datastore.
  private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  // The Java to JSON converter.
  private final Gson gson = new Gson();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
    String name = getParameter(request, COMMENT_NAME, DEFAULT_VAL); 
    String text = getParameter(request, COMMENT_TEXT, DEFAULT_VAL);

    // Generate comment entity.
    Entity comment = new Entity(ENTITY_TYPE);
    comment.setProperty(COMMENT_NAME, name);
    comment.setProperty(COMMENT_TEXT, text);

    datastore.put(comment);
    response.sendRedirect(INDEX_PATH);
  }

  /**
   * @param request       The current HTTP request being handled
   * @param name          The parameter name
   * @param defaultValue  The default string if the field does not exist in request
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client.
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }


  /** Queries data from datastore and sends to clients. */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    Query query = new Query(ENTITY_TYPE);
    PreparedQuery results = datastore.prepare(query);

    List<Comment> comments = new ArrayList<>();
    results.asIterable().forEach(entity -> {
      String name = (String) entity.getProperty(COMMENT_NAME);
      String text = (String) entity.getProperty(COMMENT_TEXT);
      comments.add(new Comment(name, text));
    });

    response.setContentType(JSON_CONTENT_TYPE);
    response.getWriter().println(gson.toJson(comments));
  }
}
