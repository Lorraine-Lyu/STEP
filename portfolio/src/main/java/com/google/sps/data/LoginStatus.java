package com.google.sps.data;

import java.util.Optional;

/** 
 * The object used to update client with user's log-in status and
 * information to display on client side.
 */
public class LoginStatus {

  private final boolean isUserLoggedIn;
  private final Optional<String> loginUrl;
  private final String logoutUrl;
  private final Optional<String> username;

  public LoginStatus(boolean isUserLoggedIn, Optional<String> loginUrl, String logoutUrl, Optional<String> username) {
      this.isUserLoggedIn = isUserLoggedIn;
      this.loginUrl = loginUrl;
      this.logoutUrl = logoutUrl;
      this.username = username;
  }

  /** 
   * Getter of the login status. 
   * @return the boolean indicating whether the user logged in.
   */
  public boolean getLoginStatus() {
    return this.isUserLoggedIn;
  }

  /** 
   * Getter of the login url.
   * @return the url for login.
   */
  public Optional<String> getLoginUrl() {
    return this.loginUrl;
  }

  /** 
   * Getter of logout url.
   * @return the url for user to logout.
   */
  public String getLogoutUrl() {
    return this.logoutUrl;
  }

  /** 
   * Getter of username.
   * @return the username of current user.
   */
  public Optional<String> getusername() {
    return this.username;
  }
}