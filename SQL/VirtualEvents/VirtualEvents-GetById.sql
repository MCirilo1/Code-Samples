
ALTER proc [dbo].[VirtualEvents_SelectById]

@Id INT

AS

/* 

DECLARE @_Id int = 3

EXEC [dbo].[VirtualEvents_SelectById]
	@_Id

*/

    BEGIN
        SELECT VE.[Id], 
               VE.[Name], 
               VE.[Summary], 
               VE.[Description], 
               VE.[ImageUrl], 
               VE.[ExternalSiteUrl], 
               VE.[IsFree], 
               VE.[DateCreated], 
               VE.[DateModified], 
               VE.[DateStart], 
               VE.[DateEnd], 
               ET.Id AS EventTypeId, 
               ET.[Name] AS EventTypeName, 
               VT.Id AS VirtualTypeId, 
               VT.[Name] AS VirtualTypeName,  
               TotalCount = COUNT(1) OVER()
        FROM [dbo].[VirtualEvents] AS VE
             JOIN dbo.EventTypes AS ET ON ET.Id = VE.EventTypeId
             JOIN dbo.EventStatus AS ES ON ES.Id = VE.EventStatusId
             JOIN dbo.VirtualType AS VT ON VT.Id = VE.VirtualTypeId
        WHERE VE.[Id] = @Id;
    END;