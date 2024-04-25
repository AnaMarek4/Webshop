
export default class UserDto {
    constructor(id, username, email, firstName, lastName, isActive, avatarUrl, dateOfSignUp, roles) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.isActive = isActive;
      this.avatarUrl = avatarUrl;
      this.dateOfSignUp = dateOfSignUp;
      this.roles = roles;
    }
  
  }