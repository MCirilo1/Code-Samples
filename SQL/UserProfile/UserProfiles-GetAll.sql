
ALTER PROC [dbo].[UserProfiles_SelectAll]
			@PageIndex int,
			@PageSize int

AS

	/*
		DECLARE
			@_pageIndex int = 0
			,@_pageSize int = 100

		EXECUTE [dbo].[UserProfiles_SelectAll]
			@_pageIndex
			,@_pageSize
	*/

BEGIN

	DECLARE @Offset int = @PageIndex * @PageSize

	SELECT		UP.[Id]
				,[UserId]
				,[FirstName]
				,[LastName]
				,[Mi]
				,[AvatarUrl]
				,[DateCreated]
				,[DateModified]
				, UserStatusId
				, UT.[Name] as UserStatus
				, TotalCount = COUNT(1) OVER()
	FROM		[dbo].[UserProfiles] as UP
	join dbo.Users as U on U.Id = UP.UserId
	join dbo.UserStatus as UT on UT.Id = U.UserStatusId
	ORDER BY	[Id]

	OFFSET @Offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	
END