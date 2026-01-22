# 1. Используем .NET 8 SDK для сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 2. Копируем только файл проекта сначала (для кэширования зависимостей)
COPY MonitoringApi/MonitoringApi.csproj MonitoringApi/
RUN dotnet restore MonitoringApi/MonitoringApi.csproj

# 3. Копируем весь исходный код
COPY . .

# 4. Собираем проект
WORKDIR /src/MonitoringApi
RUN dotnet build -c Release -o /app/build

# 5. Публикуем проект
RUN dotnet publish -c Release -o /app/publish

# 6. Финальный образ (только рантайм)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# 7. Копируем собранное приложение
COPY --from=build /app/publish .

# 8. Открываем порт 80
EXPOSE 80

# 9. Запускаем приложение
ENTRYPOINT ["dotnet", "MonitoringApi.dll"]
