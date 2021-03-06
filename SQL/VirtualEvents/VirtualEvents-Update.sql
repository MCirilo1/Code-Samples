
ALTER proc [dbo].[VirtualEvents_Update]

			@EventTypeId int
			,@Name nvarchar(255)
			,@Summary nvarchar(255)
			,@Description nvarchar(4000)
			,@VirtualTypeId int
			,@EventStatusId int
			,@ImageUrl nvarchar(400)
			,@ExternalSiteUrl nvarchar(400)
			,@IsFree bit
			,@DateStart datetime2(7)
			,@DateEnd datetime2(7)
			,@Id int


/*   

	Declare @Id int = 2;

	Declare 
			@EventTypeId int = 10
			,@Name nvarchar(255) = 'Provider Conference'
			,@Summary nvarchar(255) = 'Share information about new protocols'
			,@Description nvarchar(4000) = 'Share information about new protocols'
			,@VirtualTypeId int = 2
			,@EventStatusId int = 1
			,@ImageUrl nvarchar(400) = 'aawergaerbjoni.avervW'
			,@ExternalSiteUrl nvarchar(400) = 'www.skype.com'
			,@IsFree bit = 'true'
			,@DateStart datetime2(7) = getutcdate() --Just for testing
			,@DateEnd datetime2(7) = getutcdate() -- For testing purposes.

	Select *
	From dbo.VirtualEvents
	Where Id = @Id

	Execute dbo.VirtualEvents_Update	
			@EventTypeId
			,@Name
			,@Summary
			,@Description
			,@VirtualTypeId
			,@EventStatusId
			,@ImageUrl
			,@ExternalSiteUrl
			,@IsFree
			,@DateStart
			,@DateEnd
			,@Id

	Select *
	From dbo.VirtualEvents
	Where Id = @Id 


*/

AS

BEGIN

	Declare @dateNow datetime2 = getutcdate()

	UPDATE [dbo].[VirtualEvents]
	   SET [EventTypeId] = @EventTypeId
		  ,[Name] = @Name
		  ,[Summary] = @Summary
		  ,[Description] = @Description
		  ,[VirtualTypeId] = @VirtualTypeId
		  ,[EventStatusId] = @EventStatusId
		  ,[ImageUrl] = @ImageUrl
		  ,[ExternalSiteUrl] = @ExternalSiteUrl
		  ,[IsFree] = @IsFree
		  ,[DateModified] = @dateNow
		  ,[DateStart] = @DateStart
		  ,[DateEnd] = @DateEnd
	 WHERE Id = @Id


END


