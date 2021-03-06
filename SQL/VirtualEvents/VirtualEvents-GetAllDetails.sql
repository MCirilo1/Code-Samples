
ALTER proc [dbo].[VirtualEvents_SelectAllDetails] 

@PageIndex INT, 
@PageSize  INT

AS

/* 
DECLARE 
	@_PageIndex int = 0,
	@_PageSize int = 10

EXEC [dbo].[VirtualEvents_SelectAllDetails]
	@_PageIndex,
	@_PageSize


*/

    BEGIN
        SELECT VE.[Id],
			   ET.Id AS EventTypeId, 
               ET.[Name] AS EventTypeName, 
               VE.[Name], 
               VE.[Summary], 
               VE.[Description],
			   VT.Id AS VirtualTypeId, 
               VT.[Name] AS VirtualTypeName,
               VE.[ImageUrl], 
               VE.[ExternalSiteUrl], 
               VE.[IsFree],
			   VE.[DateCreated],
			   VE.[DateModified],
               VE.[DateStart], 
               VE.[DateEnd], 
			   ES.Id as EventStatusId,
               TotalCount = COUNT(1) OVER()
        FROM [dbo].[VirtualEvents] AS VE
             JOIN dbo.EventTypes AS ET ON ET.Id = VE.EventTypeId
             JOIN dbo.EventStatus AS ES ON ES.Id = VE.EventStatusId
             JOIN dbo.VirtualType AS VT ON VT.Id = VE.VirtualTypeId
        ORDER BY [DateStart] ASC
        OFFSET(@PageIndex) * (@PageSize) ROWS FETCH NEXT @PageSize ROWS ONLY;
    END;