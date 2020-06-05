package com.google.sps.data;

/** 
 * The object representing a comment on Lorraine's online portfolio
 */
public class Comment {

  private String userName;

  private String comment;

  public Comment(String name, String comment) {
      this.userName = name;
      this.comment = comment;
  }

  /** 
   * Getter of the comment text 
   * @return the actual comment
   */
  public String getComment() {
    return this.comment;
  }

  /** 
   * Getter of person's name who gave the comment 
   * @return the person's preferred name
   */
  public String getUserName() {
    return this.userName;
  }
}