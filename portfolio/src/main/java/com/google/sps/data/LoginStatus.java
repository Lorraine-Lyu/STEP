package com.google.sps.data;

/** 
 * The object used to update client with user's log-in status and
 * information to display on client side.
 */
public class LoginStatus {

  private final Boolean isUserLoggedIn;
  private final String helperInfo;
  private final String logoutUrl;

  public LoginStatus(Boolean status, String info, String url) {
      this.isUserLoggedIn = status;
      this.helperInfo = info;
      this.logoutUrl = url;
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

  /** 
   * Getter of logout url.
   * @return the url for user to logout.
   */
  public String getLogoutUrl() {
    return this.logoutUrl;
  }
}