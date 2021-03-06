

ALTER PROC [dbo].[Appointments_SelectBySeekerIdV4] 
				@SeekerId int
				,@pageIndex int
				,@pageSize int

/* -- test code --

	Declare @SeekerId int = 9
				,@pageIndex int = 0
				,@pageSize int = 5

	Execute dbo.Appointments_SelectBySeekerIdV4
				@SeekerId
				,@pageIndex
				,@pageSize

*/

AS
    BEGIN

		DECLARE @offset int = @pageIndex * @pageSize

        SELECT  A.[Id]
               ,A.[ProviderId]
			   ,UP.[FirstName] as FirstName
			   ,UP.[LastName] as LastName
               ,A.[SeekerId] 
               ,A.[StartTime]
               ,A.[EndTime] 
               ,A.[Price]
               ,A.[isCanceled]
               ,A.[CancellationReason]
               ,A.[DateCreated]e
               ,A.[DateModified]
			   , TotalCount = COUNT(1) OVER()
        FROM	[dbo].[Appointments] as A
		inner join dbo.Users as U on U.Id = A.ProviderId
		inner join dbo.UserProfiles as UP on UP.UserId = U.Id
		Where A.[SeekerId] = @SeekerId
		Order By [ProviderId]

		OFFSET @offset Rows
		FETCH NEXT @pageSize Rows ONLY

    END;