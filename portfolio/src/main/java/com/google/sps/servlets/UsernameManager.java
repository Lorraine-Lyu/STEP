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
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.sps.data.LoginStatus;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class UsernameManager extends HttpServlet {

  private final String JSON_CONTENT_TYPE = "application/json";
  private final String INDEX_PATH = "/";
  private final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  private final Gson gson = new Gson();
  

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    response.setContentType(JSON_CONTENT_TYPE);
    PrintWriter out = response.getWriter();
    String helperInfo = userService.isUserLoggedIn() 
                    ? userService.getCurrentUser().getEmail()
                    //   ? getUsername(userService.getCurrentUser().getUserId())
                      : userService.createLoginURL(INDEX_PATH);
    String logoutUrl = userService.createLogoutURL(INDEX_PATH);
    out.println(gson.toJson(new LoginStatus(userService.isUserLoggedIn(), helperInfo, logoutUrl)));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) {
      response.sendRedirect(INDEX_PATH);
      return;
    }

    String username = request.getParameter("username");
    String id = userService.getCurrentUser().getUserId();

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity entity = new Entity("UserInfo", id);
    entity.setProperty("id", id);
    entity.setProperty("username", username);
    // The put() function automatically inserts new data or updates existing data based on ID.
    datastore.put(entity);

    response.sendRedirect(INDEX_PATH);
  }

  /**
   * Returns the username of the user with id, or empty String if the user has not set a username.
   */
  private String getUsername(String id) {
    Query query =
        new Query("UserInfo")
            .setFilter(new Query.FilterPredicate("id", Query.FilterOperator.EQUAL, id));
    PreparedQuery results = datastore.prepare(query);
    Entity entity = results.asSingleEntity();
    if (entity == null) {
      return "";
    }
    String name = (String) entity.getProperty("username");
    return name;
  }
}
