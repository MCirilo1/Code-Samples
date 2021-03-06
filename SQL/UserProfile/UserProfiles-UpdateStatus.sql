
ALTER proc [dbo].[UserProfiles_UpdateStatus]

			 @Id int
			,@UserStatusId int

as
/*---- TEST CODE ----

	DECLARE @Id int = 1
			,@UserStatusId int = 1

	Select * 
	From dbo.UserProfiles
	Where Id = @Id

	EXECUTE dbo.UserProfiles_UpdateStatus @Id,
								   @UserStatusId

	Select * 
	From dbo.UserProfiles
	Where Id = @Id

*/
BEGIN

	UPDATE [dbo].[Users]
	   SET [UserStatusId] = @UserStatusId
	   WHERE Id = @Id

END