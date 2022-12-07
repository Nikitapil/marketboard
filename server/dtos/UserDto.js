export default class UserDto {
  userName;

  email;

  id;
  
  constructor(user) {
    this.userName = user.userName;
    this.email = user.email;
    this.id = user._id;
  }
}