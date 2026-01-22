# \# Device Monitoring System

# 

# Full-stack приложение для мониторинга устройств.

# 

# \## Архитектура

# \- \*\*Backend\*\*: ASP.NET Core 8 Web API

# \- \*\*Frontend\*\*: Angular 15 SPA

# \- \*\*Хранилище\*\*: In-memory (ConcurrentDictionary)

# \- \*\*Стили\*\*: Bootstrap 5 + LESS

# 

# \## Функционал

# 1\. Приём статистики от устройств (POST /api/sessions)

# 2\. Отображение всех устройств

# 3\. Просмотр сессий конкретного устройства

# 4\. In-memory хранение данных

# 

# \## Запуск

# 

# \### Локально

# 1\. \*\*Backend\*\*: `cd backend/MonitoringApi \&\& dotnet run`

# 2\. \*\*Frontend\*\*: `cd frontend/monitoring-ui \&\& ng serve`

# 3\. Открыть: http://localhost:4200

# 

# \### Docker

# `docker-compose up --build`

# 

# \## API Endpoints

# \- `POST /api/sessions` - добавить сессию устройства

# \- `GET /api/devices` - получить все устройства

# \- `GET /api/devices/{id}/sessions` - получить сессии устройства

# 

# \## Пример данных

# ```json

# {

# &nbsp; "deviceId": "device-001",

# &nbsp; "userName": "John Doe",

# &nbsp; "startTime": "2024-01-21T10:00:00Z",

# &nbsp; "endTime": "2024-01-21T12:00:00Z",

# &nbsp; "version": "1.0.0.56"

# }

