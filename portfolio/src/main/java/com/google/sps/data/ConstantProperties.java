package com.google.sps.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.gson.Gson;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
 
public class ConstantProperties {

  // Response content type and redirect path.
  public static final String JSON_CONTENT_TYPE = "application/json";
  public static final String INDEX_PATH = "/index.html";
  // The default value for undefined fields.
  public static final String DEFAULT_VAL = "";

  // The object connected to datastore.
  public static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  // The Java to JSON converter.
  public static final Gson gson = new Gson();
  // The object which does user login/logout
  public static final UserService userService = UserServiceFactory.getUserService();

}