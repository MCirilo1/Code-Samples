
ALTER proc [dbo].[VirtualEventWizard_Insert]
	@EventTypeId      INT, 
	@Name        NVARCHAR(255), 
	@Summary          NVARCHAR(255), 
	@Description NVARCHAR(4000),
	@VirtualTypeId	  INT,
	@EventStatusId    INT, 
	@ImageUrl         NVARCHAR(400), 
	@ExternalSiteUrl  NVARCHAR(400), 
	@IsFree           BIT, 
	@DateStart        DATETIME2(7), 
	@DateEnd          DATETIME2(7),
	--User Params
	@UserId           INT,
		--final output eventId
	@OutputId         INT OUTPUT

AS

/* 
	Declare @EventTypeId      INT = 6, 
	@Name        NVARCHAR(255) = 'Test Name', 
	@Summary          NVARCHAR(255) = 'test summary', 
	@Description NVARCHAR(4000) = 'summary',
	@VirtualTypeId	  INT = 3,
	@EventStatusId    INT = 1, 
	@ImageUrl         NVARCHAR(400) = 'https://c8.alamy.com/comp/EPF1YW/nun-with-handgun-isolated-on-white-EPF1YW.jpg', 
	@ExternalSiteUrl  NVARCHAR(400) = 'https://google.com', 
	@IsFree           BIT = 1,
	@DateStart        DATETIME2(7) = GETUTCDATE(), 
	@DateEnd          DATETIME2(7) = GETUTCDATE(),
	@Price			decimal(6, 2) = 0,
	--User Params
	@UserId           INT = 1,
		--final output eventId
	@OutputId         INT
	
			

EXEC [dbo].[VirtualEventWizard_Insert]
	@EventTypeId, 
	@Name, 
	@Summary, 
	@Description,
	@VirtualTypeId,
	@EventStatusId, 
	@ImageUrl, 
	@ExternalSiteUrl, 
	@IsFree, 
	@DateStart, 
	@DateEnd,
	--User Params
	@UserId,
		--final output eventId
	@OutputId OUTPUT
			
			

EXEC [dbo].[VirtualEvents_SelectAllDetails]
	@OutputId

*/

BEGIN
SET XACT_ABORT ON
Declare @Tran nvarchar(50)  = '_virtualEventWizardInsertTx'

/*1)Declare Table Variable. INSERT INTO Table Variable( Select by Id)
2) IF(Table variable IS NULL) BEGIN  END  ELSE BEGIN END*/

BEGIN TRY

BEGIN Transaction @Tran
	
		BEGIN
		      EXEC [dbo].[VirtualEvents_Insert] 
			   @EventTypeId, 
             @Name, 
             @Summary, 
             @Description, 
             @VirtualTypeId, 
             @EventStatusId, 
             @ImageUrl, 
             @ExternalSiteUrl, 
             @IsFree, 
             @DateStart, 
             @DateEnd, 
             @OutputId OUTPUT;
		END


Commit Transaction @Tran

END TRY
BEGIN Catch



    IF (XACT_STATE()) = -1
    BEGIN
        PRINT 'The transaction is in an uncommittable state.' +
              ' Rolling back transaction.'
        ROLLBACK TRANSACTION @Tran;;
    END;

    -- Test whether the transaction is active and valid.
    IF (XACT_STATE()) = 1
    BEGIN
        PRINT 'The transaction is committable.' +
              ' Committing transaction.'
        COMMIT TRANSACTION @Tran;;
    END;

        -- If you want to see error info
       -- SELECT
        --ERROR_NUMBER() AS ErrorNumber,
        --ERROR_SEVERITY() AS ErrorSeverity,
        --ERROR_STATE() AS ErrorState,
       -- ERROR_PROCEDURE() AS ErrorProcedure,
       -- ERROR_LINE() AS ErrorLine,
       -- ERROR_MESSAGE() AS ErrorMessage

-- to just get the error thrown and see the bad news as an exception
    THROW

End Catch




SET XACT_ABORT OFF
END