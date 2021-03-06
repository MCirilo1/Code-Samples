
ALTER PROC [dbo].[UserProfiles_Insert]
			@UserId int
			,@FirstName nvarchar(100)
			,@LastName nvarchar(100)
			,@Mi nvarchar(2)
			,@AvatarUrl varchar(255)
			,@Id int OUTPUT

AS
	/*
		DECLARE 
			@UserId int = 6
			,@FirstName nvarchar(100) = 'First'
			,@LastName nvarchar(100) = 'Last'
			,@Mi nvarchar(2) = 'MI'
			,@AvatarUrl varchar(255) = 'http://fakeUrl.img'
			,@Id int

		EXECUTE [dbo].[UserProfiles_Insert]
			@UserId
			,@FirstName
			,@LastName
			,@Mi
			,@AvatarUrl
			,@Id OUTPUT

		EXECUTE [dbo].[UserProfiles_Select_ById]
			@Id
	*/
BEGIN

	INSERT INTO	[dbo].[UserProfiles]
				([UserId]
				,[FirstName]
				,[LastName]
				,[Mi]
				,[AvatarUrl])
	VALUES		(@UserId
				,@FirstName
				,@LastName
				,@Mi
				,@AvatarUrl)
	
	SET	@Id = SCOPE_IDENTITY()

END