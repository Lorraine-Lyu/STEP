package com.google.sps.data;

public class Comment {

  private String userName;

  private String comment;

  public Comment(String name, String comment) {
      this.userName = name;
      this.comment = comment;
  }

  public String getComment() {
    return this.comment;
  }

  public String getUserName() {
    return this.userName;
  }
}