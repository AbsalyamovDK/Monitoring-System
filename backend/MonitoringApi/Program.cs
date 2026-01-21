using MonitoringApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Добавляем сервисы в контейнер
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Настраиваем CORS для Angular приложения
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")  // Адрес Angular приложения
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Регистрируем наши сервисы
builder.Services.AddSingleton<IMonitoringService, MonitoringService>();

var app = builder.Build();

// Настраиваем конвейер HTTP-запросов
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ВАЖНО: UseCors должен быть после UseRouting
app.UseRouting();

// Подключаем CORS
app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();