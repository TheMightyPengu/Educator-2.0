
# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /App
# COPY publish .
RUN apt-get update && apt-get install -y curl

RUN apt-get install -y mariadb-client

ENTRYPOINT ["dotnet", "ADOPSE.dll"]