
ALTER Proc [dbo].[Users_UpdatePassword]
			@UserId int
			, @Password nvarchar(200)
			

AS

/*

Declare @UserId int = 1
		, @Password nvarchar(200) = '$2b$10$HRwMVwlWywYnLl.yOLNYQe5AenqvSqAR4/qtJO38TpsKcGeIgdpW6'

Select * 
FROM dbo.Users

EXECUTE [dbo].[Users_UpdatePassword]
		@UserId
		, @Password 

Select * 
FROM dbo.Users




*/

BEGIN

	UPDATE dbo.Users
	SET [Password] = @Password
	WHERE Id = @UserId

END

