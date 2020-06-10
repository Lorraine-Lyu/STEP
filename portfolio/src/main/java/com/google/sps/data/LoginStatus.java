package com.google.sps.data;

/** 
 * The object used to update client with user's log-in status and
 * information to display on client side.
 */
public class LoginStatus {

  private final Boolean isUserLoggedIn;
  private final String helperInfo;

  public LoginStatus(Boolean status, String info) {
      this.isUserLoggedIn = status;
      this.helperInfo = info;
  }

  /** 
   * Getter of the login status. 
   * @return the boolean indicating whether the user logged in.
   */
  public Boolean getStatus() {
    return this.isUserLoggedIn;
  }

  /** 
   * Getter of information related to user's current status.
   * @return either the user name or the url for login.
   */
  public String getHelperInfo() {
    return this.helperInfo;
  }
}