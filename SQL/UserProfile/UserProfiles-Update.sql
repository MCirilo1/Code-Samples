
ALTER PROC [dbo].[UserProfiles_Update]
			@UserId int
			,@FirstName nvarchar(100)
			,@LastName nvarchar(100)
			,@Mi nvarchar(2)
			,@AvatarUrl varchar(255)
			,@Id int 

AS

	/*

		DECLARE 
			@UserId int = 5
			,@FirstName nvarchar(100) = 'First'
			,@LastName nvarchar(100) = 'Last'
			,@Mi nvarchar(2) = 'MI'
			,@AvatarUrl varchar(255) = 'http://fakeUrl.img'
			,@Id int = 6

		EXECUTE [dbo].[UserProfiles_Select_ById]
			@Id

		EXECUTE [dbo].[UserProfiles_Update]
			@UserId
			,@FirstName
			,@LastName
			,@Mi
			,@AvatarUrl
			,@Id

		EXECUTE [dbo].[UserProfiles_Select_ById]
			@Id
	*/
BEGIN
	DECLARE @DateNow datetime2(7) = GETUTCDATE()

	UPDATE	[dbo].[UserProfiles]
	SET		[UserId] = @UserId
			,[FirstName] = @FirstName
			,[LastName] = @LastName
			,[Mi] = @Mi
			,[AvatarUrl] = @AvatarUrl
			,[DateModified] = @DateNow
	WHERE	[Id] = @Id

END