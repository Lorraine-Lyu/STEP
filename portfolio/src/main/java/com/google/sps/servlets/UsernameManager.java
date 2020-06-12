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

import static com.google.sps.data.ConstantProperties.*;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.sps.data.LoginStatus;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class UsernameManager extends HttpServlet {

  private static final String USER_INFO = "UserInfo";
  private static final String USER_ID = "id";
  private static final String USER_NAME = "username";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    response.setContentType(JSON_CONTENT_TYPE);
    PrintWriter out = response.getWriter();
    // If the user has logged in, send the pre-registered username to client,
    // if not, send the login url.
    String helperInfo = userService.isUserLoggedIn() 
                      ? getUsername(userService.getCurrentUser().getUserId())
                      : userService.createLoginURL(INDEX_PATH);
    // Always send the logout url to client.
    String logoutUrl = userService.createLogoutURL(INDEX_PATH);
    out.println(gson.toJson(new LoginStatus(userService.isUserLoggedIn(), helperInfo, logoutUrl)));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    if (!userService.isUserLoggedIn()) {
      response.sendRedirect(INDEX_PATH);
      return;
    }

    String username = request.getParameter(USER_NAME);
    String id = userService.getCurrentUser().getUserId();

    Entity entity = new Entity(USER_INFO, id);
    entity.setProperty(USER_ID, id);
    entity.setProperty(USER_NAME, username);
    // The put() function automatically inserts new data or updates existing data based on ID.
    datastore.put(entity);

    response.sendRedirect(INDEX_PATH);
  }

  /**
   * @param id The string id of current user
   * @return the username of the user, or empty String if the user has not set a username.
   */
  private String getUsername(String id) {
    Query query =
        new Query(USER_INFO)
            .setFilter(new Query.FilterPredicate(USER_ID, Query.FilterOperator.EQUAL, id));
    PreparedQuery results = datastore.prepare(query);
    Entity entity = results.asSingleEntity();
    if (entity == null) {
      return DEFAULT_VAL;
    }
    String name = (String) entity.getProperty(USER_NAME);
    return name;
  }
}
