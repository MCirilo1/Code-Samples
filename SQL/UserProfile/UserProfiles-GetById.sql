
ALTER PROC [dbo].[UserProfiles_Select_ById]
			@Id int

AS

	/*
		DECLARE @_Id INT = 1;
		EXECUTE [dbo].[UserProfiles_Select_ById] @_Id
	*/

BEGIN

	SELECT	 UP.[Id]
			,[UserId]
			,[FirstName]
			,[LastName]
			,[Mi]
			,[AvatarUrl]
			,[DateCreated]
			,[DateModified]
			, UserStatusId
			, UT.[Name] as UserStatus
	FROM		[dbo].[UserProfiles] as UP
	join dbo.Users as U on U.Id = UP.UserId
	join dbo.UserStatus as UT on UT.Id = U.UserStatusId
	WHERE	[UserId] = @Id

END