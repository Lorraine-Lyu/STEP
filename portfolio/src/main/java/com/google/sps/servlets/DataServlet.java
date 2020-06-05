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

/** Servlet that returns some hard coded strings. */
@WebServlet("/comment")
public class DataServlet extends HttpServlet {

  private final String JSON_CONTENT_TYPE = "application/json";

  private String ENTITY_TYPE = "comment";

  private String FIELD_NAME = "name";

  private String FIELD_TEXT = "text";

  /** The Java to JSON converter */
  private Gson gson = new Gson();

  /** The object which communicates with database */
  private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


  /** Queries data from datastore and sends to clients */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    Query query = new Query(ENTITY_TYPE);
    PreparedQuery results = datastore.prepare(query);

    List<Comment> comments = new ArrayList<>();
    results.asIterable().forEach(entity -> {
      String name = (String) entity.getProperty(FIELD_NAME);
      String text = (String) entity.getProperty(FIELD_TEXT);
      comments.add(new Comment(name, text));
    });

    response.setContentType(JSON_CONTENT_TYPE);
    response.getWriter().println(gson.toJson(comments));
  }
}
